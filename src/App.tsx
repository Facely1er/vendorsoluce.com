import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import OnboardingPage from './pages/OnboardingPage';
import VendorsPage from './pages/VendorsPage';
import SBOMAnalysisPage from './pages/SBOMAnalysisPage';

// Protected Route Component
function ProtectedRoute({ children, requireOnboarding = false }: { children: React.ReactNode; requireOnboarding?: boolean }) {
  const { user, profile, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // If profile is still loading, show loading state
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading profile...</div>
      </div>
    );
  }

  // Handle onboarding logic
  if (requireOnboarding && !profile.is_first_login) {
    // User has already completed onboarding, redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  } else if (!requireOnboarding && profile.is_first_login) {
    // User hasn't completed onboarding, redirect to onboarding
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
}

// Routes Component
function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
     <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      
      {/* Protected Routes */}
      <Route
        path="/onboarding"
        element={
          <ProtectedRoute requireOnboarding={true}>
            <OnboardingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendors"
        element={
          <ProtectedRoute>
            <VendorsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sbom-analysis"
        element={
          <ProtectedRoute>
            <SBOMAnalysisPage />
          </ProtectedRoute>
        }
      />
      
      {/* Default Route */}
     <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// Main App Component - Router wraps AuthProvider
function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;