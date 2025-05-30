import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import InfiniteScroll from 'Components/InfiniteScroll';
import useGetRequest from 'hooks/useGetRequest';
import { getAllProductsSearch } from 'api/products';
import style from './Products.module.css'
import Product from 'Components/ProductsPage/shared/Product';

const Products = ({ total_Items }) => {
    const router = useRouter()
    const { text,...other } = router.query
    const serializedQuery = JSON.stringify(other);

    const parsedQuery = JSON.parse(serializedQuery);
    const [products, setProducts, reload, pagination, setPagination] = useGetRequest(`/search?query=${text}`, 1, parsedQuery)

    const handleReload = useCallback(() => {
        reload(Math.random());
    }, [serializedQuery]);

    useEffect(() => {
        handleReload();
    }, [handleReload]);

    useEffect(() => {
        total_Items.current.innerText = `${pagination ? (pagination.meta.total) : (0)} کالا`
    }, [pagination])

    const loadMoreItems = async (page) => {
        const products = await getAllProductsSearch(router.query, page)
        if (!!products) {
            setProducts(prev => {
                return prev.concat(products.data)
            })
            const { data, ...pagination } = products
            setPagination(pagination)
        }
        return true
    }

    return (
        <>
            {products && products.length ? <div>
                <InfiniteScroll
                    loadMoreItems={loadMoreItems}
                    isEnd={pagination.links.next ? false : true}
                    dataLength={products.length}
                    pageStart={1}
                    className={style.productsList}
                >
                    {products.map(i => <Product key={i.id} {...i} />)}
                </InfiniteScroll>
            </div> : <p>محصولی پیدا نشد لطفا فیلتر ها رو تغییر بدید.</p>}
        </>
    );
};

export default React.memo(Products);