import {BsArrowLeft} from 'react-icons/bs'
import {useState} from 'react';
import {Pagination} from "@heroui/react";
import {useRouter} from 'next/router';
import useGetPrivatRequest from 'hooks/useGetPrivatRequest'
import addComma from 'Functions/addComma';

const Orders = ({status, setOnOrder}) => {
    const {replace, query} = useRouter();
    const {code} = query

    const [currentPage, setCurrentPage] = useState(1)
    const [orders, setOrders, reload, pagination, , isLoading] = useGetPrivatRequest(`/admin/orders?items_perpage=10${status ? `&status_id=${status}` : ""}${code ? `&code=${code}` : ``}`, currentPage)

    const detailOrder = (order) => {
        setOnOrder(order)
        const newQuery = {...query, order: order.id};

        replace({pathname: '/admin/[vendor]', query: newQuery});
    }

    return (
        <>
            {!isLoading ?
                <div className='mb-3' dir="rtl">
                    {!!orders?.length > 0 ?
                        <div className='px-1 flex flex-col items-stretch overflow-x-auto overflow-y-hidden'>
                            <ul className='flex items-center sm:px-4 flex-nowrap'>
                                <li className='text-sm font-semibold flex-[0_0_120px] text-center mx-1.5 text-slate-500'>کد
                                    سفارش
                                </li>
                                <li className='text-sm font-semibold flex-[0_0_220px] text-center mx-1.5 text-slate-500 flex justify-center'>مشتری</li>
                                <li className='text-sm font-semibold flex-[0_0_120px] text-center mx-1.5 text-slate-500'>تاریخ</li>
                                <li className='text-sm font-semibold flex-[0_0_220px] text-center mx-1.5 text-slate-500'>مبلغ
                                    نهایی
                                </li>
                                <li className='flex-[0_0_0] mx-1.5 px-5'></li>
                            </ul>
                            <ul className='flex flex-col items-center w-[800px]'>
                                {orders.map(o => {
                                    return (
                                        <li key={o.id} className='my-3 w-full'>
                                            <ul className='flex flex-nowrap w-full items-center rounded-lg shadow-md py-3.5 sm:px-4 bg-gray-50 cursor-pointer duration-300 hover:shadow-lg [&>*]:mx-1.5 [&>*]:text-center'
                                                onClick={() => detailOrder(o)}>
                                                <li className='!flex-[0_0_120px] text-[12px]'>{o.code}</li>
                                                <li className='text-sm !flex-[0_0_220px] line-clamp-1 centerOfParent gap-1'>
                                                    <span>{o.name}</span></li>
                                                <li className='text-[12px] !flex-[0_0_120px]'>{new Date(o.created_at).toLocaleDateString('fa-IR', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}</li>
                                                <li className='text-[12px] !flex-[0_0_220px]'>{addComma(o.total_price)}
                                                    <span className='text-[10px]'>تومان</span></li>
                                                <li className='flex-[0_0_0] !m-0 px-4'><BsArrowLeft/></li>
                                            </ul>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        : <div className='w-full centerOfParent mt-6'>
                            <p>خالی است</p>
                        </div>}
                    <div dir="auto" className="centerOfParent mt-4">
                        {!!orders?.length && pagination?.meta.last_page > 1 &&
                            <Pagination size='sm'
                                        total={Math.ceil(pagination.meta.total / pagination.meta.per_page)}
                                        color="primary"
                                        page={currentPage}
                                        onChange={setCurrentPage}
                                        showControls
                            />}
                    </div>
                </div>
                : <div className='w-full centerOfParent'>درحال بارگزاری ...</div>
            }
        </>
    );
};

export default Orders;