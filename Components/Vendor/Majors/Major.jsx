import React, { useContext } from 'react';
import style from '../Orders/Order.module.css';
import { useRouter } from 'next/router';
import useAxios from 'hooks/useAxios';
import useGetPrivateRequest from 'hooks/useGetPrivatRequest';
import Loading from 'Components/Loading';
import { BsArrowRight } from 'react-icons/bs';
import { FiCalendar } from 'react-icons/fi';
import { Button, Card, CardBody, User } from "@heroui/react";
import { Functions } from 'providers/FunctionsProvider';
import Image from 'next/image';
import Link from 'next/link';

const Major = ({ data, setSingleOrder }) => {
    const { AxiosPrivate } = useAxios()
    const { SwalStyled } = useContext(Functions)
    const router = useRouter();
    const { order: orderID, ...queries } = router.query
    const [order] = useGetPrivateRequest(`/user-product-details/${orderID ?? data.id}`)

    const OrderList = () => {
        setSingleOrder()
        router.push({ pathname: router.pathname, query: queries }, undefined, { shallow: true })
    }

    const handleSubmit = () => {
        SwalStyled.fire({
            title: "آیا سفارش ثبت نهایی شود؟",
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: "ثبت",
            cancelButtonText: `انصراف`
        }).then(async (result) => {
            if (result.isConfirmed) {
                await AxiosPrivate.post(`/user-product-details/${orderID}/update-status`)
                    .then(res => {
                        SwalStyled.fire({
                            title: "ثبت شد",
                            text: res.data.message,
                            icon: "success",
                        })
                        OrderList()
                    })
                    .catch(err => SwalStyled.fire({
                        title: "ثبت نشد",
                        text: err.response?.data.message,
                        icon: "error",
                    }))
            }
        });
    }
    return (
        <>
            {!!order ? <div className='sm:border rounded-lg' dir='auto'>
                <div className='flex flex-col items-stretch'>
                    <div className="flex items-center justify-between sm:p-6 sm:pb-6 pb-3 border-b ">
                        <div className={style.header}>
                            <button className={style.go_back} onClick={() => OrderList()}><BsArrowRight /></button>
                            <div className={style.order_code}>
                                <p className='sm:block hidden'>سفارش عمده</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 p-4">
                        <div className='flex items-center justify-between flex-wrap gap-2.5 pb-4 border-b'>
                            <div className={style.date}>
                                <div className={style.date_icon}>
                                    <FiCalendar />
                                </div>
                                <p>{new Date(order.created_at).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                <p>{new Date(order.created_at).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                            <div className={style.date}>
                                <p>{new Date(order.updated_at).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                <p>{new Date(order.updated_at).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}</p>
                                <div className={style.date_icon}>
                                    نهایی شدن سفارش
                                </div>
                            </div>
                            {order.status === 'read' && <Button size='sm' color='success' variant='flat' onPress={handleSubmit}>ثبت سفارش</Button>}
                        </div>
                        <div className="flex items-center gap-6">
                            <User
                                avatarProps={{
                                    showFallback: true
                                }}
                                name={order.user_name.name}
                            />
                            <a className='text-lg text-primary-600' href={`tel:${order.user_name.mobile}`}>{order.user_name.mobile}</a>
                        </div>
                        <div className="">
                            <Card
                                isBlurred
                                className="border-none bg-background/60 dark:bg-default-100/50 "
                                shadow="sm"
                            >
                                <CardBody>
                                    <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 ">
                                        <Link href={`/wholesale/${order.product_id}`} className="relative rounded-2xl overflow-hidden col-span-6 md:col-span-3">
                                            <Image
                                                alt="Album cover"
                                                className="w-full h-full max-h-64 object-cover"
                                                height={100}
                                                src={order.product_name.image}
                                                width={100}
                                            />
                                        </Link>

                                        <div className="flex flex-col items-start py-6 gap-4 col-span-6 md:col-span-9">
                                            <h3 className='text-lg font-semibold'>{order.product_name.name}</h3>
                                            <div className="flex items-center gap-2">
                                                <span className='text-gray-800 text-sm'>برند:</span>
                                                <p>{order.product_name.brand.name}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className='text-gray-800 text-sm'>دسته بندی:</span>
                                                <p>{order.product_name.category.name}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className='text-gray-800 text-sm'>رنگ بندی:</span>
                                                {order.product_name.colors?.map(c => <div key={c.colorCode} className={`flex items-center *:border-transparent cursor-pointer border p-1 rounded-md gap-1`}>
                                                    <div className='centerOfParent rounded-full w-5 h-5'>
                                                        <span className='border w-5 h-5 rounded-full' style={{ background: c.colorCode }}></span>
                                                    </div>
                                                    <p className={`text-[${c.colorCode}] font-black`}>{c.color}</p>
                                                </div>)}
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </div> : <Loading />}
        </>
    );
};

export default Major;