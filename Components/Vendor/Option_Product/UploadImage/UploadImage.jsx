import { useState } from 'react';
import style from './UploadImage.module.css'
const UploadImage = ({ product, setProduct, images, image }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleMultipleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('load', function () {
            setPreviewImage(this.result);
            setSelectedFile(file);
            setModalVisible(true);
        })
    }

    const handleColorSelect = (color) => {
        if (selectedFile) {
            setProduct((prev) => ({
                ...prev,
                images: [
                    ...prev.images,
                    { color: color.color, src: selectedFile },
                ],
            }));
        }
        setModalVisible(false);
        setSelectedFile(null);
        setPreviewImage(null);
    };

    const handleMainImg = (e) => {
        const file = e.target.files[0]
        setProduct(prev => {
            return {
                ...prev,
                image: file
            }
        })
    }

    const handleImageOption = (e) => {
        const name = parseInt(e.target.name)
        setProduct(prev => {
            const { deletingImages } = prev
            if (!deletingImages.includes(name)) {
                deletingImages.push(name);
            } else {
                deletingImages.splice(deletingImages.indexOf(name), 1);
            }
            return { ...prev }
        })
    }

    return (
        <>
            <div className={style.iJIucw}>
                <div className={style.form_group}>
                    {!!images && images.length > 0 &&
                        <>
                            <label className={style.control_label}>جهت حذف، روی عکس مورد نظر کلیک کنید.</label>
                            <div className={style.OvrcU}>
                                {images.map(i => {
                                    return (
                                        <div key={i.id} className={style.ExBt_2}>
                                            <input
                                                type="checkbox"
                                                name={i.id}
                                                id={`image${i.id}`}
                                                hidden
                                                onChange={handleImageOption}
                                            />
                                            <label htmlFor={`image${i.id}`} className={style.image_holder}>
                                                <img src={i.src} alt="imagePost" />
                                            </label>
                                        </div>
                                    )
                                })}
                            </div>
                        </>
                    }
                </div>
                <div className={style.upload__btn_box}>
                    <label className={style.upload__btn} htmlFor="inputFile">
                        <p>انتخاب تصویر اصلی</p>
                        <input onChange={handleMainImg}
                            type="file" name='img' id='inputFile' hidden
                            accept='image/jpeg, image/jpg, image/png, image/webp' />
                    </label>
                    <label className={style.upload__btn} htmlFor="inputFiles">
                        <p>آپلود تصاویر</p>
                        <input onChange={handleMultipleImage}
                            type="file" name="image" id="inputFiles"
                            hidden
                            accept='image/jpeg, image/jpg, image/png, image/webp' />
                    </label>
                </div>
                <div className={style.upload_main_img_wrap}>
                    {product.image && <div className={style.main_img}>
                        <img src={URL.createObjectURL(product.image)} />
                        <div className={style.upload__img_close} onClick={() => {
                            setProduct((prev) => {
                                const { image, ...pre } = prev
                                return pre
                            });
                        }}></div>
                    </div>}
                </div>
                <div className="image-preview-container flex flex-wrap gap-4 mt-4">
                    {product.images.map((img, index) => {
                        const objectUrl = URL.createObjectURL(img.src);
                        return (
                            <div key={index} className="relative">
                                <img
                                    src={objectUrl}
                                    alt={`Uploaded ${index}`}
                                    className="w-32 h-32 object-cover rounded-lg"
                                />
                                <div
                                    className="centerOfParent absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full cursor-pointer"
                                    onClick={() => {
                                        setProduct((prev) => ({
                                            ...prev,
                                            images: prev.images.filter((_, i) => i !== index),
                                        }));
                                    }}
                                >×</div>
                                <span className="block mt-2 text-sm text-gray-700">
                                    رنگ: {img.color}
                                </span>
                            </div>
                        )
                    })}
                </div>
                {modalVisible && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                            <h3 className="text-lg font-semibold mb-4 text-gray-700">انتخاب رنگ</h3>
                            <img
                                src={previewImage}
                                alt="Preview"
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <ul className="flex flex-wrap gap-1">
                                {product.colors.map((color, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition"
                                        onClick={() => handleColorSelect(color)}
                                    >
                                        <span
                                            style={{ backgroundColor: color.colorCode }}
                                            className="w-6 h-6 rounded-full border"
                                        ></span>
                                        <span className="text-gray-700">{color.color}</span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={() => setModalVisible(false)}
                                className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                            >
                                لغو
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default UploadImage;