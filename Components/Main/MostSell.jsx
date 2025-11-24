import Image from 'next/image';
import Link from 'next/link';
import React, {useContext} from 'react';
import {BiLeftArrowAlt} from 'react-icons/bi';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import {Chip, Skeleton} from "@heroui/react";
import {Categories} from 'providers/CategoriesProvider';
import Timer from 'Components/Timer';
import addComma from 'Functions/addComma';

const MostSell = ({url, title, data}) => {
    const {categories} = useContext(Categories)
    return (
        <>
            <div className="container lg:mb-[140px] sm:my-20 my-[60px]" dir='rtl'>
                <div className="w-full mx-auto flex flex-col gap-4">
                    <div className="flex items-center justify-between px-4">
                        <div className="centerOfParent gap-4">
                            <p className='sm:text-xl font-semibold'>{title}</p>
                        </div>
                        <Link href={`/category-${categories[0]?.slug}-apparel?sort=${url}`}
                              className='centerOfParent sm:text-base text-[12px] gap-2 text-primary-600 whitespace-nowrap'>مشاهده
                            همه <BiLeftArrowAlt className='w-5 h-5 fill-primary-600'/></Link>
                    </div>
                    <div className="w-full relative slider px-1">
                        <Swiper
                            modules={[Navigation]}
                            spaceBetween={10}
                            slidesPerView={1.2} // Start with 1.5 slides for mobile
                            centeredSlides={false}
                            loop={false}
                            navigation
                            breakpoints={{
                                319: {
                                    slidesPerView: 1.25,
                                },
                                400: {
                                    slidesPerView: 1.5,
                                },
                                460: {
                                    slidesPerView: 1.8,
                                },
                                500: {
                                    slidesPerView: 2,
                                },
                                570: {
                                    slidesPerView: 2.3,
                                },
                                640: {
                                    slidesPerView: 2.1,
                                },
                                700: {
                                    slidesPerView: 2.3,
                                },
                                768: {
                                    slidesPerView: 2.5,
                                },
                                825: {
                                    slidesPerView: 2.7,
                                },
                                910: {
                                    slidesPerView: 3,
                                },
                                975: {
                                    slidesPerView: 3.2,
                                },
                                1080: {
                                    slidesPerView: 3.5,
                                },
                                1160: {
                                    slidesPerView: 3.8,
                                },
                                1230: {
                                    slidesPerView: 4.05,
                                },
                            }}
                        >
                            {!data ? [...Array(4)].map((_, i) => {
                                    return (
                                        <SwiperSlide key={i} dir='ltr'
                                                     className={`relative select-none overflow-hidden flex flex-col items-stretch sm:gap-3 gap-4 sm:max-w-[302px] w-full h-[405px] sm:h-[528px] flex-shrink-0 rounded-lg md:p-6 p-4 bg-white`}>
                                            <Skeleton
                                                className="sm:max-w-[254px] max-w-[210px] w-full sm:h-[250px] h-[200px] flex-shrink-0 rounded-lg mix-blend-darken"/>
                                            <div className="grow flex flex-col gap-4 mt-4">
                                                <Skeleton className='rounded w-1/2 h-6 self-end'/>
                                                <Skeleton className='rounded w-1/4 h-6'/>
                                                <div className="flex items-center sm:gap-6 w-full">
                                                    <Skeleton
                                                        className='sm:text-base text-[12px] sm:h-12 h-8 flex-[1_0_0] sm:px-6 px-4 sm:py-4 py-2 rounded '/>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    )
                                })
                                : data?.map(p => {
                                    const timeDiscount = p.offPrice ? ((new Date(p?.off_date_to).getTime() - new Date().getTime()) / 1000).toFixed() : null
                                    return <SwiperSlide key={p.id}>
                                        <Link href={`/products/${p.id}`} dir='ltr'
                                              className={`relative transition-all select-none overflow-hidden flex flex-col items-center sm:gap-3 gap-1 sm:max-w-[302px] w-full flex-shrink-0 rounded-lg border border-natural_gray-100 hover:border-2 hover:border-primary-400 p-4 bg-white`}>
                                            <div
                                                className="centerOfParent sm:max-w-[254px] max-w-[210px] w-full sm:h-[300px] h-[200px] flex-shrink-0 rounded-lg mix-blend-darken">
                                                <Image
                                                    src={p.image}
                                                    alt="Responsive example"
                                                    width={0}
                                                    height={0} sizes='100vw'
                                                    className='w-full h-full object-cover'/>
                                            </div>
                                            <div className="grow w-full flex flex-col items-stretch justify-between">
                                                <h5 className='line-clamp-1 sm:text-base text-sm leading-6 text-right'
                                                    dir='rtl'>{p.name}</h5>
                                                <div className="w-full flex flex-col items-end" dir='rtl'>
                                                    {p.price !== p.offPrice && <div className="flex items-center gap-4">
                                                        <span
                                                            className='py-[2px] px-2 rounded-lg bg-red-50 text-red-600 sm:text-sm text-[12px] inline-block'>{Math.ceil(((p.price - p.offPrice) / p.price) * 100)}%</span>
                                                        <del
                                                            className={`text-red-300 sm:text-sm text-[12px] hasToman`}>{addComma(p.price)}</del>
                                                    </div>}
                                                    <p className='text-primary-700 sm:text-lg text-[12px] hasToman'>{addComma(p.offPrice || p.price)}</p>
                                                </div>
                                                {!!p.off_date_to && (timeDiscount < 86400) && <>
                                                    <Timer message='اتمام تخفیف' time={timeDiscount}/>
                                                </>}
                                                <div className="flex items-center sm:gap-6 gap-4 w-full mt-2">
                                                    <div
                                                        className='hover:bg-primary-500 hover:text-white duration-300 sm:text-base text-[12px] sm:h-12 h-8 flex-[1_0_0] sm:px-6 px-4 sm:py-4 py-2 rounded border-primary-500 sm:border-[1.5px] border text-primary-500 centerOfParent'>مشاهده
                                                    </div>
                                                </div>
                                            </div>
                                            <Chip className="absolute top-5 left-5" color="danger" size="sm">{Math.ceil(((p.price - p.offPrice) / p.price) * 100)}%</Chip>
                                        </Link>
                                    </SwiperSlide>
                                })}
                        </Swiper>
                    </div>
                </div>
            </div>
        </>
    );
};

export default React.memo(MostSell);