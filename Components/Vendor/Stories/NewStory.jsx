import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@heroui/react";
import {useContext, useState} from "react";
import {AiOutlineCloudUpload} from "react-icons/ai";
import axios from "axios";
import Cookies from "js-cookie";
import {Functions} from "providers/FunctionsProvider";

export default function NewStory({reload}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {SwalStyled} = useContext(Functions)


    const [newStory, setNewStory] = useState({
        title: "",
        cover: null,
        video: null,
    });

    const [errors, setErrors] = useState({});
    const [preview, setPreview] = useState({
        coverUrl: null,
        videoUrl: null,
    });

    const validate = () => {
        const errs = {};
        if (!newStory.title.trim()) errs.title = "عنوان الزامی است.";
        if (!newStory.cover) errs.cover = "تصویر کاور الزامی است.";
        if (!newStory.video) errs.video = "فایل ویدیو الزامی است.";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, files, value } = e.target;

        if (files && files.length > 0) {
            const file = files[0];
            setNewStory((prev) => ({ ...prev, [name]: file }));

            if (name === "cover") {
                // پاک کردن URL قبلی
                if (preview.coverUrl) {
                    URL.revokeObjectURL(preview.coverUrl);
                }
                setPreview((prev) => ({ ...prev, coverUrl: URL.createObjectURL(file) }));
            }

            if (name === "video") {
                if (preview.videoUrl) {
                    URL.revokeObjectURL(preview.videoUrl);
                }
                setPreview((prev) => ({ ...prev, videoUrl: URL.createObjectURL(file) }));
            }
        } else {
            // برای فیلد متنی
            setNewStory((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleDrop = (e, type) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (!file) return;
        setNewStory((prev) => ({...prev, [type]: file}));
        const fileUrl = URL.createObjectURL(file);
        if (type === "cover") {
            setPreview((prev) => ({...prev, coverUrl: fileUrl}));
        } else if (type === "video") {
            setPreview((prev) => ({...prev, videoUrl: fileUrl}));
        }
    };


    const handleSubmit = async (onClose) => {
        if (!validate()) return;
        const token = JSON.parse(Cookies.get('token'))

        const formData = new FormData();
        formData.append("title", newStory.title);
        formData.append("cover", newStory.cover);
        formData.append("video", newStory.video);

        try {
            await axios.post("/admin/stories", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `${token.token_type} ${token.access_token}`
                },
            }).then(() => {
                SwalStyled.fire('.ثبت شد', '.اسلاید جدیدی با موفقیت ثبت شد', 'success')
                reload(Math.random())
            })

            setErrors({});
            URL.revokeObjectURL(preview.coverUrl);
            URL.revokeObjectURL(preview.videoUrl);
            setPreview({ coverUrl: null, videoUrl: null });
            onClose();

        } catch (error) {
            SwalStyled.fire('.ثبت نشد', error.response?.data?.message ||
                "خطایی در ارسال اطلاعات رخ داد. لطفاً دوباره تلاش کنید.", 'error')
        }
    };


    return (
        <>
            <Button onPress={onOpen} color="primary" radius="sm">
                افزودن استوری جدید
            </Button>

            <Modal dir="rtl" placement='center' isOpen={isOpen} onOpenChange={onOpenChange} backdrop="opaque">
                <ModalContent>
                    {(onClose) => (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit(onClose);
                            }}
                        >
                            <ModalHeader className="flex flex-col gap-1">افزودن استوری جدید</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col gap-4">
                                    {/* عنوان */}
                                    <div>
                                        <input
                                            type="text"
                                            name="title"
                                            placeholder="عنوان"
                                            value={newStory.title}
                                            onChange={handleInputChange}
                                            className={`w-full border px-3 py-2 rounded ${
                                                errors.title ? "border-red-500" : "border-gray-300"
                                            }`}
                                        />
                                        {errors.title && (
                                            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                                        )}
                                    </div>

                                    {/* کاور */}
                                    <div
                                        onDrop={(e) => handleDrop(e, "cover")}
                                        onDragOver={(e) => e.preventDefault()}
                                        className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
                                            errors.cover ? "border-red-500" : "border-gray-300"
                                        }`}
                                    >
                                        <input
                                            type="file"
                                            name="cover"
                                            accept="image/*"
                                            className="hidden"
                                            id="coverInput"
                                            onChange={handleInputChange}
                                        />
                                        <label htmlFor="coverInput" className="block cursor-pointer">
                                            {preview.coverUrl ? (
                                                <img
                                                    src={preview.coverUrl}
                                                    alt="پیش‌نمایش کاور"
                                                    className="mx-auto h-32 object-cover rounded"
                                                />
                                            ) : (
                                                <>
                                                    <AiOutlineCloudUpload className="w-10 h-10 mx-auto text-gray-400"/>
                                                    <p className="text-sm text-gray-500 mt-2">تصویر را انتخاب یا درگ
                                                        کنید</p>
                                                </>
                                            )}
                                        </label>
                                        {errors.cover && <p className="text-red-500 text-sm mt-1">{errors.cover}</p>}
                                    </div>

                                    {/* ویدیو */}
                                    <div
                                        onDrop={(e) => handleDrop(e, "video")}
                                        onDragOver={(e) => e.preventDefault()}
                                        className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
                                            errors.video ? "border-red-500" : "border-gray-300"
                                        }`}
                                    >
                                        <input
                                            type="file"
                                            name="video"
                                            accept="video/*"
                                            className="hidden"
                                            id="videoInput"
                                            onChange={handleInputChange}
                                        />
                                        <label htmlFor="videoInput" className="block cursor-pointer">
                                            {preview.videoUrl ? (
                                                <video
                                                    controls
                                                    src={preview.videoUrl}
                                                    className="mx-auto h-40 rounded"
                                                />
                                            ) : (
                                                <>
                                                    <AiOutlineCloudUpload className="w-10 h-10 mx-auto text-gray-400"/>
                                                    <p className="text-sm text-gray-500 mt-2">ویدیو را انتخاب یا درگ
                                                        کنید</p>
                                                </>
                                            )}
                                        </label>
                                        {errors.video && <p className="text-red-500 text-sm mt-1">{errors.video}</p>}
                                    </div>
                                </div>
                            </ModalBody>

                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    انصراف
                                </Button>
                                <Button color="primary" type="submit">
                                    ذخیره
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
