import React, { useState, useEffect, createContext } from 'react';

export const FormContext = createContext()

const FormContextProvider = ({ children }) => {
    const [editMode, setEditMode] = useState(false)

    const { testRef, refreshCredentials } = RefreshRender()

    const [credentials, setCredentials] = useState({
        fullName: '',
        firstName: '',
        lastName: '',
        dob: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    })

    const resetCredentials = () => {
        setCredentials({
            fullName: '',
            firstName: '',
            lastName: '',
            dob: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''
        })

    }


    const editCredentials = (newCredentials = 0) => {
        if (newCredentials !== 0) {
            setCredentials(({ ...newCredentials[0] }))
        }
        testRef()
    }
    // console.log(credentials)



    const SignUpForm = [
        { id: 1, type: 'text', name: 'fullName', label: 'Full Name', value: credentials.fullName },
        { id: 2, type: 'email', name: 'email', label: 'Email', value: credentials.email },
        { id: 3, type: 'password', name: 'password', label: 'Password', value: credentials.password },
        { id: 4, type: 'password', name: 'confirmPassword', label: 'Password Confirmation', value: credentials.confirmPassword }
    ]

    const LoginForm = [
        { id: 1, type: 'email', name: 'email', label: 'Email', value: credentials.email },
        { id: 2, type: 'password', name: 'password', label: 'Password', value: credentials.password },
    ]

    const createStudentForm = [
        { id: 1, type: 'text', name: 'firstName', label: 'First Name', value: credentials.firstName },
        { id: 2, type: 'text', name: 'lastName', label: 'Last Name', value: credentials.lastName },
        { id: 3, type: 'date', name: 'dob', label: 'Date of Birth', value: credentials.dob },
        { id: 4, type: 'email', name: 'email', label: 'Email', value: credentials.email },
        { id: 5, type: 'number', name: 'phone', label: 'Phone Number', value: credentials.phone },
    ]


    const storeInfo = (event) => {
        const { name, value } = event.target
        setCredentials((previousState) => ({
            ...previousState,
            [name]: value
        }))
        // console.log(credentials)
    }

    const changeMode = () => {
        setEditMode(!editMode)
    }

    const config = {
        credentials,
        editMode,
        changeMode: changeMode,
        editCredentials: editCredentials,
        resetCredentials: resetCredentials,
        storeInfo: storeInfo,
        LoginForm,
        SignUpForm,
        createStudentForm
    }

    useEffect(() => {
        // setCredentials((currentState) => ({ currentState, ...credentials }))
        // // console.log(credentials)
        // // console.log(refreshCredentials)
    }, [credentials])


    return (
        <FormContext.Provider value={{ ...config }}>
            {children}
        </FormContext.Provider>
    )


}

const RefreshRender = () => {
    const [refreshCredentials, setRefreshCredentials] = useState(0)

    const testRef = () => {
        setRefreshCredentials((currentState) => currentState + parseInt(1))
        console.log(refreshCredentials)
    }

    return { testRef, refreshCredentials }
}

export default FormContextProvider;