import React from 'react'
import { Navigate } from "react-router-dom";
import {useAuth} from '../contexts/AuthContext'
function ProtectedRoute({ children }) {
  const { loggedIn } = useAuth();

  if (!loggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;