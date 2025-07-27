import React from 'react';
import Cash from "../../Components/Vendor/Cash";
import Component from "../../Components/Sidebar_Component";
import {adminRoutes} from "../../lib/adminRoutes";
import withAuth from "../../Components/Private/withAuth";

const Cashing = () => {
    return (
        <>
            <div className="my-8" dir="rtl">
                <div className="container">
                    <Component page='admin' comp={<Cash/>} links={adminRoutes}/>
                </div>
            </div>
        </>
    );
};

export default withAuth(Cashing);