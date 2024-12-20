import React, { useContext, useMemo } from 'react';
import style from './MobileNavbar.module.css'
import { BsPerson, BsSearch, BsHouse, BsCart, BsHouseFill, BsCartFill, BsPersonFill } from 'react-icons/bs'
import { MdCategory, MdOutlineCategory } from 'react-icons/md'
import { RiAdminFill, RiAdminLine } from "react-icons/ri";
import Logo from 'public/Images/logo-no-background-transformed.png'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CartContext } from 'providers/CartContextProvider';
import { e2p } from 'Functions/ConvertNumbers';
import { Categories } from 'providers/CategoriesProvider';
import { Authorization } from 'providers/AuthorizationProvider';


const MobileNavbar = () => {
    const router = useRouter()
    const path = router.asPath
    const { state } = useContext(CartContext)
    const { categories } = useContext(Categories)
    const { user, tokens } = useContext(Authorization)

    const Menu = useMemo(() => {
        let arr = [
            { route: '', iconOutline: <BsHouse />, iconeFill: <BsHouseFill />, value: 'خانه' },
            { route: `category-${categories[0].slug}-apparel`, iconOutline: <MdOutlineCategory />, iconeFill: <MdCategory />, value: 'دسته بندی' },
            { route: 'checkout/cart', iconOutline: <BsCart />, iconeFill: <BsCartFill />, value: 'سبد خرید' },
            {
                route: !tokens ? 'auth/login' : user?.is_admin ? 'admin' : 'profile',
                iconOutline: !tokens ? <BsPerson /> : user?.is_admin ? <RiAdminLine /> : <BsPerson />,
                iconeFill: !tokens ? <BsPersonFill /> : user?.is_admin ? <RiAdminFill /> : <BsPersonFill />,
                value: !!tokens ? 'صفحه من' : 'ورود'
            },
        ]
        const startWith = path.split('/')[1]
        return arr.map((obj, i) => {
            let isActive = obj.route === startWith
            let isActive2 = (startWith.startsWith('category') ? startWith.slice(0, ('category').length) : false) ===
                (obj.route.startsWith('category') ? obj.route.slice(0, ('category').length) : '')
            return (
                <li className={style.item} key={i}>
                    <Link className={`${style.link} ${(isActive || isActive2) ? style.active : ''}`} href={`/${obj.route}`}>
                        <div className={style.menuIcone}>
                            {/* {(isActive || isActive2) ? obj.iconeFill : obj.iconOutline} */}
                            {obj.route === '/cart' && state.itemsCounter > 0 &&
                                <div className={style.itemsCounter}><span>{e2p(state.itemsCounter)}</span></div>}
                        </div>
                        <span className={style.name}>{obj.value}</span>
                    </Link>
                </li>
            )
        })
    }, [router.asPath])

    return (
        <>
            <header className={style.header}>
                <div className={style.navbar}>
                    <div className={style.search}>
                        <div className={style.content}>
                            <div className={style.searchIcon}><BsSearch /></div>
                            <span className={style.placeholder}>
                                <span>جستجو در</span>
                                <div className={style.mobileLogo}>
                                    <Image src={Logo.src} alt="Logo" width={100} height={100} />
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </header>
            <section className={style.menu}>
                <div className={style.Exune}>
                    <ul className={style.wrapper}>
                        {Menu}
                    </ul>
                </div>
            </section>
        </>
    );
};

export default MobileNavbar;