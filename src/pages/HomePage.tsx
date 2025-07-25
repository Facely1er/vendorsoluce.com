import React from 'react';
import { useTranslation } from 'react-i18next';
import HeroSection from '../components/home/HeroSection';
import ValuePropositionSection from '../components/home/ValuePropositionSection';
import AssessmentSection from '../components/home/AssessmentSection';
import FeatureSection from '../components/home/FeatureSection';
import QuickToolsSection from '../components/home/QuickToolsSection';
import CTASection from '../components/home/CTASection';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AssessmentSection />
      <ValuePropositionSection />
      <FeatureSection />
      <QuickToolsSection />
      <CTASection />
      
       {/* Getting Started CTA */}
      <section className="text-center bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {t('howItWorks.getStarted.title')}
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          {t('howItWorks.getStarted.description')}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-vendorsoluce-green mb-2">1</div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">
              {t('howItWorks.getStarted.steps.step1.title')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('howItWorks.getStarted.steps.step1.description')}
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-vendorsoluce-green mb-2">2</div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">
              {t('howItWorks.getStarted.steps.step2.title')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('howItWorks.getStarted.steps.step2.description')}
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-vendorsoluce-green mb-2">3</div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">
              {t('howItWorks.getStarted.steps.step3.title')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('howItWorks.getStarted.steps.step3.description')}
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/supply-chain-assessment">
            <Button variant="primary" size="lg">
              {t('howItWorks.getStarted.cta.signup')}
            </Button>
          </Link>
          <Link to="/templates">
            <Button variant="outline" size="lg">
              {t('howItWorks.getStarted.cta.resources')}
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default HomePage;