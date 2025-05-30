import style from './Stock.module.css'

const Stock = ({ product, color, setColor, onOpen }) => {
    const { colors } = product
    const sizeList = Object.keys(color).length ? color.sizes.map((i, index) => <div
        className={`${style.EzP3_wzm1}`} key={i.id}><span>{i.size}</span></div>) : []

    return (
        <>
            <div className={style.qOOp}>
                <div className={style.sections}>
                    <label>رنگ:</label>
                    <div className="flex flex-wrap items-center gap-2">
                        {colors.map((c, index) => {
                            return (
                                <div key={c.colorCode} className={`${style.Asewq} ${color.colorCode !== c.colorCode ? 'border-transparent' : 'border-main'} cursor-pointer border p-1 rounded-md gap-1`} onClick={() => setColor(colors[index])}>
                                    <div className={style.EzP3_wzm2}>
                                        <span className='border' style={{ background: c.colorCode }}></span>
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
                <div className={style.WZZps}>
                    <div className={style.Sxpot}>
                        <button type='button' onClick={onOpen} className={`bg-main text-white text-sm  rounded-lg py-2 w-[200px]`}>درخواست تماس</button>
                    </div>
                    <div className={`lg:hidden flex fixed bottom-16 left-0 right-0 bg-white w-full justify-between items-center py-2 z-[22] border-t`}>
                        <button type='button' onClick={onOpen} className={`bg-main text-white text-sm  rounded-lg py-2 mx-6 w-full`}>درخواست تماس</button>
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