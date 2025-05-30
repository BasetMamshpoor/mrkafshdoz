import React, { useState } from 'react';
import style from './CategoryFilter.module.css'
import { BiChevronDown } from 'react-icons/bi';
import useGetRequest from 'hooks/useGetRequest';

const CategoryFilter = ({ defaultValue, setFilters }) => {
    const [categoryId, setCategoryId] = useState(defaultValue ? defaultValue[0].name : 0)
    const [categories] = useGetRequest('/categories')

    const [show, setShow] = useState({ L1: 0, L2: 0 })

    const handleShowHide = (event, id) => {
        if (event.target.tagName !== 'LABEL') {
            if (show.L1 === id.L1 && id.L2 === 0) {
                setShow({ L1: 0, L2: 0 })
            } else if (show.L2 === id.L2) {
                setShow({ L1: id.L1, L2: 0 })
            } else {
                setShow(id)
            }
        }
    }

    const handleCheck = (e, id) => {
        if (e.target.checked) {
            setCategoryId(id)
            setFilters('category', id)
        } else {
            setCategoryId(0)
            setFilters('category', null)
        }
    }

    return (
        <>
            <ul className="flex flex-col gap-1">
                {!!categories && categories.map(c => {
                    return (
                        <li className="w-full" key={c.id}>
                            <div
                                className={`flex items-center justify-between cursor-pointer py-1 px-1.5 rounded transition-all duration-300 hover:bg-gray-200 ${show.L1 === c.id ? 'bg-gray-200' : ''}`}
                                onClick={(e) => handleShowHide(e, { L1: c.id, L2: 0 })}
                            >
                                <div className={`${style.text} centerOfParent relative`}>
                                    <input type="checkbox" id={c.id} hidden checked={categoryId == c.id} onChange={(e) => handleCheck(e, c.id)} />
                                    <label htmlFor={c.id} className={`cursor-pointer absolute w-4 h-4 top-1/2 -translate-y-1/2 right-0 bg-white border rounded ${style.gbPol}`}></label>
                                    <p className='pr-6'>{c.name}</p>
                                </div>
                                <div className={`centerOfParent transition-all duration-300 ${show.L1 === c.id ? 'rotate-180' : ''}`}>
                                    <BiChevronDown />
                                </div>
                            </div>
                            <ul className={`my-1 relative overflow-hidden hidden flex-col gap-1 duration-300 ${style.under} ${show.L1 === c.id ? '!flex !pr-4 !mt-2' : ''}`}>
                                {show.L1 !== 0 && (c.subCategories.length > 0 ? c.subCategories.map(cSub => {
                                    return (
                                        <li className="w-full" key={cSub.id}>
                                            <div
                                                className={`flex items-center justify-between cursor-pointer p-2 rounded transition-all duration-300 ${show.L2 === cSub.id ? 'bg-gray-200' : ''}`}
                                                onClick={(e) => handleShowHide(e, { L1: c.id, L2: cSub.id })}
                                            >
                                                <div className={`${style.text} centerOfParent relative`}>
                                                    <input type="checkbox" id={cSub.id} hidden checked={categoryId == cSub.id} onChange={(e) => handleCheck(e, cSub.id)} />
                                                    <label htmlFor={cSub.id} className={`cursor-pointer absolute w-4 h-4 top-1/2 -translate-y-1/2 right-0 bg-white border rounded ${style.gbPol}`}></label>
                                                    <p className='pr-6'>{cSub.name}</p>
                                                </div>
                                                <div className={`centerOfParent transition-all duration-300 ${show.L2 === c.id ? 'rotate-180' : ''}`}>
                                                    <BiChevronDown />
                                                </div>
                                            </div>
                                            <ul className={`my-1 relative overflow-hidden hidden flex-col gap-1 duration-300 ${style.under} ${show.L2 === cSub.id ? '!flex !pr-4 !mt-2' : ''}`}>
                                                {show.L2 !== 0 && (cSub.subCategories.length > 0 ? cSub.subCategories.map(c3Sub => {
                                                    return (
                                                        <li className="w-full" key={c3Sub.id}>
                                                            <div className={`flex items-center justify-between cursor-pointer p-2 rounded transition-all duration-300`}>
                                                                <div className={`${style.text} centerOfParent relative`}>
                                                                    <input type="checkbox" id={c3Sub.id} hidden checked={categoryId == c3Sub.id} onChange={(e) => handleCheck(e, c3Sub.id)} />
                                                                    <label htmlFor={c3Sub.id} className={`cursor-pointer absolute w-4 h-4 top-1/2 -translate-y-1/2 right-0 bg-white border rounded ${style.gbPol}`}></label>
                                                                    <p className='pr-6'>{c3Sub.name}</p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    )
                                                }) : <li>دسته وجود ندارد</li>)}
                                            </ul>
                                        </li>
                                    )
                                }) : <li>دسته وجود ندارد</li>)}
                            </ul>
                        </li>
                    )
                })}
            </ul>
        </>
    );
};

export default CategoryFilter;