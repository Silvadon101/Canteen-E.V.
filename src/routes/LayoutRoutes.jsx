import React, { useState, useEffect } from 'react';
import { useContext } from 'react';

import { Outlet } from 'react-router-dom'

import { AuthContext } from '../components/context/AuthContext';

// Navigation Bar
import NavBar from './NavBar';

function LayoutRoutes() {
    const { isAuth } = useContext(AuthContext)
    return (
        <div>
            {
                (isAuth)
                    ? null
                    : <NavBar />
            }
            <Outlet />

        </div>
    );
}

export default LayoutRoutes;