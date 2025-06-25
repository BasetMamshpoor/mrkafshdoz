import addComma from 'Functions/addComma';
import {e2p} from 'Functions/ConvertNumbers';
import {IsInCart, quantityItem} from 'helper/functions';
import {CartContext} from 'providers/CartContextProvider';
import React, {useContext} from 'react';
import style from './Baner.module.css'
import {FiMinus, FiPlus, FiTrash2} from 'react-icons/fi'
import {BsBuilding, BsShieldCheck} from 'react-icons/bs'
import {MdOutlineInventory} from 'react-icons/md'
import Link from 'next/link';

const Baner = ({product, color, size, selectedColorInfo}) => {
    const {id, name, brand, offPercent, offPrice, price, image} = product
    const idp = id + color.colorCode + size.size;
    const {state, dispatch} = useContext(CartContext)
    return (
        <>
            <div className={style.Hxiq3Dx}>
                <div className={style.jc4Rg}>
                    <div className={style.r4Alju}>
                        <div className={style.diSwk6}>
                            <img src={image}
                                 alt=""/>
                        </div>
                        <div className={style.UyrpV7}>
                            <p>{name}</p>
                        </div>
                    </div>
                    <div className={style.gtBwx_d}>
                        <div className={style.uv4FOo}>
                            <div className={style.ivrxo5}>
                                <BsBuilding/>
                            </div>
                            {brand.name}
                        </div>
                        <div className={style.uv4FOo}>
                            <div className={style.ivrxo5}>
                                <BsShieldCheck/>
                            </div>
                            گارانتی سلامت فیزیکی کالا
                        </div>
                        <div className={style.uv4FOo}>
                            <div className={style.ivrxo5}>
                                <MdOutlineInventory/>
                            </div>
                            موجود در انبار
                        </div>
                    </div>
                    {!!color.sizes?.length ? <>
                            <div className={style.Ec3obT}>
                                {!!offPercent && <div className={style.vfdC}>
                                    <span className={style.Roff}>%{e2p(offPercent)}</span>
                                    <del className={style.Crprice}>{addComma(price.toString())}</del>
                                </div>}
                                <div className={style.P_priceR}>
                                    {addComma(offPrice.toString())}
                                </div>
                            </div>
                            <div className={style.Tpn9Rq}>
                                {IsInCart(state, id + color?.colorCode + size?.size) ? <>
                                        <div className={style.Xdptve13}>
                                            <button
                                                className={`${style.inCr_p} ${quantityItem(state, idp) >= size.stock ? style.enughNumber : ''}`}
                                                onClick={() => dispatch({
                                                    type: 'INCREASE',
                                                    payload: {...product, idp}
                                                })}>
                                                <FiPlus/>
                                            </button>
                                            <span
                                                className={style.NamBer_P}>{e2p(quantityItem(state, idp))}</span>
                                            <button className={style.deCri_p}>
                                                {quantityItem(state, idp) < 2 ?
                                                    <FiTrash2 onClick={() => dispatch({
                                                        type: "REMOVE_ITEM",
                                                        payload: {...product, idp}
                                                    })}/> :
                                                    <FiMinus onClick={() => dispatch({
                                                        type: "DECREASE",
                                                        payload: {...product, idp}
                                                    })}/>
                                                }
                                            </button>
                                        </div>
                                        <div className={style.VdxwPuu}>
                                            مشاهده در
                                            <Link href="/cart">سبد خرید</Link>
                                        </div>
                                    </> :
                                    <button className={style.aDd_tO_CaRt} onClick={() => dispatch({
                                        type: "ADD_ITEM",
                                        payload: {
                                            ...product,
                                            color: selectedColorInfo,
                                            idp
                                        }
                                    })}>افزودن به سبد</button>
                                }
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