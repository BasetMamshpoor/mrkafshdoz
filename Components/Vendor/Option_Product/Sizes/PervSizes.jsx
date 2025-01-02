import React from 'react';
import style from './Size.module.css'
import { e2p } from 'Functions/ConvertNumbers';

const PervSizes = ({ setProduct, colors }) => {

    const handleSizeOption = (e) => {
        const name = parseInt(e.target.name)
        setProduct(prev => {
            const { deletingSizes } = prev
            if (!deletingSizes.includes(name)) {
                deletingSizes.push(name);
            } else {
                deletingSizes.splice(deletingSizes.indexOf(name), 1);
            }
            return { ...prev }
        })
    }

    return (
        <>
            {!!colors && colors.length > 0 &&
                <>
                    <label className={style.control_label}>جهت حذف، روی سایز مورد نظر کلیک کنید.
                        <div className={style.note}><span>!</span>
                            <p>برای ویرایش موجودی، سایز فعلی را حذف با همان اسم سایز موجودی جدید را وارد کنید!</p>
                        </div>
                    </label>
                    <div className={style.OvrcU}>
                        {colors.map(i => {
                            return (
                                <div key={i.id} className={style.ExBt_2}>
                                    <input
                                        type="checkbox"
                                        name={i.id}
                                        id={`size${i.id}`}
                                        hidden
                                        onChange={handleSizeOption}
                                        className={style.checkSize}
                                    />
                                    <label htmlFor={`size${i.id}`} className={style.size_holder}>
                                        <span>({e2p(i.stock)})</span>~<span>{i.color}</span>
                                    </label>
                                </div>
                            )
                        })}
                    </div>
                </>
            }
            <ul className="space-y-4">
                {!!colors && colors.map(({ color, colorCode, sizes }, colorIndex) => (<li
                    key={colorIndex}
                    className="p-4 border rounded space-y-2"
                >
                    <div className="flex justify-between items-center">
                        <span className="flex items-center space-x-4">
                            <span>{color}</span>
                            <span
                                className="w-6 h-6 rounded-full"
                                style={{ backgroundColor: colorCode }}
                            />
                        </span>
                        <button
                            type="button"
                            onClick={() => handleSizeOption(colorIndex)}
                            className="text-red-500"
                        >
                            حذف رنگ
                        </button>
                    </div>
                    <ul className="space-y-1">
                        {sizes.map(({ size, stock }, sizeIndex) => (<li
                            key={sizeIndex}
                            className="flex justify-between bg-gray-50 p-2 rounded"
                        >
                            <span>
                                {size} - {stock} عدد
                            </span>
                            <button
                                type="button"
                                onClick={() => handleRemoveSize(colorIndex, sizeIndex)}
                                className="text-red-500"
                            >
                                حذف سایز
                            </button>
                        </li>))}
                    </ul>
                </li>))}
            </ul>

        </>
    );
};

export default PervSizes;