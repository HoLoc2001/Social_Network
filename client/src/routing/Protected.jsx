import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticatedSelector } from "../components/User/userSlice";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(isAuthenticatedSelector);

  if (!localStorage["AT"] || !localStorage["RT"] || isAuthenticated === false) {
    return <Navigate to="/signin" />;
  }
  if (true) {
    return <Outlet />;
  }
};

export default ProtectedRoute;
