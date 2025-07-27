import React, {useContext} from 'react';
import Component from "../../Components/Sidebar_Component";
import {profileRoutes} from "../../lib/profileRoutes";
import style from "./Profile.module.css";
import UserProf from "../../public/Images/Ei-user.svg";
import Orders from "../../Components/Profile/Orders/OrdersTab";
import {Authorization} from "../../providers/AuthorizationProvider";
import withAuth from "../../Components/Private/withAuth";

const Order = () => {
    const { user } = useContext(Authorization)

    return (
        <>
            <div className="my-5" dir='rtl'>
                <div className="container">
                    <Component page='profile' comp={<Orders />} links={profileRoutes}>
                        <div className={style.cEdoly}>
                            <div className={style.vGtcol}>
                                <img src={UserProf.src} alt=""/>
                            </div>
                            <div className={style.loBycI}>
                                <p>{user?.name}</p>
                                <span>{user?.email}</span>
                            </div>
                        </div>
                    </Component>
                </div>
            </div>
        </>
    );
};

export default withAuth(Order);