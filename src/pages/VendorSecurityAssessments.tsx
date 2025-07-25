import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  Shield, 
  Building, 
  Building2,
  ShieldCheck,
  Users, 
  ArrowRight,
  Lock, 
  FileCheck, 
  BarChart3, 
  FileJson,
  ChevronRight,
  Target,
  TrendingUp,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Stakeholder {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  challenges: string[];
  solutions: {
    title: string;
    description: string;
    benefits: string[];
    cta: string;
    link: string;
  }[];
}

const ValuePropositionSection: React.FC = () => {
  const [activeStakeholder, setActiveStakeholder] = useState<string>('security');

  const stakeholders: Stakeholder[] = [
    {
      id: 'security',
      title: 'Security Teams',
      description: 'Comprehensive tools for identifying, assessing, and mitigating supply chain security risks.',
      icon: <Shield className="h-8 w-8 text-vendorsoluce-green" />,
      challenges: [
        'Limited visibility into supplier security practices',
        'Time-consuming manual assessment processes',
        'Difficulty tracking vulnerabilities across software components',
        'Complex compliance requirements like NIST SP 800-161'
      ],
      solutions: [
        {
          title: 'Automated SBOM Analysis',
          description: 'Instantly analyze software components for vulnerabilities and license compliance.',
          benefits: [
            'Identify critical vulnerabilities in minutes',
            'Track open source licenses automatically',
            'Generate compliance reports for audits',
            'Monitor component health continuously'
          ],
          cta: 'Analyze SBOM Now',
          link: '/sbom-analyzer'
        },
        {
          title: 'Vendor Security Assessments',
          description: 'Send CMMC and NIST Privacy Framework assessments through secure vendor portal.',
          benefits: [
            'CMMC Level 1 & 2 assessment templates',
            'CMMC Level 1 & 2 assessment templates',
            'CMMC Level 1 & 2 assessment templates',
            'CMMC Level 1 & 2 assessment templates',
            'NIST Privacy Framework questionnaires',
            'Automated scoring and risk rating',
            'Secure evidence collection portal',
            'Real-time progress tracking and notifications'
          ],
      icon: <ShieldCheck className="h-8 w-8 text-vendorsoluce-green" />,
          link: '/vendor-assessments'
        }
      ]
    },
    {
      id: 'procurement',
      title: 'Procurement Teams',
      description: 'Streamline vendor selection and management with risk-based decision making tools.',
      icon: <Building2 className="h-8 w-8 text-vendorsoluce-navy" />,
      challenges: [
        'Balancing cost, quality, and security in vendor selection',
        'Managing vendor relationships throughout their lifecycle',
        'Ensuring contract terms include appropriate security clauses',
        'Demonstrating due diligence for audit purposes'
      ],
      solutions: [
        {
          title: 'Vendor Risk Calculator',
          description: 'Calculate preliminary risk scores to inform vendor selection decisions.',
          benefits: [
            'Standardized risk assessment criteria',
            'Immediate risk scoring for new vendors',
            'Data-driven vendor comparison',
            'Integration with procurement workflows'
          ],
          cta: 'Calculate Risk',
          link: '/tools/vendor-risk-calculator'
        },
        {
          title: 'Vendor Risk Dashboard',
          description: 'Monitor and manage your vendor portfolio with centralized risk visibility.',
          benefits: [
            'Real-time risk monitoring',
            'Automated compliance tracking',
            'Contract renewal alerts',
            'Executive reporting dashboards'
          ],
          cta: 'View Dashboard',
          link: '/vendor-risk-dashboard'
        }
      ]
    },
    {
      id: 'compliance',
      title: 'Compliance Officers',
      description: 'Ensure adherence to regulatory requirements with built-in compliance frameworks.',
      icon: <Lock className="h-8 w-8 text-vendorsoluce-teal" />,
      challenges: [
        'Keeping up with evolving regulatory requirements',
        'Documenting compliance efforts for audits',
        'Ensuring vendors meet contractual obligations',
        'Managing compliance across multiple frameworks'
      ],
      solutions: [
        {
          title: 'NIST SP 800-161 Assessment',
          description: 'Comprehensive supply chain risk assessment aligned with federal standards.',
          benefits: [
            'Pre-built NIST control templates',
            'Automated compliance scoring',
            'Audit-ready documentation',
            'Gap analysis and recommendations'
          ],
          cta: 'Start Assessment',
          link: '/supply-chain-assessment'
        },
        {
          title: 'Compliance Templates',
          description: 'Access pre-built templates for common compliance scenarios.',
          benefits: [
            'Federal compliance templates',
            'Industry-specific questionnaires',
            'Risk assessment matrices',
            'Executive summary templates'
          ],
          cta: 'Download Templates',
          link: '/templates'
        }
      ]
    },
    {
      id: 'executives',
      title: 'Executive Leadership',
      description: 'Strategic insights and reporting to make informed decisions about supply chain risks.',
      icon: <Users className="h-8 w-8 text-vendorsoluce-blue" />,
      challenges: [
        'Understanding supply chain risk exposure',
        'Making informed investment decisions',
        'Demonstrating risk management to stakeholders',
        'Balancing operational efficiency with security'
      ],
      solutions: [
        {
          title: 'Executive Dashboards',
          description: 'High-level insights into your organization\'s supply chain risk posture.',
          benefits: [
            'Key risk metrics and trends',
            'Vendor portfolio health overview',
            'Compliance status summaries',
            'Strategic risk recommendations'
          ],
          cta: 'View Dashboard',
          link: '/dashboard'
        },
        {
          title: 'Risk Reporting',
          description: 'Generate executive-level reports for board meetings and stakeholder updates.',
          benefits: [
            'Automated report generation',
            'Customizable metrics and KPIs',
            'Trend analysis and forecasting',
            'Stakeholder-ready presentations'
          ],
          cta: 'Generate Report',
          link: '/vendor-risk-dashboard'
        }
      ]
    }
  ];

  const activeStakeholderData = stakeholders.find(s => s.id === activeStakeholder) || stakeholders[0];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Designed for Every Supply Chain Stakeholder
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            VendorSoluce addresses the unique challenges faced by different teams in your organization, 
            providing tailored solutions that deliver measurable value to each stakeholder.
            'Secure evidence collection portal',
            'Real-time progress tracking and notifications'

        <div className="flex flex-wrap justify-center gap-2 mb-8">
            { id: 'overview', label: 'Overview', icon: <BarChart3 className="h-4 w-4" /> },
            { id: 'assessments', label: 'Active Assessments', icon: <ClipboardList className="h-4 w-4" /> },
            { id: 'templates', label: 'Framework Templates', icon: <Files className="h-4 w-4" /> },
            { id: 'portal', label: 'Vendor Portal', icon: <Globe className="h-4 w-4" /> }
          {stakeholders.map((stakeholder) => (
            <button
              key={stakeholder.id}
              onClick={() => setActiveStakeholder(stakeholder.id)}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
                activeStakeholder === stakeholder.id
                  ? 'bg-vendorsoluce-green text-white shadow-md'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              <span className="mr-2">{icon}</span>
              <span className="ml-2">{stakeholder.title}</span>
            </button>
          ))}
        </div>

        {/* Active Stakeholder Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Challenges */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center  text-gray-900 dark:text-white">
                <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                Common Challenges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{activeStakeholderData.description}</p>
              <ul className="space-y-3">
                {activeStakeholderData.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{challenge}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Solutions */}
          <div className="lg:col-span-2 space-y-6">
            {activeStakeholderData.solutions.map((solution, index) => (
              <Card key={index} className="border-l-4 border-l-vendorsoluce-green">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {solution.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {solution.description}
                      </p>
                    </div>
                    <div className="ml-4">
                      <Link to={solution.link}>
                        <Button variant="primary" size="sm">
                          {solution.cta}
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {solution.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-vendorsoluce-green mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-vendorsoluce-green to-vendorsoluce-light-green rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Supply Chain Security?</h3>
            <p className="text-xl text-gray-100 mb-6">
              Join organizations worldwide who trust VendorSoluce to secure their supply chains and meet compliance requirements.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/supply-chain-assessment">
                <Button variant="secondary" size="lg" className="bg-white text-vendorsoluce-green hover:bg-gray-100">
                  <Target className="h-5 w-5 mr-2" />
                  Start Free Assessment
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/20">
                  <Users className="h-5 w-5 mr-2" />
                  Schedule Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuePropositionSection;