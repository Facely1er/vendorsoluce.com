import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { I18nProvider } from './context/I18nContext';
import { useAuth } from './context/AuthContext';
import { Bell, X } from 'lucide-react';
import LoadingSpinner from './components/common/LoadingSpinner';
import { Analytics } from "@vercel/analytics/react"

// Lazy load all page components
const HomePage = React.lazy(() => import('./pages/HomePage'));
const SupplyChainAssessment = React.lazy(() => import('./pages/SupplyChainAssessment'));
const SBOMAnalyzer = React.lazy(() => import('./pages/SBOMAnalyzer'));
const VendorRiskDashboard = React.lazy(() => import('./pages/VendorRiskDashboard'));
const APIDocumentation = React.lazy(() => import('./pages/APIDocumentation'));
const IntegrationGuides = React.lazy(() => import('./pages/IntegrationGuides'));
const Templates = React.lazy(() => import('./pages/Templates'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Privacy = React.lazy(() => import('./pages/Privacy'));
const SupplyChainResults = React.lazy(() => import('./pages/SupplyChainResults'));
const SupplyChainRecommendations = React.lazy(() => import('./pages/SupplyChainRecommendations'));
const Login = React.lazy(() => import('./pages/Login'));
const SBOMQuickScan = React.lazy(() => import('./pages/tools/SBOMQuickScan'));
const VendorRiskCalculator = React.lazy(() => import('./pages/tools/VendorRiskCalculator'));
const NISTChecklist = React.lazy(() => import('./pages/tools/NISTChecklist'));

// Auth Banner component to show when users aren't logged in
const AuthBanner: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [dismissed, setDismissed] = React.useState(false);

  if (isAuthenticated || dismissed) return null;

  return (
    <div className="bg-vendortal-navy text-white py-2 px-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center text-sm">
          <Bell className="h-4 w-4 mr-2" />
          <span>Sign in to save your assessments, analyses, and vendor data.</span>
        </div>
        <button 
          onClick={() => setDismissed(true)}
          className="text-white hover:text-gray-200"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

// Page loading component
const PageLoading: React.FC = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <LoadingSpinner size="large" />
  </div>
);

// AppContent component to avoid context hook usage outside provider
const AppContent: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <AuthBanner />
      <Navbar />
      <div className="flex-grow">
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={
              <ProtectedRoute requireAuth={false}>
                <Login />
              </ProtectedRoute>
            } />
            <Route path="/assessment" element={
              <ProtectedRoute requireAuth={false}>
                <SupplyChainAssessment />
              </ProtectedRoute>
            } />
            <Route path="/supply-chain-risk" element={
              <ProtectedRoute requireAuth={false}>
                <SupplyChainAssessment />
              </ProtectedRoute>
            } />
            <Route path="/supply-chain-results" element={
              <ProtectedRoute requireAuth={false}>
                <SupplyChainResults />
              </ProtectedRoute>
            } />
            <Route path="/supply-chain-recommendations" element={
              <ProtectedRoute requireAuth={false}>
                <SupplyChainRecommendations />
              </ProtectedRoute>
            } />
            <Route path="/sbom-analyzer" element={
              <ProtectedRoute requireAuth={false}>
                <SBOMAnalyzer />
              </ProtectedRoute>
            } />
            <Route path="/vendor-risk" element={
              <ProtectedRoute requireAuth={false}>
                <VendorRiskDashboard />
              </ProtectedRoute>
            } />
            <Route path="/api-docs" element={<APIDocumentation />} />
            <Route path="/integration-guides" element={<IntegrationGuides />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            
            {/* Quick Tools Pages */}
            <Route path="/tools/sbom-quick-scan" element={<SBOMQuickScan />} />
            <Route path="/tools/vendor-risk-calculator" element={<VendorRiskCalculator />} />
            <Route path="/tools/nist-checklist" element={<NISTChecklist />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
     <Analytics />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <I18nProvider>
          <Router>
            <AppContent />
          </Router>
        </I18nProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;