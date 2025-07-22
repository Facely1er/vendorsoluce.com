import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { useTranslation } from 'react-i18next';

const CTASection: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <section className="bg-gradient-to-r from-vendorsoluce-navy to-supply-chain-teal text-white py-16 px-4 sm:px-6 lg:px-8">
    <section className="bg-gradient-to-r from-vendorsoluce-green to-vendorsoluce-light-green text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">
          {t('home.cta.title')}
        </h2>
        <p className="text-xl mb-8 text-gray-100">
          {t('home.cta.description')}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/assessment">
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/20 w-full sm:w-auto">
              {t('home.hero.cta1')}
            </Button>
          </Link>
          <Link to="/sbom-analyzer">
            <Button variant="outline" size="lg" className="bg-white text-vendorsoluce-navy hover:bg-gray-100 w-full sm:w-auto border-white">
              {t('home.hero.cta2')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;