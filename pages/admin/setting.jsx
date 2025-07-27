import React from 'react';
import Information from "../../Components/Information";
import Component from "../../Components/Sidebar_Component";
import {adminRoutes} from "../../lib/adminRoutes";
import withAuth from "../../Components/Private/withAuth";

const Setting = () => {
    return (
        <>
            <div className="my-8" dir="rtl">
                <div className="container">
                    <Component page='admin' comp={<Information/>} links={adminRoutes}/>
                </div>
            </div>
        </>
    );
};

export default withAuth(Setting);