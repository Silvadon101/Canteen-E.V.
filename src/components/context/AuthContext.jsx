import React, { useState, useEffect, createContext } from 'react';

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [authInfo, setAuthInfo] = useState({})
    const [token, setToken] = useState(0)
    const [isAuth, setIsAuth] = useState(false)

    const Roles = {
        'Admin': 1,
        'Teacher': 2,
        'Student': 3
    }

    const accessType = (authInfo.userType === 1)
        ? 'Admin'
        : (authInfo.userType == 2)
            ? 'Teacher'
            : 'Student'

    const getAuthInfo = (currentType) => {
        setAuthInfo(currentType)
    }

    const getToken = (newToken) => {
        setToken(newToken.token)
        getAuthInfo(newToken.user)
    }

    const getSessionToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = (!tokenString)
            ? 0
            : JSON.parse(tokenString)

        setToken(userToken)

        const authString = sessionStorage.getItem('AuthDetails');
        const userInfo = (!authString)
            ? 0
            : JSON.parse(authString)

        setAuthInfo(userInfo)
    }

    const clearToken = () => {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('AuthDetails')
        setToken(0)
        setIsAuth(false)
        setAuthInfo({})
    }

    const config = {
        token,
        isAuth,
        clearToken: clearToken,
        getToken: getToken,
        getAuthInfo: getAuthInfo,
        authInfo,
        accessType
    }

    // console.log(authInfo)

    useEffect(() => {
        (token !== 0)
            ? SaveToken(token, authInfo)
            : getSessionToken();
        // console.log(token)
        (token !== 0)
            ? setIsAuth(() => true)
            : setIsAuth(() => false)

    }, [token && authInfo])

    return (
        <AuthContext.Provider value={{ ...config }}>
            {children}
        </AuthContext.Provider>
    )
}


const SaveToken = (token, authInfo) => {
    sessionStorage.setItem('token', JSON.stringify(token));
    sessionStorage.setItem('AuthDetails', JSON.stringify({ ...authInfo }));
    // toggleAuth()
}


export default AuthContextProvider