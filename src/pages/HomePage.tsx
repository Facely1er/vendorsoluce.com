import React from 'react';
import { useTranslation } from 'react-i18next';
import HeroSection from '../components/home/HeroSection';
import ValuePropositionSection from '../components/home/ValuePropositionSection';
import AssessmentSection from '../components/home/AssessmentSection';
import FeatureSection from '../components/home/FeatureSection';
import QuickToolsSection from '../components/home/QuickToolsSection';
import CTASection from '../components/home/CTASection';
import Counter from '../components/Counter';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <main className="min-h-screen">
      <HeroSection />
      {/*<AssessmentSection /> */}
       <ValuePropositionSection />
       <FeatureSection /> 
      {/*  <QuickToolsSection /> */}
      
      {/* Zustand Demo Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Advanced State Management Demo
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              This counter demonstrates Zustand state management in action. The state is managed globally and can be accessed from any component.
            </p>
          </div>
          <div className="flex justify-center">
            <Counter />
          </div>
        </div>
      </section>
      
      <CTASection />
    </main>
  );
};

export default HomePage;