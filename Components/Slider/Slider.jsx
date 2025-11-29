import React from 'react';
import {Pagination, Autoplay, Navigation} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css/pagination';
import 'swiper/css/navigation'
import 'swiper/css/autoplay';
import 'swiper/css';
import Image from 'next/image';
import Link from 'next/link';

const Slider = ({data}) => {
    return (
        <>
            <section className="main_slider">
                <div className="containerCustom">
                    <div className="main_slide">
                        <Swiper
                            navigation
                            modules={[Pagination, Autoplay, Navigation]}
                            loop
                            speed={300}
                            spaceBetween={0}
                            slidesPerView={1}
                            pagination={{clickable: true}}
                            autoplay={{disableOnInteraction: false, delay: 6000, reverseDirection: true}}
                        >
                            {!!data && data.reverse().map(el => {
                                return (
                                    <SwiperSlide key={el.id}>
                                        <div>
                                            <Link href={el.link}>
                                                <Image placeholder='blur' blurDataURL='/Images/placeholder-1.png'
                                                       width={0} height={0} sizes='100vw'
                                                       className='w-full h-full object-cover' src={el.src} alt="کفش"/>
                                            </Link>
                                        </div>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                </div>
            </section>
        </>
    );
};

export default React.memo(Slider);