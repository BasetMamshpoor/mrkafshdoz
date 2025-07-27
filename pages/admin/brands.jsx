import React from 'react';
import Component from "../../Components/Sidebar_Component";
import {adminRoutes} from "../../lib/adminRoutes";
import Brands from "../../Components/Vendor/Brands";
import withAuth from "../../Components/Private/withAuth";

const Brand = () => {
    return (
        <>
            <div className="my-8" dir="rtl">
                <div className="container">
                    <Component page='admin' comp={<Brands/>} links={adminRoutes}/>
                </div>
            </div>
        </>
    );
};

export default withAuth(Brand);