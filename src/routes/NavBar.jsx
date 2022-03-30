import React, { useState, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom'

// configurations
import UseTheme from '../components/UseTheme';
import toggleModal from '../components/ToggleModal';

// Context Api
import { AuthContext } from '../components/context/AuthContext';

// Api's
import AdminAuthApi from '../Api/AdminAuthApi';

// Modal/Portals
import LoginModal from '../modal/LoginModal';


const NavBar = () => {
    const { authLogout } = AdminAuthApi()

    const { isAuth, authInfo, accessType } = useContext(AuthContext)
    const { theme } = UseTheme()

    const { toggle, openModal } = toggleModal()

    // const routesArr = [
    //     // { name: 'Home', path: '/' },
    //     { name: 'Student', path: '/student-list' },

    // ]


    return (
        <nav className={`${theme.background} shadow`}>

            <LoginModal show={openModal} trigger={toggle} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">

                        <div className="flex-shrink-0 flex items-center">
                            <img className="block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
                            <div className={`${theme.text} mx-2 font-extrabold uppercase font-bold text-2xl`} > Student Playground </div>
                        </div>

                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">

                            {/* {
                                routesArr.map((items) => {
                                    return (
                                        <NavLink key={items.name} to={items.path} className={`border-transparent ${theme.text} hover:${theme.text} hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}> {items.name} </NavLink>
                                    )
                                })

                            } */}
                        </div>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        <div className="ml-3 flex items-center relative">

                            {
                                (isAuth)
                                    ? <>
                                        <div className='inline-flex items-center px-4 py-2 cursor-default text-sm text-white font-medium rounded-md'>{`${accessType} ${authInfo.name}`}</div>
                                        <div className="hidden md:flex">
                                            <button onClick={authLogout} className={`inline-flex items-center px-4 py-2 hover:underline text-sm font-medium rounded-md ${theme.text} ${theme.background} hover:${theme.background}`}> Logout </button>
                                        </div>
                                    </>

                                    : <div className="hidden md:flex">
                                        <button onClick={toggle} className={`inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md ${theme.text} ${theme.background} hover:${theme.background}`}> Log in </button>
                                    </div>
                            }



                        </div>
                    </div>
                    <div className="-mr-2 flex items-center sm:hidden">

                        <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>

                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>

                            <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;