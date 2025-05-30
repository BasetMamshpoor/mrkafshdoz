import style from './Order.module.css';
import { BsBuilding, BsArrowRight, BsDot } from "react-icons/bs";
import { TfiRuler } from 'react-icons/tfi';
import { FaRegComment } from "react-icons/fa";
import { e2p } from 'Functions/ConvertNumbers';
import Link from 'next/link';
import Image from 'next/image';
import addComma from 'Functions/addComma';
import useGetPrivatRequest from 'hooks/useGetPrivatRequest';
import Loading from 'Components/Loading';
import createModal from 'Components/Modal';
import AddComment from 'Components/Detaile/AddComment';
import { useContext } from 'react';
import { Functions } from 'providers/FunctionsProvider';
import { useRouter } from 'next/router';
import { AxiosPrivate } from 'config/axios';
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import Payments from './Payments';

const Order = ({ data, setSingleOrder }) => {
    const router = useRouter();
    const { order: orderID, ...queries } = router.query
    const [order] = useGetPrivatRequest(`/profile/orders/${orderID ?? data.id}`)

    const { SwalStyled } = useContext(Functions)

    const OrderList = () => {
        setSingleOrder()
        router.push({ pathname: router.pathname, query: queries }, undefined, { shallow: true })
    }
    const handlePay = async () => {
        await AxiosPrivate.post(`/profile/order/repay/${order.id}`)
            .then(res => window.location.replace(res.data.data.redirect_url))
            .catch(err => SwalStyled.fire({
                title: "انجام نشد",
                text: err.response?.data.message || 'اتصال به درگاه پرداخت ناموفق بود',
                icon: "error",
            }))

    }
    const handleCancell = async () => {
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
            {!!order ? <div className={style.order} dir='auto'>
                <div className={style.container}>
                    <div className={style.header}>
                        <button className={style.go_back} onClick={() => OrderList()}><BsArrowRight /></button>
                        <div className={style.order_code}>
                            <p>جزئیات سفارش</p>
                        </div>
                    </div>
                    <div className={style.heading}>
                        <div className={style.info}>
                            {(order.order_status_id == 1) && <div className='flex gap-4 mb-3 border-b pb-3'>
                                <div onClick={handlePay}
                                    className='centerOfParent bg-blue-500 text-white px-3 py-2 rounded-lg cursor-pointer'>پرداخت
                                </div>
                                <div onClick={handleCancell}
                                    className='centerOfParent bg-red-500 text-white px-3 py-2 rounded-lg cursor-pointer'>لغو
                                    سفارش
                                </div>
                            </div>}
                            <div className={[style.head_top, style.text].join(' ')}>
                                <div>
                                    کد پیگیری سفارش <span>{e2p(order.code)}</span>
                                </div>
                                <div className={style.icon}><BsDot /></div>
                                <div>
                                    تاریخ ثبت سفارش <span>{new Date(order.created_at).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                            </div>
                            <div className={style.head_address}>
                                <div className={[style.receiver, style.text].join(' ')}>
                                    <div>
                                        تحویل گیرنده <span>{order.address.name}</span>
                                    </div>
                                    <div className={style.icon}><BsDot /></div>
                                    <div>
                                        شماره موبایل <span>{e2p(order.address.cellphone)}</span>
                                    </div>
                                </div>
                                <div className={style.text}>
                                    <div>
                                        آدرس <span>{order.address.city} - {order.address.address}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={[style.head_top, style.text, '!pb-0 pt-4 border-t !border-b-0'].join(' ')}>
                                <div>
                                    وضعیت <span>{order.order_status.title}</span>
                                </div>
                                <div className={style.icon}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"></path></svg></div>
                                <div>
                                    کد پیگیری ارسال <span>{order.postal_reference.code || 'تعریف نشده'}</span> {!!order.postal_reference.code && <a href={`https://tracking.post.ir/search.aspx?id=${order.postal_reference.code}`} className="centerOfParent"><HiArrowTopRightOnSquare className='text-black' /></a>}
                                </div>
                                <div className={style.icon}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"></path></svg></div>
                                <div>
                                    روش ارسال <span>{order.postal_reference?.method || 'تعریف نشده'}</span>
                                </div>
                            </div>
                        </div>
                        <div className={style.head_pay}>
                            <div className={style.text}>
                                <div>
                                    مبلغ <span className={style.toman}>{addComma(order.total_price)}</span>
                                </div>
                                {!!order.offPrice && <>
                                    <div className={style.icon}><BsDot /></div>
                                    <div>
                                        سود شما از خرید <span className={style.toman}>{addComma(order.offPrice ?? 0)}</span>
                                    </div>
                                </>}
                                <div className={style.icon}><BsDot /></div>
                                <div>
                                    <span>پرداخت اینترنتی</span>
                                </div>
                            </div>
                            {!!order.order_payments.length && <Payments data={order.order_payments} />}
                        </div>
                    </div>
                    <div className={style.main}>
                        <div className={style.content}>
                            <div className={style.products}>
                                {!!order && order.orderItems.map(p => {
                                    return (
                                        <div className={style.tEl_7HqZy} key={p.product.id}>
                                            <div className={style.LbOT_Plwz33}>
                                                <Link href={`/products/${p.product.id}`} state={p.product.sizes} className={style.C41A__jF}>
                                                    <Image placeholder='blur' blurDataURL='/Images/placeholder-1.png' width={0} height={0} sizes='100vw' className='w-full h-full object-cover' src={p.product.image} alt="" />
                                                    <span className={style.quantity}>{e2p(p.quantity)}</span>
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
                                                <div className={style.reviwe} onClick={() => createModal(<AddComment SwalStyled={SwalStyled} id={p.product.id} />)}>
                                                    ثبت دیدگاه
                                                    <div className={style.icon}><FaRegComment /></div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div > : <Loading />}
        </>
    );
};

export default Order;