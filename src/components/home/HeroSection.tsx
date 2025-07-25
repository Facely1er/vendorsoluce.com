import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Target, Users, CheckCircle, Zap, Eye } from 'lucide-react';
import Button from '../ui/Button';
import { useTranslation } from 'react-i18next';

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <section className="bg-gradient-to-r from-vendorsoluce-green to-vendorsoluce-light-green text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="flex justify-center mb-6">
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('home.hero.title')}
          </h1>
          
          <p className="text-2xl md:text-2xl text-gray-100 mb-8 max-w-4xl mx-auto">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 text-yellow-300" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{t('home.hero.benefits.section1.title')}</h3>
              <div className="text-gray-100 text-sm space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-300" />
                  {t('home.hero.benefits.section1.benefit1')}
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-300" />
                  {t('home.hero.benefits.section1.benefit2')}
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-300" />
                  {t('home.hero.benefits.section1.benefit3')}
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center justify-center mb-4">
                <Eye className="h-8 w-8 text-blue-300" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{t('home.hero.benefits.section2.title')}</h3>
              <div className="text-gray-100 text-sm space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-300" />
                  {t('home.hero.benefits.section2.benefit1')}
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-300" />
                  {t('home.hero.benefits.section2.benefit2')}
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-300" />
                  {t('home.hero.benefits.section2.benefit3')}
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-green-300" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{t('home.hero.benefits.section3.title')}</h3>
              <div className="text-gray-100 text-sm space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-300" />
                  {t('home.hero.benefits.section3.benefit1')}
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-300" />
                  {t('home.hero.benefits.section3.benefit2')}
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-300" />
                  {t('home.hero.benefits.section3.benefit3')}
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-sm text-gray-200">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-300" />
                <span>{t('home.hero.trustIndicators.customers')}</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-300" />
                <span>{t('home.hero.trustIndicators.assessments')}</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-300" />
                <span>{t('home.hero.trustIndicators.success')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;