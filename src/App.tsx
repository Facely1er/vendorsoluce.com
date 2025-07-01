import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import SupplyChainAssessment from './pages/SupplyChainAssessment';
import SBOMAnalyzer from './pages/SBOMAnalyzer';
import VendorRiskDashboard from './pages/VendorRiskDashboard';
import APIDocumentation from './pages/APIDocumentation';
import IntegrationGuides from './pages/IntegrationGuides';
import Templates from './pages/Templates';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import SupplyChainResults from './pages/SupplyChainResults';
import SupplyChainRecommendations from './pages/SupplyChainRecommendations';
import Login from './pages/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { I18nProvider } from './context/I18nContext';
import SBOMQuickScan from './pages/tools/SBOMQuickScan';
import VendorRiskCalculator from './pages/tools/VendorRiskCalculator';
import NISTChecklist from './pages/tools/NISTChecklist';
import { useAuth } from './context/AuthContext';
import { Bell, X } from 'lucide-react';

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

// AppContent component to avoid context hook usage outside provider
const AppContent: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <AuthBanner />
      <Navbar />
      <div className="flex-grow">
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
      </div>
      <Footer />
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