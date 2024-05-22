import { createContext, useContext, useState } from "react";


export const ThemeContext = createContext('');

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');
    const getTheme = (theme)=>{
        setTheme(theme);
    }
    return <ThemeContext.Provider value={{getTheme,theme}}>

        {children}

    </ThemeContext.Provider>
}

export const useTheme = ()=>{
    return useContext(ThemeContext);
}