 import React from 'react';
import { Shield, ShieldCheck,FileJson, BarChart3, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FeatureSection: React.FC = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-vendorsoluce-green" />,
      title: t('home.features.feature1.title'),
      description: t('home.features.feature1.description')
    },
    {
      icon: <FileJson className="h-8 w-8 text-vendorsoluce-light-green" />,
      title: t('home.features.feature2.title'),
      description: t('home.features.feature2.description')
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-vendorsoluce-green" />,
      title: t('home.features.feature3.title'),
      description: t('home.features.feature3.description')
    },
    {
      icon: <Zap className="h-8 w-8 text-vendorsoluce-light-green" />,
      title: t('home.features.feature4.title'),
      description: t('home.features.feature4.description')
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {t('home.features.title')}
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {t('home.features.description')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;