import React, { useContext, useEffect } from 'react';

// Router Navigation
import { BrowserRouter as Router, Route, Routes, Navigate, Location, useLocation, useNavigate } from 'react-router-dom'

// Navigation Bar
import NavBar from './routes/NavBar';

// Screens
import HomeScreen from './screens/HomeScreen';
import StudentScreen from './screens/StudentScreen';
import StudentListScreen from './screens/TeacherScreen';

// Routes Layout 
import LayoutRoutes from './routes/LayoutRoutes';

// Configurations
import AuthConfig from './config/AuthConfig';
import StudentListSideBar from './screens/sidebar/StudentListSideBar';
import TeacherScreen from './screens/TeacherScreen';

//  Context Api
import { AuthContext } from './components/context/AuthContext';


const App = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { isAuth } = useContext(AuthContext)

    useEffect(() => {
        navigate('/student-list')
    }, [isAuth])


    return (
        <Routes>
            <Route path='/' element={<LayoutRoutes />}>
                {/* HomeScreen */}
                <Route exact path='/' element={<HomeScreen />} />

                <Route element={<AuthConfig allowedRole="1" />}>
                    <Route element={<StudentListSideBar />} >
                        <Route path='/student-list' element={<StudentScreen />} />
                        <Route path='/teacher' element={<TeacherScreen />} />
                    </Route>
                </Route>

            </Route>
        </Routes>

    );

}



export default App;