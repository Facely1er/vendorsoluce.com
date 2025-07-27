import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Shield, 
  Code, 
  Database, 
  Cloud, 
  Zap,
  Download,
  ExternalLink,
  ChevronRight,
  Copy,
  CheckCircle,
  Book,
  Terminal,
  Globe,
  Lock,
  AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface IntegrationGuide {
  id: string;
  title: string;
  description: string;
  category: 'api' | 'webhooks' | 'sso' | 'export' | 'automation';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  icon: React.ReactNode;
  steps: string[];
  codeExample?: string;
  documentation?: string;
}

const IntegrationGuides: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const integrationGuides: IntegrationGuide[] = [
    {
      id: 'rest-api',
      title: 'REST API Integration',
      description: 'Connect your applications to VendorSoluce using our REST API for vendor data, assessments, and SBOM analysis.',
      category: 'api',
      difficulty: 'intermediate',
      estimatedTime: '30-60 minutes',
      icon: <Code className="h-6 w-6 text-blue-600" />,
      steps: [
        'Obtain API credentials from your VendorSoluce dashboard',
        'Set up authentication headers in your application',
        'Make your first API call to fetch vendor data',
        'Implement error handling and rate limiting',
        'Test the integration with sample data'
      ],
      codeExample: `// Example: Fetch vendor risk data
const response = await fetch('https://api.vendorsoluce.com/v1/vendors', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const vendors = await response.json();
console.log(vendors);`,
      documentation: '/api-docs'
    },
    {
      id: 'webhook-setup',
      title: 'Webhook Configuration',
      description: 'Receive real-time notifications when vendor risk scores change, assessments complete, or vulnerabilities are detected.',
      category: 'webhooks',
      difficulty: 'intermediate',
      estimatedTime: '45 minutes',
      icon: <Zap className="h-6 w-6 text-yellow-600" />,
      steps: [
        'Configure webhook endpoints in your VendorSoluce dashboard',
        'Set up a secure HTTPS endpoint to receive webhooks',
        'Verify webhook signatures for security',
        'Handle different event types (risk changes, assessments)',
        'Implement retry logic for failed webhook deliveries'
      ],
      codeExample: `// Example: Webhook endpoint handler
app.post('/webhooks/vendorsoluce', (req, res) => {
  const { event, data } = req.body;
  
  switch(event) {
    case 'vendor.risk_changed':
      handleRiskChange(data);
      break;
    case 'assessment.completed':
      handleAssessmentComplete(data);
      break;
  }
  
  res.status(200).send('OK');
});`,
      documentation: '/api-docs#webhooks'
    },
    {
      id: 'sso-integration',
      title: 'Single Sign-On (SSO)',
      description: 'Integrate VendorSoluce with your organization\'s identity provider using SAML 2.0 or OpenID Connect.',
      category: 'sso',
      difficulty: 'advanced',
      estimatedTime: '2-4 hours',
      icon: <Lock className="h-6 w-6 text-green-600" />,
      steps: [
        'Configure your identity provider (IdP) settings',
        'Exchange SAML metadata with VendorSoluce',
        'Set up attribute mapping for user roles',
        'Test SSO login flow with test users',
        'Configure group-based access controls'
      ],
      documentation: '/api-docs#sso'
    },
    {
      id: 'data-export',
      title: 'Automated Data Export',
      description: 'Set up scheduled exports of vendor data, assessment results, and compliance reports to your data warehouse.',
      category: 'export',
      difficulty: 'beginner',
      estimatedTime: '20 minutes',
      icon: <Download className="h-6 w-6 text-purple-600" />,
      steps: [
        'Choose your preferred export format (CSV, JSON, XML)',
        'Configure export schedules in the dashboard',
        'Set up secure file transfer (SFTP, S3, etc.)',
        'Map data fields to your internal systems',
        'Test the export process and validate data'
      ],
      codeExample: `// Example: Automated export script
const exportData = async () => {
  const response = await fetch('/api/exports/vendors', {
    headers: { 'Authorization': 'Bearer ' + apiKey }
  });
  
  const csvData = await response.text();
  await uploadToS3(csvData, 'vendors-export.csv');
};

// Schedule daily exports
cron.schedule('0 2 * * *', exportData);`,
      documentation: '/api-docs#exports'
    },
    {
      id: 'workflow-automation',
      title: 'Workflow Automation',
      description: 'Automate vendor onboarding, risk assessments, and compliance tracking using VendorSoluce APIs.',
      category: 'automation',
      difficulty: 'advanced',
      estimatedTime: '1-2 hours',
      icon: <Zap className="h-6 w-6 text-orange-600" />,
      steps: [
        'Design your automation workflow',
        'Set up trigger conditions (new vendor, risk threshold)',
        'Configure automated actions (send assessments, alerts)',
        'Implement approval workflows for high-risk vendors',
        'Monitor and optimize automation performance'
      ],
      codeExample: `// Example: Automated vendor onboarding
const onboardVendor = async (vendorData) => {
  // Create vendor record
  const vendor = await createVendor(vendorData);
  
  // Trigger risk assessment
  if (vendor.risk_score > 70) {
    await sendSecurityAssessment(vendor.id);
    await notifySecurityTeam(vendor);
  }
  
  return vendor;
};`,
      documentation: '/api-docs#automation'
    },
    {
      id: 'cloud-integration',
      title: 'Cloud Platform Integration',
      description: 'Connect VendorSoluce with AWS, Azure, or GCP for enhanced security monitoring and compliance.',
      category: 'api',
      difficulty: 'advanced',
      estimatedTime: '2-3 hours',
      icon: <Cloud className="h-6 w-6 text-blue-500" />,
      steps: [
        'Set up cloud service credentials and permissions',
        'Configure VendorSoluce cloud connectors',
        'Map cloud resources to vendor relationships',
        'Enable automated compliance monitoring',
        'Set up alerting for security events'
      ],
      documentation: '/api-docs#cloud-integration'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Integrations', icon: <Globe className="h-4 w-4" /> },
    { id: 'api', label: 'API Integration', icon: <Code className="h-4 w-4" /> },
    { id: 'webhooks', label: 'Webhooks', icon: <Zap className="h-4 w-4" /> },
    { id: 'sso', label: 'SSO/Authentication', icon: <Lock className="h-4 w-4" /> },
    { id: 'export', label: 'Data Export', icon: <Download className="h-4 w-4" /> },
    { id: 'automation', label: 'Automation', icon: <Terminal className="h-4 w-4" /> }
  ];

  const filteredGuides = selectedCategory === 'all' 
    ? integrationGuides 
    : integrationGuides.filter(guide => guide.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800';
    }
  };

  const copyToClipboard = async (code: string, guideId: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(guideId);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Integration Guides
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
          Connect VendorSoluce with your existing systems and workflows. Follow our step-by-step guides 
          to integrate supply chain risk management into your technology stack.
        </p>
      </div>

      {/* Quick Start Section */}
      <Card className="mb-8 border-l-4 border-l-vendorsoluce-green">
        <CardContent className="p-6">
          <div className="flex items-start">
            <div className="w-12 h-12 bg-vendorsoluce-green/10 rounded-full flex items-center justify-center mr-4">
              <Book className="h-6 w-6 text-vendorsoluce-green" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Getting Started with VendorSoluce API
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                New to VendorSoluce integrations? Start with our REST API guide to understand the basics 
                of authentication, endpoints, and data formats.
              </p>
              <div className="flex space-x-3">
                <Link to="/api-docs">
                  <Button variant="primary" size="sm">
                    <Code className="h-4 w-4 mr-2" />
                    View API Documentation
                  </Button>
                </Link>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download SDKs
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-vendorsoluce-green text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {category.icon}
              <span className="ml-2">{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Integration Guides */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredGuides.map((guide) => (
          <Card key={guide.id} className="h-full flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mr-3">
                    {guide.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg text-gray-900 dark:text-white">
                      {guide.title}
                    </CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(guide.difficulty)}`}>
                        {guide.difficulty}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {guide.estimatedTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col">
              <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">
                {guide.description}
              </p>
              
              {/* Steps */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Implementation Steps:</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  {guide.steps.slice(0, 3).map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                  {guide.steps.length > 3 && (
                    <li className="text-gray-500 dark:text-gray-400">
                      + {guide.steps.length - 3} more steps
                    </li>
                  )}
                </ol>
              </div>
              
              {/* Code Example */}
              {guide.codeExample && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">Code Example:</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(guide.codeExample!, guide.id)}
                      className="text-xs"
                    >
                      {copiedCode === guide.id ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md text-xs overflow-x-auto border border-gray-200 dark:border-gray-700">
                    <code className="text-gray-800 dark:text-gray-300">
                      {guide.codeExample}
                    </code>
                  </pre>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex space-x-2 mt-auto">
                {guide.documentation && (
                  <Link to={guide.documentation} className="flex-1">
                    <Button variant="primary" size="sm" className="w-full">
                      <Book className="h-4 w-4 mr-2" />
                      View Guide
                    </Button>
                  </Link>
                )}
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Examples
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* SDK and Tools Section */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">SDKs and Tools</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Database className="h-8 w-8 text-blue-600 mr-3" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">JavaScript SDK</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Official JavaScript/TypeScript SDK for web and Node.js applications.
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                npm install
              </Button>
              <Button variant="ghost" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                GitHub
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Shield className="h-8 w-8 text-green-600 mr-3" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Python SDK</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Python library for data science and automation workflows.
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                pip install
              </Button>
              <Button variant="ghost" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                PyPI
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Terminal className="h-8 w-8 text-purple-600 mr-3" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">CLI Tool</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Command-line interface for batch operations and CI/CD integration.
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="ghost" size="sm">
                <Book className="h-4 w-4 mr-2" />
                Docs
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Support Section */}
      <section className="mt-16">
        <Card className="bg-gradient-to-r from-vendorsoluce-navy to-vendorsoluce-teal text-white">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h2 className="text-2xl font-bold mb-2">Need Integration Support?</h2>
                <p className="text-gray-100 max-w-xl">
                  Our technical team is here to help you integrate VendorSoluce with your systems. 
                  Get personalized support for complex integrations and custom implementations.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button variant="secondary" size="lg" className="bg-white text-vendorsoluce-navy hover:bg-gray-100">
                    Contact Support
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/20">
                  Schedule Consultation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default IntegrationGuides;