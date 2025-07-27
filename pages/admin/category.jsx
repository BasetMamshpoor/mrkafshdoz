import React from 'react';
import Category from "../../Components/Vendor/Category";
import {adminRoutes} from "../../lib/adminRoutes";
import Component from "../../Components/Sidebar_Component";
import withAuth from "../../Components/Private/withAuth";

const Categories = () => {
    return (
        <>
            <div className="my-8" dir="rtl">
                <div className="container">
                    <Component page='admin' comp={<Category/>} links={adminRoutes}/>
                </div>
            </div>
        </>
    );
};

export default withAuth(Categories);