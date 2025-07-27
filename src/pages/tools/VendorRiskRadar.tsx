import React, { useState, useEffect } from 'react';
import { ArrowLeft, Send, Database, Shield, Eye, Lock, Globe, FileText, Users, AlertTriangle, Zap, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import RiskBadge from '../../components/ui/RiskBadge';
import { useTranslation } from 'react-i18next';
import { useVendors } from '../../hooks/useVendors';
import { useAuth } from '../../context/AuthContext';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';

interface RiskDimension {
  id: string;
  name: string;
  shortName: string;
  description: string;
  weight: number;
  value: number;
  icon: React.ReactNode;
  privacyRegulations: string[];
  protectionRequirements: string[];
}

interface VendorCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  commonUseCase: string;
  riskTemplate: { [key: string]: number };
  privacyImpact: string;
  commonRegulations: string[];
}

interface RadarData {
  dimension: string;
  risk: number;
  required: number;
  fullMark: 100;
}

const VendorRiskRadar: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const { createVendor } = useVendors();
  const [vendorName, setVendorName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [calculationComplete, setCalculationComplete] = useState(false);
  const [riskScore, setRiskScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Vendor categorization schemes
  const vendorCategories: VendorCategory[] = [
    {
      id: 'cloud_storage',
      name: 'Cloud Storage & Backup',
      description: 'File storage, backup, and document management services',
      icon: <Database className="h-5 w-5 text-blue-600" />,
      commonUseCase: 'Document storage, file sharing, backup solutions',
      riskTemplate: {
        data_sensitivity: 4,
        access_control: 3,
        data_residency: 4,
        retention_control: 3,
        encryption_standards: 2,
        compliance_framework: 3
      },
      privacyImpact: 'High - Direct data hosting and processing',
      commonRegulations: ['GDPR', 'SOX', 'HIPAA', 'SOC 2']
    },
    {
      id: 'payment_processor',
      name: 'Payment Processing',
      description: 'Payment gateways, billing, and financial transaction services',
      icon: <Shield className="h-5 w-5 text-green-600" />,
      commonUseCase: 'Credit card processing, subscription billing, payments',
      riskTemplate: {
        data_sensitivity: 5,
        access_control: 4,
        data_residency: 3,
        retention_control: 4,
        encryption_standards: 5,
        compliance_framework: 5
      },
      privacyImpact: 'Critical - Financial and PII data processing',
      commonRegulations: ['PCI DSS', 'GDPR', 'PSD2', 'SOX']
    },
    {
      id: 'hr_software',
      name: 'HR & Workforce Management',
      description: 'HRIS, payroll, recruiting, and employee management systems',
      icon: <Users className="h-5 w-5 text-purple-600" />,
      commonUseCase: 'Employee data, payroll, performance management',
      riskTemplate: {
        data_sensitivity: 5,
        access_control: 4,
        data_residency: 3,
        retention_control: 4,
        encryption_standards: 3,
        compliance_framework: 4
      },
      privacyImpact: 'High - Sensitive employee and personal data',
      commonRegulations: ['GDPR', 'CCPA', 'Employment Law', 'SOX']
    },
    {
      id: 'saas_productivity',
      name: 'SaaS Productivity Tools',
      description: 'Collaboration, communication, and productivity software',
      icon: <Zap className="h-5 w-5 text-orange-600" />,
      commonUseCase: 'Email, messaging, project management, CRM',
      riskTemplate: {
        data_sensitivity: 3,
        access_control: 3,
        data_residency: 2,
        retention_control: 2,
        encryption_standards: 2,
        compliance_framework: 2
      },
      privacyImpact: 'Medium - Business communications and workflow data',
      commonRegulations: ['GDPR', 'SOC 2', 'ISO 27001']
    },
    {
      id: 'analytics_marketing',
      name: 'Analytics & Marketing',
      description: 'Data analytics, marketing automation, and customer tracking',
      icon: <Eye className="h-5 w-5 text-pink-600" />,
      commonUseCase: 'Customer analytics, marketing campaigns, tracking',
      riskTemplate: {
        data_sensitivity: 4,
        access_control: 2,
        data_residency: 4,
        retention_control: 2,
        encryption_standards: 2,
        compliance_framework: 3
      },
      privacyImpact: 'High - Customer behavior and PII tracking',
      commonRegulations: ['GDPR', 'CCPA', 'PECR', 'ePrivacy']
    },
    {
      id: 'infrastructure',
      name: 'Infrastructure & Hosting',
      description: 'Cloud infrastructure, hosting, and technical services',
      icon: <Building className="h-5 w-5 text-gray-600" />,
      commonUseCase: 'Server hosting, cloud infrastructure, CDN',
      riskTemplate: {
        data_sensitivity: 3,
        access_control: 4,
        data_residency: 4,
        retention_control: 3,
        encryption_standards: 4,
        compliance_framework: 4
      },
      privacyImpact: 'Medium-High - Infrastructure-level data access',
      commonRegulations: ['SOC 2', 'ISO 27001', 'GDPR', 'FedRAMP']
    }
  ];

  // Risk dimensions focused on data privacy and protection
  const [riskDimensions, setRiskDimensions] = useState<RiskDimension[]>([
    {
      id: 'data_sensitivity',
      name: 'Data Sensitivity Level',
      shortName: 'Data Sensitivity',
      description: 'Classification and sensitivity of data being processed',
      weight: 5,
      value: 1,
      icon: <Database className="h-5 w-5 text-red-600" />,
      privacyRegulations: ['GDPR Art. 9', 'CCPA', 'HIPAA'],
      protectionRequirements: ['Data Classification', 'Access Controls', 'Encryption at Rest']
    },
    {
      id: 'access_control',
      name: 'Access Control & Authentication',
      shortName: 'Access Control',
      description: 'Identity management and access control mechanisms',
      weight: 4,
      value: 1,
      icon: <Lock className="h-5 w-5 text-blue-600" />,
      privacyRegulations: ['GDPR Art. 25', 'SOX', 'ISO 27001'],
      protectionRequirements: ['MFA', 'Role-Based Access', 'Audit Logging']
    },
    {
      id: 'data_residency',
      name: 'Data Residency & Jurisdiction',
      shortName: 'Data Residency',
      description: 'Geographic location and legal jurisdiction of data processing',
      weight: 4,
      value: 1,
      icon: <Globe className="h-5 w-5 text-green-600" />,
      privacyRegulations: ['GDPR Art. 44-49', 'Schrems II', 'Data Localization Laws'],
      protectionRequirements: ['Adequacy Decisions', 'SCCs', 'Data Mapping']
    },
    {
      id: 'retention_control',
      name: 'Data Retention & Deletion',
      shortName: 'Retention Control',
      description: 'Data lifecycle management and deletion capabilities',
      weight: 3,
      value: 1,
      icon: <FileText className="h-5 w-5 text-purple-600" />,
      privacyRegulations: ['GDPR Art. 17', 'CCPA', 'Data Minimization'],
      protectionRequirements: ['Retention Policies', 'Secure Deletion', 'Data Portability']
    },
    {
      id: 'encryption_standards',
      name: 'Encryption & Security Standards',
      shortName: 'Encryption',
      description: 'Cryptographic controls and security implementation',
      weight: 4,
      value: 1,
      icon: <Shield className="h-5 w-5 text-orange-600" />,
      privacyRegulations: ['GDPR Art. 32', 'PCI DSS', 'FIPS 140-2'],
      protectionRequirements: ['Encryption in Transit', 'Encryption at Rest', 'Key Management']
    },
    {
      id: 'compliance_framework',
      name: 'Compliance & Certification',
      shortName: 'Compliance',
      description: 'Regulatory compliance and industry certifications',
      weight: 3,
      value: 1,
      icon: <Eye className="h-5 w-5 text-teal-600" />,
      privacyRegulations: ['SOC 2', 'ISO 27001', 'Industry Standards'],
      protectionRequirements: ['Regular Audits', 'Compliance Monitoring', 'Incident Response']
    }
  ]);

  // Handle category selection and apply template
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const category = vendorCategories.find(c => c.id === categoryId);
    if (category) {
      setRiskDimensions(prev => 
        prev.map(dimension => ({
          ...dimension,
          value: category.riskTemplate[dimension.id] || 1
        }))
      );
    }
  };

  const handleRiskDimensionChange = (id: string, value: number) => {
    setRiskDimensions(prev => 
      prev.map(dimension => 
        dimension.id === id ? { ...dimension, value } : dimension
      )
    );
  };

  // Generate radar chart data
  const generateRadarData = (): RadarData[] => {
    return riskDimensions.map(dimension => ({
      dimension: dimension.shortName,
      risk: dimension.value * 20, // Convert 1-5 scale to 0-100
      required: getRequiredControlLevel(dimension.id) * 20,
      fullMark: 100
    }));
  };

  // Determine required control level based on risk
  const getRequiredControlLevel = (dimensionId: string): number => {
    const dimension = riskDimensions.find(d => d.id === dimensionId);
    if (!dimension) return 1;
    
    // Required controls should be inverse of risk (high risk = high controls needed)
    return Math.min(5, dimension.value + 1);
  };

  const calculateRiskScore = async () => {
    if (!vendorName.trim()) {
      setError('Please enter a vendor name');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Calculate weighted risk score
      let totalWeight = 0;
      let weightedSum = 0;
      
      riskDimensions.forEach(dimension => {
        totalWeight += dimension.weight;
        weightedSum += dimension.weight * dimension.value;
      });
      
      const maxPossibleScore = totalWeight * 5;
      const calculatedRiskScore = Math.round((weightedSum / maxPossibleScore) * 100);
      
      setRiskScore(calculatedRiskScore);
      
      // Generate privacy compliance assessment
      const complianceGaps = generateComplianceAssessment();
      
      // Save to database if user is authenticated
      if (isAuthenticated) {
        const riskLevel = getRiskLevel(calculatedRiskScore);
        const selectedCat = vendorCategories.find(c => c.id === selectedCategory);
        
        await createVendor({
          name: vendorName,
          risk_score: calculatedRiskScore,
          risk_level: riskLevel,
          compliance_status: riskLevel === 'Low' ? 'Compliant' : 
                            riskLevel === 'Medium' ? 'Requires Review' : 'High Risk',
          notes: `Category: ${selectedCat?.name || 'Custom'} | Privacy Impact: ${selectedCat?.privacyImpact || 'To be assessed'} | Compliance Gaps: ${complianceGaps.join(', ')}`
        });
      }
      
      setCalculationComplete(true);
    } catch (err) {
      console.error('Error calculating risk:', err);
      setError(err instanceof Error ? err.message : 'Failed to calculate risk score');
    } finally {
      setIsLoading(false);
    }
  };

  const generateComplianceAssessment = (): string[] => {
    const gaps: string[] = [];
    riskDimensions.forEach(dimension => {
      if (dimension.value >= 4) {
        gaps.push(`High ${dimension.shortName} Risk`);
      }
    });
    return gaps;
  };

  const getRiskLevel = (score: number): 'Low' | 'Medium' | 'High' | 'Critical' => {
    if (score <= 40) return 'Low';
    if (score <= 60) return 'Medium';
    if (score <= 80) return 'High';
    return 'Critical';
  };

  const getPrivacyRecommendations = (): string[] => {
    const recommendations: string[] = [];
    const selectedCat = vendorCategories.find(c => c.id === selectedCategory);
    
    if (selectedCat) {
      recommendations.push(`Ensure compliance with: ${selectedCat.commonRegulations.join(', ')}`);
    }
    
    riskDimensions.forEach(dimension => {
      if (dimension.value >= 4) {
        recommendations.push(`Implement ${dimension.protectionRequirements.join(', ')} for ${dimension.name}`);
      }
    });
    
    return recommendations;
  };

  // Demo data for showcase
  useEffect(() => {
    if (!vendorName && !selectedCategory) {
      // Load demo data
      setVendorName('CloudCorp Document Storage');
      handleCategorySelect('cloud_storage');
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-navy dark:hover:text-vendorsoluce-blue transition-colors mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('navigation.home')}
        </Link>
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Vendor Risk Radar</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Assess vendor risks with focus on data privacy, protection requirements, and regulatory compliance
        </p>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="xl:col-span-2 space-y-6">
          {/* Vendor Category Selection */}
          <Card>
            <CardHeader>
              <CardTitle>1. Select Vendor Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vendorCategories.map((category) => (
                  <div
                    key={category.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedCategory === category.id
                        ? 'border-vendorsoluce-navy bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">{category.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">{category.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{category.description}</p>
                        <div className="mt-2">
                          <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
                            {category.privacyImpact}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Vendor Details */}
          <Card>
            <CardHeader>
              <CardTitle>2. Vendor Information</CardTitle>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md flex items-start">
                  <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Vendor Name
                </label>
                <input
                  type="text"
                  value={vendorName}
                  onChange={(e) => setVendorName(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Enter vendor name..."
                />
              </div>

              {selectedCategory && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Category Overview</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Common Use Case:</strong> {vendorCategories.find(c => c.id === selectedCategory)?.commonUseCase}</p>
                    <p><strong>Privacy Impact:</strong> {vendorCategories.find(c => c.id === selectedCategory)?.privacyImpact}</p>
                    <p><strong>Key Regulations:</strong> {vendorCategories.find(c => c.id === selectedCategory)?.commonRegulations.join(', ')}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Risk Dimensions */}
          <Card>
            <CardHeader>
              <CardTitle>3. Risk Assessment Dimensions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {riskDimensions.map((dimension) => (
                  <div key={dimension.id} className="pb-6 border-b border-gray-200 dark:border-gray-700 last:border-0">
                    <div className="flex items-start mb-2">
                      <div className="mr-3 mt-1">{dimension.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">{dimension.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{dimension.description}</p>
                        
                        <div className="text-xs space-y-1">
                          <div>
                            <strong>Privacy Regulations:</strong> {dimension.privacyRegulations.join(', ')}
                          </div>
                          <div>
                            <strong>Protection Requirements:</strong> {dimension.protectionRequirements.join(', ')}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <span>Low Risk</span>
                        <span>High Risk</span>
                      </div>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <button
                            key={value}
                            className={`flex-1 py-2 rounded-md transition text-sm ${
                              dimension.value === value 
                                ? 'bg-vendorsoluce-navy text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                            onClick={() => handleRiskDimensionChange(dimension.id, value)}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button
                variant="primary"
                className="w-full mt-6"
                disabled={!vendorName.trim() || isLoading}
                onClick={calculateRiskScore}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                Generate Risk Radar
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Results Section */}
        <div className="xl:col-span-1">
          {calculationComplete ? (
            <div className="space-y-6">
              {/* Radar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Risk Radar Visualization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={generateRadarData()}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 10 }} />
                        <PolarRadiusAxis
                          angle={0}
                          domain={[0, 100]}
                          tick={{ fontSize: 8 }}
                        />
                        <Radar
                          name="Current Risk"
                          dataKey="risk"
                          stroke="#ef4444"
                          fill="#ef4444"
                          fillOpacity={0.3}
                          strokeWidth={2}
                        />
                        <Radar
                          name="Required Controls"
                          dataKey="required"
                          stroke="#10b981"
                          fill="#10b981"
                          fillOpacity={0.1}
                          strokeWidth={2}
                        />
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Risk Score */}
              <Card>
                <CardHeader>
                  <CardTitle>Overall Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">{riskScore}</div>
                    <RiskBadge level={getRiskLevel(riskScore)} />
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Privacy Recommendations</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        {getPrivacyRecommendations().slice(0, 3).map((rec, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-2 h-2 bg-vendorsoluce-navy rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Link to="/vendor-risk-dashboard">
                <Button variant="outline" className="w-full">
                  View Full Dashboard
                </Button>
              </Link>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>How to Use the Risk Radar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-gray-100 dark:bg-gray-800 w-6 h-6 rounded-full flex items-center justify-center text-vendorsoluce-navy dark:text-vendorsoluce-blue mr-3 mt-0.5 flex-shrink-0">
                      1
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Choose the vendor category that best matches your use case to load baseline risk settings
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-gray-100 dark:bg-gray-800 w-6 h-6 rounded-full flex items-center justify-center text-vendorsoluce-navy dark:text-vendorsoluce-blue mr-3 mt-0.5 flex-shrink-0">
                      2
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Adjust risk dimensions based on your specific data sensitivity and regulatory requirements
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-gray-100 dark:bg-gray-800 w-6 h-6 rounded-full flex items-center justify-center text-vendorsoluce-navy dark:text-vendorsoluce-blue mr-3 mt-0.5 flex-shrink-0">
                      3
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Generate the radar chart to visualize risk levels and required control gaps
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <p className="font-medium mb-1">Demo Mode Active</p>
                      <p>Using CloudCorp Document Storage as example. Select a category to see different risk profiles.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorRiskRadar;