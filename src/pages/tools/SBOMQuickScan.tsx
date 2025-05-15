import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SBOMUploader from '../../components/sbom/SBOMUploader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { useTranslation } from 'react-i18next';

const SBOMQuickScan: React.FC = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  
  // Mock handling of SBOM upload
  const handleSBOMUpload = (file: File) => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsLoading(false);
      setScanComplete(true);
    }, 2000);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-vendortal-navy dark:hover:text-trust-blue transition-colors mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('navigation.home')}
        </Link>
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{t('quickTools.sbomScan.title')}</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{t('quickTools.sbomScan.description')}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>{t('sbom.upload.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <SBOMUploader onUpload={handleSBOMUpload} isLoading={isLoading} />
            </CardContent>
          </Card>
          
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('sbom.results.supportedFormats', 'Supported Formats')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• SPDX (JSON, XML, RDF)</li>
                  <li>• CycloneDX (JSON, XML)</li>
                  <li>• Plain text component list</li>
                </ul>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  {t('quickTools.sbomScan.formatInfo', 'For best results, use SPDX or CycloneDX formats that include component versions, licenses, and dependencies.')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          {isLoading ? (
            <Card className="h-64 flex justify-center items-center">
              <div className="text-center">
                <div className="spinner-border mb-3 h-8 w-8 border-b-2 border-t-2 border-supply-chain-teal rounded-full animate-spin"></div>
                <p className="text-gray-600 dark:text-gray-300">{t('sbom.upload.analyzing')}</p>
              </div>
            </Card>
          ) : scanComplete ? (
            <Card>
              <CardHeader>
                <CardTitle>{t('sbom.results.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-4 mb-6">
                  <p className="font-medium text-green-800 dark:text-green-400">
                    {t('quickTools.sbomScan.scanComplete', 'SBOM scan completed successfully!')}
                  </p>
                  <p className="text-green-700 dark:text-green-300 mt-1">
                    {t('quickTools.sbomScan.noVulnerabilities', 'No critical vulnerabilities detected in your SBOM.')}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('sbom.results.components')}</p>
                    <p className="text-2xl font-bold">42</p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('sbom.results.licenses')}</p>
                    <p className="text-2xl font-bold">4</p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('sbom.results.vulnerabilities')}</p>
                    <p className="text-2xl font-bold">0</p>
                  </div>
                </div>
                
                <Link to="/sbom-analyzer">
                  <button className="w-full bg-supply-chain-teal hover:bg-supply-chain-teal/90 text-white py-2 rounded-md transition">
                    {t('quickTools.sbomScan.fullAnalysis', 'Run Full SBOM Analysis')}
                  </button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-64 flex flex-col justify-center items-center text-center">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{t('sbom.upload.noSbom')}</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-md px-6">
                {t('sbom.upload.uploadPrompt')}
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SBOMQuickScan;