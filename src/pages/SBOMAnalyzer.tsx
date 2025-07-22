import React, { useState } from 'react';
import { Upload, FileText, AlertCircle, Shield, Package, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import RiskBadge from '../components/ui/RiskBadge';
import SBOMUploader from '../components/sbom/SBOMUploader';
import { useTranslation } from 'react-i18next';
import { useSBOMAnalyses } from '../hooks/useSBOMAnalyses';
import { useAuth } from '../context/AuthContext';
import { XMLParser } from 'fast-xml-parser';

const SBOMAnalyzer = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const { createAnalysis } = useSBOMAnalyses();
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [expandedComponents, setExpandedComponents] = useState(new Set());

  const handleSBOMUpload = async (file) => {
    setIsLoading(true);
    setError(null);
    setResults(null);
    
    try {
      const fileContent = await readFileAsText(file);
      const components = parseSBOMFile(fileContent, file.name, file.type);
      
      const totalVulnerabilities = components.reduce((sum, comp) => sum + comp.vulnerabilityCount, 0);
      const avgRiskScore = Math.round(
        components.reduce((sum, comp) => sum + comp.riskScore, 0) / components.length
      );
      
      // Save analysis to database if user is authenticated
      if (isAuthenticated) {
        await createAnalysis({
          filename: file.name,
          file_type: file.type,
          total_components: components.length,
          total_vulnerabilities: totalVulnerabilities,
          risk_score: avgRiskScore,
          analysis_data: { components, totalVulnerabilities, avgRiskScore }
        });
      }
      
      setResults({
        filename: file.name,
        components,
        totalComponents: components.length,
        totalVulnerabilities,
        avgRiskScore,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      console.error('Error analyzing SBOM:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze SBOM file');
    } finally {
      setIsLoading(false);
    }
  };

  const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  };

  const parseSBOMFile = (content, filename, mimeType) => {
    try {
      const data = JSON.parse(content);
      if (data.bomFormat === 'CycloneDX' || data.components) return parseCycloneDX(data);
      if (data.spdxVersion || data.packages) return parseSPDX(data);
      throw new Error('Unsupported JSON SBOM format');
    } catch (_) {
      // Simple XML parsing fallback
      if (content.includes('<bom>') || content.includes('CycloneDX')) {
        return parseXMLCycloneDX(content);
      }
      if (content.includes('SPDX')) {
        return parseXMLSPDX(content);
      }
      throw new Error('Unsupported SBOM format. Please provide a valid CycloneDX or SPDX file.');
    }
  };

  const parseCycloneDX = (data) => {
    if (!data.components || !Array.isArray(data.components)) {
      throw new Error('Invalid CycloneDX format: missing components array');
    }

    return data.components.map((comp, index) => {
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

  const parseSPDX = (data) => {
    const packages = data.packages || [];
    if (!Array.isArray(packages)) {
      throw new Error('Invalid SPDX format: packages must be an array');
    }

    return packages.map((pkg, index) => {
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

  const parseXMLCycloneDX = (content) => {
    const parser = new XMLParser();
    const xmlDoc = parser.parse(content);
    
    const components = [];
    const bomData = xmlDoc.bom || xmlDoc;
    const componentList = bomData.components?.component || bomData.component || [];
    const componentArray = Array.isArray(componentList) ? componentList : [componentList];
    
    componentArray.forEach((comp, index) => {
      if (!comp) return;
      
      const name = comp.name || 'Unknown';
      const version = comp.version || 'Unknown';
      const type = comp['@_type'] || comp.type || 'library';
      
      const vulnCount = simulateVulnerabilityCount(name, version);
      const riskScore = calculateRiskScore({ name, version }, vulnCount);
      
      components.push({
        id: `component-${index}`,
        name,
        version,
        type,
        license: 'Unknown',
        vulnerabilityCount: vulnCount,
        riskScore,
        purl: null,
        description: null
      });
    });
    
    if (components.length === 0) {
      throw new Error('No components found in CycloneDX XML');
    }
    
    return components;
  };

  const parseXMLSPDX = (content) => {
    const parser = new XMLParser();
    const xmlDoc = parser.parse(content);
    
    const packages = [];
    const spdxData = xmlDoc.Document || xmlDoc;
    const packageList = spdxData.Package || spdxData.packages || [];
    const packageArray = Array.isArray(packageList) ? packageList : [packageList];
    
    packageArray.forEach((pkg, index) => {
      if (!pkg) return;
      
      const name = pkg.name || 'Unknown';
      const version = pkg.versionInfo || 'Unknown';
      
      const vulnCount = simulateVulnerabilityCount(name, version);
      const riskScore = calculateRiskScore({ name, version }, vulnCount);
      
      packages.push({
        id: `package-${index}`,
        name,
        version,
        type: 'package',
        license: 'Unknown',
        vulnerabilityCount: vulnCount,
        riskScore,
        purl: null,
        description: null
      });
    });
    
    if (packages.length === 0) {
      throw new Error('No packages found in SPDX XML');
    }
    
    return packages;
  };

  const extractLicense = (component) => {
    if (!component.licenses) return 'Unknown';
    if (Array.isArray(component.licenses)) {
      return component.licenses
        .map((l) => l.license?.id || l.license?.name || 'Unknown')
        .join(', ');
    }
    if (typeof component.licenses === 'string') return component.licenses;
    return 'Unknown';
  };

  const simulateVulnerabilityCount = (name, version) => {
    let count = 0;
    
    if (version && version.includes('0.')) count += 2;
    if (version && /alpha|beta|rc/i.test(version)) count += 1;
    if (name && /jquery|angular\.js|bootstrap/i.test(name) && version && version.match(/^[1-2]\./)) count += 3;
    if (name && /log4j/i.test(name) && version && version.match(/^2\.1[0-6]\./)) count += 5;
    
    count += Math.floor(Math.random() * 2);
    
    return count;
  };

  const calculateRiskScore = (component, vulnCount) => {
    let score = 100;
    
    score -= vulnCount * 15;
    
    if (component.version && /alpha/i.test(component.version)) score -= 15;
    if (component.version && /beta/i.test(component.version)) score -= 10;
    if (component.version && /rc/i.test(component.version)) score -= 5;
    
    if (component.version && /^0\./i.test(component.version)) score -= 10;
    
    if (!component.license || component.license === 'Unknown') score -= 5;
    
    return Math.max(0, Math.min(100, score));
  };

  const getRiskLevel = (score) => {
    if (score >= 80) return 'Low';
    if (score >= 60) return 'Medium';
    if (score >= 40) return 'High';
    return 'Critical';
  };

  const toggleComponent = (componentId) => {
    const newExpanded = new Set(expandedComponents);
    if (newExpanded.has(componentId)) {
      newExpanded.delete(componentId);
    } else {
      newExpanded.add(componentId);
    }
    setExpandedComponents(newExpanded);
  };

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t('sbom.title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
          {t('sbom.description')}
        </p>
      </div>

      {!results && (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>{t('sbom.upload.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <SBOMUploader onUpload={handleSBOMUpload} isLoading={isLoading} />
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="max-w-2xl mx-auto mt-4 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
          <CardContent className="pt-6">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-red-400 dark:text-red-400 mt-0.5 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-red-800 dark:text-red-300">Error analyzing file</h3>
                <p className="text-sm text-red-700 dark:text-red-400 mt-1">{error}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {results && (
        <div className="space-y-6">
          {/* Summary Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t('sbom.results.title')}
                </CardTitle>
                <button
                  onClick={() => {
                    setResults(null);
                    setError(null);
                  }}
                  className="text-sm text-vendortal-navy dark:text-trust-blue hover:text-vendortal-navy/80 dark:hover:text-trust-blue/80"
                >
                  Analyze Another File
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-gray-400 dark:text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">File</p>
                      <p className="font-medium text-gray-900 dark:text-white">{results.filename}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center">
                    <Package className="h-8 w-8 text-supply-chain-teal mr-3" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{t('sbom.results.components')}</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{results.totalComponents}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertCircle className="h-8 w-8 text-orange-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{t('sbom.results.vulnerabilities')}</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{results.totalVulnerabilities}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center">
                    <Shield className="h-8 w-8 text-green-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Risk Score</p>
                      <div className="flex items-center">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white mr-2">{results.avgRiskScore}</p>
                        <RiskBadge level={getRiskLevel(results.avgRiskScore)} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Components List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                Components Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {results.components.map((component) => (
                  <div
                    key={component.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleComponent(component.id)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {component.name} <span className="text-gray-500 dark:text-gray-400">v{component.version}</span>
                          </h3>
                          <RiskBadge level={getRiskLevel(component.riskScore)} />
                          {component.vulnerabilityCount > 0 && (
                            <span className="text-sm text-red-600 dark:text-red-400">
                              {component.vulnerabilityCount} vulnerabilities
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Score: {component.riskScore}</span>
                        {expandedComponents.has(component.id) ? (
                          <ChevronUp className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                        )}
                      </div>
                    </div>
                    
                    {expandedComponents.has(component.id) && (
                      <div className="mt-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                        <dl className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <div>
                            <dt className="text-gray-600 dark:text-gray-400">Type:</dt>
                            <dd className="font-medium text-gray-900 dark:text-white">{component.type}</dd>
                          </div>
                          <div>
                            <dt className="text-gray-600 dark:text-gray-400">{t('sbom.results.license')}:</dt>
                            <dd className="font-medium text-gray-900 dark:text-white">{component.license}</dd>
                          </div>
                          {component.purl && (
                            <div className="md:col-span-2">
                              <dt className="text-gray-600 dark:text-gray-400">Package URL:</dt>
                              <dd className="font-mono text-xs break-all text-gray-900 dark:text-white">{component.purl}</dd>
                            </div>
                          )}
                          {component.description && (
                            <div className="md:col-span-2">
                              <dt className="text-gray-600 dark:text-gray-400">Description:</dt>
                              <dd className="text-gray-900 dark:text-white">{component.description}</dd>
                            </div>
                          )}
                        </dl>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
};

export default SBOMAnalyzer;