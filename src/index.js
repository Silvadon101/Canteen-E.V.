import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';

// Router Navigation
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// Navigation Bar
import NavBar from './routes/NavBar';

// Screens
import HomeScreen from './screens/HomeScreen';
import StudentScreen from './screens/StudentScreen';
import StudentListScreen from './screens/TeacherScreen';

// Context APIs
import AuthContextProvider, { AuthContext } from './components/context/AuthContext';
import ThemeContextProvider from './components/context/ThemeContext';
import FormContextProvider from './components/context/FormContext';



ReactDOM.render(
    <React.StrictMode>
        <Router>
            <ThemeContextProvider>
                <FormContextProvider>
                    <AuthContextProvider>
                        <Routes>
                            <Route path='/*' element={<App />} />
                        </Routes>
                    </AuthContextProvider>
                </FormContextProvider>
            </ThemeContextProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root'))
 