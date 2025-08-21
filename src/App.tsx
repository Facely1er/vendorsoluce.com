import React, { Suspense, lazy } from 'react';
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
import LoadingSpinner from './components/common/LoadingSpinner';

// Critical pages - loaded immediately
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';

// Lazy loaded pages - split into chunks
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const VendorsPage = lazy(() => import('./pages/VendorsPage'));
const SBOMAnalyzer = lazy(() => import('./pages/SBOMAnalyzer'));
const SBOMAnalysisPage = lazy(() => import('./pages/SBOMAnalysisPage'));
const SupplyChainAssessment = lazy(() => import('./pages/SupplyChainAssessment'));
const SupplyChainResults = lazy(() => import('./pages/SupplyChainResults'));
const SupplyChainRecommendations = lazy(() => import('./pages/SupplyChainRecommendations'));
const VendorRiskDashboard = lazy(() => import('./pages/VendorRiskDashboard'));
const OnboardingPage = lazy(() => import('./pages/OnboardingPage'));
const Pricing = lazy(() => import('./pages/Pricing'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Templates = lazy(() => import('./pages/Templates'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const APIDocumentation = lazy(() => import('./pages/APIDocumentation'));
const IntegrationGuides = lazy(() => import('./pages/IntegrationGuides'));
const NISTChecklist = lazy(() => import('./pages/tools/NISTChecklist'));
const SBOMQuickScan = lazy(() => import('./pages/tools/SBOMQuickScan'));
const VendorRiskRadar = lazy(() => import('./pages/tools/VendorRiskRadar'));
const VendorSecurityAssessments = lazy(() => import('./pages/VendorSecurityAssessments'));
const VendorAssessmentPortal = lazy(() => import('./pages/VendorAssessmentPortal'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const AccountPage = lazy(() => import('./pages/AccountPage'));
const UserDashboard = lazy(() => import('./pages/UserDashboard'));
const UserActivity = lazy(() => import('./pages/UserActivity'));
const UserNotifications = lazy(() => import('./pages/UserNotifications'));
const StakeholderDashboardDemo = lazy(() => import('./pages/StakeholderDashboardDemo'));
const TemplatePreviewPage = lazy(() => import('./pages/TemplatePreviewPage'));
const DashboardDemoPage = lazy(() => import('./pages/DashboardDemoPage'));

function App() {
  return (
    <ErrorBoundary>
      <I18nProvider>
        <ThemeProvider>
          <Router>
            <AuthProvider>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
                <NotificationManager />
                <Navbar />
                <main className="flex-1">
                  <Suspense fallback={<LoadingSpinner size="lg" message="Loading page..." className="min-h-[400px]" />}>
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
                  </Suspense>
                </main>
                <Footer />
                <Analytics />
              </div>
            </AuthProvider>
          </Router>
        </ThemeProvider>
      </I18nProvider>
    </ErrorBoundary>
  );
}

export default App;