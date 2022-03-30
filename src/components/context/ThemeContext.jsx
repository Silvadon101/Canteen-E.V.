import React, { useState, createContext } from 'react';

export const ThemeContext = createContext()

const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState({
        isDarkTheme: true,
        darkTheme: {
            background: 'bg-gray-900',
            text: 'text-white'
        },
        lightTheme: {
            background: 'bg-white',
            text: 'text-gray-900'
        }
    })

    const toggleTheme = () => {
        setTheme((perviousTheme) => ({
            ...perviousTheme,
            isDarkTheme: !theme.isDarkTheme
        }))
    }
    return (
        <ThemeContext.Provider value={{ ...theme, toggleTheme: { toggleTheme } }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider