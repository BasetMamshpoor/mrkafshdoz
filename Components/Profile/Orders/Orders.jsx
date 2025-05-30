import { MdChevronLeft } from 'react-icons/md'
import { BsDot, BsFillXCircleFill } from 'react-icons/bs'
import { FaCheckCircle } from "react-icons/fa";
import style from './Orders.module.css'
import Pagination from 'Components/Pagination/Pagination';
import useGetPrivatRequest from 'hooks/useGetPrivatRequest';
import addComma from 'Functions/addComma';
import { e2p } from 'Functions/ConvertNumbers';
import { useState } from 'react';
import img from 'public/Images/order.png'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaCircleExclamation } from 'react-icons/fa6';

const Orders = ({ status = '', setOnOrder }) => {
    const { replace, query } = useRouter();
    const { code } = query

    const [currentPage, setCurrentPage] = useState(1)

    const [orders, setOrders, reload, pagination] = useGetPrivatRequest('/profile/orders', currentPage, { items_perpage: 10, code, status_id: status })

    const detailOrder = (order) => {
        setOnOrder(order)
        const newQuery = { ...query, order: order.id };

        replace({ pathname: '/profile/[route]', query: newQuery });
    }

    return (
        <>
            {(!!orders ?
                <div className={style.dSezpb6} dir="rtl">
                    {!!orders.length > 0 ?
                        <>
                            <div className={style.DybIay}>
                                <div className={style.RxaPlo}>
                                    {orders.map(o => {
                                        return (
                                            <article className={style.order} key={o.id} onClick={() => detailOrder(o)}>
                                                <div className={style.or_header}>
                                                    <div className={style.or_top}>
                                                        <div className={style.status}>
                                                            <div className={style.icon}>
                                                                {o.order_status_id === 1 ? <FaCircleExclamation fill='orange' />
                                                                    : o.order_status_id === 5 ? <BsFillXCircleFill fill='red' />
                                                                        : <FaCheckCircle fill='#6bb927' />}
                                                            </div>
                                                            <span>{o.order_status.title}</span>
                                                        </div>
                                                        <div className={style.icon}><MdChevronLeft /></div>
                                                    </div>
                                                    <div className={style.content}>
                                                        <div className={style.or_date}>{new Date(o.created_at).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                                        <div className={style.or_info}>
                                                            <div className={style.icon}><BsDot /></div>
                                                            کد سفارش <span>{e2p(o.code)}</span>
                                                        </div>
                                                        <div className={style.or_info}>
                                                            <div className={style.icon}><BsDot /></div>
                                                            مبلغ <span className={style.toman}>{addComma(o.total_price)}</span>
                                                        </div>
                                                        {!!o.offPrice && <div className={style.or_info}>
                                                            <div className={style.icon}><BsDot /></div>
                                                            تخفیف <span className={style.toman}>{addComma(o.offPrice)}</span>
                                                        </div>}
                                                    </div>
                                                </div>
                                                <div className={style.pictures}>
                                                    <div className='flex items-center flex-wrap gap-2 py-2'>
                                                        {o.orderItems.map(img => {
                                                            return (
                                                                <div className='centerOfParent sm:max-w-[180px] max-w-[100px] rounded-lg overflow-hidden' key={img.id}>
                                                                    <Image placeholder='blur' blurDataURL='/Images/placeholder-1.png' width={0} height={0} sizes='100vw' className='w-full h-full object-cover' src={img.product_image} alt="" />
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            </article>
                                        )
                                    })}
                                </div>
                            </div>
                        </>
                        : <div className={style.empty}>
                            <div className={style.pHvtxu}>
                                <div className={style.pic}>
                                    <img src={img.src} alt="" />
                                </div>
                                <p>هنوز هیچ سفارشی ندادید</p>
                            </div>
                        </div>}
                    <Pagination currentPage={currentPage} setCurrentPage={(e) => setCurrentPage(e)} dataLength={pagination.meta.total} itemsPerPage={pagination.meta.per_page} boxShadow={false} />
                </div >
                : <div className='w-full centerOfparent h-32'>در حال بارگزاری</div>)
            }
        </>
    );
};

export default Orders;