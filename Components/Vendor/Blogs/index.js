import {Tab, Tabs} from "@heroui/react";
import {useRouter} from "next/router";
import BlogList from "./BlogList";
import BlogForm from "./BlogForm";

const Painting = () => {
    const {query, replace} = useRouter()
    const {tab, id} = query

    const changeTab = (value) => {
        const {id, ...q} = query
        const newQuery = {...q, tab: value};

        replace({pathname: '/admin/blogs', query: newQuery});
    }

    return (
        <>
            <div className="w-full flex flex-col" dir="rtl">
                <Tabs
                    aria-label="Options"
                    className="border-b pb-3"
                    selectedKey={tab || 'list'}
                    onSelectionChange={changeTab}
                >
                    <Tab key="list" title="لیست">
                        <BlogList/>
                    </Tab>
                    <Tab key="new" title="جدید">
                        <BlogForm/>
                    </Tab>
                    <Tab key="edit" title="ویرایش">
                        <BlogForm
                            editId={id}/>
                    </Tab>
                </Tabs>
            </div>
        </>
    );
};

export default Painting;