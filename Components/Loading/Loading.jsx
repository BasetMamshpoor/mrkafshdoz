import Image from 'next/image';
import style from './Loading.module.css'
import Logo from 'public/Images/logo.png'
import { useEffect } from 'react';
const Loading = () => {
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => document.body.style.overflow = 'auto'
    }, [])

    return (
        <>
            <div className={style.loading}>
                <div className={style.box}>
                    <div className={style.logo}>
                        <Image width={100} height={100}
                         sizes='100vw' className='w-full h-full object-contain' src={Logo} alt='loading' /></div>
                    <div className={style.loader}></div>
                </div>
            </div>
        </>
    );
};

export default Loading;