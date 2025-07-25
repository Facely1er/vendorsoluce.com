export interface Assessment {
  id: string;
  title: string;
  description: string;
  frameworks: string[];
  features: string[];
  icon: string;
  isPremium?: boolean;
}

export interface QuickTool {
  id: string;
  title: string;
  description: string;
  icon: string;
  action: string;
}

export interface NISTControl {
  id: string;
  title: string;
  description: string;
}

export interface VendorRisk {
  id: string;
  name: string;
  riskScore: number;
  lastAssessment: string;
  complianceStatus: 'Compliant' | 'Partial' | 'Non-Compliant';
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface SBOMComponent {
  id: string;
  name: string;
  version: string;
  license: string;
  vulnerabilityCount: number;
  riskScore: number;
}

export interface MenuItem {
  title: string;
  path: string;
  icon?: string;
}