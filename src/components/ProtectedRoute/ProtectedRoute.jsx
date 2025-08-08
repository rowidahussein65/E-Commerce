import React from 'react';
import Style from "./ProtectedRoute.module.css";
import Login from '../Login/Login'; // make sure the path is correct
import { Navigate , useNavigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  if (localStorage.getItem("token")) {
    return <>{children}</>; // render children if token exists
  } else {
    return <>  
 <Navigate to="/login" />
    </> // otherwise show login
  }
}
