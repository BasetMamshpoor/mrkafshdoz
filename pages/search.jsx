import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import style from 'Components/ProductsPage/ProductList.module.css'
import Products from 'Components/Search/Products';
import Filters from 'Components/ProductsPage/Filters';
import useMediaQuery from 'hooks/useMediaQuery';
import createModal from 'Components/Modal';
import SortBy from 'Components/Categories/SortBy';
import SortByMobile from 'Components/Categories/SortByMobile';
import MobileFilters from 'Components/MobileFilter';

const Search = () => {
    const router = useRouter()
    const total_Items = useRef()
    const isMatch = useMediaQuery('(max-width: 1023.98px)')
    return (
        <>
            <section className={style.productList} dir="rtl">
                <div className="container my-10">
                    <div className='row'>
                        <div className='col-lg-3'>
                            {!isMatch && <Filters isAll />}
                        </div>
                        <div className={`${style.Lops} col-lg-9`}>
                            <div className={style.oLkvy}>
                                {!isMatch && <SortBy router={router} sort={router.query.sort} />}
                                {!!router && <div className={style.options}>
                                    <MobileFilters
                                        button={<button type='button'
                                            className={[style.filters_btn, style.btn].join(' ')}>فیلتر</button>}
                                    >
                                        <Filters isAll />
                                    </MobileFilters>
                                    <button type='button'
                                        onClick={() => createModal(<SortByMobile router={router} sort={router.query.sort} />)}
                                        className={[style.sortBy_btn, style.btn].join(' ')}>مرتب سازی</button>
                                </div>}
                                <div className={style.totalItems} ref={total_Items}></div>
                            </div>
                            <Products total_Items={total_Items} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Search;