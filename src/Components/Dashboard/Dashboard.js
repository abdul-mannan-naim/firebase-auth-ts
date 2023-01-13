import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink, Outlet } from 'react-router-dom';
import auth from '../../firebase.init';
import useAdmin from '../hook/useAdmin';

const Dashboard = () => {
    const [user] =useAuthState(auth)
    const [admin] =useAdmin(user)
    return (
        <div>
            <div class="drawer drawer-mobile">
                <input id="dashboard-control" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content flex flex-col items-center   ">
                    {/* <!-- Page content here --> */}
                   <Outlet></Outlet>

                </div>
                <div class="drawer-side">
                    <label for="dashboard-control" class="drawer-overlay"></label>
                    <ul class="menu p-4 w-56 bg-base-100 text-base-content">
                        {/* <!-- Sidebar content here --> */}
                        <li><NavLink to="/dashboard/products" > All Products </NavLink ></li>
                        <li><NavLink to="/dashboard/addProduct" > ADD Product </NavLink ></li>
                        <li><NavLink to="/dashboard/myOrders" >  My Orders </NavLink ></li>
                       { admin && <li><NavLink to="/dashboard/users" >  All User  </NavLink ></li>}
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;