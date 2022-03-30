import React, { useState, useContext } from 'react';

import { FormContext } from '../components/context/FormContext';
import { AuthContext } from '../components/context/AuthContext';

function StudentApi({ toggle }) {
    const { resetCredentials, changeMode, credentials, editCredentials } = useContext(FormContext)
    const { token } = useContext(AuthContext)

    const accessPoint = 'http://127.0.0.1:8000/api/'

    const [student, setStudent] = useState([])
    const [queryId, setQueryId] = useState(0)

    const [refreshVal, setRefreshVal] = useState(0);

    // console.log(token)

    const operation = () => {
        toggle()
        resetCredentials()

        setRefreshVal((previousState) => previousState + parseInt(1))
    }

    // Get All Student Information
    const indexStudents = () => {
        fetch(`${accessPoint}get-student`)
            .then((res) => res.json())
            .then((data) => setStudent(data))
    }

    // Add New Student Information
    const addStudent = async () => {
        await fetch(`${accessPoint}add-student`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(credentials)
        }).then((res) => res.json()
        ).then((data) => console.log(data))

        operation()
    }

    // Find Students Information
    const findStudent = async (studentID) => {
        await fetch(`${accessPoint}find-student/${studentID}`)
            .then((res) => res.json())
            .then((data) => editCredentials(data))

        setQueryId(studentID)
        changeMode()

        // console.log(createStudentForm)

        toggle()

    }

    // Edit Student Information
    const editStudent = async () => {
        await fetch(`${accessPoint}update-student/${queryId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(credentials)
        })

        operation()
    }


    // Delete Student Information
    const deleteStudent = async (valueID) => {
        await fetch(`${accessPoint}delete-student/${valueID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then((res) => res.json())
            .then((data) => console.log(data))

        setRefreshVal((previousState) => previousState + parseInt(1))
    }


    return { student, setStudent, indexStudents, addStudent, findStudent, editStudent, deleteStudent, refreshVal }
}

export default StudentApi;