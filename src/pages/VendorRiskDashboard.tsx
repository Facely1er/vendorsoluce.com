import React from 'react';
import Card from '../components/ui/Card';
import VendorRiskTable from '../components/vendor/VendorRiskTable';
import { VendorRisk } from '../types';
import Button from '../components/ui/Button';
import { useTranslation } from 'react-i18next';

// Mock vendor data
const vendors: VendorRisk[] = [
  {
    id: '1',
    name: 'Acme Cloud Services',
    riskScore: 85,
    lastAssessment: '2025-04-15',
    complianceStatus: 'Compliant',
    riskLevel: 'Low'
  },
  {
    id: '2',
    name: 'TechSupply Inc.',
    riskScore: 72,
    lastAssessment: '2025-04-02',
    complianceStatus: 'Partial',
    riskLevel: 'Medium'
  },
  {
    id: '3',
    name: 'Global Data Systems',
    riskScore: 35,
    lastAssessment: '2025-03-18',
    complianceStatus: 'Non-Compliant',
    riskLevel: 'Critical'
  },
  {
    id: '4',
    name: 'Secure Networks LLC',
    riskScore: 90,
    lastAssessment: '2025-04-10',
    complianceStatus: 'Compliant',
    riskLevel: 'Low'
  },
  {
    id: '5',
    name: 'DataCore Solutions',
    riskScore: 65,
    lastAssessment: '2025-03-25',
    complianceStatus: 'Partial',
    riskLevel: 'Medium'
  },
  {
    id: '6',
    name: 'Cloud Nexus Partners',
    riskScore: 42,
    lastAssessment: '2025-02-28',
    complianceStatus: 'Non-Compliant',
    riskLevel: 'High'
  }
];

const VendorRiskDashboard: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t('vendorRisk.title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
          {t('vendorRisk.description')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{t('vendorRisk.totalVendors')}</h2>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{vendors.length}</p>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">{t('vendorRisk.monitoredVendors')}</div>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{t('vendorRisk.riskOverview')}</h2>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center p-2 rounded-md bg-red-50 dark:bg-red-900/20">
              <span className="text-xl font-bold text-red-600 dark:text-red-400">
                {vendors.filter(v => v.riskLevel === 'Critical' || v.riskLevel === 'High').length}
              </span>
              <div className="text-xs text-red-600 dark:text-red-400">{t('vendorRisk.highRisk')}</div>
            </div>
            <div className="text-center p-2 rounded-md bg-yellow-50 dark:bg-yellow-900/20">
              <span className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
                {vendors.filter(v => v.riskLevel === 'Medium').length}
              </span>
              <div className="text-xs text-yellow-600 dark:text-yellow-400">{t('vendorRisk.mediumRisk')}</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{t('vendorRisk.complianceStatus')}</h2>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-2 rounded-md bg-green-50 dark:bg-green-900/20">
              <span className="text-xl font-bold text-green-600 dark:text-green-400">
                {vendors.filter(v => v.complianceStatus === 'Compliant').length}
              </span>
              <div className="text-xs text-green-600 dark:text-green-400">{t('vendorRisk.compliant')}</div>
            </div>
            <div className="text-center p-2 rounded-md bg-yellow-50 dark:bg-yellow-900/20">
              <span className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
                {vendors.filter(v => v.complianceStatus === 'Partial').length}
              </span>
              <div className="text-xs text-yellow-600 dark:text-yellow-400">{t('vendorRisk.partial')}</div>
            </div>
            <div className="text-center p-2 rounded-md bg-red-50 dark:bg-red-900/20">
              <span className="text-xl font-bold text-red-600 dark:text-red-400">
                {vendors.filter(v => v.complianceStatus === 'Non-Compliant').length}
              </span>
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
              <Button variant="primary" size="sm">
                {t('vendorRisk.addNewVendor')}
              </Button>
            </div>
          </div>
        </div>
        
        <VendorRiskTable vendors={vendors} />
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
    </main>
  );
};

export default VendorRiskDashboard;