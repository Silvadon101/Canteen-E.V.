import React, { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';

const UseTheme = () => {
    const { isDarkTheme, darkTheme, lightTheme } = useContext(ThemeContext)
    const theme = isDarkTheme ? darkTheme : lightTheme

    return {theme}
}

export default UseTheme;