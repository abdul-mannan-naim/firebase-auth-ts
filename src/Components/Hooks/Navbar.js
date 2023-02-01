import { EmailAuthCredential, signInAnonymously, signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import auth from '../../firebase.init';

const Navbar = ({ children }) => {

    const [user, loading, error] = useAuthState(auth)
    let { pathname } = useLocation()
    const logOut = () => {
        signOut(auth)
        localStorage.removeItem("accessToken")
    } 
    return (
        <div>
            <div>
                <div class="drawer">
                    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
                    <div class="drawer-content flex flex-col">
                        {/* <!-- Navbar --> */}
                        <div class="w-full navbar ">
                            <div class="flex-none lg:hidden">
                                {pathname.includes('dashboard') && <label for="dashboard-control" class="btn btn-circle text-primary hover:bg-white bg-white border-1 drawer-button lg:hidden"> ❯ </label>}
                                <label for="my-drawer-3" class="btn btn-square btn-ghost">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                                </label>
                            </div>
                            <div class="flex-1 px-2 mx-2"><NavLink className="rounded-2xl mx-3 text-2xl font-bold text-accent " to="/" > Mobilot  </NavLink></div>
                            <div class="flex-none hidden lg:block">
                                <ul class="menu menu-horizontal">
                                    {/* <!-- Navbar menu content here --> */}

                                    <li><NavLink className="rounded-2xl mx-3 " to="/questionAnswer" > Answer </NavLink></li>
                                    <li><NavLink className="rounded-2xl mx-3 " to="/products" >  Products  </NavLink></li>
                                    {
                                        user && <li><NavLink className="rounded-2xl mx-3 " to="/dashboard" >  Dashboard </NavLink></li>
                                    }
                                    {user ?
                                        <li><button className="rounded-2xl mx-3 " onClick={() => logOut()}>Sign Out</button> </li> :
                                        <>  <li><NavLink className="rounded-2xl mx-3 " to="/signIn" >Sign In</NavLink></li>
                                            <li><NavLink className="rounded-2xl mx-3 " to="/logIn" >LogIn</NavLink></li> </>
                                    } 
 

                                </ul>
                            </div>
                        </div>
                        {/* <!-- Page content here --> */}
                        {children}
                    </div>
                    <div class="drawer-side">
                        <label for="my-drawer-3" class="drawer-overlay"></label>
                        <ul class="menu p-4 w-80 bg-base-100">
                            {/* <!-- Sidebar content here --> */}

                            <li><NavLink to="/questionAnswer" > Answer </NavLink></li>
                            <li><NavLink to="/products" >  Products </NavLink></li>
                            {user ?
                                <li> <button className="rounded-2xl   " onClick={() => logOut()}>Sign Out</button> </li> :
                                <><li><NavLink className="rounded-2xl  " to="/signIn" >Sign In</NavLink></li>
                                    <li><NavLink className="rounded-2xl  " to="/logIn" >LogIn</NavLink></li></>
                            }
                            {
                                user && <li><NavLink to="/dashboard" >  Dashboard </NavLink></li>
                            }

                           
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;