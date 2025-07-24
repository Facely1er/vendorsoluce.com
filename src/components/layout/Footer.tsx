import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  FileCheck, 
  FileJson,
  BarChart3,
  BookOpen,
  Code,
  FileText,
  Users,
  Phone,
  Lock
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="flex items-center">
              <img 
                src="/vendorsoluce.png" 
                alt="VendorSoluce Logo" 
                className="h-10 w-10" 
              />
              <span className="ml-2 text-xl font-bold">{t('app.name')}</span>
            </Link>
            <p className="mt-2 text-gray-400 text-sm">
              Supply chain risk management powered by NIST 800-161
            </p>
            <div className="mt-4">
              <LanguageSwitcher variant="buttons" />
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-4">{t('navigation.assessment')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/assessment" className="text-gray-400 hover:text-white transition flex items-center">
                  <FileCheck className="h-4 w-4 mr-2" />
                  {t('navigation.assessment')}
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-400 hover:text-white transition flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  {t('navigation.howItWorks')}
                </Link>
              </li>
              <li>
                <Link to="/sbom-analyzer" className="text-gray-400 hover:text-white transition flex items-center">
                  <FileJson className="h-4 w-4 mr-2" />
                  {t('navigation.sbom')}
                </Link>
              </li>
              <li>
                <Link to="/vendor-risk" className="text-gray-400 hover:text-white transition flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  {t('navigation.vendorRisk')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-4">{t('navigation.resources')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/api-docs" className="text-gray-400 hover:text-white transition flex items-center">
                  <Code className="h-4 w-4 mr-2" />
                  {t('navigation.apiDocs')}
                </Link>
              </li>
              <li>
                <Link to="/integration-guides" className="text-gray-400 hover:text-white transition flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  {t('navigation.integration')}
                </Link>
              </li>
              <li>
                <Link to="/templates" className="text-gray-400 hover:text-white transition flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  {t('navigation.templates')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-4">{t('navigation.about')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  {t('navigation.about')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  {t('navigation.contact')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition flex items-center">
                  <Lock className="h-4 w-4 mr-2" />
                  {t('navigation.privacy')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} ERMITS LLC. {t('footer.copyright')}</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="hover:text-white">
                {t('footer.terms')}
              </a>
              <a href="#" className="hover:text-white">
                {t('footer.privacy')}
              </a>
              <a href="#" className="hover:text-white">
                {t('footer.security')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;