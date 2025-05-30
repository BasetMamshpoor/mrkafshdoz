import { Tab, Tabs } from "@heroui/react";
import Order from "./Order";
import Orders from "./Orders";
import { ImSearch } from "react-icons/im";
import { useState } from "react";
import { useRouter } from "next/router";

const OrdersTab = () => {
    const { query, replace } = useRouter();
    const { order: OrderId, code } = query

    const [onOrder, setOnOrder] = useState(OrderId ? { id: OrderId } : undefined)


    const handleSearch = async event => {
        event.preventDefault()
        const value = event.target[0].value
        const newQuery = { ...query, code: value };

        replace({ pathname: '/admin/[vendor]', query: newQuery });
    }

    return (
        <>
            {!!onOrder ? <Order setSingleOrder={setOnOrder} data={onOrder} /> :
                <div className="w-full flex flex-col sm:p-4">
                    <div className="flex flex-col gap-4">
                        <form className='relative md:w-1/4 w-44' onSubmit={handleSearch}>
                            <div className='rounded border border-gray-400 pr-1 centerOfParent pl-8 w-full'>
                                <input className='appearance-none w-full h-full px-2 py-1.5 outline-none focus:outline-none border-0' defaultValue={query.code || null} type="text" placeholder='کد سفارش' />
                            </div>
                            <button className='centerOfParent bg-white outline-none focus:outline-none border-0 absolute left-2 top-1/2 -translate-y-1/2'><ImSearch className="fill-gray-400" /></button>
                        </form>
                        {!!code ? <Orders setOnOrder={setOnOrder} /> : <Tabs aria-label="Options" className="border-b pb-3">
                            <Tab key="1" title="در انتظار پرداخت">
                                <Orders setOnOrder={setOnOrder} status='1' />
                            </Tab>
                            <Tab key="2" title="در حال اماده سازی" >
                                <Orders setOnOrder={setOnOrder} status='2' />
                            </Tab>
                            <Tab key="3" title="ارسال شده" >
                                <Orders setOnOrder={setOnOrder} status='3' />
                            </Tab>
                            <Tab key="4" title="تحویل داده شده">
                                <Orders setOnOrder={setOnOrder} status='4' />
                            </Tab>
                            <Tab key="5" title="لغو شده">
                                <Orders setOnOrder={setOnOrder} status='5' />
                            </Tab>
                        </Tabs>}
                    </div>
                </div>}
        </>
    );
};

export default OrdersTab;