import React from 'react';
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
  const pricingTiers: PricingTier[] = [
    {
      name: 'Starter',
      price: '$49',
      period: '/month',
      description: 'Perfect for small businesses starting their supply chain security journey',
      maxVendors: 'Up to 25 vendors',
      maxUsers: 'Up to 3 users',
      icon: <Shield className="h-8 w-8 text-vendorsoluce-green" />,
      features: [
        'NIST SP 800-161 basic assessments',
        'SBOM analyzer (up to 10 files/month)',
        'Vendor risk dashboard',
        'Email support',
        'Standard security templates',
        'Basic compliance reporting'
      ],
      ctaText: 'Start Free Trial',
      ctaLink: '/signup',
    },
    {
      name: 'Professional',
      price: '$149',
      period: '/month',
      description: 'Comprehensive solution for growing organizations with enhanced security needs',
      maxVendors: 'Up to 100 vendors',
      maxUsers: 'Up to 10 users',
      icon: <Users className="h-8 w-8 text-vendorsoluce-green" />,
      popular: true,
      features: [
        'Everything in Starter',
        'Advanced NIST SP 800-161 assessments',
        'Unlimited SBOM analysis',
        'API access and integrations',
        'Priority support',
        'Custom assessment templates',
        'Advanced reporting and analytics',
        'Workflow automation',
        'Threat intelligence feed'
      ],
      ctaText: 'Start Free Trial',
      ctaLink: '/signup',
    },
    {
      name: 'Enterprise',
      price: '$449',
      period: '/month',
      description: 'Full-featured platform for large organizations with complex supply chains',
      maxVendors: 'Unlimited vendors',
      maxUsers: 'Unlimited users',
      icon: <Building className="h-8 w-8 text-vendorsoluce-green" />,
      features: [
        'Everything in Professional',
        'Dedicated customer success manager',
        'Custom integrations and APIs',
        'Advanced analytics and reporting',
        'Multi-tenant capabilities',
        'SSO and advanced security',
        'Custom branding',
        'Professional services included',
        'SLA guarantees'
      ],
      ctaText: 'Contact Sales',
      ctaLink: '/contact',
    },
    {
      name: 'Federal',
      price: 'Custom',
      period: 'pricing',
      description: 'FedRAMP authorized solution for federal agencies and contractors',
      maxVendors: 'Unlimited vendors',
      maxUsers: 'Unlimited users',
      icon: <Crown className="h-8 w-8 text-vendorsoluce-green" />,
      features: [
        'FedRAMP Moderate authorization',
        'Full NIST SP 800-161 compliance',
        'Government cloud deployment',
        'Enhanced security controls',
        'Federal compliance reporting',
        'CAC/PIV authentication support',
        'Authority to Operate (ATO) support',
        'Dedicated federal support team',
        'FISMA compliance tools'
      ],
      ctaText: 'Contact Federal Sales',
      ctaLink: '/contact',
    }
  ];

  const enterpriseFeatures = [
    'Advanced vulnerability management',
    'Predictive risk analytics',
    'Supply chain mapping',
    'Incident response automation',
    'Third-party risk scoring',
    'Regulatory compliance automation'
  ];

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Choose the plan that fits your organization's supply chain risk management needs. 
          All plans include NIST SP 800-161 alignment and comprehensive security features.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {pricingTiers.map((tier, index) => (
          <Card 
            key={tier.name} 
            className={`relative flex flex-col h-full ${
              tier.popular ? 'border-vendorsoluce-green ring-2 ring-vendorsoluce-green ring-opacity-20' : ''
            }`}
          >
            {tier.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-vendorsoluce-green text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                  <Star className="h-4 w-4 mr-1" />
                  Most Popular
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
          Enterprise-Grade Features
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
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Do you offer a free trial?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes! We offer a 14-day free trial for all paid plans. No credit card required to start.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Can I change plans later?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect at your next billing cycle.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We accept all major credit cards, ACH transfers, and can accommodate purchase orders for Enterprise and Federal customers.
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Is my data secure?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes. We're SOC 2 Type II certified and FedRAMP Moderate authorized. All data is encrypted in transit and at rest.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Do you offer custom integrations?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, our Professional and Enterprise plans include API access, and we offer custom integrations for Enterprise customers.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                What support is included?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                All plans include email support. Professional and Enterprise plans include priority support and dedicated customer success.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-vendorsoluce-green to-vendorsoluce-light-green text-white rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Supply Chain?</h2>
        <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
          Join hundreds of organizations already using VendorSoluce to manage their supply chain risks and meet federal compliance requirements.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/signup">
            <Button variant="secondary" size="lg" className="bg-white text-vendorsoluce-green hover:bg-gray-100">
              Start Free Trial
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/20">
              Schedule Demo
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Pricing;