import React from 'react';
import style from './Banner.module.css'
import Link from 'next/link';
import Image from 'next/image';
import useGetRequest from 'hooks/useGetRequest';
const Banner = () => {
    const [banners] = useGetRequest('/banners', 1, { type: 'homepage', order: 0 })
    return (
        <>
            <div className={style.Banner}>
                <div className="container">
                    <div className='grid items-center grid-cols-2 gap-2 md:grid-cols-4'>
                        {banners && banners.map(b => {
                            return (<Link href={b.link} className='flex items-center justify-center rounded-lg overflow-hidden h-fit w-full max-h-[calc(100vw*calc(9/16))]' key={b.id}>
                                <Image src={b.src} placeholder='blur' blurDataURL='/Images/placeholder-1.png' unoptimized={true} width={0} height={0} sizes='100vw' className='w-full h-full object-cover' alt='' />
                            </Link>)
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;