import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.auth);
    //const isAdmin = user?.role === 'admin';

    if (!token) {
        return <Navigate to="/login" replace />;
    }
    
    if (adminOnly) {
        return <Navigate to="/dashboard" replace />;
    }
    
    return children;
}

export default ProtectedRoute
