import React, { useState } from 'react';
import SBOMUploader from '../components/sbom/SBOMUploader';
import Card from '../components/ui/Card';
import RiskBadge from '../components/ui/RiskBadge';
import { SBOMComponent } from '../types';
import { useTranslation } from 'react-i18next';

const SBOMAnalyzer: React.FC = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SBOMComponent[] | null>(null);
  
  // Mock analysis function - in a real app, this would call an API
  const handleSBOMUpload = (file: File) => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Mock results
      const mockResults: SBOMComponent[] = [
        {
          id: '1',
          name: 'log4j-core',
          version: '2.14.1',
          license: 'Apache-2.0',
          vulnerabilityCount: 3,
          riskScore: 25
        },
        {
          id: '2',
          name: 'react',
          version: '17.0.2',
          license: 'MIT',
          vulnerabilityCount: 0,
          riskScore: 85
        },
        {
          id: '3',
          name: 'lodash',
          version: '4.17.15',
          license: 'MIT',
          vulnerabilityCount: 1,
          riskScore: 65
        },
        {
          id: '4',
          name: 'axios',
          version: '0.21.1',
          license: 'MIT',
          vulnerabilityCount: 2,
          riskScore: 45
        },
        {
          id: '5',
          name: 'express',
          version: '4.17.1',
          license: 'MIT',
          vulnerabilityCount: 0,
          riskScore: 90
        }
      ];
      
      setResults(mockResults);
      setIsLoading(false);
    }, 2000);
  };
  
  const getRiskLevel = (score: number): 'Low' | 'Medium' | 'High' | 'Critical' => {
    if (score >= 80) return 'Low';
    if (score >= 60) return 'Medium';
    if (score >= 40) return 'High';
    return 'Critical';
  };
  
  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t('sbom.title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
          {t('sbom.description')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{t('sbom.upload.title')}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t('sbom.upload.description')}
            </p>
            
            <SBOMUploader onUpload={handleSBOMUpload} isLoading={isLoading} />
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">{t('sbom.upload.supportedFormats')}:</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• SPDX (JSON, XML, RDF)</li>
                <li>• CycloneDX (JSON, XML)</li>
                <li>• Plain text component list</li>
              </ul>
            </div>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          {isLoading ? (
            <Card className="p-6 flex justify-center items-center h-64">
              <div className="text-center">
                <div className="spinner-border mb-3 h-8 w-8 border-b-2 border-t-2 border-supply-chain-teal rounded-full animate-spin"></div>
                <p className="text-gray-600 dark:text-gray-300">{t('sbom.upload.analyzing')}</p>
              </div>
            </Card>
          ) : results ? (
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{t('sbom.results.title')}</h2>
              
              <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('sbom.results.components')}</h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{results.length}</p>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('sbom.results.vulnerabilities')}</h3>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {results.reduce((total, comp) => total + comp.vulnerabilityCount, 0)}
                  </p>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('sbom.results.overallRisk')}</h3>
                  <div className="mt-1">
                    <RiskBadge 
                      level={getRiskLevel(
                        results.reduce((sum, comp) => sum + comp.riskScore, 0) / results.length
                      )} 
                    />
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {t('sbom.results.component')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {t('sbom.results.version')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {t('sbom.results.license')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {t('sbom.results.vulnerabilities')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {t('sbom.results.riskLevel')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {results.map((component) => (
                      <tr key={component.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900 dark:text-white">{component.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {component.version}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full">
                            {component.license}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {component.vulnerabilityCount > 0 ? (
                            <span className="text-red-600 dark:text-red-400 font-medium">{component.vulnerabilityCount}</span>
                          ) : (
                            <span className="text-green-600 dark:text-green-400">{t('sbom.results.none')}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <RiskBadge level={getRiskLevel(component.riskScore)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          ) : (
            <Card className="p-6 h-64 flex flex-col justify-center items-center text-center">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{t('sbom.upload.noSbom')}</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-md">
                {t('sbom.upload.uploadPrompt')}
              </p>
            </Card>
          )}
        </div>
      </div>
    </main>
  );
};

export default SBOMAnalyzer;