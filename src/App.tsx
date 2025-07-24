import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { I18nProvider } from './context/I18nContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import DashboardPage from './pages/DashboardPage';
import VendorsPage from './pages/VendorsPage';
import SBOMAnalyzer from './pages/SBOMAnalyzer';
import SBOMAnalysisPage from './pages/SBOMAnalysisPage';
import SupplyChainAssessment from './pages/SupplyChainAssessment';
import SupplyChainResults from './pages/SupplyChainResults';
import SupplyChainRecommendations from './pages/SupplyChainRecommendations';
import VendorRiskDashboard from './pages/VendorRiskDashboard';
import OnboardingPage from './pages/OnboardingPage';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Templates from './pages/Templates';
import HowItWorks from './pages/HowItWorks';
import APIDocumentation from './pages/APIDocumentation';
import IntegrationGuides from './pages/IntegrationGuides';
import NISTChecklist from './pages/tools/NISTChecklist';
import SBOMQuickScan from './pages/tools/SBOMQuickScan';
import VendorRiskCalculator from './pages/tools/VendorRiskCalculator';

function App() {
  return (
    <I18nProvider>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/signin" element={<SignInPage />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/templates" element={<Templates />} />
                  <Route path="/how-it-works" element={<HowItWorks />} />
                  <Route path="/api-docs" element={<APIDocumentation />} />
                  <Route path="/integration-guides" element={<IntegrationGuides />} />
                  
                  {/* Tools - can be public or protected based on requirements */}
                  <Route path="/tools/nist-checklist" element={<NISTChecklist />} />
                  <Route path="/tools/sbom-quick-scan" element={<SBOMQuickScan />} />
                  <Route path="/tools/vendor-risk-calculator" element={<VendorRiskCalculator />} />
                  
                  {/* Protected routes */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/onboarding" element={
                    <ProtectedRoute>
                      <OnboardingPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/vendors" element={
                    <ProtectedRoute>
                      <VendorsPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/vendor-risk-dashboard" element={
                    <ProtectedRoute>
                      <VendorRiskDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/sbom-analyzer" element={
                    <ProtectedRoute>
                      <SBOMAnalyzer />
                    </ProtectedRoute>
                  } />
                  <Route path="/sbom-analysis/:id" element={
                    <ProtectedRoute>
                      <SBOMAnalysisPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/supply-chain-assessment" element={
                    <ProtectedRoute>
                      <SupplyChainAssessment />
                    </ProtectedRoute>
                  } />
                  <Route path="/supply-chain-results/:id" element={
                    <ProtectedRoute>
                      <SupplyChainResults />
                    </ProtectedRoute>
                  } />
                  <Route path="/supply-chain-recommendations/:id" element={
                    <ProtectedRoute>
                      <SupplyChainRecommendations />
                    </ProtectedRoute>
                  } />
                  
                  {/* Fallback route */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </I18nProvider>
  );
}

export default App;