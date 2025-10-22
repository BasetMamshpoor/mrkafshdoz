import React, { useContext, useMemo, useRef, useState } from 'react';
import style from './MobileNavbar.module.css'
import { BsPerson, BsSearch, BsHouse, BsCart, BsHouseFill, BsCartFill, BsPersonFill, BsArrowRight } from 'react-icons/bs'
import { MdCategory, MdOutlineCategory } from 'react-icons/md'
import { RiAdminFill, RiAdminLine } from "react-icons/ri";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CartContext } from 'providers/CartContextProvider';
import { e2p } from 'Functions/ConvertNumbers';
import { Categories } from 'providers/CategoriesProvider';
import { Authorization } from 'providers/AuthorizationProvider';
import { GiClothes } from 'react-icons/gi';
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    useDisclosure,
    Chip,
    Input,
} from "@heroui/react";
import axios from 'axios';
import addComma from 'Functions/addComma';
import { Functions } from 'providers/FunctionsProvider';

const MobileNavbar = () => {
    const searchInput = useRef(null)
    const router = useRouter()
    const push = router.push
    const path = router.asPath
    const { state } = useContext(CartContext)
    const { categories } = useContext(Categories)
    const { user, tokens } = useContext(Authorization)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [searchText, setSearchText] = useState("")
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const { SwalStyled } = useContext(Functions)

    let arr = [
        { route: '', iconOutline: <BsHouse />, iconeFill: <BsHouseFill />, value: 'خانه' },
        { route: 'products', iconOutline: <GiClothes />, iconeFill: <BsHouseFill />, value: 'اکسپلور' },
        { route: `category-${categories[0].slug}-apparel`, iconOutline: <MdOutlineCategory />, iconeFill: <MdCategory />, value: 'دسته بندی' },
        { route: 'checkout/cart', iconOutline: <BsCart />, iconeFill: <BsCartFill />, value: 'سبد خرید' },
        {
            route: !tokens ? 'auth/login' : user.is_admin ? 'admin' : 'profile',
            iconOutline: !tokens ? <BsPerson /> : user.is_admin ? <RiAdminLine /> : <BsPerson />,
            iconeFill: !tokens ? <BsPersonFill /> : user.is_admin ? <RiAdminFill /> : <BsPersonFill />,
            value: !!tokens ? 'صفحه من' : 'ورود'
        },
    ]

    const Menu = useMemo(() => {
        const startWith = path.split('/')[1]
        return arr.map((obj, i) => {
            let isActive = obj.route === startWith
            let isActive2 = (startWith.startsWith('category') ? startWith.slice(0, ('category').length) : false) ===
                (obj.route.startsWith('category') ? obj.route.slice(0, ('category').length) : '')
            return (
                <li className={style.item} key={i}>
                    <Link className={`${style.link} ${(isActive || isActive2) ? style.active : ''}`} href={`/${obj.route}`}>
                        <div className={style.menuIcone}>
                            {obj.iconOutline}
                            {obj.route === 'checkout/cart' && state.itemsCounter > 0 &&
                                <div className={style.itemsCounter}><span className='-mb-1'>{e2p(state.itemsCounter)}</span></div>}
                        </div>
                        <span className={style.name}>{obj.value}</span>
                    </Link>
                </li>
            )
        })
    }, [router.asPath])

    const HandelSearch = async (e) => {
        e.preventDefault()
        if (!searchText.trim()) SwalStyled.fire("", 'چیزی برای جستوجو وجود ندارد')
        if (searchText.trim().length < 3) SwalStyled.fire("", 'حداقل 3 حرف وارد کنید')
        else {
            setSearchText('')
            push(`/search?text=${searchText}`);
            setLoading(false)
            setData([])
            onOpenChange(false)
        }
    }
    const handleChange = async (e) => {
        const { value } = e.target
        setSearchText(value)
        if (value.trim().length < 3)
            return
        if (value.length) {
            setLoading(true)
            clearTimeout(searchInput.current);
            searchInput.current = setTimeout(async () => {
                await axios.get(`q_search?query=${value}`)
                    .then(res => {
                        setData(res.data)
                        setLoading(false)
                    })
                    .catch(err => {
                        SwalStyled.fire({
                            title: "انجام نشد",
                            text: err.response?.data.message || 'نتیجه ای پیدا نشد',
                            icon: "error",
                        })
                        setLoading(false)
                    })
            }, 1000);
        } else setData([])
    }
    return (
        <div >
            <header className={style.header}>
                <div className={style.navbar}>
                    <div className={style.search} onClick={onOpen}>
                        <div className={style.content}>
                            <div className={style.searchIcon}><BsSearch /></div>
                            <span className={style.placeholder}>
                                <span className='whitespace-nowrap'>جستجو در</span>
                                <div className={style.mobileLogo}>
                                    <Image
                                        src='/Images/logo.png'
                                        alt="Logo"
                                        width={100} height={100}
                                        sizes='100vw'
                                        className='w-full h-full object-contain' />
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
            <Drawer isOpen={isOpen}
                classNames={{ wrapper: 'z-[9999]' }}
                onOpenChange={onOpenChange}>
                <DrawerContent>
                    {(onClose) => (
                        <>
                            <DrawerHeader className="px-2">جستوجو</DrawerHeader>
                            <DrawerBody className='px-0 flex flex-col gap-6'>
                                <form
                                    onSubmit={HandelSearch}>
                                    <Input
                                        classNames={{
                                            base: 'px-2',

                                        }}
                                        radius='sm'
                                        startContent={
                                            <BsArrowRight onClick={onClose} className='fill-primary' />
                                        }
                                        value={searchText}
                                        onChange={handleChange}
                                        placeholder="جستجو ..."
                                        variant="bordered"
                                    />
                                </form>
                                {(loading || !!data) && <div id="absolute"
                                    className="w-full bg-white text-black overflow-hidden" dir="rtl">
                                    {loading ? <p className="p-3 text-sm">در حال بارگزاری ...</p> :
                                        !!(data.length)
                                            ? <div className="flex flex-col overflow-y-auto">
                                                {data.map(r => {
                                                    return <Link key={r.id} href={`/products/${r.id}`} onClick={onClose} className="w-full border-b px-2 cursor-pointer hover:bg-slate-100 duration-200">
                                                        <div className="text-sm flex items-stretch gap-2 p-2">
                                                            <div className="centerOfParent max-w-[64px] h-fit max-h-32 overflow-hidden rounded-lg">
                                                                <Image placeholder='blur' blurDataURL='/Images/placeholder-1.png' width={0} height={0} sizes='100vw' className='w-full h-full object-cover' src={r.image} alt={r.name} />
                                                            </div>
                                                            <div className="flex flex-col w-full p-2">
                                                                <p className="grow line-clamp-1">{r.name}</p>
                                                                {!!r.is_major && <Chip color="primary" size="sm">عمده</Chip>}
                                                                {!r.is_major && <div className='self-end space-y'>
                                                                    <div className="flex justify-between items-center w-full gap-3">
                                                                        {r.price !== r.offPrice && <span className="bg-red-500 text-white rounded p-1 text-xs">%{r.offPercent}</span>}
                                                                        <span className='font-semibold hasToman self-end'>{addComma(r.offPrice.toString())}</span>
                                                                    </div>
                                                                    {r.price !== r.offPrice && <del className="block text-left text-gray-500 w-full">{addComma(r.price.toString())}</del>}
                                                                </div>}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                })}
                                                {!!(data.length > 5) &&
                                                    <div onClick={HandelSearch} className="w-full py-4 px-3 line-clamp-1 cursor-pointer hover:bg-slate-100 duration-200">
                                                        <p className="text-sm italic text-center gap-2">
                                                            دیدن تمام نتایج
                                                        </p>
                                                    </div>}
                                            </div>
                                            : searchText.length > 0 && <p className="p-3 text-sm">نتیجه ای پیدا نشد</p>
                                    }
                                </div>}
                            </DrawerBody>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default MobileNavbar;