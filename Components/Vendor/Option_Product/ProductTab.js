import { Card, CardBody, Tab, Tabs } from "@heroui/react";
import Form from "./Form";
import EditForm from "./EditProduct";
import RemoveProduct from "./RemovePaint";
import ProductList from "../Products/AdminProducts";
import { useRouter } from "next/router";

const Painting = () => {
    const { query, replace } = useRouter()
    const { tab } = query

    const changeTab = (value) => {
        const { id, ...q } = query
        const newQuery = { ...q, tab: value };

        replace({ pathname: '/admin/[vendor]', query: newQuery });
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
                        <ProductList />
                    </Tab>
                    <Tab key="new" title="جدید">
                        <Form />
                    </Tab>
                    <Tab key="edit" title="ویرایش">
                        <EditForm edit={true} />
                    </Tab>
                    <Tab key="delete" title="حذف">
                        <RemoveProduct />
                    </Tab>
                </Tabs>
            </div>
        </>
    );
};

export default Painting;