import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from './Loading';

const RequireAuth = ({children}) => {

    const [user, loading, error] = useAuthState(auth);

    let location = useLocation();

    if (!user) {
        return <Navigate to="/logIn" state={{ from: location }} replace ></Navigate>
    }
    if(loading){
        return <Loading></Loading>
    }

    return  children;
};

export default RequireAuth;