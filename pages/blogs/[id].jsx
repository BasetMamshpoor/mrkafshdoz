'use client';
import useGetRequest from "../../hooks/useGetRequest";
import {useRouter} from "next/router";
import Link from "next/link";
import {
    FaCalendarAlt,
    FaClock,
    FaEye,
    FaShareAlt,
    FaTwitter,
    FaLinkedin,
    FaBookmark,
    FaArrowLeft
} from 'react-icons/fa';
import {DateObject} from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const BlogDetail = () => {
    const {query} = useRouter();
    const id = query.id; // Split to get id and rest as slug (but if slug has '-', join the rest)

    const [blog, setData, setReload, paginations, setPaginations, loading] = useGetRequest(id && '/blogs/' + id); // Fetch all blogs; add pagination if needed

    if (loading) return <div className="container mx-auto p-4 text-center">در حال بارگذاری...</div>;
    if (!blog) return <div className="container mx-auto p-4 text-center">بلاگ پیدا نشد</div>;

    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/blogs"
                            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-300"
                        >
                            <FaArrowLeft className="ml-2"/>
                            بازگشت به بلاگ
                        </Link>

                        <div className="flex items-center space-x-4 space-x-reverse">
                            <button className="text-gray-400 hover:text-blue-600 transition-colors duration-300">
                                <FaShareAlt/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Blog Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Article Header */}
                    <article className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                        {/* Cover Image */}
                        <div className="relative h-80 overflow-hidden">
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            <div className="absolute bottom-6 right-6 left-6">
                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                    {blog.title}
                                </h1>
                            </div>
                        </div>

                        {/* Meta Information */}
                        <div className="p-8">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-6 space-x-reverse text-sm text-gray-500">
                                    <div className="flex items-center">
                                        <FaCalendarAlt className="ml-2 text-blue-500"/>
                                        <span>{new DateObject(new Date(blog.created_at)).convert(persian, persian_fa).format("YYYY/MM/DD")}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaClock className="ml-2 text-green-500"/>
                                        <span>{blog.reading_time} مطالعه</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaEye className="ml-2 text-purple-500"/>
                                        <span>{blog.view?.toLocaleString('fa-IR')} بازدید</span>
                                    </div>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {Array.isArray(blog.tags) && blog.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            {/* ReactQuill HTML Content */}
                            <div className="prose prose-lg max-w-none">
                                <div
                                    className="article-content text-justify leading-8 text-gray-700"
                                    dangerouslySetInnerHTML={{__html: blog.description}}
                                />
                            </div>
                        </div>
                    </article>

                    {/* Related Articles */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">مقالات مرتبط</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {blog.anther.map(blog => (
                                <Link key={blog.id} href={`/blogs/${blog.id}`} className="group">
                                    <div
                                        className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-100">
                                        {/* Image Container */}
                                        <div className="relative overflow-hidden">
                                            <img
                                                src={blog.image || 'https://via.placeholder.com/400x200/3B82F6/FFFFFF?text=Blog+Image'}
                                                alt={blog.title}
                                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div
                                                className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <div
                                                className="flex items-center justify-between text-sm text-gray-500 mb-3">
                                                <div className="flex items-center space-x-4 space-x-reverse">
                                                    <div className="flex items-center">
                                                        <FaCalendarAlt className="ml-1 text-blue-500"/>
                                                        <span>{new DateObject(new Date(blog.created_at)).convert(persian, persian_fa).format("YYYY/MM/DD")}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <FaClock className="ml-1 text-green-500"/>
                                                        <span>{blog.reading_time || 5} دقیقه</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <FaEye className="ml-1 text-purple-500"/>
                                                    <span>{(blog.view || 0).toLocaleString('fa-IR')}</span>
                                                </div>
                                            </div>

                                            <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                                                {blog.title}
                                            </h2>

                                            {/* Author and Read More */}
                                            <div
                                                className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                <div className="flex items-center space-x-3 space-x-reverse">
                                                    <button
                                                        className="text-gray-400 hover:text-blue-600 transition-colors duration-300">
                                                        <FaShareAlt/>
                                                    </button>
                                                    <span
                                                        className="text-blue-600 font-semibold text-sm group-hover:text-blue-700 transition-colors duration-300">
                                مطالعه مقاله
                            </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default BlogDetail;