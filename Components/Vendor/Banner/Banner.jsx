import React, { useContext } from 'react';
import style from './Banner.module.css'
import createModal from 'Components/Modal';
import { FiEdit3 } from "react-icons/fi";
import Image from 'next/image';
import NewBanner from './NewBanner';
import useGetPrivatRequest from 'hooks/useGetPrivatRequest';
import { Functions } from 'providers/FunctionsProvider'
import Loading from 'Components/Loading';
const Banner = () => {
    const [banners, setBaneers, reload] = useGetPrivatRequest('/admin/banners', 1, { type: 'homepage' })
    const { SwalStyled } = useContext(Functions)

    const firstLine = !!banners ? banners.filter(b => b.order === 0) : null
    const secondLine = !!banners ? banners.filter(b => b.order === 1) : null

    return (
        <>
            <div className={style.Banner}>
                <div className={style.content}>
                    <div className={style.header}>
                        <h3>بنر های صفحه اصلی</h3>
                    </div>
                    <div className={style.title}>
                        <p>ردیف اول</p>
                    </div>
                    <div className={style.banners}>
                        {!!firstLine ? firstLine.map(b => {
                            return (
                                <div key={b.id} className={style.banner} onClick={() => createModal(<NewBanner data={b} reload={reload} SwalStyled={SwalStyled} />)}>
                                    <div className='flex items-center justify-center w-full h-full cursor-pointer'>
                                        <Image placeholder='blur' blurDataURL='/Images/placeholder-1.png' width={0} height={0} sizes='100vw' className='w-full h-full object-cover' src={b.src} alt="" />
                                    </div>
                                    <span className={style.option}><FiEdit3 /></span>
                                </div>)
                        }) : <Loading />}
                    </div>
                    <div className={style.title}>
                        <p>ردیف دوم</p>
                    </div>
                    <div className={style.banners}>
                        {!!secondLine ? secondLine.map(b => {
                            return (
                                <div key={b.id} className={style.lgBanner} onClick={() => createModal(<NewBanner data={b} reload={reload} SwalStyled={SwalStyled} />)}>
                                    <div className='flex items-center justify-center w-full h-full cursor-pointer'>
                                        <Image placeholder='blur' blurDataURL='/Images/placeholder-1.png' width={0} height={0} sizes='100vw' className='w-full h-full object-cover' src={b.src} alt="" />
                                    </div>
                                    <span className={style.option}><FiEdit3 /></span>
                                </div>)
                        }) : <Loading />}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;