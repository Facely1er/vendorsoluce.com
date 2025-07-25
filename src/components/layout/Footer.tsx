import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Shield, 
  Target,
  FileSearch,
  TrendingUp,
  Users,
  Crown,
  FileText,
  Code,
  Building,
  MessageSquare,
  DollarSign,
  Mail,
  Phone,
  MapPin,
  ArrowRight
} from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <img src="/vendorsoluce.png" alt={t('footer.company.name')} className="h-8 w-auto mr-3" />
              <span className="text-xl font-bold">{t('footer.company.name')}</span>
            </div>
            <p className="text-gray-300 mb-4">
              {t('footer.company.description')}
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>{t('footer.company.contact.email')}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>{t('footer.company.contact.phone')}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{t('footer.company.contact.address')}</span>
              </div>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.sections.solutions')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/supply-chain-assessment" className="text-gray-300 hover:text-white flex items-center group">
                  <Target className="h-4 w-4 mr-2 text-vendorsoluce-green" />
                  <span>{t('footer.links.solutions.supplyChainAssessment')}</span>
                  <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/sbom-analyzer" className="text-gray-300 hover:text-white flex items-center group">
                  <FileSearch className="h-4 w-4 mr-2 text-vendorsoluce-teal" />
                  <span>{t('footer.links.solutions.sbomAnalysis')}</span>
                  <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/vendor-risk-dashboard" className="text-gray-300 hover:text-white flex items-center group">
                  <TrendingUp className="h-4 w-4 mr-2 text-vendorsoluce-blue" />
                  <span>{t('footer.links.solutions.vendorRiskDashboard')}</span>
                  <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/vendor-assessments" className="text-gray-300 hover:text-white flex items-center group">
                  <Users className="h-4 w-4 mr-2 text-vendorsoluce-navy" />
                  <span>{t('footer.links.solutions.vendorAssessments')}</span>
                  <Crown className="h-3 w-3 ml-1 text-yellow-500" />
                  <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.sections.resources')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/templates" className="text-gray-300 hover:text-white flex items-center group">
                  <FileText className="h-4 w-4 mr-2" />
                  <span>{t('footer.links.resources.templates')}</span>
                  <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/api-docs" className="text-gray-300 hover:text-white flex items-center group">
                  <Code className="h-4 w-4 mr-2" />
                  <span>{t('footer.links.resources.apiDocs')}</span>
                  <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/integration-guides" className="text-gray-300 hover:text-white flex items-center group">
                  <Code className="h-4 w-4 mr-2" />
                  <span>{t('footer.links.resources.integrationGuides')}</span>
                  <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-300 hover:text-white flex items-center group">
                  <Shield className="h-4 w-4 mr-2" />
                  <span>{t('footer.links.resources.howItWorks')}</span>
                  <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.sections.company')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white flex items-center group">
                  <Building className="h-4 w-4 mr-2" />
                  <span>{t('footer.links.company.about')}</span>
                  <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white flex items-center group">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  <span>{t('footer.links.company.contact')}</span>
                  <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-300 hover:text-white flex items-center group">
                  <DollarSign className="h-4 w-4 mr-2" />
                  <span>{t('footer.links.company.pricing')}</span>
                  <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white flex items-center group">
                  <Shield className="h-4 w-4 mr-2" />
                  <span>{t('footer.links.company.privacy')}</span>
                  <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              {t('footer.copyright')}
            </div>
            <div className="mt-4 md:mt-0">
              <Link to="/supply-chain-assessment" className="inline-flex items-center px-4 py-2 bg-vendorsoluce-green text-white rounded-md hover:bg-vendorsoluce-dark-green transition-colors">
                <Target className="h-4 w-4 mr-2" />
                {t('footer.cta.text')}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;