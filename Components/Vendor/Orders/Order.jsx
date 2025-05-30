import style from './Order.module.css';
import { FiCalendar, FiArrowUpLeft, FiUser, FiPhone } from "react-icons/fi";
import { BsBuilding, BsArrowRight } from "react-icons/bs";
import Link from 'next/link';
import UserProf from '/public/Images/Ei-user.svg'
import Image from 'next/image';
import { TfiRuler } from 'react-icons/tfi';
import addComma from 'Functions/addComma';
import useGetPrivatRequest from 'hooks/useGetPrivatRequest';
import Loading from 'Components/Loading';
import { useRouter } from 'next/router';
import PdfOnButtonClick from './PdfGeneratorWithData ';
import SendOrder from './SendOrder';
import useAxios from 'hooks/useAxios';
import { useContext } from 'react';
import { Functions } from 'providers/FunctionsProvider';

const Order = ({ data, setSingleOrder }) => {
    const { AxiosPrivate } = useAxios()
    const router = useRouter();
    const { SwalStyled } = useContext(Functions)
    const { order: orderID, ...queries } = router.query
    const [order] = useGetPrivatRequest(`/admin/orders/${orderID ?? data.id}`)

    const imageUrl = `https://dev.virtualearth.net/REST/v1/Imagery/Map/Road/${order?.address.latitude},${order?.address.longitude}/12?mapSize=120,120&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}`

    const OrderList = () => {
        setSingleOrder()
        router.push({ pathname: router.pathname, query: queries }, undefined, { shallow: true })
    }

    const handleDeliver = async () => {
        SwalStyled.fire({
            title: "آیا از تغییر حالت مطمئن هستید؟",
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: "تایید",
            cancelButtonText: `انصراف`
        }).then(async (result) => {
            if (result.isConfirmed) {
                await AxiosPrivate.patch(`/order/update/${order.id}`, { order_status_id: 4 })
                    .then(res => {
                        SwalStyled.fire({
                            title: "انجام شد",
                            text: res.data.message || 'سفارش تحویل داده شد',
                            icon: "success",
                        })
                        OrderList()
                    })
                    .catch(err => SwalStyled.fire({
                        title: "انجام نشد",
                        text: err.response?.data.message || 'سفارش تحویل داده نشد',
                        icon: "error",
                    }))
            }
        });
    }
    const handleCancell = () => {
        SwalStyled.fire({
            title: "از لغو سفارش مطمئن هستید؟",
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: "لغو سفارش",
            cancelButtonText: `انصراف`
        }).then(async (result) => {
            if (result.isConfirmed) {
                await AxiosPrivate.patch(`/order/update/${order.id}`, { order_status_id: 5 })
                    .then(res => {
                        SwalStyled.fire({
                            title: "انجام شد",
                            text: res.data.message || 'سفارش لغو شد',
                            icon: "success",
                        })
                        OrderList()
                    })
                    .catch(err => SwalStyled.fire({
                        title: "انجام نشد",
                        text: err.response?.data.message || 'سفارش لغو نشد',
                        icon: "error",
                    }))
            }
        });
    }

    return (
        <>
            {!!order ? <div className='sm:border rounded-lg' dir='auto'>
                <div className={style.container}>
                    <div className="flex items-center justify-between sm:p-6 sm:pb-6 pb-3 border-b ">
                        <div className={style.header}>
                            <button className={style.go_back} onClick={() => OrderList()}><BsArrowRight /></button>
                            <div className={style.order_code}>
                                <p className='sm:block hidden'>سفارش</p> <span>{(order.code)}</span>
                            </div>
                        </div>
                        <PdfOnButtonClick data={order} />
                    </div>
                    <div className={style.navbar}>
                        <div className={style.info}>
                            <div className={style.date}>
                                <div className={style.date_icon}>
                                    <FiCalendar />
                                </div>
                                <p>{new Date(order.created_at).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                <p>{new Date(order.created_at).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                        </div>
                        <div className={style.actions}>
                            {order.order_status_id == 2 && <SendOrder order_id={order.id} setOnOrder={setSingleOrder} />}
                            {order.order_status_id == 3 && <button type='button' onClick={handleDeliver} className='!bg-green-500 text-sm text-white py-2 px-3 rounded-lg'>تحویل داده شد</button>}
                            {order.order_status_id != 5 && <button type='button' onClick={handleCancell} className='!bg-red-500 text-sm text-white py-2 px-3 rounded-lg'>لغو سفارش</button>}
                        </div>
                    </div>
                    <div className="flex items-center flex-wrap gap-3 sm:px-5 my-3 text-sm">
                        <div className="flex items-center gap-1">
                            <label className='font-bold'>وضعیت: </label>
                            <div className='text-sm border p-1 rounded'>
                                {order.order_status.title}
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <label className='font-bold'>کد رهگیری: </label>
                            <div className='text-sm p-1'>
                                {order.postal_reference?.code || 'تعریف نشده'}
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <label className='font-bold'>روش ارسال: </label>
                            <div className='text-sm p-1'>
                                {order.postal_reference?.method || 'تعریف نشده'}
                            </div>
                        </div>
                    </div>
                    <div className={style.main}>
                        <div className={style.customer}>
                            <div className={style.title}>مشتری</div>
                            <div className={style.user}>
                                <div className='flex items-center justify-between'>
                                    <div className={style.user_profile}>
                                        <div className={style.user_image}>
                                            <img src={UserProf.src} alt="" />
                                        </div>
                                        <p className={style.user_name}>{order.user.name}</p>
                                    </div>
                                    <button className={style.user_arrow}><FiArrowUpLeft /></button>
                                </div>
                            </div>
                            <div className={style.contact}>
                                <p className={style.sm_title}>مشخصات گیرنده</p>
                                <div className={style.receiver}>
                                    <ul className={style.receiver_contact}>
                                        <li>
                                            <div><FiUser /></div>{order.address.name}
                                        </li>
                                        <li className={style.receiver_cellphone}>
                                            <div><FiPhone /></div> <a href="tel:09990990909">{order.address.cellphone}</a>
                                        </li>
                                    </ul>
                                    <div className={style.address_sec}>
                                        <p className={style.sm_title}>آدرس تحویل</p>
                                        <ul className={style.address}>
                                            <li className={style.address_main}>{order.address.province} - {order.address.city} - {order.address.address}</li>
                                            <li className={style.number_house}>
                                                <span>پلاک: </span>{(order.address.number)}
                                                <b>|</b>
                                                <span>واحد: </span>{(order.address.unit ?? 0)}
                                            </li>
                                            <li className={style.postalcode}><span>کدپستی: </span>{(order.address.postalcode)}</li>
                                        </ul>
                                        <a target='_blank' href={`https://nshn.ir/?lat=${order?.address.latitude}&lng=${order?.address.longitude}`} className='w-full h-fit md:max-w-full sm:max-w-[250px] max-w-[160px] overflow-hidden rounded-lg'>
                                            <img src={!!imageUrl ? imageUrl : '/Images/placeholder-1.png'} className='rounded-lg w-full h-full object-contain'
                                                placeholder='blur' blurDataURL='/Images/placeholder-1.png' width={100}
                                                height={100} alt='' />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={style.content}>
                            <div>
                                <div className={style.title}>محصولات</div>
                                <div className={style.products}>
                                    {!!order && order.orderItems.map(p => {
                                        return (
                                            <div className={style.tEl_7HqZy} key={p.product.id}>
                                                <div className={style.LbOT_Plwz33}>
                                                    <Link href={`/products/${p.product.id}`} state={p.product.sizes} className='overflow-hidden rounded-lg '>
                                                        <Image placeholder='blur' blurDataURL='/Images/placeholder-1.png' width={0} height={0} sizes='100vw' className='w-full h-full object-cover' src={p.product.image} alt="" />
                                                    </Link>
                                                    <div className={style.lGJkVwYt}>
                                                        <h3 className={style.RxQOi_5_ed}>{p.product.name}</h3>
                                                        <div className={style.MncBgTfd_Pr}>
                                                            <div className={style.box}>
                                                                <div className={style.Detail_Pnmvg}>
                                                                    <BsBuilding />
                                                                </div>
                                                                <p>{p.product.brand.name}</p>
                                                            </div>
                                                            <div className={style.box}>
                                                                <div className={style.Detail_Pnmvg}><span style={{ background: p.product.colorCode }}></span></div>
                                                                <p>{p.product.color}</p>
                                                            </div>
                                                            <div className={style.box}>
                                                                <div className={style.Detail_Pnmvg}>
                                                                    <TfiRuler />
                                                                </div>
                                                                <p>{p.size}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={style.vVBE__0Oiju}>
                                                        <div className={style.G_VwXabc_99L}>
                                                            <p className={style.price_3Sproduct}>{addComma(p.product.offPrice.toString())}</p>
                                                            {p.product.offPrice !== p.product.price && <del className={style.UcUrzyq}>{addComma(p.product.price.toString())}</del>}
                                                        </div>
                                                    </div>
                                                    <div className={style.pricing}>
                                                        <div className={style.quantity}><span>تعداد</span>{(p.quantity)}</div>
                                                        <div className={style.subtotal}><span>جمع قیمت</span>{addComma(p.subtotal)}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className={style.payment_summary}>
                                <div className={style.sm_title}>خلاصه پرداخت</div>
                                <div className={style.pricing_detail}>
                                    <ul>
                                        <li className={style.pricing_item}><b>تعداد کل محصولات: </b><span className={style.all_quantity}>{(order.total_items)}</span></li>
                                        <li className={style.pricing_item}><b>قیمت کل: </b><span className={style.value}>{addComma(order.total_preOffPrice)}</span></li>
                                        <li className={style.pricing_item}><b>مقدار تخفیف: </b><span className={style.value}>{addComma(order.total_discount)}</span></li>
                                        <li className={style.pricing_item}><b>پرداخت شده: </b><span className={style.value}>{addComma(order.total_price)}</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : <Loading />}
        </>
    );
};

export default Order;