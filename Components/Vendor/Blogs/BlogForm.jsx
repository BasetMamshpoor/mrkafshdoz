"use client"

import React, {useRef, useState, useEffect, useContext, useCallback} from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import {Authorization} from "../../../providers/AuthorizationProvider";

const ReactQuill = dynamic(() => import("react-quill"), {
    ssr: false,
    loading: () => <div className="h-64 bg-gray-100 rounded-xl animate-pulse"></div>
});

export default function BlogForm({editId = null}) {
    const {tokens} = useContext(Authorization);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        read_time: "",
        tags: [],
        image: ""
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [loading, setLoading] = useState(!!editId);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [progress, setProgress] = useState(0);
    const [tagInput, setTagInput] = useState("");

    /** ---------------------- Memoized Functions ---------------------- */
    const fetchBlogData = useCallback(async () => {
        if (!editId) return;

        try {
            setLoading(true);
            const res = await axios.get(`/blogs/${editId}`);
            const data = res.data.data;

            setFormData({
                title: data.title || "",
                description: data.description || "",
                read_time: data.read_time || "",
                tags: Array.isArray(data.tags) ? data.tags : [],
                image: data.image || ""
            });

            setImagePreview(data.image || "");
        } catch (error) {
            console.error("Error fetching blog:", error);
            alert("خطا در دریافت اطلاعات بلاگ");
        } finally {
            setLoading(false);
        }
    }, [editId]);

    /** ---------------------- Effects ---------------------- */
    useEffect(() => {
        if (editId) {
            fetchBlogData();
        }
    }, [editId, fetchBlogData]);

    /** ---------------------- Handlers ---------------------- */
    const handleInputChange = useCallback((field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    }, []);

    const handleImageChange = useCallback((e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert("حجم فایل نباید بیشتر از ۵ مگابایت باشد");
            return;
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert("لطفاً فقط فایل تصویری انتخاب کنید");
            return;
        }

        setImageFile(file);
        const reader = new FileReader();
        reader.onload = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
    }, []);

    const handleAddTag = useCallback((e) => {
        e?.preventDefault();
        const value = tagInput.trim();
        if (!value) return;

        if (formData.tags.includes(value)) {
            alert("این تگ قبلاً اضافه شده است");
            return;
        }

        setFormData(prev => ({
            ...prev,
            tags: [...prev.tags, value]
        }));
        setTagInput("");
    }, [tagInput, formData.tags]);

    const handleRemoveTag = useCallback((tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    }, []);

    const handleTagKeyPress = useCallback((e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTag();
        }
    }, [handleAddTag]);

    /** ---------------------- Submit Handler ---------------------- */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        // Validation
        if (!formData.title.trim()) {
            alert("عنوان الزامی است");
            return;
        }
        if (!formData.description.trim()) {
            alert("توضیحات خالی است");
            return;
        }

        const submitData = new FormData();
        submitData.append("title", formData.title.trim());
        submitData.append("description", formData.description);
        submitData.append("tags", JSON.stringify(formData.tags));

        if (formData.read_time) {
            submitData.append("read_time", formData.read_time);
        }
        if (imageFile) {
            submitData.append("image", imageFile);
        }

        try {
            setIsSubmitting(true);
            setProgress(0);

            const headers = {
                "Content-Type": "multipart/form-data",
                Authorization: `${tokens?.token_type} ${tokens?.access_token}`,
            };

            await axios[editId ? "put" : "post"](
                `/blogs${editId ? `/${editId}` : ""}`,
                submitData,
                {
                    headers,
                    onUploadProgress: (progressEvent) => {
                        const percent = Math.round(
                            (progressEvent.loaded * 100) / (progressEvent.total || 1)
                        );
                        setProgress(percent);
                    },
                }
            );

            alert(editId ? "بلاگ با موفقیت ویرایش شد" : "بلاگ با موفقیت ایجاد شد");

            // Reset form if it's a new blog
            if (!editId) {
                setFormData({
                    title: "",
                    description: "",
                    read_time: "",
                    tags: [],
                    image: ""
                });
                setImagePreview("");
                setImageFile(null);
            }

        } catch (error) {
            console.error("Submission error:", error);
            const errorMessage = error.response?.data?.message || "خطا در ثبت بلاگ";
            alert(errorMessage);
        } finally {
            setIsSubmitting(false);
            setProgress(0);
        }
    };

    /** ---------------------- Quill Configuration ---------------------- */
    const quillModules = React.useMemo(() => ({
        toolbar: [
            [{header: [1, 2, 3, false]}],
            [{align: []}],
            ["bold", "italic", "underline", "strike"],
            [{list: "ordered"}, {list: "bullet"}],
            [{indent: "-1"}, {indent: "+1"}],
            [{color: []}, {background: []}],
            ["blockquote", "code-block"],
            ["link", "image"],
            ["clean"],
        ],
    }), []);

    /** ---------------------- Loading State ---------------------- */
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">در حال بارگذاری...</p>
                </div>
            </div>
        );
    }

    /** ---------------------- Render ---------------------- */
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <form
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                    onSubmit={handleSubmit}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
                        <h2 className="text-2xl font-bold text-white">
                            {editId ? "ویرایش بلاگ" : "ساخت بلاگ جدید"}
                        </h2>
                        <p className="text-blue-100 mt-1">
                            {editId ? "محتوای بلاگ خود را ویرایش کنید" : "محتوای جدید و جذاب ایجاد کنید"}
                        </p>
                    </div>

                    <div className="p-8 space-y-8">
                        {/* TITLE */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                عنوان مطلب *
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="یک عنوان جذاب و توصیفی وارد کنید..."
                                disabled={isSubmitting}
                            />
                        </div>

                        {/* IMAGE UPLOAD */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                تصویر شاخص
                            </label>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <label className="flex-1 cursor-pointer">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                            disabled={isSubmitting}
                                        />
                                        <div className="w-full border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors duration-200">
                                            <div className="text-gray-500">
                                                <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <p className="text-sm">برای آپلود تصویر کلیک کنید</p>
                                                <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP تا 5MB</p>
                                            </div>
                                        </div>
                                    </label>
                                </div>

                                {imagePreview && (
                                    <div className="mt-4">
                                        <p className="text-sm font-medium text-gray-700 mb-3">پیش‌نمایش تصویر:</p>
                                        <div className="relative inline-block">
                                            <img
                                                src={imagePreview}
                                                className="w-64 h-40 object-cover rounded-xl shadow-md border border-gray-200"
                                                alt="Preview"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setImagePreview("");
                                                    setImageFile(null);
                                                }}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                                                disabled={isSubmitting}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* DESCRIPTION */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                محتوای اصلی *
                            </label>
                            <div dir="ltr" className="bg-white rounded-xl border border-gray-300">
                                <ReactQuill
                                    value={formData.description}
                                    onChange={(value) => handleInputChange('description', value)}
                                    modules={quillModules}
                                    theme="snow"
                                    className="h-64 mb-12"
                                    readOnly={isSubmitting}
                                />
                            </div>
                        </div>

                        {/* READ TIME */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    مدت زمان مطالعه (دقیقه)
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    value={formData.read_time}
                                    onChange={(e) => handleInputChange('read_time', e.target.value)}
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="مثال: ۵"
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

                        {/* TAGS */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                تگ‌ها
                            </label>
                            <div className="space-y-3">
                                <div className="flex gap-3">
                                    <input
                                        type="text"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyPress={handleTagKeyPress}
                                        className="flex-1 rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="تگ جدید را وارد کنید..."
                                        disabled={isSubmitting}
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddTag}
                                        className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 font-medium disabled:opacity-50"
                                        disabled={isSubmitting}
                                    >
                                        افزودن تگ
                                    </button>
                                </div>

                                {/* TAG LIST */}
                                {formData.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {formData.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium shadow-sm"
                                            >
                                                #{tag}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveTag(tag)}
                                                    className="text-white hover:text-blue-100 transition-colors text-lg leading-none disabled:opacity-50"
                                                    disabled={isSubmitting}
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* PROGRESS BAR */}
                        {progress > 0 && (
                            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-blue-700">در حال آپلود</span>
                                    <span className="text-sm font-bold text-blue-600">{progress}%</span>
                                </div>
                                <div className="w-full bg-blue-200 rounded-full h-2">
                                    <div
                                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}

                        {/* SUBMIT BUTTON */}
                        <div className="flex justify-end pt-6 border-t border-gray-200">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>در حال ارسال...</span>
                                    </div>
                                ) : editId ? "ذخیره تغییرات" : "انتشار بلاگ"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}