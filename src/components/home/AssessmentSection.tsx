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
      icon: <ShieldCheck className="h-8 w-8 text-vendorsoluce-green" />,
      challenges: [
        'Limited visibility into supplier security practices',
        'Manual assessment processes are time-consuming',
        'Difficulty tracking remediation progress',
        'Compliance reporting challenges'
      ],
      solutions: [
        {
          title: 'Automated SBOM Analysis',
          description: 'Comprehensive software bill of materials analysis with vulnerability detection and license compliance checking.',
          benefits: [
            'Identify critical vulnerabilities in minutes',
            'Automated license compliance checking',
            'Detailed security reports and recommendations',
            'Continuous monitoring and alerts'
          ],
          cta: 'Analyze SBOM Now',
          link: '/tools/sbom-analyzer'
        },
        {
          title: 'Vendor Security Assessments',
          description: 'Streamlined security assessments with automated scoring and evidence collection.',
          benefits: [
            'CMMC Level 1 & 2 assessment templates',
            'NIST SP 800-171 compliance frameworks',
            'Automated risk scoring and prioritization',
            'Secure evidence collection portal',
            'Real-time progress tracking and notifications'
          ],
          cta: 'Start Assessment',
          link: '/vendor-assessments'
        }
      ]
    },
    {
      id: 'procurement',
      title: 'Procurement Teams',
      description: 'Strategic tools for balancing cost, quality, and risk in vendor selection and management.',
      icon: <Building2 className="h-8 w-8 text-vendorsoluce-navy" />,
      challenges: [
        'Balancing cost, quality, and security requirements',
        'Managing vendor lifecycle and performance',
        'Contract risk assessment and negotiation',
        'Due diligence documentation and tracking'
      ],
      solutions: [
        {
          title: 'Vendor Risk Calculator',
          description: 'Data-driven vendor selection with comprehensive risk scoring and comparison tools.',
          benefits: [
            'Multi-criteria decision analysis',
            'Automated risk scoring algorithms',
            'Side-by-side vendor comparisons',
            'Integration with procurement systems'
          ],
          cta: 'Calculate Risk',
          link: '/tools/vendor-risk-calculator'
        },
        {
          title: 'Vendor Management Dashboard',
          description: 'Centralized platform for tracking vendor performance, contracts, and compliance status.',
          benefits: [
            'Real-time vendor performance monitoring',
            'Contract milestone tracking',
            'Automated compliance alerts',
            'Executive reporting and analytics'
          ],
          cta: 'View Dashboard',
          link: '/vendor-risk-dashboard'
        }
      ]
    },
    {
      id: 'compliance',
      title: 'Compliance Officers',
      description: 'Regulatory compliance tools and frameworks for meeting industry standards and requirements.',
      icon: <Lock className="h-8 w-8 text-vendorsoluce-teal" />,
      challenges: [
        'Evolving regulatory requirements',
        'Documenting compliance evidence',
        'Managing third-party compliance obligations',
        'Mapping controls across frameworks'
      ],
      solutions: [
        {
          title: 'NIST Supply Chain Assessment',
          description: 'Comprehensive assessment based on NIST SP 800-161 guidelines with automated reporting.',
          benefits: [
            'Pre-built NIST assessment templates',
            'Automated compliance scoring',
            'Evidence documentation system',
            'Gap analysis and remediation planning'
          ],
          cta: 'Start NIST Assessment',
          link: '/supply-chain-assessment'
        },
        {
          title: 'Compliance Templates',
          description: 'Ready-to-use templates for various compliance frameworks and industry standards.',
          benefits: [
            'Federal and industry-specific templates',
            'Customizable assessment criteria',
            'Control mapping matrices',
            'Executive summary reports'
          ],
          cta: 'Browse Templates',
          link: '/templates'
        }
      ]
    },
    {
      id: 'executives',
      title: 'Executive Leadership',
      description: 'Strategic insights and executive reporting for informed decision-making and risk oversight.',
      icon: <Users className="h-8 w-8 text-vendorsoluce-blue" />,
      challenges: [
        'Understanding supply chain risk exposure',
        'Justifying security investment decisions',
        'Demonstrating compliance to stakeholders',
        'Balancing operational efficiency with security'
      ],
      solutions: [
        {
          title: 'Executive Dashboards',
          description: 'High-level visibility into supply chain risk posture with actionable insights.',
          benefits: [
            'Key risk metrics and trends',
            'Vendor portfolio risk overview',
            'Compliance status summaries',
            'Strategic recommendations'
          ],
          cta: 'View Dashboard',
          link: '/dashboard'
        },
        {
          title: 'Executive Reporting',
          description: 'Automated reporting for board presentations and stakeholder communications.',
          benefits: [
            'Automated monthly/quarterly reports',
            'Customizable executive summaries',
            'Risk trend analysis',
            'Board-ready presentations'
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
            Solutions for Every Stakeholder
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Tailored tools and insights for security teams, procurement professionals, compliance officers, and executive leadership.
          </p>
        </div>

        {/* Stakeholder Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
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
              {stakeholder.icon}
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
              Start with a comprehensive assessment or explore our tools to see immediate value.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/supply-chain-assessment">
                <Button variant="secondary" size="lg" className="bg-white text-vendorsoluce-green hover:bg-gray-100">
                  <Target className="h-5 w-5 mr-2" />
                  Start Assessment
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