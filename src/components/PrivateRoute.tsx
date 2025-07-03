import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navigation from "./Navigation";

const PrivateRoute: React.FC = () => {
  const { isLoggedIn } = useAuth();
  
  if(isLoggedIn) {
    return <>
      <Outlet/>
      <Navigation/>
    </>
  } 
  return <Navigate to="/login" replace />
};

export default PrivateRoute;
