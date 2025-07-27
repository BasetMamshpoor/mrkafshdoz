import React from 'react';
import Slider from "../../Components/Vendor/Slider";
import Component from "../../Components/Sidebar_Component";
import {adminRoutes} from "../../lib/adminRoutes";
import withAuth from "../../Components/Private/withAuth";

const Sliderr = () => {
    return (
        <>
            <div className="my-8" dir="rtl">
                <div className="container">
                    <Component page='admin' comp={<Slider/>} links={adminRoutes}/>
                </div>
            </div>
        </>
    );
};

export default withAuth(Sliderr);