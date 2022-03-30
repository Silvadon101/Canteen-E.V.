import React, { useContext } from 'react';
import { useNavigate, useOutlet, useLocation, Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from '../components/context/AuthContext'


const AuthConfig = ({ allowedRole }) => {
    const { authInfo } = useContext(AuthContext)
    const location = useLocation()
    const navigation = useNavigate()

    console.log(authInfo?.userType)

    return (
        (authInfo.userType == allowedRole)
            ? <Outlet />
            : <Navigate to='/' state={{ from: location }} replace />
    )
}

export default AuthConfig;