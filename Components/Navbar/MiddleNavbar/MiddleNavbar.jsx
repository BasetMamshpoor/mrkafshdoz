import { useContext } from 'react';
import style from './MiddleNavbar.module.css'
import { BsCart3, BsPerson } from 'react-icons/bs'
import { RiAdminLine } from "react-icons/ri";
import Link from 'next/link';
import { e2p } from 'Functions/ConvertNumbers';
import { CartContext } from 'providers/CartContextProvider';
import Image from 'next/image';
import { Authorization } from 'providers/AuthorizationProvider';

const MiddleNavbar = () => {

    const { state } = useContext(CartContext)
    const { user, tokens } = useContext(Authorization)

    return (
        <>
            <section className='relative bg-main'>
                <div className='container'>
                    <div className={style.navSearchTop}>
                        <div className={style.user}>
                            <Link href={!tokens ? '/auth/login' : user.is_admin ? '/admin/orders' : '/profile'} className={style.navUser}>
                                {!tokens ? <BsPerson className='fill-white' /> : user.is_admin ? < RiAdminLine className='fill-white' /> : <BsPerson className='fill-white' />}
                            </Link>
                            <div className={style.border}></div>
                            <Link href='/checkout/cart' className={style.navCart}>
                                <div className={style.countItem}>
                                    <span>{!!state.itemsCounter && e2p(state.itemsCounter)}</span>
                                </div >
                                <BsCart3 className='fill-white' />
                            </Link>
                        </div>
                        <div className={style.navLogo}>
                            <Link href='/' className='lg:w-[460px] lg:h-[126px] w-[130px] h-[63px] overflow-hidden centerOfParent'>
                                <Image src='/Images/logo-white.png' alt="Logo" width='100' height='100' sizes='100vw' className='w-full h-full object-contain' />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default MiddleNavbar;