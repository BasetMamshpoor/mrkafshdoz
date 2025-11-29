// app/blogs/page.jsx (Public List View - Optimized for SEO with ID in URL)
'use client';
import {useRouter} from 'next/navigation';
import useGetRequest from 'hooks/useGetRequest';
import Link from "next/link"; // Adjust hook as needed
import {FaCalendarAlt, FaClock, FaEye, FaShareAlt} from 'react-icons/fa';
import {DateObject} from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const BlogListPublic = () => {
    const [blogs, setBlogs] = useGetRequest('/blogs'); // Fetch all blogs; add pagination if needed

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8 text-center">لیست بلاگ‌ها</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs && blogs.length ? (
                    blogs.map((blog) => (
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
                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
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
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
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
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500">هیچ بلاگی یافت نشد.</div>
                )}
            </div>
        </div>
    );
};

export default BlogListPublic;