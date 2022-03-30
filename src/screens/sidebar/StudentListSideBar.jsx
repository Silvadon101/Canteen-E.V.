import React, { useContext } from 'react';
import icons from '../../components/icons';
import StudentScreen from '../StudentScreen';
import { Outlet, NavLink } from 'react-router-dom'

import UseTheme from '../../components/UseTheme';

// Context Api's
import { AuthContext } from '../../components/context/AuthContext';

// Api's 
import AdminAuthApi from '../../Api/AdminAuthApi';


function StudentListSideBar(props) {
    const { authInfo, accessType } = useContext(AuthContext)
    const { theme } = UseTheme()
    const { authLogout } = AdminAuthApi()
    const sideIcon = icons()
    const sideNavigation = [
        { id: 1, href: '#', name: 'Dashboard', icon: sideIcon.dashboard },
        { id: 2, href: '/student-list', name: 'Student', icon: sideIcon.project },
        { id: 3, href: '/teacher', name: 'Teacher', icon: sideIcon.team },

    ]

    return (
        <div>
            <div className=" flex w-full" role="dialog" aria-modal="true">

                <div className={`relative flex-1 flex flex-col max-w-xs w-full ${theme.background}`}>



                    <div className="flex-1 mb-5 h-0 pt-5 pb-4 overflow-y-auto w-64">
                        <div className="flex-shrink-0 flex items-center">
                            <img className="block h-10 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
                            <div className={`${theme.text} px-1 font-extrabold uppercase font-bold text-md`} > Student Playground </div>
                        </div>

                        <nav className="mt-5 px-2 space-y-1">

                            {
                                sideNavigation.map((nav) => {
                                    return (
                                        <div key={nav.id}>
                                            <NavLink to={nav.href} className={`${theme.text} hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md`}>

                                                <>{nav.icon}</>
                                                {nav.name}
                                            </NavLink>
                                        </div>
                                    )
                                })
                            }

                            <>

                                <div className="hidden md:flex">
                                    <button onClick={authLogout} className={`inline-flex items-center px-4 py-2 hover:underline text-sm font-medium rounded-md ${theme.text} ${theme.background} hover:${theme.background}`}> Logout </button>
                                </div>
                            </>

                        </nav>
                    </div>
                    <div className="flex-shrink-0 flex bg-gray-700 p-4">
                        <button className="flex-shrink-0 group block">
                            <div className="flex items-center">
                                <div>
                                    <img className="inline-block h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" alt="" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-base font-medium text-white">{` ${authInfo.name}`}</p>
                                    <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300">View profile</p>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>

                <Outlet />

            </div>
        </div>
    );
}

export default StudentListSideBar;