import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Target, Users } from 'lucide-react';
import Button from '../ui/Button';
import { useTranslation } from 'react-i18next';

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <section className="bg-gradient-to-r from-vendorsoluce-green to-vendorsoluce-light-green text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Shield className="h-10 w-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('home.hero.title')}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-4xl mx-auto">
            {t('home.hero.subtitle')}
          </p>
          
          <p className="text-lg text-gray-100 mb-10 max-w-3xl mx-auto">
            {t('home.hero.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link to="/supply-chain-assessment">
              <Button variant="secondary" size="lg" className="bg-white text-vendorsoluce-green hover:bg-gray-100">
                <Target className="h-5 w-5 mr-2" />
                {t('home.hero.cta1')}
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/20">
                <Users className="h-5 w-5 mr-2" />
                {t('home.hero.cta2')}
              </Button>
            </Link>
          </div>
          
          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">{t('home.hero.whyChoose')}</h3>
              <div className="text-gray-100 text-sm space-y-1">
                <div>• {t('home.hero.benefit1')}</div>
                <div>• {t('home.hero.benefit2')}</div>
                <div>• {t('home.hero.benefit3')}</div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">NIST Aligned</h3>
              <p className="text-gray-100 text-sm">
                Built specifically for NIST SP 800-161 compliance with pre-configured assessment templates and automated reporting.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Federal Ready</h3>
              <p className="text-gray-100 text-sm">
                FedRAMP authorized platform trusted by federal agencies and contractors for supply chain security management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;