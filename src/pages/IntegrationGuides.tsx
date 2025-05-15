import React, { useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const IntegrationGuides: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Scroll to section when hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          // Add a slight delay to ensure smooth scrolling after page renders
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };

    // Handle initial hash on page load
    handleHashChange();
    
    // Add event listener for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    // Clean up
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Handle contact support button click
  const handleContactSupport = () => {
    navigate('/contact');
  };

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t('resources.integrationGuides.title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
          {t('resources.integrationGuides.description')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-8">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{t('resources.integrationGuides.availableIntegrations')}</h2>
            <nav className="space-y-1">
              <a href="#grc-platforms" className="block px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium">{t('resources.integrationGuides.sections.grcPlatforms')}</a>
              <a href="#procurement-systems" className="block px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium">{t('resources.integrationGuides.sections.procurementSystems')}</a>
              <a href="#api-integrations" className="block px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium">{t('resources.integrationGuides.sections.apiIntegrations')}</a>
              <a href="#siem-security" className="block px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium">{t('resources.integrationGuides.sections.siemSecurity')}</a>
              <a href="#cicd-pipelines" className="block px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium">{t('resources.integrationGuides.sections.cicdPipelines')}</a>
              <a href="#data-export" className="block px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium">{t('resources.integrationGuides.sections.dataExport')}</a>
            </nav>
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">{t('resources.integrationGuides.needCustomIntegration')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {t('resources.integrationGuides.customIntegrationDescription')}
              </p>
              <Button 
                variant="primary" 
                size="sm" 
                className="w-full"
                onClick={handleContactSupport}
              >
                {t('resources.integrationGuides.contactSupport')}
              </Button>
            </div>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <section id="grc-platforms">
            <Card className="p-6 mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{t('resources.integrationGuides.sections.grcPlatforms')}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t('resources.integrationGuides.grcPlatforms.description')}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t('resources.integrationGuides.grcPlatforms.serviceNow.title')}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {t('resources.integrationGuides.grcPlatforms.serviceNow.description')}
                  </p>
                  <a href="#" className="text-supply-chain-teal hover:text-supply-chain-teal/80 text-sm font-medium">
                    {t('resources.integrationGuides.viewGuide')} →
                  </a>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t('resources.integrationGuides.grcPlatforms.metricstream.title')}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {t('resources.integrationGuides.grcPlatforms.metricstream.description')}
                  </p>
                  <a href="#" className="text-supply-chain-teal hover:text-supply-chain-teal/80 text-sm font-medium">
                    {t('resources.integrationGuides.viewGuide')} →
                  </a>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t('resources.integrationGuides.grcPlatforms.archer.title')}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {t('resources.integrationGuides.grcPlatforms.archer.description')}
                  </p>
                  <a href="#" className="text-supply-chain-teal hover:text-supply-chain-teal/80 text-sm font-medium">
                    {t('resources.integrationGuides.viewGuide')} →
                  </a>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t('resources.integrationGuides.grcPlatforms.logicgate.title')}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {t('resources.integrationGuides.grcPlatforms.logicgate.description')}
                  </p>
                  <a href="#" className="text-supply-chain-teal hover:text-supply-chain-teal/80 text-sm font-medium">
                    {t('resources.integrationGuides.viewGuide')} →
                  </a>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md border border-gray-200 dark:border-gray-600">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t('resources.integrationGuides.integrationBenefits')}</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <li>{t('resources.integrationGuides.grcPlatforms.benefits.centralize')}</li>
                  <li>{t('resources.integrationGuides.grcPlatforms.benefits.eliminate')}</li>
                  <li>{t('resources.integrationGuides.grcPlatforms.benefits.standardize')}</li>
                  <li>{t('resources.integrationGuides.grcPlatforms.benefits.generate')}</li>
                </ul>
              </div>
            </Card>
          </section>
          
          <section id="procurement-systems">
            <Card className="p-6 mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{t('resources.integrationGuides.sections.procurementSystems')}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t('resources.integrationGuides.procurementSystems.description')}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t('resources.integrationGuides.procurementSystems.sapAriba.title')}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {t('resources.integrationGuides.procurementSystems.sapAriba.description')}
                  </p>
                  <a href="#" className="text-supply-chain-teal hover:text-supply-chain-teal/80 text-sm font-medium">
                    {t('resources.integrationGuides.viewGuide')} →
                  </a>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t('resources.integrationGuides.procurementSystems.coupa.title')}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {t('resources.integrationGuides.procurementSystems.coupa.description')}
                  </p>
                  <a href="#" className="text-supply-chain-teal hover:text-supply-chain-teal/80 text-sm font-medium">
                    {t('resources.integrationGuides.viewGuide')} →
                  </a>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t('resources.integrationGuides.procurementSystems.jaggaer.title')}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {t('resources.integrationGuides.procurementSystems.jaggaer.description')}
                  </p>
                  <a href="#" className="text-supply-chain-teal hover:text-supply-chain-teal/80 text-sm font-medium">
                    {t('resources.integrationGuides.viewGuide')} →
                  </a>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t('resources.integrationGuides.procurementSystems.oracle.title')}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {t('resources.integrationGuides.procurementSystems.oracle.description')}
                  </p>
                  <a href="#" className="text-supply-chain-teal hover:text-supply-chain-teal/80 text-sm font-medium">
                    {t('resources.integrationGuides.viewGuide')} →
                  </a>
                </div>
              </div>
            </Card>
          </section>
          
          <section id="api-integrations">
            <Card className="p-6 mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{t('resources.integrationGuides.sections.apiIntegrations')}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t('resources.integrationGuides.apiIntegrations.description')}
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md border border-gray-200 dark:border-gray-600 mb-6">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t('resources.integrationGuides.apiIntegrations.keyScenarios')}</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <li>{t('resources.integrationGuides.apiIntegrations.scenarios.automate')}</li>
                  <li>{t('resources.integrationGuides.apiIntegrations.scenarios.integrate')}</li>
                  <li>{t('resources.integrationGuides.apiIntegrations.scenarios.embed')}</li>
                  <li>{t('resources.integrationGuides.apiIntegrations.scenarios.build')}</li>
                  <li>{t('resources.integrationGuides.apiIntegrations.scenarios.autoReview')}</li>
                </ul>
              </div>
              
              <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">{t('resources.integrationGuides.apiIntegrations.example.title')}</h3>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700 mb-4">
                <pre className="text-sm text-gray-800 dark:text-gray-300 overflow-x-auto">
                  <code>
                    {`// Example NodeJS integration with VendorSoluce API
const fetch = require('node-fetch');

async function getVendorRiskScore(vendorId) {
  const response = await fetch(
    \`https://api.vendorsoluce.com/api/vendors/\${vendorId}/risk-score\`, 
    {
      headers: {
        'Authorization': \`Bearer \${process.env.VENDORSOLUCE_API_KEY}\`,
        'Content-Type': 'application/json'
      }
    }
  );
  
  if (!response.ok) {
    throw new Error(\`API error: \${response.status}\`);
  }
  
  return await response.json();
}

// Use in your application
async function approveVendor(vendorId) {
  try {
    const riskData = await getVendorRiskScore(vendorId);
    
    if (riskData.riskLevel === 'Low' || riskData.riskLevel === 'Medium') {
      // Automatically approve vendor
      return true;
    } else {
      // Require additional review for high-risk vendors
      return false;
    }
  } catch (error) {
    console.error('Error fetching vendor risk data:', error);
    return false;
  }
}`}
                  </code>
                </pre>
              </div>
              
              <div className="flex items-center justify-between">
                <Link to="/api-docs" className="text-vendortal-navy dark:text-trust-blue hover:text-vendortal-navy/80 dark:hover:text-trust-blue/80 font-medium">
                  {t('resources.integrationGuides.apiIntegrations.viewFullDocs')} →
                </Link>
                <Button variant="outline" size="sm">{t('resources.integrationGuides.apiIntegrations.downloadClient')}</Button>
              </div>
            </Card>
          </section>
          
          <section id="siem-security">
            <Card className="p-6 mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{t('resources.integrationGuides.sections.siemSecurity')}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t('resources.integrationGuides.siemSecurity.description')}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t('resources.integrationGuides.siemSecurity.splunk.title')}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {t('resources.integrationGuides.siemSecurity.splunk.description')}
                  </p>
                  <a href="#" className="text-supply-chain-teal hover:text-supply-chain-teal/80 text-sm font-medium">
                    {t('resources.integrationGuides.viewGuide')} →
                  </a>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t('resources.integrationGuides.siemSecurity.elastic.title')}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {t('resources.integrationGuides.siemSecurity.elastic.description')}
                  </p>
                  <a href="#" className="text-supply-chain-teal hover:text-supply-chain-teal/80 text-sm font-medium">
                    {t('resources.integrationGuides.viewGuide')} →
                  </a>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t('resources.integrationGuides.siemSecurity.qradar.title')}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {t('resources.integrationGuides.siemSecurity.qradar.description')}
                  </p>
                  <a href="#" className="text-supply-chain-teal hover:text-supply-chain-teal/80 text-sm font-medium">
                    {t('resources.integrationGuides.viewGuide')} →
                  </a>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t('resources.integrationGuides.siemSecurity.sentinel.title')}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {t('resources.integrationGuides.siemSecurity.sentinel.description')}
                  </p>
                  <a href="#" className="text-supply-chain-teal hover:text-supply-chain-teal/80 text-sm font-medium">
                    {t('resources.integrationGuides.viewGuide')} →
                  </a>
                </div>
              </div>
            </Card>
          </section>
          
          <section id="cicd-pipelines">
            <Card className="p-6 mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{t('resources.integrationGuides.sections.cicdPipelines')}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t('resources.integrationGuides.cicdPipelines.description')}
              </p>
              
              <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 text-center">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t('resources.integrationGuides.cicdPipelines.jenkins.title')}</h3>
                    <a href="#" className="text-supply-chain-teal hover:text-supply-chain-teal/80 text-sm font-medium">
                      {t('resources.integrationGuides.viewGuide')} →
                    </a>
                  </div>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 text-center">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t('resources.integrationGuides.cicdPipelines.gitlab.title')}</h3>
                    <a href="#" className="text-supply-chain-teal hover:text-supply-chain-teal/80 text-sm font-medium">
                      {t('resources.integrationGuides.viewGuide')} →
                    </a>
                  </div>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 text-center">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t('resources.integrationGuides.cicdPipelines.azureDevOps.title')}</h3>
                    <a href="#" className="text-supply-chain-teal hover:text-supply-chain-teal/80 text-sm font-medium">
                      {t('resources.integrationGuides.viewGuide')} →
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </section>
          
          <section id="data-export">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{t('resources.integrationGuides.sections.dataExport')}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t('resources.integrationGuides.dataExport.description')}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t('resources.integrationGuides.dataExport.exportFormats.title')}</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>{t('resources.integrationGuides.dataExport.exportFormats.csv')}</li>
                    <li>{t('resources.integrationGuides.dataExport.exportFormats.json')}</li>
                    <li>{t('resources.integrationGuides.dataExport.exportFormats.pdf')}</li>
                    <li>{t('resources.integrationGuides.dataExport.exportFormats.excel')}</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t('resources.integrationGuides.dataExport.importFormats.title')}</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>{t('resources.integrationGuides.dataExport.importFormats.csv')}</li>
                    <li>{t('resources.integrationGuides.dataExport.importFormats.json')}</li>
                    <li>{t('resources.integrationGuides.dataExport.importFormats.sbom')}</li>
                    <li>{t('resources.integrationGuides.dataExport.importFormats.xml')}</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t('resources.integrationGuides.dataExport.automatedExport')}</h3>
                <pre className="text-sm text-gray-800 dark:text-gray-300 overflow-x-auto">
                  <code>
                    {`# Automated data export script (example)
curl -X GET "https://api.vendorsoluce.com/api/export/vendors" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Accept: application/json" \\
  -o "vendors_export_$(date +%Y%m%d).json"`}
                  </code>
                </pre>
              </div>
            </Card>
          </section>
        </div>
      </div>
    </main>
  );
};

export default IntegrationGuides;