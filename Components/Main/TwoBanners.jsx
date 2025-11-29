import React from 'react';
import style from './TwoBanners.module.css'
import Link from 'next/link';
import Image from 'next/image';


const TwoBanners = ({data: banners}) => {

    return (
        <>
            <div className={style.Banner}>
                <div className="container !px-4">
                    <div className={style.wrapper}>
                        {banners && banners.map((b, i) => {
                            if (i < 2)
                                return (
                                    <div className={style.baner} key={b.id}>
                                        <Link href={b.link} className={style.link}>
                                            <Image
                                                src={b.src} placeholder='blur'
                                                blurDataURL='/Images/placeholder-1.png' width={0} height={0}
                                                sizes='100vw'
                                                className='w-full h-full object-cover hover:scale-105 duration-300'
                                                alt='کفش'/>
                                        </Link>
                                    </div>)
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default TwoBanners;