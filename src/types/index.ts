// Database types
export interface Database {
  public: {
    Tables: {
      vendors: {
        Row: Vendor;
        Insert: Omit<Vendor, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Vendor, 'id'>>;
      };
      sbom_analyses: {
        Row: SBOMAnalysis;
        Insert: Omit<SBOMAnalysis, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<SBOMAnalysis, 'id'>>;
      };
      supply_chain_assessments: {
        Row: SupplyChainAssessment;
        Insert: Omit<SupplyChainAssessment, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<SupplyChainAssessment, 'id'>>;
      };
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id'>>;
      };
    };
  };
}

// Core entity types
export interface Vendor {
  id: string;
  user_id: string;
  name: string;
  industry?: string;
  website?: string;
  contact_email?: string;
  risk_score?: number;
  risk_level?: 'Low' | 'Medium' | 'High' | 'Critical';
  compliance_status?: 'Compliant' | 'Partial' | 'Non-Compliant';
  last_assessment_date?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SBOMAnalysis {
  id: string;
  user_id: string;
  filename: string;
  file_type: string;
  total_components: number;
  total_vulnerabilities: number;
  risk_score?: number;
  analysis_data?: any;
  created_at?: string;
  updated_at?: string;
}

export interface SupplyChainAssessment {
  id: string;
  user_id: string;
  assessment_name?: string;
  overall_score?: number;
  section_scores?: any;
  answers?: any;
  status: 'in_progress' | 'completed' | 'archived';
  completed_at?: string;
  created_at?: string;
  updated_at?: string;
  vendor_id?: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  company?: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
  is_first_login?: boolean;
}

// UI and component types
export interface VendorRisk {
  id: string;
  name: string;
  industry: string;
  riskScore: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  complianceStatus: 'Compliant' | 'Partial' | 'Non-Compliant';
  lastAssessment: string;
}

export interface NISTControl {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Not Started' | 'In Progress' | 'Complete';
  evidence?: string;
  notes?: string;
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: 'not_started' | 'in_progress' | 'completed';
  lastModified: string;
  type: 'nist' | 'cmmc' | 'custom';
}

export interface QuickTool {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
  category: 'assessment' | 'analysis' | 'reporting' | 'compliance';
}

// Navigation types
export interface MenuItem {
  label: string;
  href: string;
  icon?: React.ElementType;
  children?: MenuItem[];
}

// Form types
export interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  topic?: string;
  message: string;
}

// Analytics and reporting types
export interface RiskMetrics {
  totalVendors: number;
  highRiskVendors: number;
  complianceRate: number;
  averageRiskScore: number;
  trendsData: {
    month: string;
    riskScore: number;
    compliance: number;
  }[];
}

export interface SBOMComponent {
  name: string;
  version: string;
  licenses: string[];
  vulnerabilities: Vulnerability[];
  riskScore: number;
}

export interface Vulnerability {
  id: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  description: string;
  cvssScore?: number;
  fixAvailable: boolean;
  exploitAvailable: boolean;
}

// Assessment framework types
export interface AssessmentFramework {
  id: string;
  name: string;
  description?: string;
  version?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface FrameworkQuestion {
  id: string;
  framework_id: string;
  question_text: string;
  control_id?: string;
  guidance?: string;
  question_type: string;
  options?: any;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export interface VendorAssessment {
  id: string;
  user_id: string;
  vendor_id: string;
  framework_id: string;
  assessment_name: string;
  status: 'pending' | 'sent' | 'in_progress' | 'completed' | 'reviewed';
  due_date?: string;
  sent_at?: string;
  completed_at?: string;
  overall_score?: number;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface VendorAssessmentResponse {
  id: string;
  vendor_assessment_id: string;
  question_id: string;
  response_value?: string;
  evidence_url?: string;
  vendor_notes?: string;
  submitted_at?: string;
  created_at?: string;
  updated_at?: string;
}