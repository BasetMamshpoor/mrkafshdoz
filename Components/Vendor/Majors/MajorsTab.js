import { Tab, Tabs } from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import Majors from "./Majors";
import Major from "./Major";

const WholeSaletab = () => {
    const { query } = useRouter();
    const { order: OrderId, code } = query

    const [onOrder, setOnOrder] = useState(OrderId ? { id: OrderId } : undefined)

    return (
        <>
            {!!onOrder ? <Major setSingleOrder={setOnOrder} data={onOrder} /> :
                <div className="w-full flex flex-col sm:p-4">
                    {!!code ? <Majors setOnOrder={setOnOrder} /> : <Tabs aria-label="Options" className="border-b pb-3">
                        <Tab key="new" title="جدید">
                            <Majors setOnOrder={setOnOrder} status='new' />
                        </Tab>
                        <Tab key="read" title="خوانده شده" >
                            <Majors setOnOrder={setOnOrder} status='read' />
                        </Tab>
                        <Tab key="answered" title="جواب داده شده" >
                            <Majors setOnOrder={setOnOrder} status='answered' />
                        </Tab>
                    </Tabs>}
                </div>}
        </>
    );
};

export default WholeSaletab;