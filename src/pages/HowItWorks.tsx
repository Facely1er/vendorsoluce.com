import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Shield, 
  FileCheck, 
  BarChart3, 
  ArrowRight, 
  CheckCircle,
  Upload,
  Users,
  Target,
  TrendingUp,
  FileJson,
  AlertTriangle,
  Download,
  PlayCircle,
  Zap,
  Clock,
  Star
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HowItWorks: React.FC = () => {
  const { t } = useTranslation();

  const steps = [
    {
      id: 1,
      title: t('howItWorks.steps.assess.title'),
      description: t('howItWorks.steps.assess.description'),
      icon: <FileCheck className="h-12 w-12 text-vendorsoluce-green" />,
      features: [
        t('howItWorks.steps.assess.features.nist'),
        t('howItWorks.steps.assess.features.questions'),
        t('howItWorks.steps.assess.features.scoring'),
        t('howItWorks.steps.assess.features.recommendations')
      ],
      ctaText: t('howItWorks.steps.assess.cta'),
      ctaLink: '/supply-chain-assessment'
    },
    {
      id: 2,
      title: t('howItWorks.steps.vendors.title'),
      description: t('howItWorks.steps.vendors.description'),
      icon: <Users className="h-12 w-12 text-vendorsoluce-navy" />,
      features: [
        t('howItWorks.steps.vendors.features.assessment'),
        t('howItWorks.steps.vendors.features.monitoring'),
        t('howItWorks.steps.vendors.features.scoring'),
        t('howItWorks.steps.vendors.features.reporting')
      ],
      ctaText: t('howItWorks.steps.vendors.cta'),
      ctaLink: '/vendor-risk-dashboard'
    },
    {
      id: 3,
      title: t('howItWorks.steps.sbom.title'),
      description: t('howItWorks.steps.sbom.description'),
      icon: <FileJson className="h-12 w-12 text-vendorsoluce-teal" />,
      features: [
        t('howItWorks.steps.sbom.features.formats'),
        t('howItWorks.steps.sbom.features.vulnerability'),
        t('howItWorks.steps.sbom.features.license'),
        t('howItWorks.steps.sbom.features.compliance')
      ],
      ctaText: t('howItWorks.steps.sbom.cta'),
      ctaLink: '/sbom-analyzer'
    },
    {
      id: 4,
      title: t('howItWorks.steps.monitor.title'),
      description: t('howItWorks.steps.monitor.description'),
      icon: <BarChart3 className="h-12 w-12 text-vendorsoluce-blue" />,
      features: [
        t('howItWorks.steps.monitor.features.dashboard'),
        t('howItWorks.steps.monitor.features.alerts'),
        t('howItWorks.steps.monitor.features.trends'),
        t('howItWorks.steps.monitor.features.reports')
      ],
      ctaText: t('howItWorks.steps.monitor.cta'),
      ctaLink: '/dashboard'
    }
  ];

  const benefits = [
    {
      icon: <Shield className="h-8 w-8 text-vendorsoluce-green" />,
      title: t('howItWorks.benefits.compliance.title'),
      description: t('howItWorks.benefits.compliance.description')
    },
    {
      icon: <Clock className="h-8 w-8 text-vendorsoluce-navy" />,
      title: t('howItWorks.benefits.efficiency.title'),
      description: t('howItWorks.benefits.efficiency.description')
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-vendorsoluce-teal" />,
      title: t('howItWorks.benefits.insights.title'),
      description: t('howItWorks.benefits.insights.description')
    },
    {
      icon: <Zap className="h-8 w-8 text-vendorsoluce-blue" />,
      title: t('howItWorks.benefits.automation.title'),
      description: t('howItWorks.benefits.automation.description')
    }
  ];

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          {t('howItWorks.title')}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          {t('howItWorks.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/supply-chain-assessment">
            <Button variant="primary" size="lg">
              <PlayCircle className="h-5 w-5 mr-2" />
              {t('howItWorks.hero.tryNow')}
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" size="lg">
              {t('howItWorks.hero.scheduleDemo')}
            </Button>
          </Link>
        </div>
      </div>

      {/* Process Overview */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('howItWorks.process.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('howItWorks.process.description')}
          </p>
        </div>

        <div className="space-y-16">
          {steps.map((step, index) => (
            <div key={step.id} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
              <div className="flex-1">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-vendorsoluce-green/10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl font-bold text-vendorsoluce-green">{step.id}</span>
                  </div>
                  <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  {step.description}
                </p>
                
                <ul className="space-y-3 mb-6">
                  {step.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-vendorsoluce-green mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to={step.ctaLink}>
                  <Button variant="primary">
                    {step.ctaText}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
              
              <div className="flex-1 max-w-lg">
                <Card className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-0">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                      {step.icon}
                    </div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      {t('howItWorks.process.stepTitle')} {step.id}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {step.title}
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mb-16 bg-gray-50 dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('howItWorks.benefits.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('howItWorks.benefits.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Tools Preview */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('howItWorks.quickTools.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('howItWorks.quickTools.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-vendorsoluce-green/10 rounded-full flex items-center justify-center mb-4">
              <Target className="h-6 w-6 text-vendorsoluce-green" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {t('howItWorks.quickTools.riskCalculator.title')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t('howItWorks.quickTools.riskCalculator.description')}
            </p>
            <Link to="/tools/vendor-risk-calculator">
              <Button variant="outline" size="sm" className="w-full">
                {t('howItWorks.quickTools.riskCalculator.cta')}
              </Button>
            </Link>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-vendorsoluce-teal/10 rounded-full flex items-center justify-center mb-4">
              <Upload className="h-6 w-6 text-vendorsoluce-teal" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {t('howItWorks.quickTools.sbomScan.title')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t('howItWorks.quickTools.sbomScan.description')}
            </p>
            <Link to="/tools/sbom-quick-scan">
              <Button variant="outline" size="sm" className="w-full">
                {t('howItWorks.quickTools.sbomScan.cta')}
              </Button>
            </Link>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-vendorsoluce-blue/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-vendorsoluce-blue" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {t('howItWorks.quickTools.nistChecklist.title')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t('howItWorks.quickTools.nistChecklist.description')}
            </p>
            <Link to="/tools/nist-checklist">
              <Button variant="outline" size="sm" className="w-full">
                {t('howItWorks.quickTools.nistChecklist.cta')}
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Integration Preview */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('howItWorks.integration.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('howItWorks.integration.description')}
          </p>
        </div>

        <div className="bg-gradient-to-r from-vendorsoluce-navy to-vendorsoluce-teal rounded-lg p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="font-bold mb-2">{t('howItWorks.integration.features.api')}</h3>
              <p className="text-sm text-gray-100">{t('howItWorks.integration.features.apiDesc')}</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Download className="h-6 w-6" />
              </div>
              <h3 className="font-bold mb-2">{t('howItWorks.integration.features.export')}</h3>
              <p className="text-sm text-gray-100">{t('howItWorks.integration.features.exportDesc')}</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <h3 className="font-bold mb-2">{t('howItWorks.integration.features.alerts')}</h3>
              <p className="text-sm text-gray-100">{t('howItWorks.integration.features.alertsDesc')}</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="font-bold mb-2">{t('howItWorks.integration.features.templates')}</h3>
              <p className="text-sm text-gray-100">{t('howItWorks.integration.features.templatesDesc')}</p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link to="/integration-guides">
              <Button variant="secondary" size="lg" className="bg-white text-vendorsoluce-navy hover:bg-gray-100">
                {t('howItWorks.integration.cta')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

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

export default HowItWorks;