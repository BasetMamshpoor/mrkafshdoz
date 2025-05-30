import React from "react";
import { IoClose } from "react-icons/io5";

const SpecificationsList = ({ setProduct, colors = [] }) => {
    const handleRemoveColor = (index) => {
        setProduct((prev) => ({
            ...prev,
            colors: prev.colors.filter((_, i) => i !== index),
        }));
    };

    const handleRemoveSize = (colorIndex, sizeIndex) => {
        setProduct((prev) => {
            const updatedColors = [...prev.colors];
            updatedColors[colorIndex].sizes = updatedColors[colorIndex].sizes.filter(
                (_, i) => i !== sizeIndex
            );
            return { ...prev, colors: updatedColors };
        });
    };
    return (
        <>
            <ul className="flex items-stretch gap-4 flex-wrap">
                {!!colors && colors.map(({ color, colorCode, sizes }, colorIndex) => (<li
                    key={colorIndex}
                    className="p-4 border rounded flex flex-col gap-3"
                >
                    <div className="flex justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span>{color}</span>
                            <span
                                className="w-6 h-6 rounded-full"
                                style={{ backgroundColor: colorCode }}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => handleRemoveColor(colorIndex)}
                            className="text-red-500"
                        >
                            حذف رنگ
                        </button>
                    </div>
                    <ul className="flex flex-wrap items-center gap-2">
                        {!!sizes.length? sizes.map(({ size, stock }, sizeIndex) => (<li
                            key={sizeIndex}
                            className="flex items-center flex-nowrap justify-between bg-gray-50 p-2 rounded border"
                        >
                            <span className="whitespace-nowrap">
                                {size} - {stock + ' عدد'}
                            </span>
                            <button
                                type="button"
                                onClick={() => handleRemoveSize(colorIndex, sizeIndex)}
                                className="text-red-500"
                            >
                                <IoClose />
                            </button>
                        </li>)):<span>ناموجود</span>}
                    </ul>
                </li>))}
            </ul>
        </>
    );
};

export default SpecificationsList;