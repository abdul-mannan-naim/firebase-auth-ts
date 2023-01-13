import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import useAdmin from '../hook/useAdmin';
import Loading from './Loading';

const RequireAdmin = ({ children }) => {
    const [user, loading] = useAuthState(auth)
    const [admin,adminLoading] = useAdmin(user)
    const location = useLocation()
    const navigate = useNavigate()

    if (loading || adminLoading) {
        return <Loading></Loading>
    }

    if (!admin || !user) {
        signOut(auth)
        localStorage.removeItem("accessToken")
        navigate('/')
    }
    return children
};

export default RequireAdmin;