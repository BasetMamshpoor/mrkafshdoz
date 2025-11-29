import {useRouter} from 'next/router';
import React, {useCallback, useEffect, useState} from 'react';
import Blog from './BlogCard'; // Assuming a Blog component similar to Product
import useGetRequest from 'hooks/useGetRequest';
import {Pagination} from "@heroui/react";

const Blogs = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const [blogs, setBlogs, reload, pagination] = useGetRequest('/blogs', currentPage); // Assuming endpoint '/blogs/all'

    return (
        <>
            {blogs && blogs.length ? (
                <>
                    <div className="flex flex-col gap-4">
                        <div className="grid lg:grid-cols-3 sm:grid-cols-3 grid-cols-1 gap-2 pt-0 pb-4 px-2 md:px-0">
                            {blogs.map(i => (
                                <Blog key={i.id} {...i} setBlogs={setBlogs} reload={reload}/>
                            ))}
                        </div>
                        <div dir="auto" className="centerOfParent mt-4">
                            {!!blogs.length && pagination.last_page > 1 && (
                                <Pagination
                                    size='sm'
                                    total={Math.ceil(pagination.total / pagination.per_page)}
                                    color="primary"
                                    page={currentPage}
                                    onChange={setCurrentPage}
                                    showControls
                                />
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <div className='h-80 centerOfParent'>بلاگی پیدا نشد لطفا فیلتر ها رو تغییر بدید.</div>
            )}
        </>
    );
};

export default React.memo(Blogs);