import React, { useState, useEffect, useContext } from 'react';
import StudentModal from '../modal/StudentModal';
import UseTheme from '../components/UseTheme';

import ToggleModal from '../components/ToggleModal';
import StudentApi from '../Api/StudentApi';


const StudentScreen = (props) => {
    const { theme } = UseTheme()

    const { toggle, openModal } = ToggleModal()

    const { student, deleteStudent, indexStudents, addStudent, findStudent, editStudent, refreshVal } = StudentApi({ toggle })

    // const toggleEdit = (id) => findStudent(id)

    useEffect(() => {
        indexStudents()
    }, [refreshVal])


    return (
        <div className={`${theme.background} h-full w-full `} >

            <StudentModal show={openModal} trigger={toggle} onSubmit={addStudent} onEdit={editStudent} />

            <div className={`m-5 px-4 sm:px-6 lg:px-8`}>
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className={`text-xl font-semibold  ${theme.text}`}>Student Listing</h1>
                        <p className={`mt-2 text-sm ${theme.text}`}>A list of all the users in your account including their Full Name, Age, Email and Phone Number.</p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <button type="button" onClick={toggle} className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">Add user</button>
                    </div>
                </div>
                <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Full Name</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date of Birth</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Phone</th>
                                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {
                                            student.map((items) => {
                                                return (
                                                    <tr key={items.id}>
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{items.firstName} {items.lastName}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{items.email}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{items.dob}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{items.phone}</td>
                                                        <td className="relative whitespace-nowrap space-x-2 py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                            <button onClick={() => findStudent(items.id)} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Edit<span className="sr-only"></span></button>
                                                            <button onClick={() => deleteStudent(items.id)} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">Delete<span className="sr-only"></span></button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default StudentScreen;