import React from 'react';
import Stories from "../../Components/Vendor/Stories/Stories";
import Component from "../../Components/Sidebar_Component";
import {adminRoutes} from "../../lib/adminRoutes";
import withAuth from "../../Components/Private/withAuth";

const Storie = () => {
    return (
        <>
            <div className="my-8" dir="rtl">
                <div className="container">
                    <Component page='admin' comp={<Stories/>} links={adminRoutes}/>
                </div>
            </div>
        </>
    );
};

export default withAuth(Storie);