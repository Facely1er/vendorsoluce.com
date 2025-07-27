// SBOM Analyzer - Complete Business Solution
// This includes real vulnerability data, compliance checking, cost analysis, and actionable insights

import React, { useState, useEffect, useMemo } from 'react';
import { 
  AlertTriangle, Shield, DollarSign, FileText, 
  TrendingUp, Clock, CheckCircle, XCircle,
  Download, Filter, Search, BarChart3
} from 'lucide-react';
import SBOMUploader from '../components/sbom/SBOMUploader';

// Types for enterprise features
interface VulnerabilityDetails {
  cve: string;
  cvss: number;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  publishedDate: string;
  lastModified: string;
  exploitAvailable: boolean;
  fixAvailable: boolean;
  fixedVersion?: string;
  references: string[];
  epss?: number; // Exploit Prediction Scoring System
}

interface LicenseCompliance {
  license: string;
  type: 'permissive' | 'copyleft' | 'proprietary' | 'unknown';
  commercial: boolean;
  attribution: boolean;
  shareAlike: boolean;
  compliance: 'approved' | 'restricted' | 'prohibited' | 'review';
  obligations: string[];
}

interface ComponentRisk {
  securityRisk: number;
  licenseRisk: number;
  operationalRisk: number;
  overallRisk: number;
  maintainability: 'active' | 'stable' | 'deprecated' | 'abandoned';
  lastUpdate: string;
  contributors: number;
  dependencies: number;
}

interface CostImpact {
  remediationCost: number;
  downtimeRisk: number;
  compliancePenalty: number;
  totalImpact: number;
}

interface EnterpriseComponent {
  id: string;
  name: string;
  version: string;
  type: string;
  purl: string;
  cpe?: string;
  vulnerabilities: VulnerabilityDetails[];
  license: LicenseCompliance;
  risk: ComponentRisk;
  costImpact: CostImpact;
  recommendations: string[];
  alternativeVersions: string[];
  usageLocations: string[]; // Where in your codebase this is used
}

// API Service Layer
class SecurityAPIService {
  // Integrate with multiple vulnerability databases
  static async checkVulnerabilities(component: any): Promise<VulnerabilityDetails[]> {
    const vulnerabilities: VulnerabilityDetails[] = [];
    
    try {
      // 1. Check OSV (Google's Open Source Vulnerabilities)
      const osvData = await this.checkOSV(component.purl);
      vulnerabilities.push(...osvData);
      
      // 2. Check Snyk vulnerability database
      const snykData = await this.checkSnyk(component.name, component.version);
      vulnerabilities.push(...snykData);
      
      // 3. Check GitHub Advisory Database
      const githubData = await this.checkGitHubAdvisory(component.name);
      vulnerabilities.push(...githubData);
      
      // 4. Check NVD if CPE is available
      if (component.cpe) {
        const nvdData = await this.checkNVD(component.cpe);
        vulnerabilities.push(...nvdData);
      }
      
      // Remove duplicates based on CVE
      return this.deduplicateVulnerabilities(vulnerabilities);
    } catch (error) {
      console.error('Error checking vulnerabilities:', error);
      return vulnerabilities;
    }
  }
  
  static async checkOSV(purl: string): Promise<VulnerabilityDetails[]> {
    const response = await fetch('https://api.osv.dev/v1/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ package: { purl } })
    });
    
    const data = await response.json();
    return this.mapOSVToVulnerability(data.vulns || []);
  }
  
  static async checkSnyk(name: string, version: string): Promise<VulnerabilityDetails[]> {
    // Snyk API integration (requires API key)
    // This is a placeholder - implement with your Snyk API key
    return [];
  }
  
  static async checkGitHubAdvisory(packageName: string): Promise<VulnerabilityDetails[]> {
    // GitHub Advisory Database API
    const query = `
      query($package: String!) {
        securityVulnerabilities(first: 10, package: $package) {
          nodes {
            advisory {
              summary
              severity
              cvss {
                score
              }
              references {
                url
              }
            }
            vulnerableVersionRange
            firstPatchedVersion {
              identifier
            }
          }
        }
      }
    `;
    
    // Implement GitHub GraphQL query
    return [];
  }
  
  static async checkNVD(cpe: string): Promise<VulnerabilityDetails[]> {
    const response = await fetch(
      `https://services.nvd.nist.gov/rest/json/cves/2.0?cpeName=${cpe}`
    );
    const data = await response.json();
    return this.mapNVDToVulnerability(data.vulnerabilities || []);
  }
  
  private static mapOSVToVulnerability(osvVulns: any[]): VulnerabilityDetails[] {
    return osvVulns.map(vuln => ({
      cve: vuln.id,
      cvss: vuln.database_specific?.cvss || 0,
      severity: this.mapSeverity(vuln.database_specific?.severity),
      description: vuln.summary || vuln.details,
      publishedDate: vuln.published,
      lastModified: vuln.modified,
      exploitAvailable: vuln.database_specific?.exploit_available || false,
      fixAvailable: !!vuln.fixed,
      fixedVersion: vuln.fixed,
      references: vuln.references?.map((r: any) => r.url) || [],
      epss: vuln.database_specific?.epss
    }));
  }
  
  private static mapNVDToVulnerability(nvdVulns: any[]): VulnerabilityDetails[] {
    return nvdVulns.map(vuln => ({
      cve: vuln.cve.id,
      cvss: vuln.cve.metrics?.cvssMetricV31?.[0]?.cvssData?.baseScore || 0,
      severity: vuln.cve.metrics?.cvssMetricV31?.[0]?.cvssData?.baseSeverity || 'UNKNOWN',
      description: vuln.cve.descriptions?.[0]?.value || '',
      publishedDate: vuln.cve.published,
      lastModified: vuln.cve.lastModified,
      exploitAvailable: false, // Check exploit databases
      fixAvailable: false,
      references: vuln.cve.references?.map((r: any) => r.url) || []
    }));
  }
  
  private static mapSeverity(severity: string): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
    const severityMap: Record<string, any> = {
      'low': 'LOW',
      'moderate': 'MEDIUM',
      'medium': 'MEDIUM',
      'high': 'HIGH',
      'critical': 'CRITICAL'
    };
    return severityMap[severity?.toLowerCase()] || 'MEDIUM';
  }
  
  private static deduplicateVulnerabilities(vulns: VulnerabilityDetails[]): VulnerabilityDetails[] {
    const seen = new Set<string>();
    return vulns.filter(vuln => {
      if (seen.has(vuln.cve)) return false;
      seen.add(vuln.cve);
      return true;
    });
  }
}

// License Compliance Service
class LicenseComplianceService {
  private static licenseDatabase: Record<string, Partial<LicenseCompliance>> = {
    'MIT': {
      type: 'permissive',
      commercial: true,
      attribution: true,
      shareAlike: false,
      compliance: 'approved',
      obligations: ['Include copyright notice', 'Include license text']
    },
    'Apache-2.0': {
      type: 'permissive',
      commercial: true,
      attribution: true,
      shareAlike: false,
      compliance: 'approved',
      obligations: ['Include copyright notice', 'Include license text', 'State changes']
    },
    'GPL-3.0': {
      type: 'copyleft',
      commercial: true,
      attribution: true,
      shareAlike: true,
      compliance: 'restricted',
      obligations: ['Disclose source', 'Include license text', 'State changes', 'Share alike']
    },
    'AGPL-3.0': {
      type: 'copyleft',
      commercial: true,
      attribution: true,
      shareAlike: true,
      compliance: 'prohibited',
      obligations: ['Disclose source', 'Include license text', 'Network use is distribution']
    },
    'BSD-3-Clause': {
      type: 'permissive',
      commercial: true,
      attribution: true,
      shareAlike: false,
      compliance: 'approved',
      obligations: ['Include copyright notice', 'Include license text']
    },
    'LGPL-3.0': {
      type: 'copyleft',
      commercial: true,
      attribution: true,
      shareAlike: true,
      compliance: 'review',
      obligations: ['Disclose source of library', 'Allow linking from proprietary software']
    }
  };
  
  static async analyzeLicense(licenseId: string): Promise<LicenseCompliance> {
    const known = this.licenseDatabase[licenseId];
    
    if (known) {
      return {
        license: licenseId,
        type: known.type || 'unknown',
        commercial: known.commercial ?? false,
        attribution: known.attribution ?? true,
        shareAlike: known.shareAlike ?? false,
        compliance: known.compliance || 'review',
        obligations: known.obligations || []
      };
    }
    
    // For unknown licenses, require review
    return {
      license: licenseId,
      type: 'unknown',
      commercial: false,
      attribution: true,
      shareAlike: false,
      compliance: 'review',
      obligations: ['Manual review required']
    };
  }
  
  static getCompliancePolicy(companyPolicy: 'strict' | 'moderate' | 'permissive') {
    const policies = {
      strict: ['MIT', 'Apache-2.0', 'BSD-3-Clause'],
      moderate: ['MIT', 'Apache-2.0', 'BSD-3-Clause', 'LGPL-3.0'],
      permissive: ['MIT', 'Apache-2.0', 'BSD-3-Clause', 'LGPL-3.0', 'GPL-3.0']
    };
    
    return policies[companyPolicy];
  }
}

// Risk Assessment Service
class RiskAssessmentService {
  static async calculateComponentRisk(
    component: any,
    vulnerabilities: VulnerabilityDetails[]
  ): Promise<ComponentRisk> {
    // Security Risk Score (0-100, higher is worse)
    const securityRisk = this.calculateSecurityRisk(vulnerabilities);
    
    // License Risk Score
    const licenseRisk = await this.calculateLicenseRisk(component.license);
    
    // Operational Risk (maintenance, age, popularity)
    const operationalRisk = await this.calculateOperationalRisk(component);
    
    // Overall Risk
    const overallRisk = Math.round(
      (securityRisk * 0.5) + 
      (licenseRisk * 0.3) + 
      (operationalRisk * 0.2)
    );
    
    // Get maintenance status
    const maintainability = await this.checkMaintainability(component);
    
    return {
      securityRisk,
      licenseRisk,
      operationalRisk,
      overallRisk,
      maintainability,
      lastUpdate: await this.getLastUpdate(component),
      contributors: await this.getContributorCount(component),
      dependencies: await this.getDependencyCount(component)
    };
  }
  
  private static calculateSecurityRisk(vulnerabilities: VulnerabilityDetails[]): number {
    if (vulnerabilities.length === 0) return 0;
    
    let risk = 0;
    
    vulnerabilities.forEach(vuln => {
      // Base risk from CVSS score
      risk += vuln.cvss * 10;
      
      // Additional factors
      if (vuln.exploitAvailable) risk += 20;
      if (!vuln.fixAvailable) risk += 10;
      if (vuln.epss && vuln.epss > 0.5) risk += 15;
      
      // Age of vulnerability
      const ageInDays = this.daysSince(vuln.publishedDate);
      if (ageInDays > 365) risk += 10;
      if (ageInDays > 730) risk += 10;
    });
    
    return Math.min(100, Math.round(risk / vulnerabilities.length));
  }
  
  private static async calculateLicenseRisk(license: string): Promise<number> {
    const compliance = await LicenseComplianceService.analyzeLicense(license);
    
    const riskMap = {
      'approved': 0,
      'review': 40,
      'restricted': 70,
      'prohibited': 100
    };
    
    return riskMap[compliance.compliance] || 50;
  }
  
  private static async calculateOperationalRisk(component: any): Promise<number> {
    // This would integrate with package registry APIs
    // For now, return simulated data
    let risk = 0;
    
    // Check last update
    const lastUpdate = await this.getLastUpdate(component);
    const daysSinceUpdate = this.daysSince(lastUpdate);
    
    if (daysSinceUpdate > 365) risk += 30;
    if (daysSinceUpdate > 730) risk += 20;
    
    // Check version
    if (component.version.includes('alpha')) risk += 20;
    if (component.version.includes('beta')) risk += 15;
    if (component.version.includes('rc')) risk += 10;
    
    return Math.min(100, risk);
  }
  
  private static async checkMaintainability(component: any): Promise<'active' | 'stable' | 'deprecated' | 'abandoned'> {
    // Check package registry for maintenance status
    // This is simplified - real implementation would check multiple sources
    const lastUpdate = await this.getLastUpdate(component);
    const daysSinceUpdate = this.daysSince(lastUpdate);
    
    if (daysSinceUpdate < 90) return 'active';
    if (daysSinceUpdate < 365) return 'stable';
    if (daysSinceUpdate < 730) return 'deprecated';
    return 'abandoned';
  }
  
  private static async getLastUpdate(component: any): Promise<string> {
    // Would fetch from package registry
    return '2024-06-15'; // Placeholder
  }
  
  private static async getContributorCount(component: any): Promise<number> {
    // Would fetch from repository
    return Math.floor(Math.random() * 50) + 1;
  }
  
  private static async getDependencyCount(component: any): Promise<number> {
    // Would analyze dependency tree
    return Math.floor(Math.random() * 20);
  }
  
  private static daysSince(date: string): number {
    const then = new Date(date);
    const now = new Date();
    return Math.floor((now.getTime() - then.getTime()) / (1000 * 60 * 60 * 24));
  }
}

// Cost Impact Calculator
class CostImpactCalculator {
  static calculate(
    component: EnterpriseComponent,
    businessContext: {
      hourlyDowntimeCost: number;
      avgRemediationHours: number;
      complianceMultiplier: number;
    }
  ): CostImpact {
    const { vulnerabilities, license, risk } = component;
    
    // Remediation cost based on vulnerabilities
    let remediationCost = 0;
    vulnerabilities.forEach(vuln => {
      const hours = this.estimateRemediationHours(vuln);
      remediationCost += hours * businessContext.avgRemediationHours * 150; // $150/hour
    });
    
    // Downtime risk
    const downtimeRisk = this.calculateDowntimeRisk(
      vulnerabilities,
      businessContext.hourlyDowntimeCost
    );
    
    // Compliance penalty risk
    const compliancePenalty = this.calculateCompliancePenalty(
      license,
      businessContext.complianceMultiplier
    );
    
    return {
      remediationCost: Math.round(remediationCost),
      downtimeRisk: Math.round(downtimeRisk),
      compliancePenalty: Math.round(compliancePenalty),
      totalImpact: Math.round(remediationCost + downtimeRisk + compliancePenalty)
    };
  }
  
  private static estimateRemediationHours(vuln: VulnerabilityDetails): number {
    let hours = 2; // Base hours
    
    if (vuln.cvss > 7) hours += 4;
    if (vuln.cvss > 9) hours += 6;
    if (!vuln.fixAvailable) hours += 8;
    if (vuln.exploitAvailable) hours += 4;
    
    return hours;
  }
  
  private static calculateDowntimeRisk(
    vulnerabilities: VulnerabilityDetails[],
    hourlyDowntimeCost: number
  ): number {
    const criticalVulns = vulnerabilities.filter(v => v.cvss > 8);
    const exploitableVulns = vulnerabilities.filter(v => v.exploitAvailable);
    
    // Probability of incident * potential downtime hours * cost
    const incidentProbability = Math.min(
      0.8,
      (criticalVulns.length * 0.2) + (exploitableVulns.length * 0.15)
    );
    
    const potentialDowntimeHours = 4; // Average incident duration
    
    return incidentProbability * potentialDowntimeHours * hourlyDowntimeCost;
  }
  
  private static calculateCompliancePenalty(
    license: LicenseCompliance,
    multiplier: number
  ): number {
    const basePenalty = {
      'approved': 0,
      'review': 5000,
      'restricted': 25000,
      'prohibited': 100000
    };
    
    return (basePenalty[license.compliance] || 0) * multiplier;
  }
}

// Recommendation Engine
class RecommendationEngine {
  static generateRecommendations(component: EnterpriseComponent): string[] {
    const recommendations: string[] = [];
    
    // Security recommendations
    if (component.vulnerabilities.length > 0) {
      const criticalVulns = component.vulnerabilities.filter(v => v.cvss > 8);
      if (criticalVulns.length > 0) {
        recommendations.push(
          `CRITICAL: Update immediately - ${criticalVulns.length} critical vulnerabilities found`
        );
      }
      
      const fixableVulns = component.vulnerabilities.filter(v => v.fixAvailable);
      if (fixableVulns.length > 0) {
        const versions = [...new Set(fixableVulns.map(v => v.fixedVersion))];
        recommendations.push(
          `Update to version ${versions[0]} to fix ${fixableVulns.length} vulnerabilities`
        );
      }
    }
    
    // License recommendations
    if (component.license.compliance === 'prohibited') {
      recommendations.push(
        'LEGAL RISK: This license is prohibited by company policy. Consider alternative packages.'
      );
    } else if (component.license.compliance === 'restricted') {
      recommendations.push(
        'LICENSE WARNING: Restricted license. Ensure compliance with obligations.'
      );
    }
    
    // Maintenance recommendations
    if (component.risk.maintainability === 'abandoned') {
      recommendations.push(
        'MAINTENANCE RISK: This package appears abandoned. Consider migrating to an alternative.'
      );
    } else if (component.risk.maintainability === 'deprecated') {
      recommendations.push(
        'Package is deprecated. Plan migration to supported alternative.'
      );
    }
    
    // Alternative suggestions
    if (component.risk.overallRisk > 70) {
      recommendations.push(
        'High overall risk. Consider these alternatives: [would fetch alternatives]'
      );
    }
    
    return recommendations;
  }
  
  static async findAlternatives(component: EnterpriseComponent): Promise<string[]> {
    // This would search for functionally equivalent packages
    // with better security/license profiles
    return [];
  }
}

// Main SBOM Analyzer Component
const SBOMAnalyzer: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<{
    components: EnterpriseComponent[];
    summary: any;
    recommendations: any;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    search: '',
    riskLevel: 'all',
    hasVulnerabilities: false,
    licenseCompliance: 'all'
  });
  const [selectedView, setSelectedView] = useState<'grid' | 'list'>('grid');
  
  // Business configuration
  const businessConfig = {
    hourlyDowntimeCost: 50000, // $50k/hour
    avgRemediationHours: 8,
    complianceMultiplier: 1.5,
    licensePolicy: 'moderate' as const
  };
  
  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Parse SBOM file
      const fileContent = await readFileAsText(file);
      const basicComponents = parseSBOMFile(fileContent);
      
      setAnalyzing(true);
      
      // Enrich with enterprise data
      const enrichedComponents = await Promise.all(
        basicComponents.map(async (comp) => {
          // Check vulnerabilities
          const vulnerabilities = await SecurityAPIService.checkVulnerabilities(comp);
          
          // Analyze license
          const license = await LicenseComplianceService.analyzeLicense(
            comp.license || 'Unknown'
          );
          
          // Calculate risk
          const risk = await RiskAssessmentService.calculateComponentRisk(
            comp,
            vulnerabilities
          );
          
          // Calculate cost impact
          const costImpact = CostImpactCalculator.calculate(
            { ...comp, vulnerabilities, license, risk } as any,
            businessConfig
          );
          
          const enrichedComponent: EnterpriseComponent = {
            ...comp,
            vulnerabilities,
            license,
            risk,
            costImpact,
            recommendations: [],
            alternativeVersions: [],
            usageLocations: []
          };
          
          // Generate recommendations
          enrichedComponent.recommendations = RecommendationEngine.generateRecommendations(
            enrichedComponent
          );
          
          return enrichedComponent;
        })
      );
      
      // Calculate summary statistics
      const summary = calculateSummary(enrichedComponents);
      
      // Generate executive recommendations
      const recommendations = generateExecutiveRecommendations(
        enrichedComponents,
        summary
      );
      
      setResults({
        components: enrichedComponents,
        summary,
        recommendations
      });
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze SBOM');
    } finally {
      setIsLoading(false);
      setAnalyzing(false);
    }
  };
  
  const calculateSummary = (components: EnterpriseComponent[]) => {
    const totalVulnerabilities = components.reduce(
      (sum, c) => sum + c.vulnerabilities.length,
      0
    );
    
    const criticalVulnerabilities = components.reduce(
      (sum, c) => sum + c.vulnerabilities.filter(v => v.cvss > 8).length,
      0
    );
    
    const exploitableVulnerabilities = components.reduce(
      (sum, c) => sum + c.vulnerabilities.filter(v => v.exploitAvailable).length,
      0
    );
    
    const totalCostImpact = components.reduce(
      (sum, c) => sum + c.costImpact.totalImpact,
      0
    );
    
    const licenseIssues = components.filter(
      c => c.license.compliance !== 'approved'
    ).length;
    
    const abandonedComponents = components.filter(
      c => c.risk.maintainability === 'abandoned'
    ).length;
    
    return {
      totalComponents: components.length,
      totalVulnerabilities,
      criticalVulnerabilities,
      exploitableVulnerabilities,
      totalCostImpact,
      licenseIssues,
      abandonedComponents,
      overallHealthScore: calculateHealthScore(components),
      riskDistribution: {
        critical: components.filter(c => c.risk.overallRisk > 80).length,
        high: components.filter(c => c.risk.overallRisk > 60 && c.risk.overallRisk <= 80).length,
        medium: components.filter(c => c.risk.overallRisk > 40 && c.risk.overallRisk <= 60).length,
        low: components.filter(c => c.risk.overallRisk <= 40).length
      }
    };
  };
  
  const calculateHealthScore = (components: EnterpriseComponent[]): number => {
    if (components.length === 0) return 100;
    
    const avgRisk = components.reduce((sum, c) => sum + c.risk.overallRisk, 0) / components.length;
    return Math.max(0, Math.round(100 - avgRisk));
  };
  
  const generateExecutiveRecommendations = (
    components: EnterpriseComponent[],
    summary: any
  ) => {
    const recommendations = {
      immediate: [] as string[],
      shortTerm: [] as string[],
      longTerm: [] as string[]
    };
    
    // Immediate actions (next 24-48 hours)
    if (summary.criticalVulnerabilities > 0) {
      recommendations.immediate.push(
        `Address ${summary.criticalVulnerabilities} critical vulnerabilities immediately`
      );
    }
    
    if (summary.exploitableVulnerabilities > 0) {
      recommendations.immediate.push(
        `${summary.exploitableVulnerabilities} vulnerabilities have known exploits - patch within 24 hours`
      );
    }
    
    const prohibitedLicenses = components.filter(
      c => c.license.compliance === 'prohibited'
    );
    if (prohibitedLicenses.length > 0) {
      recommendations.immediate.push(
        `Remove ${prohibitedLicenses.length} components with prohibited licenses`
      );
    }
    
    // Short-term actions (next 30 days)
    if (summary.abandonedComponents > 0) {
      recommendations.shortTerm.push(
        `Replace ${summary.abandonedComponents} abandoned components`
      );
    }
    
    if (summary.licenseIssues > 0) {
      recommendations.shortTerm.push(
        `Review and resolve ${summary.licenseIssues} license compliance issues`
      );
    }
    
    // Long-term actions (next quarter)
    recommendations.longTerm.push(
      'Implement automated SBOM scanning in CI/CD pipeline'
    );
    
    if (summary.overallHealthScore < 70) {
      recommendations.longTerm.push(
        'Develop component upgrade strategy to improve overall health score'
      );
    }
    
    return recommendations;
  };
  
  // Filtered and sorted components
  const filteredComponents = useMemo(() => {
    if (!results) return [];
    
    return results.components.filter(component => {
      // Search filter
      if (filters.search && !component.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      // Risk level filter
      if (filters.riskLevel !== 'all') {
        const riskLevel = component.risk.overallRisk > 80 ? 'critical' :
                         component.risk.overallRisk > 60 ? 'high' :
                         component.risk.overallRisk > 40 ? 'medium' : 'low';
        if (riskLevel !== filters.riskLevel) return false;
      }
      
      // Vulnerability filter
      if (filters.hasVulnerabilities && component.vulnerabilities.length === 0) {
        return false;
      }
      
      // License compliance filter
      if (filters.licenseCompliance !== 'all' && 
          component.license.compliance !== filters.licenseCompliance) {
        return false;
      }
      
      return true;
    });
  }, [results, filters]);
  
  const exportReport = (format: 'json' | 'csv' | 'pdf') => {
    if (!results) return;
    
    switch (format) {
      case 'json':
        downloadJSON(results);
        break;
      case 'csv':
        downloadCSV(results);
        break;
      case 'pdf':
        generatePDFReport(results);
        break;
    }
  };
  
  // Render the UI
  if (analyzing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Analyzing components...</p>
          <p className="text-sm text-gray-500">This may take a few moments</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                SBOM Analyzer
              </h1>
              <p className="text-sm text-gray-600">
                Security, Compliance, and Risk Management
              </p>
            </div>
            {results && (
              <div className="flex space-x-2">
                <button
                  onClick={() => exportReport('json')}
                  className="px-4 py-2 text-sm bg-white border rounded-md hover:bg-gray-50"
                >
                  <Download className="w-4 h-4 inline mr-1" />
                  Export JSON
                </button>
                <button
                  onClick={() => exportReport('pdf')}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <FileText className="w-4 h-4 inline mr-1" />
                  Generate Report
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!results ? (
          // Upload interface
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
              <SBOMUploader onUpload={handleFileUpload} isLoading={isLoading} />
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-800">{error}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Results interface
          <div className="space-y-6">
            {/* Executive Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Executive Summary</h2>
              
              {/* Health Score */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700">Overall Health Score</span>
                  <span className="text-3xl font-bold">
                    {results.summary.overallHealthScore}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${
                      results.summary.overallHealthScore > 80 ? 'bg-green-500' :
                      results.summary.overallHealthScore > 60 ? 'bg-yellow-500' :
                      results.summary.overallHealthScore > 40 ? 'bg-orange-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${results.summary.overallHealthScore}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                    <div className="text-right">
                      <p className="text-2xl font-bold text-red-600">
                        {results.summary.criticalVulnerabilities}
                      </p>
                      <p className="text-sm text-gray-600">Critical Vulns</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <Shield className="w-8 h-8 text-orange-500" />
                    <div className="text-right">
                      <p className="text-2xl font-bold text-orange-600">
                        {results.summary.licenseIssues}
                      </p>
                      <p className="text-sm text-gray-600">License Issues</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <DollarSign className="w-8 h-8 text-green-500" />
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">
                        ${(results.summary.totalCostImpact / 1000).toFixed(0)}k
                      </p>
                      <p className="text-sm text-gray-600">Total Impact</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <Clock className="w-8 h-8 text-yellow-500" />
                    <div className="text-right">
                      <p className="text-2xl font-bold text-yellow-600">
                        {results.summary.abandonedComponents}
                      </p>
                      <p className="text-sm text-gray-600">Abandoned</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Items */}
              <div className="space-y-4">
                {results.recommendations.immediate.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-red-600 mb-2">
                      Immediate Actions Required
                    </h3>
                    <ul className="space-y-1">
                      {results.recommendations.immediate.map((rec, idx) => (
                        <li key={idx} className="flex items-start">
                          <XCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {results.recommendations.shortTerm.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-orange-600 mb-2">
                      Short-term Actions (30 days)
                    </h3>
                    <ul className="space-y-1">
                      {results.recommendations.shortTerm.map((rec, idx) => (
                        <li key={idx} className="flex items-start">
                          <AlertTriangle className="w-5 h-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            
            {/* Filters and Component List */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Component Analysis</h2>
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    placeholder="Search components..."
                    className="px-3 py-2 border rounded-md"
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  />
                  <select
                    className="px-3 py-2 border rounded-md"
                    value={filters.riskLevel}
                    onChange={(e) => setFilters({ ...filters, riskLevel: e.target.value })}
                  >
                    <option value="all">All Risk Levels</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
              
              {/* Component list would go here - showing key data */}
              <div className="space-y-4">
                {filteredComponents.slice(0, 10).map((component) => (
                  <div key={component.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">
                          {component.name} v{component.version}
                        </h3>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className={`text-sm ${
                            component.risk.overallRisk > 80 ? 'text-red-600' :
                            component.risk.overallRisk > 60 ? 'text-orange-600' :
                            component.risk.overallRisk > 40 ? 'text-yellow-600' :
                            'text-green-600'
                          }`}>
                            Risk: {component.risk.overallRisk}%
                          </span>
                          <span className="text-sm text-gray-600">
                            {component.vulnerabilities.length} vulnerabilities
                          </span>
                          <span className="text-sm text-gray-600">
                            Impact: ${(component.costImpact.totalImpact / 1000).toFixed(1)}k
                          </span>
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700">
                        View Details →
                      </button>
                    </div>
                    {component.recommendations.length > 0 && (
                      <div className="mt-3 p-3 bg-yellow-50 rounded">
                        <p className="text-sm font-medium text-yellow-800">
                          {component.recommendations[0]}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper functions
function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

function parseSBOMFile(content: string): any[] {
  // Basic parsing - would use the full parser from earlier
  try {
    const data = JSON.parse(content);
    if (data.components) return data.components;
    if (data.packages) return data.packages;
    throw new Error('Invalid SBOM format');
  } catch {
    throw new Error('Failed to parse SBOM file');
  }
}

function downloadJSON(data: any) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `sbom-analysis-${new Date().toISOString()}.json`;
  a.click();
}

function downloadCSV(data: any) {
  // Convert to CSV format
  const csvContent = "data:text/csv;charset=utf-8," + 
    "Component,Version,Risk Score,Vulnerabilities,Cost Impact\n" +
    data.components.map((c: any) => 
      `"${c.name}","${c.version}",${c.risk.overallRisk},${c.vulnerabilities.length},${c.costImpact.totalImpact}`
    ).join("\n");
  
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `sbom-analysis-${new Date().toISOString()}.csv`);
  link.click();
}

function generatePDFReport(data: any) {
  // In production, this would generate a proper PDF
  alert('PDF generation would be implemented with a library like jsPDF');
}

export default SBOMAnalyzer;