import React, { useContext, useEffect, useState } from 'react';
import { AxiosPublic } from '../../../config/axios';

import useAxios from 'hooks/useAxios';
import { Functions } from 'providers/FunctionsProvider';
import Link from 'next/link';
import { useRouter } from 'next/router';

const RemovePaint = () => {
    const { query } = useRouter();
    const { id } = query;

    const { SwalStyled } = useContext(Functions)
    const { AxiosPrivate } = useAxios()
    const [data, setData] = useState()

    useEffect(() => {
        if (!!id) {
            let event = {
                preventDefault: () => { },
                target: [{ value: id }]
            }
            handleSearch(event)
        }
    }, [])

    const handleSearch = async event => {
        event.preventDefault()
        const value = event.target[0].value
        await AxiosPublic.get(`products/show/${value}`)
            .then(res => {
                setData(res.data.data)
                event.target[0].value = ''
            }).catch(err => SwalStyled.fire("", `محصول با آیدی${value}پیدا نشد`))
    }

    const handleDelete = async () => {
        SwalStyled.fire({
            title: "از حذف محصول اطمینان دارید؟",
            text: 'با حذف محصول بازگردانی آن امکان پذیر نخواهد بود',
            showDenyButton: true,
            confirmButtonText: "حذف",
            denyButtonText: `لغو`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await AxiosPrivate.delete(`/admin/products/${id}`)
                    .then(() => {
                        SwalStyled.fire({ title: '.حذف شد', text: '.محصول مورد نظر با موفقیت حذف شد', icon: 'success' })
                        setData(null)
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
            <div className="w-full">
                <div className="flex items-center justify-end">
                    <form className='flex items-center relative' onSubmit={handleSearch}>
                        <div className='h-[40px] rounded border border-gray-400 p-1 centerOfParent pl-8'>
                            <input className='appearance-none w-full h-full px-2 py-1.5 outline-none focus:outline-none border-0' type="number" placeholder='آیدی محصول' defaultValue={id} />
                        </div>
                        <button className='centerOfParent bg-white outline-none focus:outline-none border-0 absolute left-2'>
                            <svg className="fill-gray-400" stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M15.504 13.616l-3.79-3.223c-0.392-0.353-0.811-0.514-1.149-0.499 0.895-1.048 1.435-2.407 1.435-3.893 0-3.314-2.686-6-6-6s-6 2.686-6 6 2.686 6 6 6c1.486 0 2.845-0.54 3.893-1.435-0.016 0.338 0.146 0.757 0.499 1.149l3.223 3.79c0.552 0.613 1.453 0.665 2.003 0.115s0.498-1.452-0.115-2.003zM6 10c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"></path></svg></button>
                    </form>
                </div>
                {!!data && <div className='flex flex-col gap-4 items-center'>
                    <center>
                        <img
                            src={data.product.image}
                            alt="Preview"
                            className="object-cover w-64 h-auto rounded-lg border p-3"
                        />
                        <p className='mt-4'>{data.product.name}</p>
                    </center>
                    <Link target='_blank' className='text-blue-700' href={`/product/${data.id}`}>{data.id ? `/product/${data.id}` : ''}</Link>
                    <button onClick={handleDelete} type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">حذف</button>
                </div>}
            </div>
        </>
    );
};

export default RemovePaint;