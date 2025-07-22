import React, { useState } from 'react';
import { Upload, FileText, AlertCircle, Shield, Package, ChevronDown, ChevronUp } from 'lucide-react';

// UI Components
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
    {children}
  </div>
);

const RiskBadge = ({ risk }) => {
  const colors = {
    Low: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-orange-100 text-orange-800',
    Critical: 'bg-red-100 text-red-800'
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[risk]}`}>
      {risk}
    </span>
  );
};

// SBOM Uploader Component
const SBOMUploader = ({ onUpload, isLoading }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      <p className="text-lg font-medium text-gray-700 mb-2">
        Drop your SBOM file here or click to browse
      </p>
      <p className="text-sm text-gray-500 mb-4">
        Supports CycloneDX and SPDX formats (JSON/XML)
      </p>
      <input
        type="file"
        className="hidden"
        onChange={handleChange}
        accept=".json,.xml,.spdx,.cdx"
        id="sbom-upload"
        disabled={isLoading}
      />
      <label
        htmlFor="sbom-upload"
        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? 'Processing...' : 'Select File'}
      </label>
    </div>
  );
};

// Main SBOM Analyzer Component
const SBOMAnalyzer = () => {
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
      // Simulate vulnerability detection (in production, this would call a real API)
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

  const parseXMLCycloneDX = (content) => {
    // Basic XML parsing for demonstration
    const components = [];
    const componentMatches = content.match(/<component[^>]*>[\s\S]*?<\/component>/g) || [];
    
    componentMatches.forEach((compXml, index) => {
      const name = compXml.match(/<name>([^<]+)<\/name>/)?.[1] || 'Unknown';
      const version = compXml.match(/<version>([^<]+)<\/version>/)?.[1] || 'Unknown';
      const type = compXml.match(/type="([^"]+)"/)?.[1] || 'library';
      
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
    // Basic XML parsing for SPDX
    const packages = [];
    const packageMatches = content.match(/<Package[^>]*>[\s\S]*?<\/Package>/g) || [];
    
    packageMatches.forEach((pkgXml, index) => {
      const name = pkgXml.match(/<name>([^<]+)<\/name>/)?.[1] || 'Unknown';
      const version = pkgXml.match(/<versionInfo>([^<]+)<\/versionInfo>/)?.[1] || 'Unknown';
      
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
    // Simulate vulnerability detection based on common patterns
    // In production, this would call a real vulnerability database API
    let count = 0;
    
    // Simulate known vulnerable versions
    if (version && version.includes('0.')) count += 2; // Early versions often have vulnerabilities
    if (version && /alpha|beta|rc/i.test(version)) count += 1;
    if (name && /jquery|angular\.js|bootstrap/i.test(name) && version && version.match(/^[1-2]\./)) count += 3;
    if (name && /log4j/i.test(name) && version && version.match(/^2\.1[0-6]\./)) count += 5;
    
    // Add some randomness for demonstration
    count += Math.floor(Math.random() * 2);
    
    return count;
  };

  const calculateRiskScore = (component, vulnCount) => {
    let score = 100;
    
    // Deduct points for vulnerabilities
    score -= vulnCount * 15;
    
    // Deduct points for pre-release versions
    if (component.version && /alpha/i.test(component.version)) score -= 15;
    if (component.version && /beta/i.test(component.version)) score -= 10;
    if (component.version && /rc/i.test(component.version)) score -= 5;
    
    // Deduct points for very old versions (simple heuristic)
    if (component.version && /^0\./i.test(component.version)) score -= 10;
    
    // Deduct points for unknown licenses
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">SBOM Analyzer</h1>
          <p className="text-lg text-gray-600">
            Upload your Software Bill of Materials to analyze components and identify potential risks
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
              <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-red-800">Error analyzing file</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </Card>
        )}

        {results && (
          <div className="space-y-6">
            {/* Summary Card */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Analysis Summary</h2>
                <button
                  onClick={() => {
                    setResults(null);
                    setError(null);
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Analyze Another File
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">File</p>
                      <p className="font-medium text-gray-900">{results.filename}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <Package className="h-8 w-8 text-blue-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Components</p>
                      <p className="text-2xl font-bold text-gray-900">{results.totalComponents}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertCircle className="h-8 w-8 text-orange-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Vulnerabilities</p>
                      <p className="text-2xl font-bold text-gray-900">{results.totalVulnerabilities}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <Shield className="h-8 w-8 text-green-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Risk Score</p>
                      <div className="flex items-center">
                        <p className="text-2xl font-bold text-gray-900 mr-2">{results.avgRiskScore}</p>
                        <RiskBadge risk={getRiskLevel(results.avgRiskScore)} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Components List */}
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Components Analysis</h2>
              <div className="space-y-2">
                {results.components.map((component) => (
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
                              {component.vulnerabilityCount} vulnerabilities
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Score: {component.riskScore}</span>
                        {expandedComponents.has(component.id) ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                    
                    {expandedComponents.has(component.id) && (
                      <div className="mt-4 pl-4 border-l-2 border-gray-200">
                        <dl className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <div>
                            <dt className="text-gray-600">Type:</dt>
                            <dd className="font-medium">{component.type}</dd>
                          </div>
                          <div>
                            <dt className="text-gray-600">License:</dt>
                            <dd className="font-medium">{component.license}</dd>
                          </div>
                          {component.purl && (
                            <div className="md:col-span-2">
                              <dt className="text-gray-600">Package URL:</dt>
                              <dd className="font-mono text-xs break-all">{component.purl}</dd>
                            </div>
                          )}
                          {component.description && (
                            <div className="md:col-span-2">
                              <dt className="text-gray-600">Description:</dt>
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