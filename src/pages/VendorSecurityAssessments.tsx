import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Shield, 
  Send, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Plus,
  Eye,
  FileText,
  Users,
  Star,
  Crown,
  ExternalLink,
  Copy,
  Download,
  Settings
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useVendors } from '../hooks/useVendors';
import CreateAssessmentModal from '../components/vendor-assessments/CreateAssessmentModal';
import AssessmentProgressTracker from '../components/vendor-assessments/AssessmentProgressTracker';
import DataImportExport from '../components/data/DataImportExport';

const VendorSecurityAssessments: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { vendors } = useVendors();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'assessments' | 'templates' | 'portal'>('overview');

  // Mock data for assessments - in real app this would come from useVendorAssessments hook
  const assessments = [
    {
      id: 'assessment-001',
      vendorName: 'TechCorp Solutions',
      frameworkName: 'CMMC Level 2',
      status: 'in_progress',
      sentDate: '2025-01-15',
      dueDate: '2025-02-15',
      completedDate: null,
      overallScore: null,
      progress: 60
    },
    {
      id: 'assessment-002',
      vendorName: 'CloudSecure Inc',
      frameworkName: 'NIST Privacy Framework',
      status: 'completed',
      sentDate: '2025-01-10',
      dueDate: '2025-02-10',
      completedDate: '2025-01-28',
      overallScore: 85,
      progress: 100
    },
    {
      id: 'assessment-003',
      vendorName: 'DevTools Pro',
      frameworkName: 'CMMC Level 1',
      status: 'pending',
      sentDate: null,
      dueDate: null,
      completedDate: null,
      overallScore: null,
      progress: 0
    }
  ];

  const frameworks = [
    {
      id: 'cmmc-level-1',
      name: 'CMMC Level 1',
      description: 'Basic cybersecurity hygiene practices',
      questionCount: 17,
      estimatedTime: '30-45 minutes',
      icon: <Shield className="h-6 w-6 text-blue-600" />
    },
    {
      id: 'cmmc-level-2',
      name: 'CMMC Level 2',
      description: 'Intermediate cybersecurity practices for CUI protection',
      questionCount: 110,
      estimatedTime: '2-3 hours',
      icon: <Shield className="h-6 w-6 text-orange-600" />
    },
    {
      id: 'nist-privacy',
      name: 'NIST Privacy Framework',
      description: 'Privacy risk management practices',
      questionCount: 95,
      estimatedTime: '1.5-2 hours',
      icon: <Shield className="h-6 w-6 text-purple-600" />
    },
    {
      id: 'nist-800-53',
      name: 'NIST SP 800-53 Controls',
      description: 'Security and privacy controls for information systems',
      questionCount: 200,
      estimatedTime: '4-6 hours',
      icon: <Shield className="h-6 w-6 text-green-600" />
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
      case 'in_progress': return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20';
      case 'overdue': return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in_progress': return <Clock className="h-4 w-4" />;
      case 'overdue': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Premium Feature Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center mb-2">
              <Crown className="h-6 w-6 text-yellow-500 mr-2" />
              <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-medium rounded-full">
                Premium Feature
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Vendor Security Assessments
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
              Send comprehensive security assessments to vendors with CMMC and NIST Privacy Framework alignment. 
              Collect evidence and track compliance through a secure vendor portal.
            </p>
          </div>
          
          {isAuthenticated && (
            <div className="flex items-center space-x-2">
              <DataImportExport
                dataType="assessments"
                data={assessments}
                onImportComplete={() => {}}
                onRefresh={() => {}}
              />
              <Button variant="primary" onClick={() => setShowCreateModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Assessment
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Feature Tabs */}
      <div className="mb-6">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'assessments', label: 'Active Assessments', icon: '📋' },
            { id: 'templates', label: 'Framework Templates', icon: '📄' },
            { id: 'portal', label: 'Vendor Portal', icon: '🔗' }
          ].map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                activeTab === id
                  ? 'bg-vendorsoluce-navy text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span className="mr-2">{icon}</span>
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Premium Feature Benefits */}
          <Card className="border-l-4 border-l-yellow-500">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-2" />
                Premium Assessment Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <Shield className="h-12 w-12 text-vendorsoluce-navy mx-auto mb-3" />
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">CMMC & Privacy Aligned</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Pre-built assessment templates aligned with CMMC levels and NIST Privacy Framework
                  </p>
                </div>
                <div className="text-center p-4">
                  <ExternalLink className="h-12 w-12 text-vendorsoluce-teal mx-auto mb-3" />
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Secure Vendor Portal</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Dedicated portal for vendors to complete assessments and upload evidence securely
                  </p>
                </div>
                <div className="text-center p-4">
                  <FileText className="h-12 w-12 text-vendorsoluce-green mx-auto mb-3" />
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Evidence Collection</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Automated evidence collection, validation, and audit trail management
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assessment Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Send className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {assessments.length}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Assessments</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                    <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {assessments.filter(a => a.status === 'in_progress').length}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">In Progress</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {assessments.filter(a => a.status === 'completed').length}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Star className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {assessments.filter(a => a.overallScore && a.overallScore >= 80).length}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">High Compliance</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-vendorsoluce-green/10 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-vendorsoluce-green font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Add Vendors</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Import or add vendors to your portfolio before sending assessments
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-vendorsoluce-green/10 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-vendorsoluce-green font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Choose Framework</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Select CMMC, NIST Privacy Framework, or custom assessment template
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-vendorsoluce-green/10 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-vendorsoluce-green font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Send Assessment</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Send secure assessment links with automated tracking and reminders
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button variant="primary" className="w-full" onClick={() => setShowCreateModal(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Assessment
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Assessment Capabilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">Automated evidence collection</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">Real-time progress tracking</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">Secure document sharing</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">Automated compliance scoring</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">Audit trail and reporting</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">Multi-framework support</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Active Assessments Tab */}
      {activeTab === 'assessments' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Active Assessments</h2>
            <Button variant="primary" onClick={() => setShowCreateModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Assessment
            </Button>
          </div>

          <AssessmentProgressTracker assessments={assessments} />

          <div className="space-y-4">
            {assessments.map((assessment) => (
              <Card key={assessment.id} className="border border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {assessment.vendorName}
                        </h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assessment.status)}`}>
                          {getStatusIcon(assessment.status)}
                          <span className="ml-1">{assessment.status.replace('_', ' ').toUpperCase()}</span>
                        </span>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-3">
                        Framework: <span className="font-medium">{assessment.frameworkName}</span>
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Sent Date:</span>
                          <span className="ml-1 text-gray-900 dark:text-white">
                            {assessment.sentDate || 'Not sent'}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Due Date:</span>
                          <span className="ml-1 text-gray-900 dark:text-white">
                            {assessment.dueDate || 'Not set'}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Progress:</span>
                          <span className="ml-1 text-gray-900 dark:text-white">
                            {assessment.progress}%
                          </span>
                        </div>
                      </div>
                      
                      {assessment.progress > 0 && (
                        <div className="mt-3">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-vendorsoluce-green h-2 rounded-full transition-all duration-300"
                              style={{ width: `${assessment.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Copy className="h-4 w-4 mr-1" />
                        Copy Link
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Framework Templates Tab */}
      {activeTab === 'templates' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Assessment Framework Templates</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {frameworks.map((framework) => (
              <Card key={framework.id} className="border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {framework.icon}
                    <span className="ml-3">{framework.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{framework.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Questions:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{framework.questionCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Est. Time:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{framework.estimatedTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="primary" className="flex-1" onClick={() => setShowCreateModal(true)}>
                      <Send className="h-4 w-4 mr-2" />
                      Send Assessment
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Vendor Portal Tab */}
      {activeTab === 'portal' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Vendor Assessment Portal</h2>
          
          <Card className="border-l-4 border-l-vendorsoluce-teal">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ExternalLink className="h-5 w-5 text-vendorsoluce-teal mr-2" />
                Secure Vendor Portal Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Portal Capabilities</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Secure unique assessment links</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Progress saving and resume capability</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Encrypted evidence file uploads</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Real-time collaboration features</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Mobile-responsive design</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Security Features</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <Shield className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">End-to-end encryption</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Shield className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Multi-factor authentication</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Shield className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Audit trail logging</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Shield className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Time-limited access tokens</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Shield className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">IP allowlist support</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Example Portal URL:</h4>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 bg-white dark:bg-gray-700 p-2 rounded text-sm text-gray-800 dark:text-gray-300">
                    https://portal.vendorsoluce.com/assessment/abc123def456
                  </code>
                  <Button variant="outline" size="sm">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Create Assessment Modal */}
      {showCreateModal && (
        <CreateAssessmentModal
          vendors={vendors}
          frameworks={frameworks}
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            // Refresh assessments list
          }}
        />
      )}

      {/* Upgrade CTA for non-authenticated users */}
      {!isAuthenticated && (
        <Card className="mt-8 bg-gradient-to-r from-vendorsoluce-navy to-vendorsoluce-teal text-white">
          <CardContent className="p-8 text-center">
            <Crown className="h-16 w-16 mx-auto mb-4 text-yellow-400" />
            <h2 className="text-2xl font-bold mb-4">Unlock Premium Assessment Features</h2>
            <p className="text-xl text-gray-100 mb-6">
              Create an account to send CMMC and NIST Privacy Framework assessments to your vendors
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="secondary" size="lg" className="bg-white text-vendorsoluce-navy hover:bg-gray-100">
                Sign Up for Free Trial
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/20">
                View Pricing
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  );
};

export default VendorSecurityAssessments;