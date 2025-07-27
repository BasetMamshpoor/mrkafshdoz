import React from 'react';
import WholeSaletab from "../../Components/Vendor/Majors";
import Component from "../../Components/Sidebar_Component";
import {adminRoutes} from "../../lib/adminRoutes";
import withAuth from "../../Components/Private/withAuth";

const Major = () => {
    return (
        <>
            <div className="my-8" dir="rtl">
                <div className="container">
                    <Component page='admin' comp={<WholeSaletab/>} links={adminRoutes}/>
                </div>
            </div>
        </>
    );
};

export default withAuth(Major);