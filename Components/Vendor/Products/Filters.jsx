import Dropdown from 'Components/Dropdown/DropDown';
import useGetRequest from 'hooks/useGetRequest';
import React, { useEffect, useState } from 'react';
import style from './Filters.module.css'
import { IoChevronDownOutline } from 'react-icons/io5'
import { Checkbox, CheckboxGroup, Switch } from "@heroui/react";
import CategoryFilter from 'Components/ProductsPage/CafegoryFilter';
import { useRouter } from 'next/router';

const Filters = ({ setIsOpen }) => {
    const router = useRouter()
    const [filters, setFilters] = useState({})
    const [data] = useGetRequest(`/products/all/getfilters`)

    useEffect(() => {
        if (router?.isReady) setFilters(readUrl())
    }, [router])

    const makeFilter = (filter) => {
        let array = [];
        for (const i of data[filter]) {
            array.push(i)
        }
        return array
    }

    const readUrl = () => {
        let object = {};
        for (const name in router.query) {
            if (Object.hasOwnProperty.call(router.query, name)) {
                let filter = []
                const value = router.query[name];
                const newValue = value.split('-')
                newValue.forEach((f, i) => {
                    filter.push({ name: f, value: i })
                })
                object[name] = filter
            }
        }
        return object
    }

    const changeUrl = (name, value) => {
        console.log(router.query);
        let str = null;
        !!Array.isArray(value) ? value.forEach((f, i) => {
            if (i > 0) {
                str = str + '-' + f.name
            } else if (i === 0) {
                str = f.name
            } else {
                str = null
            }
        }) : str = value
        if (str === null) {
            const { [name]: O, vendor, ...query } = router.query
            router.replace({ pathname: router.asPath.split('?')[0], query: { ...query }, },
                undefined,
                { shallow: true }
            );
        } else {
            const { vendor, ...query } = router.query

            router.replace({ pathname: router.asPath.split('?')[0], query: { ...query, [name]: str }, },
                undefined,
                { shallow: true }
            );
        }
    }

    const clearFilters = () => {
        router.replace(router.asPath.split('?')[0]);
        if (!!setIsOpen) setIsOpen(false)
    }

    return (
        <>
            {!!data ? <div className={style.filters}>
                <div className={style.header}>
                    <p className={style.Rwxaq}>فیلتر ها</p>
                    <span className={style.clearFilters} onClick={clearFilters}>حذف فیلترها</span>
                </div>
                <div className={style.yqgi}>
                    <div className={style.typeF}>
                        <input className={style.checkprice} type="checkbox" id="category" hidden />
                        <label className={style.dropdownL} htmlFor="category"><p>دسته بندی</p><span><IoChevronDownOutline /></span></label>
                        <div className={style.CrWx}>
                            <CategoryFilter defaultValue={filters.category} setFilters={changeUrl} />
                        </div>
                    </div>
                </div>
                <Dropdown
                    array={makeFilter('brands')} defaultValue={filters.brands}
                    Multiple Searchable placeHolder='برند' setState={changeUrl} name='brands' towLabel
                    styleBox={{ padding: 'calc(.75rem + 10px) 12px', borderBottom: '1px solid #ddd' }} />
                <Dropdown
                    array={makeFilter('colors')} defaultValue={filters.colors}
                    Multiple Searchable placeHolder='رنگ' setState={changeUrl} name='colors' colorInLabel
                    styleBox={{ padding: 'calc(.75rem + 10px) 12px', borderBottom: '1px solid #ddd' }} />
                <Dropdown
                    array={makeFilter('sizes')} defaultValue={filters.sizes}
                    Multiple Searchable placeHolder='سایز' setState={changeUrl} name='sizes' label
                    styleBox={{ padding: 'calc(.75rem + 10px) 12px', borderBottom: '1px solid #ddd' }} />
                <CheckboxGroup
                    orientation="horizontal"
                    value={[]}
                    classNames={{ base: 'w-full border-b py-6' }}>
                    <Checkbox
                        isSelected={filters['is_major'] ? true : false}
                        onChange={e => e ? changeUrl('is_major', true) : changeUrl('is_major', null)}
                        value='major'>فقط عمده</Checkbox>
                    <Checkbox
                        isSelected={filters['non_major'] ? true : false}
                        onChange={e => e ? changeUrl('non_major', true) : changeUrl('non_major', null)}
                        value='non_major'>فقط خرده</Checkbox>
                </CheckboxGroup>
                <div className={style.discount}>
                    <div className={style.dis_field}>
                        <label htmlFor="discountField">
                            فقط تخفیف دار
                        </label>
                        <Switch isSelected={filters['discount'] ? true : false} onValueChange={checked => checked ? changeUrl('discount', true) : changeUrl('discount', null)} color='success' />
                    </div>
                </div>
            </div> : <p>... درحال‌ بارگذاری</p>}
        </>
    );
};

export default React.memo(Filters);