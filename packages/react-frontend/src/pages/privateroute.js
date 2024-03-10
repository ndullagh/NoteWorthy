import React from "react";
import { Outlet, Navigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
// import { addAuthHeader } from "../auth";

const PrivateRoutes = () => {
  return Cookies.get("token") ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" />
  );
};

export default PrivateRoutes;
