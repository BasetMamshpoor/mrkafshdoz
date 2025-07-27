import React from 'react';
import Banner from "../../Components/Vendor/Banner";
import Component from "../../Components/Sidebar_Component";
import {adminRoutes} from "../../lib/adminRoutes";
import withAuth from "../../Components/Private/withAuth";

const Banners = () => {
    return (
        <>
            <div className="my-8" dir="rtl">
                <div className="container">
                    <Component page='admin' comp={<Banner/>} links={adminRoutes}/>
                </div>
            </div>
        </>
    );
};

export default withAuth(Banners);