import React from 'react';
import { VendorRisk } from '../../types';
import RiskBadge from '../ui/RiskBadge';
import { useTranslation } from 'react-i18next';

interface VendorRiskTableProps {
  vendors: VendorRisk[];
}

const VendorRiskTable: React.FC<VendorRiskTableProps> = ({ vendors }) => {
  const { t } = useTranslation();
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {t('vendorRisk.table.vendor')}
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {t('vendorRisk.table.riskScore')}
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {t('vendorRisk.table.riskLevel')}
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {t('vendorRisk.table.complianceStatus')}
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {t('vendorRisk.table.lastAssessment')}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {vendors.map((vendor) => (
            <tr key={vendor.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900 dark:text-white">{vendor.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div 
                    className={`h-2 w-16 rounded ${
                      vendor.riskScore >= 80 ? 'bg-green-500' : 
                      vendor.riskScore >= 60 ? 'bg-yellow-500' : 
                      vendor.riskScore >= 40 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                  >
                    <div 
                      className="h-full rounded bg-green-500" 
                      style={{ width: `${vendor.riskScore}%` }}
                    ></div>
                  </div>
                  <span className="ml-3 text-gray-900 dark:text-white font-medium">{vendor.riskScore}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <RiskBadge level={vendor.riskLevel} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  vendor.complianceStatus === 'Compliant' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' :
                  vendor.complianceStatus === 'Partial' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400' :
                  'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                }`}>
                  {vendor.complianceStatus}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {vendor.lastAssessment}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorRiskTable;