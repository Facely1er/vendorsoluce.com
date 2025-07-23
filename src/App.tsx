import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { I18nProvider } from './context/I18nContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import DashboardPage from './pages/DashboardPage';
import OnboardingPage from './pages/OnboardingPage';
import VendorsPage from './pages/VendorsPage';
import SBOMAnalysisPage from './pages/SBOMAnalysisPage';
import SupplyChainAssessment from './pages/SupplyChainAssessment';
import SBOMAnalyzer from './pages/SBOMAnalyzer';
import VendorRiskDashboard from './pages/VendorRiskDashboard';
import Templates from './pages/Templates';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import APIDocumentation from './pages/APIDocumentation';
import IntegrationGuides from './pages/IntegrationGuides';
import Pricing from './pages/Pricing';
import SupplyChainResults from './pages/SupplyChainResults';
import SupplyChainRecommendations from './pages/SupplyChainRecommendations';
import NISTChecklist from './pages/tools/NISTChecklist';
import SBOMQuickScan from './pages/tools/SBOMQuickScan';
import VendorRiskCalculator from './pages/tools/VendorRiskCalculator';
import AppTour from './components/onboarding/AppTour';

// Protected Route Component
function ProtectedRoute({ children, requireOnboarding = false }: { children: React.ReactNode; requireOnboarding?: boolean }) {
  const { user, profile, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vendorsoluce-green"></div>
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vendorsoluce-green"></div>
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
  const { isTourRunning, markTourComplete, profile, startTour } = useAuth();

  // Auto-start tour for new users who completed onboarding but haven't taken the tour
  React.useEffect(() => {
    if (profile && !profile.is_first_login && !profile.tour_completed && window.location.pathname === '/dashboard') {
      // Small delay to ensure components are mounted
      setTimeout(() => {
        startTour();
      }, 1500);
    }
  }, [profile, startTour]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <AppTour 
        isRunning={isTourRunning}
        onComplete={markTourComplete}
        onSkip={markTourComplete}
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignInPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/api-docs" element={<APIDocumentation />} />
        <Route path="/integration-guides" element={<IntegrationGuides />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/pricing" element={<Pricing />} />
        
        {/* Public Assessment Pages */}
        <Route path="/assessment" element={<SupplyChainAssessment />} />
        <Route path="/supply-chain-assessment" element={<SupplyChainAssessment />} />
        <Route path="/supply-chain-results" element={<SupplyChainResults />} />
        <Route path="/supply-chain-recommendations" element={<SupplyChainRecommendations />} />
        <Route path="/sbom-analyzer" element={<SBOMAnalyzer />} />
        <Route path="/sbom-analysis" element={<SBOMAnalyzer />} />
        <Route path="/vendor-risk" element={<VendorRiskDashboard />} />
        
        {/* Quick Tools */}
        <Route path="/tools/nist-checklist" element={<NISTChecklist />} />
        <Route path="/tools/sbom-quick-scan" element={<SBOMQuickScan />} />
        <Route path="/tools/vendor-risk-calculator" element={<VendorRiskCalculator />} />
        
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
        
        {/* Login/Signup Routes */}
        <Route path="/login" element={<SignInPage />} />
        <Route path="/signup" element={<SignInPage />} />
        
        {/* Default Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

// Main App Component - Router wraps AuthProvider
function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <Router>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </Router>
      </I18nProvider>
    </ThemeProvider>
  );
}

export default App;