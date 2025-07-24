import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileJson, BarChart3 } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Assessment } from '../../types';
import { useTranslation } from 'react-i18next';

const AssessmentSection: React.FC = () => {
  const { t } = useTranslation();
  
  const assessments: Assessment[] = [
    {
      id: 'supply-chain-assessment',
      title: t('assessment.supplyChain.title'),
      description: t('assessment.supplyChain.description'),
      frameworks: ['NIST SP 800-161', 'ISO 28000'],
      features: [
        t('assessment.supplyChain.feature1'),
        t('assessment.supplyChain.feature2'),
        t('assessment.supplyChain.feature3'),
        t('assessment.supplyChain.feature4')
      ],
      icon: 'Shield'
    },
    {
      id: 'sbom-analyzer',
      title: t('assessment.sbom.title'),
      description: t('assessment.sbom.description'),
      frameworks: ['NIST SP 800-161 3.4.1', 'SPDX', 'CycloneDX'],
      features: [
        t('assessment.sbom.feature1'),
        t('assessment.sbom.feature2'),
        t('assessment.sbom.feature3'),
        t('assessment.sbom.feature4')
      ],
      icon: 'FileJson'
    },
    {
      id: 'vendor-risk-dashboard',
      title: t('assessment.vendor.title'),
      description: t('assessment.vendor.description'),
      frameworks: ['NIST SP 800-161', 'ISO 31000'],
      features: [
        t('assessment.vendor.feature1'),
        t('assessment.vendor.feature2'),
        t('assessment.vendor.feature3'),
        t('assessment.vendor.feature4')
      ],
      icon: 'BarChart3'
    }
  ];

  const getIcon = (iconName: string) => {
    const icons = {
      Shield: <Shield size={24} className="text-vendorsoluce-green" />,
      FileJson: <FileJson size={24} className="text-vendorsoluce-light-green" />,
      BarChart3: <BarChart3 size={24} className="text-vendorsoluce-green" />
    };
    
    return icons[iconName as keyof typeof icons] || null;
  };

  const getCardVariant = (id: string): 'assessment' | 'sbom' | 'vendor' => {
    switch (id) {
      case 'supply-chain-assessment':
        return 'assessment';
      case 'sbom-analyzer':
        return 'sbom';
      case 'vendor-risk-dashboard':
        return 'vendor';
      default:
        return 'assessment';
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {t('home.assessments.title')}
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {t('home.assessments.description')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {assessments.map((assessment) => (
          <Link key={assessment.id} to={`/${assessment.id}`} className="block h-full">
            <Card variant={getCardVariant(assessment.id)} className="flex flex-col h-full hover:shadow-lg transition-shadow cursor-pointer">
            <div className="p-6 flex-1">
              <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
                {getIcon(assessment.icon)}
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{assessment.title}</h3>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {assessment.frameworks.map((framework) => (
                  <span key={framework} className="inline-block text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 py-1 rounded">
                    {framework}
                  </span>
                ))}
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4">{assessment.description}</p>
              
              <ul className="mt-4 space-y-2">
                {assessment.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-6 border-t border-gray-100 dark:border-gray-700">
                <Button 
                  variant={assessment.id === 'supply-chain-assessment' ? 'primary' : 
                           assessment.id === 'sbom-analyzer' ? 'secondary' : 'outline'}
                  className="w-full"
                >
                  {t('home.assessments.startAssessment')}
                </Button>
            </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default AssessmentSection;