import React, { useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

// Theme Config
import UseTheme from '../components/UseTheme';

// Api's 
import AdminAuthApi from '../Api/AdminAuthApi';

// Context Api
import { FormContext } from '../components/context/FormContext';

const schema = yup.object({
    fullName: yup.string().required('Full name is required'),
    email: yup.string().email().required('Email is required'),
    password: yup.string().min(4).max(8).required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
})

const HomeScreen = () => {
    const { authSignUp } = AdminAuthApi()
    const { theme } = UseTheme()
    const { storeInfo, SignUpForm } = useContext(FormContext)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    // const onSubmit = (data) => {
    //     console.log(data)
    // }

    // console.log(errors)

    return (
        <div className={`relative ${theme.background} overflow-hidden`}>
            <div className="hidden sm:block sm:absolute sm:inset-0" aria-hidden="true">
                <svg className={`absolute bottom-0 right-0 transform translate-x-1/2 mb-48 ${theme.text} lg:top-0 lg:mt-28 lg:mb-0 xl:transform-none xl:translate-x-0`} width="364" height="384" viewBox="0 0 364 384" fill="none">
                    <defs>
                        <pattern id="eab71dd9-9d7a-47bd-8044-256344ee00d0" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
                        </pattern>
                    </defs>
                    <rect width="364" height="384" fill="url(#eab71dd9-9d7a-47bd-8044-256344ee00d0)"></rect>
                </svg>
            </div>
            <div className="relative pb-16 sm:pb-24">
                <main className="mt-16 sm:mt-24">
                    <div className="mx-auto max-w-7xl">
                        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                            <div className="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
                                <div>
                                    <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl">
                                        <span className="md:block">Enrich Your Student</span>
                                        <span className="text-indigo-400 md:block">By Keeping Track</span>
                                    </h1>
                                    <p className={`mt-3 text-base ${theme.text} sm:mt-5 sm:text-xl lg:text-lg xl:text-xl`}>Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua ad ad non deserunt sunt.</p>
                                    <p className="mt-8 text-sm text-white uppercase tracking-wide font-semibold sm:mt-10">Used by</p>
                                    <div className="mt-5 w-full sm:mx-auto sm:max-w-lg lg:ml-0">
                                        <div className="flex flex-wrap items-start justify-between">
                                            <div className="flex justify-center px-1">
                                                <img className="h-9 sm:h-10" src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg" alt="Tuple" />
                                            </div>
                                            <div className="flex justify-center px-1">
                                                <img className="h-9 sm:h-10" src="https://tailwindui.com/img/logos/workcation-logo-gray-400.svg" alt="Workcation" />
                                            </div>
                                            <div className="flex justify-center px-1">
                                                <img className="h-9 sm:h-10" src="https://tailwindui.com/img/logos/statickit-logo-gray-400.svg" alt="StaticKit" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
                                <div className="bg-white sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
                                    <div className="px-4 py-8 sm:px-10">

                                        <div className="mt-6 relative">
                                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                                <div className="w-full border-t border-gray-300"></div>
                                            </div>
                                            <div className="relative flex justify-center text-sm">
                                                <span className="px-2 bg-white text-gray-500"> Sign Up </span>
                                            </div>
                                        </div>

                                        <div className="mt-6">

                                            <form onSubmit={handleSubmit(authSignUp)} className="space-y-6">

                                                {
                                                    SignUpForm.map((value) => {
                                                        return (
                                                            <div key={value.id}>
                                                                <label htmlFor={value.name} className="sr-only">{value.label}</label>
                                                                <input type={value.type} {...register(value.name)} id={value.name} onChange={storeInfo} placeholder={value.label} className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md" />
                                                            </div>
                                                        )
                                                    })
                                                }

                                                <div>
                                                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign Up</button>
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
                                    <div className="px-4 py-6 bg-gray-50 border-t-2 border-gray-200 sm:px-10">
                                        <p className="text-xs leading-5 text-gray-500">By signing up, you agree to our <a href="#" className="font-medium text-gray-900 hover:underline">Terms</a>, <a href="#" className="font-medium text-gray-900 hover:underline">Data Policy</a> and <a href="#" className="font-medium text-gray-900 hover:underline">Cookies Policy</a>.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default HomeScreen;