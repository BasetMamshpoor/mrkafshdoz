// app/components/shared/Blog.jsx
import {useRouter} from 'next/router';
import style from "../Products/shared/Product.module.css";
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@heroui/react";
import {PiDotsThreeOutlineVerticalFill, PiPencilSimpleLine, PiTrashLight} from "react-icons/pi";
import {useContext} from "react";
import {Functions} from "../../../providers/FunctionsProvider";
import Cookies from "js-cookie";
import axios from "axios";

const Blog = ({id, title, image,setBlogs}) => {
    const {SwalStyled} = useContext(Functions)

    const token = JSON.parse(Cookies.get('token'))
    const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: `${token?.token_type} ${token?.access_token}`
    }


    const handleDelete = async () => {
        SwalStyled.fire({
            title: "از حذف وبلاگ اطمینان دارید؟",
            text: 'با حذف وبلاگ بازگردانی آن امکان پذیر نخواهد بود',
            showDenyButton: true,
            confirmButtonText: "حذف",
            denyButtonText: `لغو`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`/blogs/${id}`, {headers})
                    .then(() => {
                        SwalStyled.fire({title: '.حذف شد', text: '.وبلاگ مورد نظر با موفقیت حذف شد', icon: 'success'})
                        setBlogs(prev => {
                            const newProductsList = prev.filter(p => p.id !== id)
                            return newProductsList
                        })
                    }).catch(() => {
                        SwalStyled.fire('.حذف نشد', '.وبلاگ مورد نظر با موفقیت حذف نشد', 'error')
                    })
            } else if (result.isDenied) {
                SwalStyled.fire("حذف لغو شد.", "", "info");
            }
        });
    }
    return (
        <div className={style.Xqera}>
            <img
                src={image}
                alt={title}
                className="w-full h-48 object-cover rounded-md mb-4"
                onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x200';
                }}
            />
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <div className={style.option}>
                <Dropdown placement='right-start'>
                    <DropdownTrigger>
                        <span className={style.dots}><PiDotsThreeOutlineVerticalFill/></span>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        <DropdownItem
                            key="edit"
                            href={`/admin/blogs?tab=edit&id=${id}`}
                            classNames={{title: "flex items-center gap-2"}}
                        >
                            <PiPencilSimpleLine/>
                            ویرایش
                        </DropdownItem>
                        <DropdownItem
                            key="delete"
                            className="text-danger"
                            classNames={{title: "flex items-center gap-2"}}
                            color="danger"
                            onPress={handleDelete}
                        >
                            <PiTrashLight/>
                            حذف
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    );
};

export default Blog;