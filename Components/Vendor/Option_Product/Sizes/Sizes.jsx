import { useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';

const ColorsAndSizes = ({ setProduct, errors, touch }) => {
    const [currentColor, setCurrentColor] = useState({ color: '', colorCode: '', sizes: [] });
    const [currentSize, setCurrentSize] = useState({ size: '', stock: '' });
    const [formError, setFormError] = useState({});

    const handleColorChange = ({ target }) => {
        const { name, value } = target;
        setCurrentColor((prev) => ({ ...prev, [name]: value }));
        setFormError((prev) => ({ ...prev, color: null }));
    };

    const handleSizeChange = ({ target }) => {
        const { name, value } = target;
        setCurrentSize((prev) => ({ ...prev, [name]: value }));
        setFormError((prev) => ({ ...prev, size: null }));
    };

    const handleAddSize = () => {
        if (!currentSize.size || !currentSize.stock) {
            setFormError((prev) => ({
                ...prev, size: 'لطفا سایز و تعداد موجود را وارد کنید.',
            }));
            return;
        }

        setCurrentColor((prev) => ({
            ...prev, sizes: [...prev.sizes, currentSize],
        }));

        setCurrentSize({ size: '', stock: '' });
    };

    const handleAddColor = () => {
        if (!currentColor.color || !currentColor.colorCode || currentColor.sizes.length === 0) {
            setFormError((prev) => ({
                ...prev, color: 'لطفا رنگ، کد رنگ و حداقل یک سایز را وارد کنید.',
            }));
            return;
        }

        setProduct((prev) => ({
            ...prev, colors: [...prev.colors, currentColor],
        }));

        setCurrentColor({ color: '', colorCode: '', sizes: [] });
        setFormError({});
    };

    return (
        <div className='w-full space-y-3'>
            <div className="flex md:flex-row flex-col items-stretch gap-4 w-full">
                <div className="flex items-center gap-4 border rounded-md overflow-hidden">
                    <input
                        type="text"
                        placeholder="نام رنگ"
                        name="color"
                        value={currentColor.color}
                        onChange={handleColorChange}
                        className="p-2 sm:w-full w-32 h-12"
                    />
                    <input
                        type="color"
                        name="colorCode"
                        value={currentColor.colorCode}
                        onChange={handleColorChange}
                        className="flex items-center justify-center h-10 flex-shrink-0"
                    />
                </div>
                <div className="flex items-stretch gap-4 grow">
                    <div className="grow flex items-stretch gap-4 border rounded-md overflow-hidden">
                        <input
                            type="text"
                            placeholder="سایز"
                            name="size"
                            value={currentSize.size}
                            onChange={handleSizeChange}
                            className="p-2 sm:w-full w-10"
                        />
                        <input
                            type="number"
                            placeholder="تعداد"
                            name="stock"
                            value={currentSize.stock}
                            onChange={handleSizeChange}
                            min="1"
                            className="p-2 sm:w-full w-10"
                        />
                        <button
                            onClick={handleAddSize}
                            type="button"
                            className="text-blue-500 rounded p-2 flex items-center"
                        >
                            <BsPlus />
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={handleAddColor}
                        className="bg-green-500 text-white sm:py-2 sm:px-4 px-2 rounded"
                    >
                        <span className='sm:block hidden whitespace-nowrap'>افزودن رنگ</span>
                        <span className='sm:hidden centerOfParent'><BsPlus /></span>
                    </button>
                </div>
            </div>
            {(formError.size || formError.color) && <p className="text-red-500 text-sm">{formError.size}  {formError.color}</p>}
            <ul className="flex items-center gap-3 flex-wrap">
                {currentColor.sizes.map(({ size, stock }, index) => (<li
                    key={index}
                    className="flex items-center justify-between gap-2 bg-gray-100 px-2 py-1 rounded"
                >
                    <span className='whitespace-nowrap'>
                        {size} - {stock + ' عدد'}
                    </span>
                    <button
                        type="button"
                        onClick={() => {
                            setCurrentColor((prev) => ({
                                ...prev, sizes: prev.sizes.filter((_, i) => i !== index),
                            }));
                        }}
                        className="text-red-500 flex items-center justify-center"
                    >
                        <IoClose />
                    </button>
                </li>))}
            </ul>
        </div>
    );
};

export default ColorsAndSizes;