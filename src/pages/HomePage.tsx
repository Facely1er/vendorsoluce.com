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
      {/*<AssessmentSection /> */}
      <FeatureSection /> 
      <ValuePropositionSection />
      {/*  <QuickToolsSection /> */}
      <CTASection />
    </main>
  );
};

export default HomePage;