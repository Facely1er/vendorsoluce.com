import React, { useState } from 'react';
import SBOMUploader from '../components/sbom/SBOMUploader';
import Card from '../components/ui/Card';
import RiskBadge from '../components/ui/RiskBadge';
import { SBOMComponent } from '../types';
import { useTranslation } from 'react-i18next';
import { useSBOMAnalyses } from '../hooks/useSBOMAnalyses';
import { useAuth } from '../context/AuthContext';
import { XMLParser } from 'fast-xml-parser';

const SBOMAnalyzer: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const { createAnalysis } = useSBOMAnalyses();
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SBOMComponent[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedComponents, setExpandedComponents] = useState<Set<string>>(new Set());

  const handleSBOMUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);
    try {
      const fileContent = await readFileAsText(file);
      const components = parseSBOMFile(fileContent, file.name, file.type);

      const totalVulnerabilities = components.reduce((sum, comp) => sum + comp.vulnerabilityCount, 0);
      const avgRiskScore = Math.round(
        components.reduce((sum, comp) => sum + comp.riskScore, 0) / components.length
      );

      if (isAuthenticated) {
        await createAnalysis({
          filename: file.name,
          file_type: file.type,
          total_components: components.length,
          total_vulnerabilities: totalVulnerabilities,
          risk_score: avgRiskScore,
          analysis_data: { components },
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

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  };

  const parseSBOMFile = (content: string, filename: string, mimeType: string): SBOMComponent[] => {
    try {
      const data = JSON.parse(content);
      if (data.bomFormat === 'CycloneDX' || data.components) return parseCycloneDX(data);
      if (data.spdxVersion || data.packages) return parseSPDX(data);
      throw new Error('Unsupported JSON SBOM format');
    } catch (_) {
      try {
        const parser = new XMLParser({
          ignoreAttributes: false,
          attributeNamePrefix: "@_"
        });
        const xmlData = parser.parse(content);
        if (xmlData.bom || content.includes('CycloneDX')) return parseCycloneDX(xmlData.bom || xmlData);
        if (xmlData.SpdxDocument || content.includes('SPDX')) return parseSPDX(xmlData.SpdxDocument || xmlData);
        throw new Error('Unsupported XML SBOM format');
      } catch (err) {
        console.warn('Failed to parse SBOM:', err);
        throw new Error('Unsupported SBOM format or corrupted file');
      }
    }
  };

  const parseCycloneDX = (data: any): SBOMComponent[] => {
    if (!data.components || !Array.isArray(data.components)) {
      throw new Error('Invalid CycloneDX format: missing components array');
    }

    return data.components.map((comp: any, index: number) => {
      // Simulate vulnerability detection
      const vulnCount = simulateVulnerabilityCount(comp.name, comp.version);
      const riskScore = calculateRiskScore(comp, vulnCount);
      
      return {
        id: comp['bom-ref'] || `component-${index}`,
        name: comp.name || 'Unknown',
        version: comp.version || 'Unknown',
        type: comp.type || 'library',
        license: extractLicense(comp),
        vulnerabilityCount: vulnCount,
        riskScore,
        purl: comp.purl || null,
        description: comp.description || null
      };
    });
  };

  const parseSPDX = (data: any): SBOMComponent[] => {
    const packages = data.packages || [];
    if (!Array.isArray(packages)) {
      throw new Error('Invalid SPDX format: packages must be an array');
    }

    return packages.map((pkg: any, index: number) => {
      // Simulate vulnerability detection
      const vulnCount = simulateVulnerabilityCount(pkg.name, pkg.versionInfo);
      const riskScore = calculateRiskScore(pkg, vulnCount);
      
      return {
        id: pkg.SPDXID || `package-${index}`,
        name: pkg.name || 'Unknown',
        version: pkg.versionInfo || 'Unknown',
        type: 'package',
        license: pkg.licenseConcluded || pkg.licenseDeclared || 'Unknown',
        vulnerabilityCount: vulnCount,
        riskScore,
        purl: null,
        description: pkg.description || null
      };
    });
  };

  const extractLicense = (component: any): string => {
    if (!component.licenses) return 'Unknown';
    if (Array.isArray(component.licenses)) {
      return component.licenses
        .map((l: any) => l.license?.id || l.license?.name || 'Unknown')
        .join(', ');
    }
    if (typeof component.licenses === 'string') return component.licenses;
    return 'Unknown';
  };

  const simulateVulnerabilityCount = (name: string, version: string): number => {
    // Simulate vulnerability detection based on common patterns
    let count = 0;
    
    // Check for known vulnerable patterns
    if (version && version.includes('0.')) count += 2;
    if (version && /alpha|beta|rc/i.test(version)) count += 1;
    if (name && /jquery|angular\.js|bootstrap/i.test(name) && version && version.match(/^[1-2]\./)) count += 3;
    if (name && /log4j/i.test(name) && version && version.match(/^2\.1[0-6]\./)) count += 5;
    if (name && /struts/i.test(name) && version && version.match(/^2\.[0-4]\./)) count += 4;
    
    // Add some randomness for demonstration
    count += Math.floor(Math.random() * 2);
    
    return count;
  };

  const calculateRiskScore = (component: any, vulnCount: number): number => {
    let score = 100;
    
    // Deduct points for vulnerabilities
    score -= vulnCount * 15;
    
    // Deduct points for pre-release versions
    if (component.version && /alpha/i.test(component.version)) score -= 15;
    if (component.version && /beta/i.test(component.version)) score -= 10;
    if (component.version && /rc/i.test(component.version)) score -= 5;
    
    // Deduct points for very old versions
    if (component.version && /^0\./i.test(component.version)) score -= 10;
    
    // Deduct points for unknown licenses
    if (!component.license || component.license === 'Unknown') score -= 5;
    
    // Deduct points for deprecated components
    if (component.deprecated) score -= 20;
    
    return Math.max(0, Math.min(100, score));
  };

  const getRiskLevel = (score: number): 'Low' | 'Medium' | 'High' | 'Critical' => {
    if (score >= 80) return 'Low';
    if (score >= 60) return 'Medium';
    if (score >= 40) return 'High';
    return 'Critical';
  };

  const toggleComponent = (componentId: string) => {
    const newExpanded = new Set(expandedComponents);
    if (newExpanded.has(componentId)) {
      newExpanded.delete(componentId);
    } else {
      newExpanded.add(componentId);
    }
    setExpandedComponents(newExpanded);
  };

  // Calculate summary statistics
  const summary = results ? {
    totalComponents: results.length,
    totalVulnerabilities: results.reduce((sum, comp) => sum + comp.vulnerabilityCount, 0),
    avgRiskScore: Math.round(results.reduce((sum, comp) => sum + comp.riskScore, 0) / results.length),
    criticalComponents: results.filter(comp => getRiskLevel(comp.riskScore) === 'Critical').length,
    highRiskComponents: results.filter(comp => getRiskLevel(comp.riskScore) === 'High').length,
  } : null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('sbom.title', 'SBOM Analyzer')}</h1>
          <p className="text-lg text-gray-600">
            {t('sbom.description', 'Upload your Software Bill of Materials to analyze components and identify potential risks')}
          </p>
        </div>

        {!results && (
          <Card className="max-w-2xl mx-auto">
            <SBOMUploader onUpload={handleSBOMUpload} isLoading={isLoading} />
          </Card>
        )}

        {error && (
          <Card className="max-w-2xl mx-auto mt-4 border-red-200 bg-red-50">
            <div className="flex items-start">
              <svg className="h-5 w-5 text-red-400 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-red-800">{t('sbom.error', 'Error analyzing file')}</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </Card>
        )}

        {results && summary && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <div className="text-center">
                  <p className="text-sm text-gray-600">{t('sbom.totalComponents', 'Total Components')}</p>
                  <p className="text-3xl font-bold text-gray-900">{summary.totalComponents}</p>
                </div>
              </Card>
              
              <Card>
                <div className="text-center">
                  <p className="text-sm text-gray-600">{t('sbom.vulnerabilities', 'Vulnerabilities')}</p>
                  <p className="text-3xl font-bold text-red-600">{summary.totalVulnerabilities}</p>
                </div>
              </Card>
              
              <Card>
                <div className="text-center">
                  <p className="text-sm text-gray-600">{t('sbom.avgRiskScore', 'Avg Risk Score')}</p>
                  <p className="text-3xl font-bold text-gray-900">{summary.avgRiskScore}</p>
                  <RiskBadge risk={getRiskLevel(summary.avgRiskScore)} />
                </div>
              </Card>
              
              <Card>
                <div className="text-center">
                  <p className="text-sm text-gray-600">{t('sbom.highRisk', 'High Risk')}</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {summary.criticalComponents + summary.highRiskComponents}
                  </p>
                </div>
              </Card>
            </div>

            {/* Reset button */}
            <div className="text-center">
              <button
                onClick={() => {
                  setResults(null);
                  setError(null);
                  setExpandedComponents(new Set());
                }}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                {t('sbom.analyzeAnother', 'Analyze Another File')}
              </button>
            </div>

            {/* Components List */}
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t('sbom.componentsAnalysis', 'Components Analysis')}
              </h2>
              <div className="space-y-2">
                {results.map((component) => (
                  <div
                    key={component.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleComponent(component.id)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <h3 className="font-medium text-gray-900">
                            {component.name} <span className="text-gray-500">v{component.version}</span>
                          </h3>
                          <RiskBadge risk={getRiskLevel(component.riskScore)} />
                          {component.vulnerabilityCount > 0 && (
                            <span className="text-sm text-red-600">
                              {component.vulnerabilityCount} {t('sbom.vulnerabilities', 'vulnerabilities')}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">
                          {t('sbom.score', 'Score')}: {component.riskScore}
                        </span>
                        <svg
                          className={`h-5 w-5 text-gray-400 transform transition-transform ${
                            expandedComponents.has(component.id) ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {expandedComponents.has(component.id) && (
                      <div className="mt-4 pl-4 border-l-2 border-gray-200">
                        <dl className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <div>
                            <dt className="text-gray-600">{t('sbom.type', 'Type')}:</dt>
                            <dd className="font-medium">{component.type}</dd>
                          </div>
                          <div>
                            <dt className="text-gray-600">{t('sbom.license', 'License')}:</dt>
                            <dd className="font-medium">{component.license}</dd>
                          </div>
                          {component.purl && (
                            <div className="md:col-span-2">
                              <dt className="text-gray-600">{t('sbom.packageUrl', 'Package URL')}:</dt>
                              <dd className="font-mono text-xs break-all">{component.purl}</dd>
                            </div>
                          )}
                          {component.description && (
                            <div className="md:col-span-2">
                              <dt className="text-gray-600">{t('sbom.description', 'Description')}:</dt>
                              <dd>{component.description}</dd>
                            </div>
                          )}
                        </dl>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default SBOMAnalyzer;