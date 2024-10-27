import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const isLoggedIn = JSON.parse(localStorage.getItem("loggedin"));
  const isUserAvailable = JSON.parse(localStorage.getItem("currentUser"));

  return isLoggedIn && isUserAvailable ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} />
  );
};

export default ProtectedRoute;
