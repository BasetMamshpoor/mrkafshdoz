import React from 'react';
import Component from "../../Components/Sidebar_Component";
import {adminRoutes} from "../../lib/adminRoutes";
import withAuth from "../../Components/Private/withAuth";
import Orders from 'Components/Vendor/Orders';

const Order = () => {
    return (
        <>
            <div className="my-8" dir="rtl">
                <div className="container">
                    <Component page='admin' comp={<Orders/>} links={adminRoutes}/>
                </div>
            </div>
        </>
    );
};

export default withAuth(Order);