import React, { useState } from 'react';
import Card from '../components/ui/Card';
import VendorRiskTable from '../components/vendor/VendorRiskTable';
import { VendorRisk } from '../types';
import Button from '../components/ui/Button';
import { useTranslation } from 'react-i18next';
import { useVendors } from '../hooks/useVendors';
import { Plus, RefreshCw } from 'lucide-react';
import AddVendorModal from '../components/vendor/AddVendorModal';
import ThreatIntelligenceFeed from '../components/vendor/ThreatIntelligenceFeed';
import WorkflowAutomation from '../components/vendor/WorkflowAutomation';
import CustomizableDashboard from '../components/dashboard/CustomizableDashboard';
import PredictiveAnalytics from '../components/analytics/PredictiveAnalytics';
import DataImportExport from '../components/data/DataImportExport';

const VendorRiskDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { vendors, loading, error, refetch } = useVendors();
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeView, setActiveView] = useState<'dashboard' | 'workflows' | 'intelligence' | 'analytics'>('dashboard');

  // Transform vendors data to match VendorRisk interface
  const vendorRiskData: VendorRisk[] = vendors.map(vendor => ({
    id: vendor.id,
    name: vendor.name,
    riskScore: vendor.risk_score || 0,
    lastAssessment: vendor.last_assessment_date || 'Never',
    complianceStatus: (vendor.compliance_status as any) || 'Non-Compliant',
    riskLevel: (vendor.risk_level as any) || 'Medium'
  }));

  const riskCounts = {
    high: vendorRiskData.filter(v => v.riskLevel === 'Critical' || v.riskLevel === 'High').length,
    medium: vendorRiskData.filter(v => v.riskLevel === 'Medium').length,
    low: vendorRiskData.filter(v => v.riskLevel === 'Low').length,
  };

  const complianceCounts = {
    compliant: vendorRiskData.filter(v => v.complianceStatus === 'Compliant').length,
    partial: vendorRiskData.filter(v => v.complianceStatus === 'Partial').length,
    nonCompliant: vendorRiskData.filter(v => v.complianceStatus === 'Non-Compliant').length,
  };

  if (loading) {
    return (
      <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vendortal-navy"></div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">Error loading vendors: {error}</p>
          <Button onClick={refetch} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </main>
    );
  }
  
  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t('vendorRisk.title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
          {t('vendorRisk.description')}
        </p>
      </div>
      
      {/* Enhanced Navigation */}
      <div className="mb-6">
        <nav className="flex space-x-8">
          {[
            { id: 'dashboard', label: 'Overview Dashboard', icon: '📊' },
            { id: 'workflows', label: 'Workflow Automation', icon: '⚡' },
            { id: 'intelligence', label: 'Threat Intelligence', icon: '🛡️' },
            { id: 'analytics', label: 'Predictive Analytics', icon: '🔮' }
          ].map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setActiveView(id as any)}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                activeView === id
                  ? 'bg-vendortal-navy text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span className="mr-2">{icon}</span>
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Dashboard View */}
      {activeView === 'dashboard' && (
        <>
          <CustomizableDashboard />
        </>
      )}

      {/* Traditional Vendor List View */}
      {activeView === 'dashboard' && (
        <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{t('vendorRisk.totalVendors')}</h2>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{vendorRiskData.length}</p>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">{t('vendorRisk.monitoredVendors')}</div>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{t('vendorRisk.riskOverview')}</h2>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center p-2 rounded-md bg-red-50 dark:bg-red-900/20">
              <span className="text-xl font-bold text-red-600 dark:text-red-400">{riskCounts.high}</span>
              <div className="text-xs text-red-600 dark:text-red-400">{t('vendorRisk.highRisk')}</div>
            </div>
            <div className="text-center p-2 rounded-md bg-yellow-50 dark:bg-yellow-900/20">
              <span className="text-xl font-bold text-yellow-600 dark:text-yellow-400">{riskCounts.medium}</span>
              <div className="text-xs text-yellow-600 dark:text-yellow-400">{t('vendorRisk.mediumRisk')}</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{t('vendorRisk.complianceStatus')}</h2>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-2 rounded-md bg-green-50 dark:bg-green-900/20">
              <span className="text-xl font-bold text-green-600 dark:text-green-400">{complianceCounts.compliant}</span>
              <div className="text-xs text-green-600 dark:text-green-400">{t('vendorRisk.compliant')}</div>
            </div>
            <div className="text-center p-2 rounded-md bg-yellow-50 dark:bg-yellow-900/20">
              <span className="text-xl font-bold text-yellow-600 dark:text-yellow-400">{complianceCounts.partial}</span>
              <div className="text-xs text-yellow-600 dark:text-yellow-400">{t('vendorRisk.partial')}</div>
            </div>
            <div className="text-center p-2 rounded-md bg-red-50 dark:bg-red-900/20">
              <span className="text-xl font-bold text-red-600 dark:text-red-400">{complianceCounts.nonCompliant}</span>
              <div className="text-xs text-red-600 dark:text-red-400">{t('vendorRisk.nonCompliant')}</div>
            </div>
          </div>
        </Card>
      </div>
      
      <Card className="mb-8">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('vendorRisk.vendorOverview')}</h2>
            <div className="mt-4 sm:mt-0">
              <div className="flex flex-col sm:flex-row gap-2">
                <DataImportExport
                  dataType="vendors"
                  data={vendors}
                  onImportComplete={(result) => {
                    if (result.success) {
                      refetch();
                    }
                  }}
                  onRefresh={refetch}
                />
              <Button variant="primary" size="sm" onClick={() => setShowAddModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                {t('vendorRisk.addNewVendor')}
              </Button>
              </div>
            </div>
          </div>
        </div>
        
        {vendorRiskData.length > 0 ? (
          <VendorRiskTable 
            vendors={vendorRiskData}
            onRefresh={refetch}
          />
        ) : (
          <div className="p-12 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">No vendors added yet. Start by adding your first vendor.</p>
            <Button variant="primary" onClick={() => setShowAddModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add First Vendor
            </Button>
          </div>
        )}
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{t('vendorRisk.riskScoring.title')}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t('vendorRisk.riskScoring.description')}
          </p>
          <div className="space-y-3 mt-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('vendorRisk.riskScoring.lowRisk')}</span>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">{t('vendorRisk.riskScoring.excellent')}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('vendorRisk.riskScoring.mediumRisk')}</span>
                <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">{t('vendorRisk.riskScoring.acceptable')}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('vendorRisk.riskScoring.highRisk')}</span>
                <span className="text-sm font-medium text-orange-600 dark:text-orange-400">{t('vendorRisk.riskScoring.concerning')}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '50%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('vendorRisk.riskScoring.criticalRisk')}</span>
                <span className="text-sm font-medium text-red-600 dark:text-red-400">{t('vendorRisk.riskScoring.unacceptable')}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{t('vendorRisk.actions.title')}</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mt-0.5">
                <span className="text-red-600 dark:text-red-400 text-xs">!</span>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">{t('vendorRisk.actions.criticalRisk.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t('vendorRisk.actions.criticalRisk.description')}
                </p>
              </div>
            </li>
            
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mt-0.5">
                <span className="text-orange-600 dark:text-orange-400 text-xs">!</span>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">{t('vendorRisk.actions.highRisk.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t('vendorRisk.actions.highRisk.description')}
                </p>
              </div>
            </li>
            
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mt-0.5">
                <span className="text-yellow-600 dark:text-yellow-400 text-xs">!</span>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">{t('vendorRisk.actions.mediumRisk.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t('vendorRisk.actions.mediumRisk.description')}
                </p>
              </div>
            </li>
            
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5">
                <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">{t('vendorRisk.actions.lowRisk.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t('vendorRisk.actions.lowRisk.description')}
                </p>
              </div>
            </li>
          </ul>
        </Card>
      </div>
        </>
      )}

      {/* Workflow Automation View */}
      {activeView === 'workflows' && <WorkflowAutomation />}

      {/* Threat Intelligence View */}
      {activeView === 'intelligence' && (
        <div className="space-y-6">
          <ThreatIntelligenceFeed vendorIds={vendorRiskData.map(v => v.id)} />
          <Card>
            <CardHeader>
              <CardTitle>Threat Intelligence Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">5</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Active Sources</div>
                </div>
                <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">142</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Threats Today</div>
                </div>
                <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">98%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Coverage</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Predictive Analytics View */}
      {activeView === 'analytics' && <PredictiveAnalytics />}

      {showAddModal && (
        <AddVendorModal 
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowAddModal(false);
            refetch();
          }}
        />
      )}
    </main>
  );
};

export default VendorRiskDashboard;