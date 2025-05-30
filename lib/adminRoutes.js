import { GiClothes, GiKnightBanner } from 'react-icons/gi'
import { LuBoxes } from "react-icons/lu";
import { MdSettings,MdOutlineWebStories  } from 'react-icons/md'
import { BsCart3, BsBuilding, BsCashCoin } from 'react-icons/bs'
import { FiSliders } from 'react-icons/fi';
import { BiCategory, BiSolidCommentCheck } from 'react-icons/bi';
import Slider from 'Components/Vendor/Slider';
import Brands from 'Components/Vendor/Brands';
import Category from 'Components/Vendor/Category';
import Banner from 'Components/Vendor/Banner';
import ProductTab from 'Components/Vendor/Option_Product';
import Comments from 'Components/CommentManagement/Comments';
import React from 'react'
import Orders from 'Components/Vendor/Orders';
import Information from 'Components/Information';
import WholeSaletab from 'Components/Vendor/Majors';
import Cash from 'Components/Vendor/Cash';
import Stories from "../Components/Vendor/Stories";

let adminRoutes = [
    { link: 'orders', icon: <BsCart3 />, name: 'سفارشات', component: <Orders /> },
    { link: 'major', icon: <LuBoxes />, name: 'سفارشات عمده', component: <WholeSaletab /> },
    { link: 'product', icon: <GiClothes />, name: 'مدیریت محصولات', component: <ProductTab />, },
    { link: 'category', icon: <BiCategory />, name: 'دسته بندی', component: <Category />, },
    { link: 'brands', icon: <BsBuilding />, name: 'برندها', component: <Brands />, },
    { link: 'slider', icon: <FiSliders />, name: 'اسلایدر', component: <Slider />, },
    { link: 'banners', icon: <GiKnightBanner />, name: 'بنرها', component: <Banner />, },
    { link: 'stories', icon: <MdOutlineWebStories  />, name: 'استوری ها', component: <Stories />, },
    { link: 'cash', icon: <BsCashCoin />, name: 'مالی', component: <Cash />, },
    { link: 'comments', icon: <BiSolidCommentCheck />, name: 'نظرات', component: <Comments /> },
    { link: 'setting', icon: <MdSettings />, name: 'تغییر مشخصات', component: <Information /> },
]
export { adminRoutes }