import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import Product from './shared/Product';
import useGetRequest from 'hooks/useGetRequest';
import style from './Products.module.css'
import { Pagination } from "@heroui/react";

const Products = ({ total_Items }) => {
    const router = useRouter()
    const { vendor, ...query } = router.query
    const [currentPage, setCurrentPage] = useState(1)
    const serializedQuery = JSON.stringify(query);

    const parsedQuery = JSON.parse(serializedQuery);
    const [products, setProducts, reload, pagination] = useGetRequest(`/products/all`, currentPage, parsedQuery)

    const handleReload = useCallback(() => {
        reload(Math.random());
    }, [serializedQuery]);

    useEffect(() => {
        handleReload();
    }, [handleReload]);

    useEffect(() => {
        total_Items.current.innerText = `${pagination ? (pagination.meta.total) : (0)} کالا`
    }, [pagination])

    return (
        <>
            {products && products.length ? <>
                <div className="flex flex-col gap-4">
                    <div className={style.productsList}>
                        {products.map(i => <Product key={i.id} {...i} setProducts={setProducts} reload={reload} />)}
                    </div>
                    <div dir="auto" className="centerOfParent mt-4">
                        {!!products.length && pagination.meta.last_page > 1 &&
                            <Pagination size='sm'
                                total={Math.ceil(pagination.meta.total / pagination.meta.per_page)}
                                color="primary"
                                page={currentPage}
                                onChange={setCurrentPage}
                                showControls
                            />}
                    </div>
                </div>
            </> : <div className='h-80 centerOfParent'>محصولی پیدا نشد لطفا فیلتر ها رو تغییر بدید.</div>}
        </>
    );
};

export default React.memo(Products);