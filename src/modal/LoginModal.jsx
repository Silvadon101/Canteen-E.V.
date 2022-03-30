import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom'

import { FormContext } from '../components/context/FormContext';

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import AdminAuthApi from '../Api/AdminAuthApi';

const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(4).max(8).required()
})

const LoginScreen = ({ show, trigger }) => {
    const { storeInfo, LoginForm, resetCredentials } = useContext(FormContext)
    const { authLogin } = AdminAuthApi()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = () => {
        authLogin()
        resetCredentials()
        trigger()
    }

    const cancelToggle = () => {
        trigger()
        resetCredentials()

        Object.keys(errors).forEach(key => {
            delete errors[key];
        })

    }

    return (!show)
        ? null
        : ReactDOM.createPortal(
            <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>


                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>

                    <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                        <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
                            <div className="bg-white sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
                                <div className="px-4 py-8 sm:px-10">

                                    <div className="mt-6 relative">
                                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                            <div className="w-full border-t border-gray-300"></div>
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="px-2 bg-white text-gray-500"> Login </span>
                                        </div>
                                    </div>

                                    <div className="mt-6">

                                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                                            {
                                                LoginForm.map((value) => {
                                                    return (
                                                        <div key={value.id}>
                                                            <label htmlFor={value.name} className="sr-only">{value.label}</label>
                                                            <input type={value.type} {...register(value.name)} id={value.name} onChange={storeInfo} placeholder={value.label} className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md" />
                                                        </div>
                                                    )
                                                })
                                            }

                                            <div className='flex space-x-2'>
                                                <button onClick={cancelToggle} className="w-full flex justify-center py-2 px-4 border border rounded-md shadow-sm text-sm font-medium text-indigo bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300">Cancel</button>
                                                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>
                                            </div>

                                        </form>

                                        {
                                            (Object.keys(errors).length === 0)
                                                ? null
                                                : <div className="rounded-md mt-4 bg-red-50 p-4">
                                                    <div className="flex">
                                                        <div className="flex-shrink-0">
                                                            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                                                            </svg>
                                                        </div>
                                                        <div className="ml-3">
                                                            <h3 className="text-sm font-medium text-red-800">There were {Object.keys(errors).length} errors with your submission</h3>
                                                            <div className="mt-2 text-sm text-red-700">
                                                                <ul role="list" className="list-disc pl-5 space-y-1">
                                                                    {errors.fullName && <li> {errors.fullName?.message} </li>}
                                                                    {errors.email && <li> {errors.email?.message} </li>}
                                                                    {errors.password && <li> {errors.password?.message} </li>}
                                                                    {errors.confirmPassword && <li> Password Should Match </li>}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                        }

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
            , document.getElementById('portal'));
}

export default LoginScreen;

