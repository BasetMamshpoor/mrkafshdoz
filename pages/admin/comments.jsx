import React from 'react';
import Comments from "../../Components/CommentManagement";
import Component from "../../Components/Sidebar_Component";
import {adminRoutes} from "../../lib/adminRoutes";
import withAuth from "../../Components/Private/withAuth";

const Comment = () => {
    return (
        <>
            <div className="my-8" dir="rtl">
                <div className="container">
                    <Component page='admin' comp={<Comments/>} links={adminRoutes}/>
                </div>
            </div>
        </>
    );
};

export default withAuth(Comment);