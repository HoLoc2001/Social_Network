import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/store";

const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

  // if (!localStorage["AT"] || !localStorage["RT"] || isAuthenticated === false) {
  //   return <Navigate to="/signin" />;
  // }

  return <Outlet />;
};

export default ProtectedRoute;
