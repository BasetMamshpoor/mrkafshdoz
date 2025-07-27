import Link from 'next/link';
import style from './Product.module.css'
import addComma from 'Functions/addComma';
import Image from 'next/image';
import { useContext, useRef } from 'react';
import { PiDotsThreeOutlineVerticalFill, PiTrashLight, PiPencilSimpleLine } from "react-icons/pi";
import axios from 'axios';
import { Functions } from 'providers/FunctionsProvider';
import Cookies from 'js-cookie';
import { Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";

const Product = ({ id, name, price, offPercent, offPrice, image, is_available, setProducts, is_major }) => {
    const dots = useRef()

    const { SwalStyled } = useContext(Functions)

    const token = JSON.parse(Cookies.get('token'))
    const headers = { 'Content-Type': 'multipart/form-data', Authorization: `${token?.token_type} ${token?.access_token}` }


    const handleDelete = async () => {
        SwalStyled.fire({
            title: "از حذف محصول اطمینان دارید؟",
            text: 'با حذف محصول بازگردانی آن امکان پذیر نخواهد بود',
            showDenyButton: true,
            confirmButtonText: "حذف",
            denyButtonText: `لغو`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`/admin/products/${id}`, { headers })
                    .then(() => {
                        SwalStyled.fire({ title: '.حذف شد', text: '.محصول مورد نظر با موفقیت حذف شد', icon: 'success' })
                        setProducts(prev => {
                            const newProductsList = prev.filter(p => p.id !== id)
                            return newProductsList
                        })
                    }).catch(() => {
                        SwalStyled.fire('.حذف نشد', '.محصول مورد نظر با موفقیت حذف نشد', 'error')
                    })
            } else if (result.isDenied) {
                SwalStyled.fire("حذف لغو شد.", "", "info");
            }
        });
    }

    return (
        <>
            <div className={style.Xqera}>
                <Link href={`/${is_major ? 'wholesale' : 'products'}/${id}`}>
                    <div className={style.imgP}>
                        <Image placeholder='blur' blurDataURL='/Images/placeholder-1.png' width={0} height={0} sizes='100vw' className='w-full h-full object-cover' src={image} alt="" />
                    </div>
                    <div className={style.about}>
                        <div className={style.descP}>
                            <h3>{name}</h3>
                            <Chip color='primary'>{is_major ? 'عمده' : 'خرده'}</Chip>
                        </div>
                        {!is_major && (is_available ? <div className={style.priceP}>
                            <div className={style.Cpou}>
                                <span className={style.priceR}>{addComma(offPrice.toString())}</span>
                                {price !== offPrice && <span>%{(offPercent)}</span>}
                            </div>
                            {price !== offPrice && <del>{addComma(price.toString())}</del>}
                        </div> : <div className={style.etmamMojody}>
                            <b>ناموجود</b>
                        </div>)}
                    </div>
                </Link >
                <div className={style.option}>
                    <Dropdown placement='right-start'>
                        <DropdownTrigger>
                            <span className={style.dots}><PiDotsThreeOutlineVerticalFill /></span>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                            <DropdownItem
                                key="edit"
                                href={`/admin/product?tab=edit&id=${id}`}
                                classNames={{ title: "flex items-center gap-2" }}
                            >
                                <PiPencilSimpleLine />
                                ویرایش
                            </DropdownItem>
                            <DropdownItem
                                key="delete"
                                className="text-danger"
                                classNames={{ title: "flex items-center gap-2" }}
                                color="danger"
                                onPress={handleDelete}
                            >
                                <PiTrashLight />
                                حذف
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div >
        </>
    );
};

export default Product;