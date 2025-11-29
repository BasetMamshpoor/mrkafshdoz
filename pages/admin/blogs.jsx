import React from 'react';
import Component from "../../Components/Sidebar_Component";
import {adminRoutes} from "../../lib/adminRoutes";
import Blogs from "../../Components/Vendor/Blogs";
import withAuth from "../../Components/Private/withAuth";

const Blog = () => {
    return (
        <>
            <div className="my-8" dir="rtl">
                <div className="container">
                    <Component page='admin' comp={<Blogs/>} links={adminRoutes}/>
                </div>
            </div>
        </>
    );
};

export default withAuth(Blog);