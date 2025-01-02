import useGetRequest from 'hooks/useGetRequest';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Skeleton } from '@nextui-org/react';
import { Categories } from 'providers/CategoriesProvider';

const MostSell = ({ }) => {
    const { categories } = useContext(Categories)
    const [data] = useGetRequest('/products/top-orders')
    return (
        <>
            <div className="lg:mb-[140px] sm:mb-20 mb-[60px]" dir='rtl'>
                <div className="max-w-[1280px] w-full mx-auto flex flex-col gap-4">
                    <div className="flex items-center justify-between px-4">
                        <div className="centerOfParent gap-4">
                            <p className='sm:text-xl font-semibold'>پرفروش ترین ها</p>
                        </div>
                        <Link href={`/category/${categories}?sort=bestselling`} className='centerOfParent sm:text-base text-xs gap-2 text-primary-600 whitespace-nowrap'>مشاهده همه <BiLeftArrowAlt className='w-5 h-5 fill-primary-600' /></Link>
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
                            {!!data ? [...Array(4)].map((_, i) => {
                                return (
                                    <SwiperSlide key={i} dir='ltr' className={`relative select-none overflow-hidden flex flex-col items-stretch sm:gap-3 gap-4 sm:max-w-[302px] w-full h-[405px] sm:h-[528px] flex-shrink-0 rounded-lg md:p-6 p-4 bg-white`}>
                                        <Skeleton className="sm:max-w-[254px] max-w-[210px] w-full sm:h-[250px] h-[200px] flex-shrink-0 rounded-lg mix-blend-darken" />
                                        <div className="grow flex flex-col gap-4 mt-4">
                                            <Skeleton className='rounded w-1/2 h-6 self-end' />
                                            <Skeleton className='rounded w-1/4 h-6' />
                                            <div className="flex items-center sm:gap-6 gap-4 sm:max-w-64 max-w-52 w-full">
                                                <Skeleton className="p-4 sm:w-[60px] w-11 sm:h-12 h-8 rounded-md" />
                                                <Skeleton className='sm:text-base text-xs sm:h-12 h-8 flex-[1_0_0] sm:px-6 px-4 sm:py-4 py-2 rounded ' />
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                                : data?.map(p => (
                                    <SwiperSlide key={p.id}>
                                        <div dir='ltr' className={`relative transition-all select-none overflow-hidden flex flex-col items-stretch sm:gap-3 gap-1 sm:max-w-[302px] w-full h-[405px] sm:h-[528px] flex-shrink-0 rounded-lg border border-natural_gray-100 hover:border-2 hover:border-primary-400 md:p-6 p-4 bg-white`}>
                                            <div className="centerOfParent sm:max-w-[254px] max-w-[210px] w-full sm:h-[250px] h-[200px] flex-shrink-0 rounded-lg mix-blend-darken">
                                                <Image
                                                    src={data.image}
                                                    alt="Responsive example"
                                                    width={0}
                                                    height={0} sizes='100vw'
                                                    className='w-full h-full object-contain' />
                                            </div>
                                            <div className="grow flex flex-col justify-between">
                                                <div className="flex items-center justify-between gap-1">
                                                    <p className='line-clamp-1 sm:text-lg text-sm leading-6' dir='rtl'>{data.title}</p>
                                                </div>
                                                <div className="w-full flex flex-col items-end" dir='rtl'>
                                                    {data.off_price && <div className="flex items-center gap-4">
                                                        <span className='py-[2px] px-3 rounded-lg bg-red-50 text-red-600 sm:text-lg text-xs inline-block'>{data.discount_percentage}%</span>
                                                        <del className={`${offRed ? 'text-red-300' : 'text-natural_gray-400 '} sm:text-base text-xs hasToman`}>{formatCurrency(data.price)}</del>
                                                    </div>}
                                                    <p className='text-primary-700 sm:text-2xl text-xs hasToman'>{formatCurrency(data.off_price || data.price)}</p>
                                                </div>
                                                {!!data.off_price && (timeDiscount < 86400) && <>
                                                    <Timer message='اتمام تخفیف' time={timeDiscount} />
                                                </>}
                                                <div className="flex items-center sm:gap-6 gap-4 sm:max-w-64 max-w-52 w-full">
                                                    <button onClick={handleClick} className="effect-2 centerOfParent bg-primary-500 p-4 sm:w-[60px] w-11 sm:h-12 h-8 rounded-md"><Cart className='fill-white' /></button>
                                                    <Link href={`/product/${data.id}`} className='effect-1 sm:text-base text-xs sm:h-12 h-8 flex-[1_0_0] sm:px-6 px-4 sm:py-4 py-2 rounded border-secondary-500 sm:border-[1.5px] border text-secondary-500 centerOfParent'>مشاهده</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </>
    );
};

export default React.memo(MostSell);