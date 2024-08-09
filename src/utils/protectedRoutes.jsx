import React, { useEffect } from 'react';
import { Navigate, replace } from 'react-router-dom';
import useAuthStore from '../authStore/authStore';

const ProtectedRoute = ({ children, redirectPath ='/login' }) => {
   const {isAuth,checkAuth,loading}= useAuthStore();

   useEffect(()=>{

     checkAuth();
   },[checkAuth]);

   if (loading) {
    return <div>Loading...</div>; // Or a spinner/loading component
  }

  return isAuth ? children : <Navigate to={redirectPath} />;
};

export default ProtectedRoute;