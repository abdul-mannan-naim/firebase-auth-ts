import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from './Loading';

const RequireAuth = ({ children }) => {

    const [user, loading, error] = useAuthState(auth);

    let location = useLocation();
    // loading sobar upore dite hobe evabe, nahole- RequireAuth eer vitore thaka children route k (live web site a) reload korle loging page e chole jabe........
    if (loading) {
        return <Loading></Loading>
    }
    if (!user) {
        return <Navigate to="/logIn" state={{ from: location }} replace ></Navigate>
    }


    return children;
};

export default RequireAuth;