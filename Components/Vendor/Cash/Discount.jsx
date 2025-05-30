import React, { useEffect, useRef, useState } from 'react';
import { Pagination } from "@heroui/react";
import DiscountOption from './DiscountOption';
import useAxios from '../../../hooks/useAxios';

const Discount = () => {
    const { AxiosPrivate } = useAxios()
    const [currentPage, setCurrentPage] = useState(1)
    const pagination = useRef()
    const [data, setData] = useState([])
    const [query, setQuery] = useState('')
    const [filter, setFilter] = useState('')
    const [reload, setReload] = useState()

    useEffect(() => {
        const get = async () => {
            await AxiosPrivate.get(`discount?filter=${filter}&title=${query}&page=${currentPage}`)
                .then(({ data }) => {
                    setData(data.data.data)
                    pagination.current = data ? Math.ceil(data.data.total / data.data.per_page) : 1
                }).catch(err => alert(err.response?.data.message || 'مشکلی به وجود آمده با پشتیبانی تماس بگیرید'))
        }
        get()
    }, [query, reload, currentPage])

    const handleSearch = async event => {
        event.preventDefault()
        const value = event.target[0].value
        setQuery(value)
    }

    const handleDelete = async (id) => {
        if (window.confirm("آیا از حذف این کدتخفیف اطمینان دارید")) {
            await AxiosPrivate.delete(`discount/delete/${id}`)
                .then(res => {
                    setData(prev => {
                        const state = prev.filter(c => c.id !== id)
                        return state
                    })
                    alert(res.data.message)
                }).catch(err => alert(err.response?.data.message || 'مشکلی رخ داده است'))
        }
    }

    return (
        <>
            <div className="mb-4 flex items-center justify-between mx-4 sm:mx-0">
                <div className='flex items-center gap-4 w-96'>
                    <form className='relative md:w-full w-44' onSubmit={handleSearch}>
                        <div className='rounded border border-gray-400 pr-1 centerOfParent pl-8 w-full'>
                            <input className='appearance-none w-full h-full px-2 py-1.5 outline-none focus:outline-none border-0' type="text" placeholder='جستجو' />
                        </div>
                        <button className='centerOfParent bg-white outline-none focus:outline-none border-0 absolute left-2 top-1/2 -translate-y-1/2'>
                            <svg className="fill-gray-400" stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M15.504 13.616l-3.79-3.223c-0.392-0.353-0.811-0.514-1.149-0.499 0.895-1.048 1.435-2.407 1.435-3.893 0-3.314-2.686-6-6-6s-6 2.686-6 6 2.686 6 6 6c1.486 0 2.845-0.54 3.893-1.435-0.016 0.338 0.146 0.757 0.499 1.149l3.223 3.79c0.552 0.613 1.453 0.665 2.003 0.115s0.498-1.452-0.115-2.003zM6 10c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"></path></svg></button>
                    </form>
                </div>
                <DiscountOption setReload={setReload} />
            </div>
            <div className="w-full">
                {!!data.length && <ul className='flex flex-wrap gap-x-2'>
                    {data.map(c => {
                        return (
                            <li key={c.id} className='group relative flex items-center sm:max-w-[49%] max-w-full w-full my-2 p-3 shadow-lg border rounded-lg'>
                                <span>{c.title}</span>
                                <div className='absolute opacity-0 flex left-2 items-center gap-2 group-hover:opacity-100 duration-300'>
                                    <DiscountOption edit={true} data={c} setReload={setReload} />
                                    <div onClick={() => handleDelete(c.id)} className='hover:bg-gray-300 cursor-pointer duration-250 rounded-full p-1'><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></div>
                                </div>
                            </li>
                        )
                    })}
                </ul>}
            </div>
            <div dir="auto" className="centerOfParent mt-4">
                {!!data.length && pagination.current > 1 &&
                    <Pagination size='sm'
                        total={Math.ceil(pagination.current)}
                        color="primary"
                        page={currentPage}
                        onChange={(e) => { setCurrentPage(e) }}
                        showControls
                    />}
            </div>
        </>
    );
};

export default Discount;