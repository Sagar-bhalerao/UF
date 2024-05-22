import { createContext, useContext, useState } from "react";
import { toast } from "sonner";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [id, setId] = useState(null);
    const [token, setToken] = useState(sessionStorage.getItem("token"));
    const [role, setRole] = useState(sessionStorage.getItem("role")); // Initialize role from session storage
    const [utheme, setTheme] = useState(null);
    const [fname, setfname] = useState('');
    const [lname, setlname] = useState('');



    const storeToken = (serverToken, userRole, theme) => {
        setTheme(theme)
        // sessionStorage.setItem("theme", theme)
        setToken(serverToken);
        sessionStorage.setItem("token", serverToken);
        setRole(userRole); // Set the role in state
        sessionStorage.setItem("role", userRole); // Store the role in session storage
    };

    const isAuthenticated = !!token;

    const logout = () => {
        localStorage.getItem("theme", "defalut");
        setTheme(null);
        setToken(null);
        setRole(null); // Clear role from state
        // setTheme(null)
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("role"); // Remove role from session storage
        // sessionStorage.removeItem("theme");
    };
    const getPersonData = (fname, lname) => {
        sessionStorage.setItem("firstname",fname);
        sessionStorage.setItem("lastname",lname);
        setlname(lname);
        const stringFirstName = fname.toString().charAt(0).toUpperCase(); // Convert fname to string
        const stringLastName = lname.toString().charAt(0).toUpperCase(); // Convert lname to string
        sessionStorage.setItem("fname", stringFirstName);
        sessionStorage.setItem("lname", stringLastName);
        // Assuming setfname and setlname are state updater functions

    }

    const verifyRole = (userRole) => {
        return role === userRole;
    };

    return (
        <AuthContext.Provider value={{ storeToken, isAuthenticated, logout, verifyRole, role, setId, id, utheme, getPersonData, fname, lname }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}