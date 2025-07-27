import { BsPerson, BsBag, BsHeart, } from 'react-icons/bs';
import { GrLocation } from 'react-icons/gr';
import { FaRegCommentDots } from 'react-icons/fa';
import Address from 'Components/Profile/Address';
import Information from 'Components/Information';
import Orders from 'Components/Profile/Orders';
import Wishlist from 'Components/Profile/Wishlist';
import Comments from 'Components/CommentManagement/Comments';
import React from 'react'
let profileRoutes = [
    { link: '/profile/information', icon: <BsPerson />, name: 'اطلاعات حساب کاربری', component: <Information />, },
    { link: '/profile/orders', icon: <BsBag />, name: 'سفارشات', component: <Orders />, },
    { link: '/profile/wishlist', icon: <BsHeart />, name: 'لیست علاقه‌مندی', component: <Wishlist />, },
    { link: '/profile/address', icon: <GrLocation />, name: 'آدرس‌ها', component: <Address />, },
    { link: '/profile/comments', icon: <FaRegCommentDots />, name: 'دیدگاه‌ها', component: <Comments />, },
]
export { profileRoutes };