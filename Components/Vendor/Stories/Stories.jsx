import NewStory from "./NewStory";
import ViewStory from "./ViewStory";
import {useState} from "react";
import useGetPrivateRequest from "hooks/useGetPrivatRequest";
import Pagination from "../../Pagination/Pagination";

export default function StoryManager() {
    const [currentpage, setCurrentpage] = useState(1)
    const [data, setData, reload, paginations] = useGetPrivateRequest(`/admin/stories`, currentpage)
    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">استوری‌ها</h2>
                <NewStory reload={reload}/>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {data?.map((story) => (
                    <ViewStory key={story.id} {...story} reload={reload} />
                ))}
            </div>
            <Pagination currentPage={currentpage} setCurrentPage={setCurrentpage} dataLength={paginations?.meta.total}
                        itemsPerPage={paginations?.meta.per_page} boxShadow={false}/>

        </div>
    );
}
