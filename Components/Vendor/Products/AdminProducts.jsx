import {useRef } from 'react';
import style from './AdminProducts.module.css'
import Products from './Products';
import createModal from 'Components/Modal';
import Filters from './Filters';
import SortByMobile from 'Components/Categories/SortByMobile';
import { useRouter } from 'next/router';
import MobileFilters from 'Components/MobileFilter';


const AdminProducts = () => {
    const router = useRouter()
    const total_Items = useRef()

    return (
        <>
            <div className={style.navbar}>
                <div className={style.options}>
                    <MobileFilters
                        button={<button type='button'
                            className={[style.filters_btn, style.btn].join(' ')}>فیلتر</button>}
                    >
                        <Filters />
                    </MobileFilters>
                    <button type='button'
                        onClick={() => createModal(<SortByMobile router={router} sort={router.query.sort} />)}
                        className={[style.sortBy_btn, style.btn].join(' ')}>مرتب سازی</button>
                </div>
                <div className={style.total_items} ref={total_Items}></div>
            </div>
            <Products total_Items={total_Items} />
        </>
    );
};

export default AdminProducts;