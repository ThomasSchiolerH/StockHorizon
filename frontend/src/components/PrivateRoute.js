// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return null; // or a loading spinner
  }

  return currentUser ? <Component {...rest} /> : <Navigate to="/signup" state={{ message: "Please log in to access this feature." }} />;
};

export default PrivateRoute;
