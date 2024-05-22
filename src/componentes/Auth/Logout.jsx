import React, { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';
const Logout = () => {
    const { logout } = useAuth();
    useEffect(() => {
        toast.error("Logged out.");
        logout();
    },[logout])
    return  <Navigate to="/Login" />

}

export default Logout;
