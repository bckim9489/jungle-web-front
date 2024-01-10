import React, { useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    //console.log(isAuthenticated);
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
