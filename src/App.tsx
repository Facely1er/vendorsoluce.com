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

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <I18nProvider>
          <Router>
            <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
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
                    <ProtectedRoute>
                      <SupplyChainAssessment />
                    </ProtectedRoute>
                  } />
                  <Route path="/supply-chain-risk" element={
                    <ProtectedRoute>
                      <SupplyChainAssessment />
                    </ProtectedRoute>
                  } />
                  <Route path="/supply-chain-results" element={
                    <ProtectedRoute>
                      <SupplyChainResults />
                    </ProtectedRoute>
                  } />
                  <Route path="/supply-chain-recommendations" element={
                    <ProtectedRoute>
                      <SupplyChainRecommendations />
                    </ProtectedRoute>
                  } />
                  <Route path="/sbom-analyzer" element={
                    <ProtectedRoute>
                      <SBOMAnalyzer />
                    </ProtectedRoute>
                  } />
                  <Route path="/vendor-risk" element={
                    <ProtectedRoute>
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
          </Router>
        </I18nProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;