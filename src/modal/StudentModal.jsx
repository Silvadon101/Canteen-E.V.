import React, { useEffect, useContext } from 'react';
import ReactDOM from 'react-dom'

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

import { FormContext } from '../components/context/FormContext';

const schema = yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("First name is required"),
    email: yup.string().email().required("Email Address is required"),
    dob: yup.string().max(new Date(Date.now() - 567648000000), "You must be at least 18 years").required("Date of birth is required"),
    phone: yup.string("Must Be a Number").max(10).required("Phone number is required")
})

const AddStudentModal = ({ show, trigger, onSubmit, onEdit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })


    const { storeInfo, editMode, changeMode, createStudentForm, resetCredentials } = useContext(FormContext)

    const cancelToggle = () => {
        trigger()
        resetCredentials()
        if (editMode) {
            changeMode()
        }

        Object.keys(errors).forEach(key => {
            delete errors[key];
        })

    }

    const toggleSubmit = () => {
        if (editMode) {
            onEdit()
        } else {
            onSubmit()
        }
    }

    useEffect(()=>{

    }, [toggleSubmit])

    return (!show)
        ? null
        : ReactDOM.createPortal(
            <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>

                    <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">

                        <div className="mt-10 sm:mt-0">


                            <div className="mt-5 md:mt-0 md:col-span-2">
                                <form onSubmit={handleSubmit(toggleSubmit)}>
                                    <div className="shadow overflow-hidden sm:rounded-md">
                                        <div className="px-4 py-5 bg-white sm:p-6">
                                            <div className="grid grid-cols-6 gap-6">

                                                {
                                                    createStudentForm.map((inputType) => {
                                                        return (
                                                            <div key={inputType.id} className="col-span-6 sm:col-span-3">
                                                                <label key={inputType.name} htmlFor={inputType.name} className="block text-sm font-medium text-gray-700">{inputType.label}</label>
                                                                <input type={inputType.type} {...register(inputType.name)} id={inputType.id} onChange={storeInfo} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder={`Please Enter ${inputType.label}`} value={inputType.value} />
                                                            </div>
                                                        )
                                                    })
                                                }

                                            </div>
                                        </div>

                                        <div className="px-4 py-3 space-x-4 bg-gray-50 text-right sm:px-6">
                                            <button onClick={cancelToggle} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>

                                            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">{(editMode) ? 'Update' : 'Create'}</button>
                                        </div>
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
                                                            {errors.firstName && <li> {errors.firstName?.message} </li>}
                                                            {errors.lastName && <li> {errors.lastName?.message} </li>}
                                                            {errors.dob && <li> {errors.dob?.message} </li>}
                                                            {errors.email && <li> {errors.email?.message} </li>}
                                                            {errors.phone && <li> {errors.phone?.message} </li>}
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
            , document.getElementById('portal')
        )
}

export default AddStudentModal;