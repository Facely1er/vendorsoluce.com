import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  ShieldCheck,
  FileSearch,
  Users,
  Network,
  ArrowRight,
  Crown
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AssessmentSection: React.FC = () => {
  const { t } = useTranslation();

  const assessments = [
    {
      id: 'supply-chain',
      title: t('home.assessments.supplyChain.title'),
      description: t('home.assessments.supplyChain.description'),
      icon: ShieldCheck,
      features: [
        t('home.assessments.supplyChain.features.0'),
        t('home.assessments.supplyChain.features.1'),
        t('home.assessments.supplyChain.features.2'),
        t('home.assessments.supplyChain.features.3')
      ],
      badges: ['NIST SP 800-161', 'ISO 28000'],
      buttonVariant: 'primary' as const,
      link: '/supply-chain-assessment'
    },
    {
      id: 'sbom',
      title: t('home.assessments.sbomAnalysis.title'),
      description: t('home.assessments.sbomAnalysis.description'),
      icon: FileSearch,
      features: [
        t('home.assessments.sbomAnalysis.features.0'),
        t('home.assessments.sbomAnalysis.features.1'),
        t('home.assessments.sbomAnalysis.features.2'),
        t('home.assessments.sbomAnalysis.features.3')
      ],
      badges: ['NIST SP 800-161 3.4.1', 'SPDX', 'CycloneDX'],
      buttonVariant: 'outline' as const,
      link: '/sbom-analyzer'
    },
    {
      id: 'vendor',
      title: t('home.assessments.vendorAssessments.title'),
      description: t('home.assessments.vendorAssessments.description'),
      icon: Users,
      features: [
        t('home.assessments.vendorAssessments.features.0'),
        t('home.assessments.vendorAssessments.features.1'),
        t('home.assessments.vendorAssessments.features.2'),
        t('home.assessments.vendorAssessments.features.3')
      ],
      badges: ['CMMC Level 1 & 2', 'NIST Privacy Framework', 'Premium'],
      isPremium: true,
      buttonVariant: 'outline' as const,
      link: '/vendor-assessments'
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('home.assessments.title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('home.assessments.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {assessments.map((assessment, index) => (
            <Card key={assessment.id} className="bg-gray-800 border-gray-700 text-white">
              <CardHeader>
                <div className="flex items-center justify-center w-16 h-16 bg-gray-700 rounded-full mb-4 mx-auto">
                  <assessment.icon className="h-8 w-8 text-vendorsoluce-green" />
                </div>
                <CardTitle className="text-center text-white">{assessment.title}</CardTitle>
                <div className="flex flex-wrap gap-2 justify-center mt-2">
                  {assessment.badges.map((badge, badgeIndex) => (
                    <span
                      key={badgeIndex}
                      className={`px-2 py-1 text-xs rounded-md ${
                        badge === 'Premium' 
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-medium'
                          : 'bg-gray-700 text-gray-300'
                      }`}
                    >
                      {badge === 'Premium' && <Crown className="inline h-3 w-3 mr-1" />}
                      {badge}
                    </span>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4 text-center">{assessment.description}</p>
                <ul className="space-y-2 mb-6">
                  {assessment.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-vendorsoluce-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to={assessment.link} className="block">
                  <Button 
                    variant={assessment.buttonVariant} 
                    className="w-full"
                  >
                    {t('home.assessments.startAssessment')}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">
            {t('home.assessments.needHelp')}
          </p>
          <Link to="/contact">
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
              {t('home.assessments.contactUs')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AssessmentSection;