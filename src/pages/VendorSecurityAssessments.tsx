import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Shield, 
  Users, 
  Plus,
  FileCheck,
  Clock,
  AlertTriangle,
  CheckCircle,
  Send,
  Eye,
  Filter,
  Search,
  Download,
  BarChart3,
  TrendingUp,
  Crown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useVendors } from '../hooks/useVendors';
import CreateAssessmentModal from '../components/vendor-assessments/CreateAssessmentModal';
import AssessmentProgressTracker from '../components/vendor-assessments/AssessmentProgressTracker';

interface Assessment {
  id: string;
  vendorName: string;
  frameworkName: string;
  status: 'pending' | 'sent' | 'in_progress' | 'completed' | 'reviewed';
  sentDate: string | null;
  dueDate: string | null;
  completedDate: string | null;
  overallScore: number | null;
  progress: number;
  contactEmail: string;
  assessmentType: 'cmmc_level_1' | 'cmmc_level_2' | 'nist_privacy' | 'custom';
}

interface Framework {
  id: string;
  name: string;
  description: string;
  questionCount: number;
  estimatedTime: string;
}

const VendorSecurityAssessments: React.FC = () => {
  const { t } = useTranslation();
  const { vendors, loading } = useVendors();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Mock assessment data - in a real app this would come from the database
  const [assessments, setAssessments] = useState<Assessment[]>([
    {
      id: 'assess-001',
      vendorName: 'TechCorp Solutions',
      frameworkName: t('vendorAssessments.frameworks.cmmcLevel2.name'),
      status: 'in_progress',
      sentDate: '2025-01-10',
      dueDate: '2025-01-25',
      completedDate: null,
      overallScore: null,
      progress: 65,
      contactEmail: 'security@techcorp.com',
      assessmentType: 'cmmc_level_2'
    },
    {
      id: 'assess-002',
      vendorName: 'CloudSecure Inc',
      frameworkName: t('vendorAssessments.frameworks.nistPrivacy.name'),
      status: 'completed',
      sentDate: '2025-01-05',
      dueDate: '2025-01-20',
      completedDate: '2025-01-18',
      overallScore: 85,
      progress: 100,
      contactEmail: 'compliance@cloudsecure.com',
      assessmentType: 'nist_privacy'
    },
    {
      id: 'assess-003',
      vendorName: 'DevTools Pro',
      frameworkName: t('vendorAssessments.frameworks.cmmcLevel1.name'),
      status: 'sent',
      sentDate: '2025-01-12',
      dueDate: '2025-01-27',
      completedDate: null,
      overallScore: null,
      progress: 0,
      contactEmail: 'security@devtools.com',
      assessmentType: 'cmmc_level_1'
    }
  ]);

  // Available assessment frameworks
  const frameworks: Framework[] = [
    {
      id: 'cmmc_level_1',
      name: t('vendorAssessments.frameworks.cmmcLevel1.name'),
      description: t('vendorAssessments.frameworks.cmmcLevel1.description'),
      questionCount: 17,
      estimatedTime: t('vendorAssessments.estimatedTime.short')
    },
    {
      id: 'cmmc_level_2',
      name: t('vendorAssessments.frameworks.cmmcLevel2.name'),
      description: t('vendorAssessments.frameworks.cmmcLevel2.description'),
      questionCount: 110,
      estimatedTime: t('vendorAssessments.estimatedTime.long')
    },
    {
      id: 'nist_privacy',
      name: t('vendorAssessments.frameworks.nistPrivacy.name'),
      description: t('vendorAssessments.frameworks.nistPrivacy.description'),
      questionCount: 45,
      estimatedTime: t('vendorAssessments.estimatedTime.medium')
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
      case 'in_progress': return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20';
      case 'sent': return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20';
      case 'pending': return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20';
      case 'reviewed': return 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in_progress': return <Clock className="h-4 w-4" />;
      case 'sent': return <Send className="h-4 w-4" />;
      case 'pending': return <FileCheck className="h-4 w-4" />;
      case 'reviewed': return <Eye className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const filteredAssessments = assessments.filter(assessment => {
    const matchesSearch = assessment.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assessment.frameworkName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || assessment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateSuccess = () => {
    setShowCreateModal(false);
    // In a real app, you would refetch assessments here
  };

  if (loading) {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vendorsoluce-green"></div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center mb-2">
              <Crown className="h-6 w-6 text-yellow-500 mr-2" />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                {t('vendorAssessments.premiumFeature')}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t('vendorAssessments.title')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
              {t('vendorAssessments.description')}
            </p>
          </div>
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => setShowCreateModal(true)}
            className="flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            {t('vendorAssessments.buttons.newAssessment')}
          </Button>
        </div>
      </div>

      {/* Premium Features Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-8">
            <div className="flex items-center mb-4">
              <Shield className="h-8 w-8 text-yellow-500 mr-3" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {t('vendorAssessments.features.cmmcAssessments.title')}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t('vendorAssessments.features.cmmcAssessments.description')}
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• {t('vendorAssessments.features.cmmcAssessments.feature1')}</li>
              <li>• {t('vendorAssessments.features.cmmcAssessments.feature2')}</li>
              <li>• {t('vendorAssessments.features.cmmcAssessments.feature3')}</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-8">
            <div className="flex items-center mb-4">
              <Users className="h-8 w-8 text-blue-500 mr-3" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {t('vendorAssessments.features.vendorPortal.title')}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t('vendorAssessments.features.vendorPortal.description')}
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• {t('vendorAssessments.features.vendorPortal.feature1')}</li>
              <li>• {t('vendorAssessments.features.vendorPortal.feature2')}</li>
              <li>• {t('vendorAssessments.features.vendorPortal.feature3')}</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-8">
            <div className="flex items-center mb-4">
              <BarChart3 className="h-8 w-8 text-green-500 mr-3" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {t('vendorAssessments.features.analytics.title')}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t('vendorAssessments.features.analytics.description')}
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• {t('vendorAssessments.features.analytics.feature1')}</li>
              <li>• {t('vendorAssessments.features.analytics.feature2')}</li>
              <li>• {t('vendorAssessments.features.analytics.feature3')}</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Progress Tracker */}
      <AssessmentProgressTracker assessments={assessments} />

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('vendorAssessments.search.placeholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-full md:w-64"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="all">{t('vendorAssessments.filters.allStatuses')}</option>
                <option value="pending">{t('vendorAssessments.status.pending')}</option>
                <option value="sent">{t('vendorAssessments.status.sent')}</option>
                <option value="in_progress">{t('vendorAssessments.status.inProgress')}</option>
                <option value="completed">{t('vendorAssessments.status.completed')}</option>
                <option value="reviewed">{t('vendorAssessments.status.reviewed')}</option>
              </select>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              <span onClick={() => {
                alert('Export Report functionality will generate a comprehensive PDF report including assessment status, completion rates, compliance scores, and vendor risk summaries. The report will include executive dashboard views and detailed findings.');
              }}>
                {t('vendorAssessments.actions.exportReport')}
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Assessments Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{t('vendorAssessments.table.title')}</span>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {t('vendorAssessments.table.count', { count: filteredAssessments.length })}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredAssessments.length === 0 ? (
            <div className="text-center py-12">
              <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {t('vendorAssessments.emptyState.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchTerm || statusFilter !== 'all' 
                  ? t('vendorAssessments.emptyState.noMatches')
                  : t('vendorAssessments.emptyState.noAssessments')}
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Button variant="primary" onClick={() => setShowCreateModal(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  {t('vendorAssessments.buttons.createFirstAssessment')}
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('vendorAssessments.table.headers.vendor')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('vendorAssessments.table.headers.framework')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('vendorAssessments.table.headers.status')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('vendorAssessments.table.headers.progress')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('vendorAssessments.table.headers.dueDate')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('vendorAssessments.table.headers.score')}
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('vendorAssessments.table.headers.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredAssessments.map((assessment) => (
                    <tr key={assessment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {assessment.vendorName}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {assessment.contactEmail}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900 dark:text-white">
                          {assessment.frameworkName}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(assessment.status)}`}>
                          {getStatusIcon(assessment.status)}
                          <span className="ml-1">{t(`vendorAssessments.status.${assessment.status}`)}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                            <div 
                              className="bg-vendorsoluce-green h-2 rounded-full" 
                              style={{ width: `${assessment.progress}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-900 dark:text-white font-medium">
                            {assessment.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {assessment.dueDate ? new Date(assessment.dueDate).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {assessment.overallScore ? (
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {assessment.overallScore}%
                          </span>
                        ) : (
                          <span className="text-sm text-gray-500 dark:text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Link to={`/vendor-assessments/${assessment.id}`}>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              alert(`Send Assessment functionality will deliver the ${assessment.frameworkName} assessment to ${assessment.contactEmail}. The vendor will receive a secure portal link with login credentials and instructions for completion.`);
                            }}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Assessment Modal */}
      {showCreateModal && (
        <CreateAssessmentModal
          vendors={vendors}
          frameworks={frameworks}
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleCreateSuccess}
        />
      )}
    </main>
  );
};

export default VendorSecurityAssessments;