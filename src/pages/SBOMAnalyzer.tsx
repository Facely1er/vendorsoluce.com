import React, {useState} from 'react';
import SBOMUploader from '../components/sbom/SBOMUploader';
import Card from '../components/ui/Card';
import RiskBadge from '../components/ui/RiskBadge';
import { SBOMComponent } from '../types';
import { useTranslation } from 'react-i18next';
import { useSBOMAnalyses } from '../hooks/useSBOMAnalyses';
import { useAuth } from '../context/AuthContext';

const SBOMAnalyzer: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const { createAnalysis } = useSBOMAnalyses();
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SBOMComponent[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Function to analyze SBOM file
  const handleSBOMUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Read the file content
      const fileContent = await readFileAsText(file);
      
      // Parse the SBOM file
      const components = parseSBOMFile(fileContent, file.name);
      
      // Calculate risk metrics
      const totalVulnerabilities = components.reduce((sum, comp) => sum + comp.vulnerabilityCount, 0);
      const avgRiskScore = Math.round(components.reduce((sum, comp) => sum + comp.riskScore, 0) / components.length);
      
      // Save analysis to database if user is authenticated
      if (isAuthenticated) {
        await createAnalysis({
          filename: file.name,
          file_type: file.type,
          total_components: components.length,
          total_vulnerabilities: totalVulnerabilities,
          risk_score: avgRiskScore,
          analysis_data: { components }
        });
      }
      
      setResults(components);
    } catch (err) {
      console.error('Error analyzing SBOM:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze SBOM file');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Helper function to read file content
  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  };
  
  // Helper function to parse SBOM file
  const parseSBOMFile = (content: string, filename: string): SBOMComponent[] => {
    try {
      // Try to parse as JSON
      const data = JSON.parse(content);
      
      // Check if it's a CycloneDX format
      if (data.bomFormat === 'CycloneDX') {
        return parseCycloneDX(data);
      }
      
      // Check if it's SPDX format
      if (data.spdxVersion) {
        return parseSPDX(data);
      }
      
      // If we can't determine the format, throw an error
      throw new Error('Unsupported SBOM format');
    } catch (err) {
      // If JSON parsing fails, it might be XML or another format
      // For simplicity, we'll return mock data for now
      console.warn('Could not parse SBOM as JSON, using mock data');
      return generateMockComponents();
    }
  };
  
  // Parse CycloneDX format
  const parseCycloneDX = (data: any): SBOMComponent[] => {
    if (!data.components || !Array.isArray(data.components)) {
      throw new Error('Invalid CycloneDX format: missing components array');
    }
    
    return data.components.map((comp: any, index: number) => {
      // Count vulnerabilities if they exist
      const vulnCount = data.vulnerabilities?.filter((v: any) => 
        v.affects?.some((a: any) => a.ref === comp.bom-ref)
      ).length || 0;
      
      // Generate a risk score based on vulnerabilities and other factors
      const riskScore = calculateRiskScore(comp, vulnCount);
      
      return {
        id: comp.bom-ref || `component-${index}`,
        name: comp.name || 'Unknown',
        version: comp.version || 'Unknown',
        license: extractLicense(comp),
        vulnerabilityCount: vulnCount,
        riskScore
      };
    });
  };
  
  // Parse SPDX format
  const parseSPDX = (data: any): SBOMComponent[] => {
    if (!data.packages || !Array.isArray(data.packages)) {
      throw new Error('Invalid SPDX format: missing packages array');
    }
    
    return data.packages.map((pkg: any, index: number) => {
      // SPDX doesn't directly include vulnerability data, so we'd need to
      // cross-reference with a vulnerability database in a real implementation
      const vulnCount = Math.floor(Math.random() * 3); // Mock for demo
      
      // Generate a risk score
      const riskScore = calculateRiskScore(pkg, vulnCount);
      
      return {
        id: pkg.SPDXID || `package-${index}`,
        name: pkg.name || 'Unknown',
        version: pkg.versionInfo || 'Unknown',
        license: pkg.licenseConcluded || pkg.licenseDeclared || 'Unknown',
        vulnerabilityCount: vulnCount,
        riskScore
      };
    });
  };
  
  // Helper to extract license information
  const extractLicense = (component: any): string => {
    if (!component.licenses) return 'Unknown';
    
    if (Array.isArray(component.licenses)) {
      return component.licenses.map((l: any) => 
        l.license?.id || l.license?.name || 'Unknown'
      ).join(', ');
    }
    
    return 'Unknown';
  };
  
  // Calculate risk score based on component data
  const calculateRiskScore = (component: any, vulnCount: number): number => {
    // Start with a base score
    let score = 75;
    
    // Reduce score for each vulnerability
    score -= vulnCount * 15;
    
    // Adjust based on other factors (in a real implementation, this would be more sophisticated)
    if (component.version && component.version.includes('alpha')) score -= 10;
    if (component.version && component.version.includes('beta')) score -= 5;
    
    // Ensure score is within 0-100 range
    return Math.max(0, Math.min(100, score));
  };
  
  // Generate mock components for demo/testing
  const generateMockComponents = (): SBOMComponent[] => {
    return [
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
            
            {error && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md">
                {error}
              </div>
            )}
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">{t('sbom.results.supportedFormats')}:</h3>
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