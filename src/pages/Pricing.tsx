import React from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Shield, Star, Users, Building, Crown } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  ctaText: string;
  ctaLink: string;
  icon: React.ReactNode;
  maxVendors: string;
  maxUsers: string;
}

const Pricing: React.FC = () => {
  const { t } = useTranslation();
  
  const pricingTiers: PricingTier[] = [
    {
      name: t('pricing.tiers.starter.name'),
      price: '$49',
      period: '/month',
      description: t('pricing.tiers.starter.description'),
      maxVendors: t('pricing.tiers.starter.maxVendors'),
      maxUsers: t('pricing.tiers.starter.maxUsers'),
      icon: <Shield className="h-8 w-8 text-vendorsoluce-green" />,
      features: [
        t('pricing.tiers.starter.features.nistBasic'),
        t('pricing.tiers.starter.features.sbomAnalyzer'),
        t('pricing.tiers.starter.features.vendorDashboard'),
        t('pricing.tiers.starter.features.emailSupport'),
        t('pricing.tiers.starter.features.standardTemplates'),
        t('pricing.tiers.starter.features.basicReporting')
      ],
      ctaText: t('pricing.tiers.starter.cta'),
      ctaLink: '/signup',
    },
    {
      name: t('pricing.tiers.professional.name'),
      price: '$149',
      period: '/month',
      description: t('pricing.tiers.professional.description'),
      maxVendors: t('pricing.tiers.professional.maxVendors'),
      maxUsers: t('pricing.tiers.professional.maxUsers'),
      icon: <Users className="h-8 w-8 text-vendorsoluce-green" />,
      popular: true,
      features: [
        t('pricing.tiers.professional.features.everythingStarter'),
        t('pricing.tiers.professional.features.advancedNist'),
        t('pricing.tiers.professional.features.unlimitedSbom'),
        t('pricing.tiers.professional.features.apiAccess'),
        t('pricing.tiers.professional.features.prioritySupport'),
        t('pricing.tiers.professional.features.customTemplates'),
        t('pricing.tiers.professional.features.advancedReporting'),
        t('pricing.tiers.professional.features.workflowAutomation'),
        t('pricing.tiers.professional.features.threatIntelligence')
      ],
      ctaText: t('pricing.tiers.professional.cta'),
      ctaLink: '/signup',
    },
    {
      name: t('pricing.tiers.enterprise.name'),
      price: '$449',
      period: '/month',
      description: t('pricing.tiers.enterprise.description'),
      maxVendors: t('pricing.tiers.enterprise.maxVendors'),
      maxUsers: t('pricing.tiers.enterprise.maxUsers'),
      icon: <Building className="h-8 w-8 text-vendorsoluce-green" />,
      features: [
        t('pricing.tiers.enterprise.features.everythingProfessional'),
        t('pricing.tiers.enterprise.features.dedicatedManager'),
        t('pricing.tiers.enterprise.features.customIntegrations'),
        t('pricing.tiers.enterprise.features.advancedAnalytics'),
        t('pricing.tiers.enterprise.features.multiTenant'),
        t('pricing.tiers.enterprise.features.ssoSecurity'),
        t('pricing.tiers.enterprise.features.customBranding'),
        t('pricing.tiers.enterprise.features.professionalServices'),
        t('pricing.tiers.enterprise.features.slaGuarantees')
      ],
      ctaText: t('pricing.tiers.enterprise.cta'),
      ctaLink: '/contact',
    },
    {
      name: t('pricing.tiers.federal.name'),
      price: 'Custom',
      period: 'pricing',
      description: t('pricing.tiers.federal.description'),
      maxVendors: t('pricing.tiers.federal.maxVendors'),
      maxUsers: t('pricing.tiers.federal.maxUsers'),
      icon: <Crown className="h-8 w-8 text-vendorsoluce-green" />,
      features: [
        t('pricing.tiers.federal.features.fedrampAuth'),
        t('pricing.tiers.federal.features.fullNistCompliance'),
        t('pricing.tiers.federal.features.govCloudDeployment'),
        t('pricing.tiers.federal.features.enhancedSecurity'),
        t('pricing.tiers.federal.features.federalReporting'),
        t('pricing.tiers.federal.features.cacPivAuth'),
        t('pricing.tiers.federal.features.atoSupport'),
        t('pricing.tiers.federal.features.federalSupportTeam'),
        t('pricing.tiers.federal.features.fismaCompliance')
      ],
      ctaText: t('pricing.tiers.federal.cta'),
      ctaLink: '/contact',
    }
  ];

  const enterpriseFeatures = [
    t('pricing.enterpriseFeatures.features.advancedVulnerability'),
    t('pricing.enterpriseFeatures.features.predictiveAnalytics'),
    t('pricing.enterpriseFeatures.features.supplyChainMapping'),
    t('pricing.enterpriseFeatures.features.incidentAutomation'),
    t('pricing.enterpriseFeatures.features.thirdPartyScoring'),
    t('pricing.enterpriseFeatures.features.regulatoryAutomation')
  ];

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {t('pricing.title')}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {t('pricing.subtitle')}
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 pt-8 mt-4">
        {pricingTiers.map((tier, index) => (
          <Card 
            key={tier.name} 
            className={`relative flex flex-col h-full ${
              tier.popular ? 'border-vendorsoluce-green ring-2 ring-vendorsoluce-green ring-opacity-20' : ''
            }`}
          >
            {tier.popular && (
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
                <span className="bg-vendorsoluce-green text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                  <Star className="h-4 w-4 mr-1" />
                  {t('pricing.tiers.professional.popular')}
                </span>
              </div>
            )}
            
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 w-16 h-16 bg-vendorsoluce-pale-green rounded-full flex items-center justify-center">
                {tier.icon}
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                {tier.name}
              </CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">{tier.price}</span>
                <span className="text-gray-600 dark:text-gray-400">{tier.period}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mt-4">{tier.description}</p>
              <div className="mt-4 space-y-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{tier.maxVendors}</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{tier.maxUsers}</p>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col">
              <ul className="space-y-3 flex-1">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="h-5 w-5 text-vendorsoluce-green mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8">
                <Link to={tier.ctaLink}>
                  <Button 
                    variant={tier.popular ? 'primary' : 'outline'} 
                    className="w-full"
                  >
                    {tier.ctaText}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features Comparison */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          {t('pricing.enterpriseFeatures.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enterpriseFeatures.map((feature, index) => (
            <div key={index} className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="w-10 h-10 bg-vendorsoluce-green/10 rounded-full flex items-center justify-center mr-4">
                <Shield className="h-5 w-5 text-vendorsoluce-green" />
              </div>
              <span className="font-medium text-gray-900 dark:text-white">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          {t('pricing.faq.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {t('pricing.faq.questions.freeTrial.question')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('pricing.faq.questions.freeTrial.answer')}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {t('pricing.faq.questions.changePlans.question')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('pricing.faq.questions.changePlans.answer')}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {t('pricing.faq.questions.paymentMethods.question')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('pricing.faq.questions.paymentMethods.answer')}
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {t('pricing.faq.questions.dataSecure.question')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('pricing.faq.questions.dataSecure.answer')}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {t('pricing.faq.questions.customIntegrations.question')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('pricing.faq.questions.customIntegrations.answer')}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {t('pricing.faq.questions.supportIncluded.question')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('pricing.faq.questions.supportIncluded.answer')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-vendorsoluce-green to-vendorsoluce-light-green text-white rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">{t('pricing.cta.title')}</h2>
        <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
          {t('pricing.cta.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/signup">
            <Button variant="secondary" size="lg" className="bg-white text-vendorsoluce-green hover:bg-gray-100">
              {t('pricing.cta.startTrial')}
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/20">
              {t('pricing.cta.scheduleDemo')}
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Pricing;