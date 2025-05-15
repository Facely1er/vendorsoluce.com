import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAuth = true 
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // You could return a loading spinner here
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vendortal-navy"></div>
      </div>
    );
  }

  // Temporarily disable authentication checks
  // Just render children regardless of authentication status
  return <>{children}</>;

  // Original code (commented out)
  /*
  if (requireAuth && !isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!requireAuth && isAuthenticated) {
    // Redirect to home if authenticated and trying to access login/signup
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
  */
};

export default ProtectedRoute;