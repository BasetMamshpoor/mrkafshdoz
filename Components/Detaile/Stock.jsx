import addComma from 'Functions/addComma';
import { e2p } from 'Functions/ConvertNumbers';
import { IsInCart, quantityItem } from 'helper/functions';
import { CartContext } from 'providers/CartContextProvider';
import { useContext } from 'react';
import { BsCart3 } from 'react-icons/bs';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'
import style from './Stock.module.css'
import Timer from 'Components/Timer';

const Stock = ({ product, size, setSize, color, setColor, selectedColorInfo }) => {
    const { id, price, offPrice, offPercent, colors } = product
    const { state, dispatch } = useContext(CartContext)
    const sizeList = Object.keys(color).length ? color.sizes.map((i, index) => <div
        className={`${style.EzP3_wzm1} ${size?.size === i.size ? style.det_active : ''}`} key={i.id}
        onClick={() => setSize(color.sizes[index])}><span>{i.size}</span></div>) : []

    return (
        <>
            <div className={style.qOOp}>
                <div className={style.sections}>
                    <label>رنگ:</label>
                    <div className="flex items-center gap-2">
                        {colors.map((c, index) => {
                            return (
                                <div key={c.colorCode} className={`${style.Asewq} ${color.colorCode !== c.colorCode ? 'border-transparent' : 'border-main'} cursor-pointer border p-1 rounded-md gap-1`} onClick={() => setColor(colors[index])}>
                                    <div className={style.EzP3_wzm2}>
                                        <span style={{ background: '#000' }}></span>
                                    </div>
                                    <p className={color.colorCode === c.colorCode ? `text-[${c.colorCode}] font-black` : 'text-gray-700'}>{c.color}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            {Object.keys(color).length && !!color.sizes.length ? <>
                <div className={style.qOOp}>
                    <div className={style.sections}>
                        <label>اندازه:</label>
                        <div className={style.Asewq}>
                            {sizeList}
                        </div>
                    </div>
                </div>
                <div className={style.WZZps} dir="ltr">
                    <div className={style.hJkg}>
                        <div className={style.ogSeft}>{addComma(offPrice.toString())}</div>
                        {price !== offPrice && <div className={style.OFFqap}><span>%{e2p(offPercent)}</span>
                            <del>{addComma(price.toString())}</del>
                        </div>}
                    </div>
                    <div className={style.Sxpot}>
                        {IsInCart(state, id + color?.colorCode + size?.size) ?
                            <div className={style.Dc_Oi88Ted}>
                                <button className={style.bTxn}>
                                    {quantityItem(state, id + color.colorCode + size.size) < 2 ?
                                        <FiTrash2 onClick={() => dispatch({
                                            type: "REMOVE_ITEM",
                                            payload: { ...product, idp: id + color.colorCode + size.size }
                                        })} /> :
                                        <FiMinus onClick={() => dispatch({
                                            type: "DECREASE",
                                            payload: { ...product, idp: id + color.colorCode + size.size }
                                        })} />
                                    }
                                </button>
                                <span className={style.num_2Cproduct}>{e2p(quantityItem(state, id + color.colorCode + size.size))}</span>
                                <button
                                    className={`${style.bTxn} ${quantityItem(state, id + color.colorCode + size.size) >= size.stock ? style.enughNumber : ''}`}
                                    onClick={() => dispatch({
                                        type: 'INCREASE',
                                        payload: { ...product, idp: id + color.colorCode + size.size }
                                    })}>
                                    <FiPlus />
                                </button>
                            </div>
                            : <button className={style.TcoPjy} onClick={() => dispatch({
                                type: "ADD_ITEM",
                                payload: { ...product, color: selectedColorInfo, idp: id + color.colorCode + size.size }
                            })}>
                                <BsCart3 className={style.pkDes} />
                                افزودن به سبد خرید
                            </button>
                        }
                    </div>
                </div>
            </> :
                <div className={style.etmamMojody}>
                    <b>ناموجود</b>
                </div>}
        </>
    );
};

export default Stock;