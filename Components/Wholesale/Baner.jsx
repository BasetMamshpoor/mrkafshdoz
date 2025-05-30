
import React from 'react';
import style from './Baner.module.css'
import { BsBuilding, BsShieldCheck } from 'react-icons/bs'
import { MdOutlineInventory } from 'react-icons/md'

const Baner = ({ product, color, onOpen }) => {
    const { id, name, brand, image } = product

    return (
        <>
            <div className={style.Hxiq3Dx}>
                <div className={style.jc4Rg}>
                    <div className={style.r4Alju}>
                        <div className={style.diSwk6}>
                            <img src={image}
                                alt="" />
                        </div>
                        <div className={style.UyrpV7}>
                            <p>{name}</p>
                        </div>
                    </div>
                    <div className={style.gtBwx_d}>
                        <div className={style.uv4FOo}>
                            <div className={style.ivrxo5}>
                                <BsBuilding />
                            </div>
                            {brand.name}
                        </div>
                        <div className={style.uv4FOo}>
                            <div className={style.ivrxo5}>
                                <BsShieldCheck />
                            </div>
                            گارانتی سلامت فیزیکی کالا
                        </div>
                        <div className={style.uv4FOo}>
                            <div className={style.ivrxo5}>
                                <MdOutlineInventory />
                            </div>
                            موجود در انبار
                        </div>
                    </div>
                    {!!color.sizes?.length ? <>
                        <div className={style.Tpn9Rq}>
                            <button type='button' onClick={onOpen} className={`bg-main text-white text-sm  rounded-lg py-2 w-full`}>درخواست تماس</button>
                        </div>
                    </> :
                        <div className={style.etmamMojody}>
                            <b>ناموجود</b>
                        </div>}
                </div>
            </div>
        </>
    );
};

export default Baner;