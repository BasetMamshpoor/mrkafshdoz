import {Tab, Tabs} from "@heroui/react";
import {useState} from "react";
import {useRouter} from "next/router";
import Majors from "./Majors";
import Major from "./Major";

const WholeSaletab = () => {
    const {query} = useRouter();
    const {order: OrderId, code} = query;

    const [selected, setSelected] = useState('new')
    const [onOrder, setOnOrder] = useState(OrderId ? {id: OrderId} : undefined)

    return (
        <>
            {!!onOrder ? <Major setSingleOrder={setOnOrder} data={onOrder}/> :
                <div className="w-full flex flex-col sm:p-4">
                    {!!code ? <Majors setOnOrder={setOnOrder}/> :
                        <>
                            <Tabs
                                selectedKey={selected}
                                onSelectionChange={setSelected}
                                aria-label="Options" className="border-b pb-3">
                                <Tab key="new" title="جدید"/>
                                <Tab key="read" title="خوانده شده"/>
                                <Tab key="answered" title="جواب داده شده"/>
                            </Tabs>
                            <Majors setOnOrder={setOnOrder} status={selected}/>
                        </>}
                </div>}
        </>
    );
};

export default WholeSaletab;