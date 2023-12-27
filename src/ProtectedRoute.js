// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, allowedRoles, ...rest }) => {
  const userRoles = JSON.parse(sessionStorage.getItem("userRoles")) || [];

  // Check if userRoles is an array before using the some method
  const isAuthorized = Array.isArray(userRoles) && userRoles.some(role => allowedRoles.includes(role));

  return (
    <Route
      {...rest}
      element={isAuthorized ? <Component /> : <Navigate to="/" />}
    />
  );
};

export default ProtectedRoute;
