import React from 'react';
import ProductTab from "../../Components/Vendor/Option_Product/ProductTab";
import Component from "../../Components/Sidebar_Component";
import {adminRoutes} from "../../lib/adminRoutes";
import withAuth from "../../Components/Private/withAuth";

const Product = () => {
    return (
        <>
            <div className="my-8" dir="rtl">
                <div className="container">
                    <Component page='admin' comp={<ProductTab/>} links={adminRoutes}/>
                </div>
            </div>
        </>
    );
};

export default withAuth(Product);