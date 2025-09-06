import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { I18nProvider } from './context/I18nContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import NotificationManager from './components/common/NotificationManager';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { Analytics } from '@vercel/analytics/react';

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
import VendorRiskRadar from './pages/tools/VendorRiskRadar';
import VendorSecurityAssessments from './pages/VendorSecurityAssessments';
import VendorAssessmentPortal from './pages/VendorAssessmentPortal';
import ProfilePage from './pages/ProfilePage';
import AccountPage from './pages/AccountPage';
import UserDashboard from './pages/UserDashboard';
import UserActivity from './pages/UserActivity';
import UserNotifications from './pages/UserNotifications';
import StakeholderDashboardDemo from './pages/StakeholderDashboardDemo';
import TemplatePreviewPage from './pages/TemplatePreviewPage';
import DashboardDemoPage from './pages/DashboardDemoPage';

function App() {
  return (
    <I18nProvider>
      <ThemeProvider>
        <Router>
          <ErrorBoundary>
            <AuthProvider>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
                <NotificationManager />
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
                  <Route path="/templates/preview" element={<TemplatePreviewPage />} />
                  <Route path="/how-it-works" element={<HowItWorks />} />
                  <Route path="/api-docs" element={<APIDocumentation />} />
                  <Route path="/integration-guides" element={<IntegrationGuides />} />
                  
                  {/* Tools - can be public or protected based on requirements */}
                  <Route path="/tools/nist-checklist" element={<NISTChecklist />} />
                  <Route path="/tools/sbom-quick-scan" element={<SBOMQuickScan />} />
                  <Route path="/tools/vendor-risk-radar" element={<VendorRiskRadar />} />
                  
                  {/* Assessment routes - public access for better user experience */}
                  <Route path="/supply-chain-assessment" element={<SupplyChainAssessment />} />
                  <Route path="/supply-chain-results/:id?" element={<SupplyChainResults />} />
                  <Route path="/supply-chain-recommendations/:id" element={<SupplyChainRecommendations />} />
                  <Route path="/sbom-analyzer" element={<SBOMAnalyzer />} />
                  <Route path="/sbom-analysis/:id" element={<SBOMAnalysisPage />} />
                  <Route path="/vendor-risk-dashboard" element={<VendorRiskDashboard />} />
                  <Route path="/vendors" element={<VendorsPage />} />
                  
                  {/* Dashboard Demo for non-authenticated users */}
                  <Route path="/dashboard-demo" element={<DashboardDemoPage />} />
                  
                  {/* Vendor Security Assessments - Premium Feature */}
                  <Route path="/vendor-assessments" element={<VendorSecurityAssessments />} />
                  <Route path="/vendor-assessments/:id" element={<VendorAssessmentPortal />} />
                  
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
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } />
                  <Route path="/account" element={
                    <ProtectedRoute>
                      <AccountPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/user-dashboard" element={
                    <ProtectedRoute>
                      <UserDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/user-activity" element={
                    <ProtectedRoute>
                      <UserActivity />
                    </ProtectedRoute>
                  } />
                  <Route path="/notifications" element={
                    <ProtectedRoute>
                      <UserNotifications />
                    </ProtectedRoute>
                  } />
                  
                  {/* Stakeholder Dashboard Demo */}
                  <Route path="/stakeholder-dashboard-demo" element={<StakeholderDashboardDemo />} />
                  
                  {/* Fallback route */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                </main>
                <Footer />
                <Analytics />
              </div>
            </AuthProvider>
          </ErrorBoundary>
        </Router>
      </ThemeProvider>
    </I18nProvider>
  );
}

export default App;