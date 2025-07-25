import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mail, Phone, MapPin, Clock, ShieldCheck, Target, FileSearch, TrendingUp, Users, Crown,
  FileText, Code, Building, MessageSquare, DollarSign, Shield
} from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Company Info */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <img src="/vendorsoluce.png" alt="VendorSoluce Logo" className="h-8 w-auto mr-3" />
            </Link>
            <p className="text-sm mb-4">
              {t('home.hero.description')}
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-2 text-vendorsoluce-green" />
                <a href="mailto:contact@ermits.com" className="hover:text-white">contact@ermits.com</a>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-2 text-vendorsoluce-green" />
                <a href="tel:+12405990102" className="hover:text-white">+1 (240) 599-0102</a>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-vendorsoluce-green" />
                <span>8300 McCullough Lane, Suite 203, Gaithersburg, MD 20877</span>
              </div>
              <div className="flex items-start">
                <Clock className="h-5 w-5 mr-2 text-vendorsoluce-green" />
                <span>Mon-Fri: 9 AM - 6 PM ET</span>
              </div>
            </div>
          </div>

          {/* Column 2: Solutions */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Solutions</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/supply-chain-assessment" className="hover:text-white flex items-center">
                  <Target className="h-4 w-4 mr-2 text-vendorsoluce-green" /> Supply Chain Assessment
                </Link>
              </li>
              <li>
                <Link to="/sbom-analyzer" className="hover:text-white flex items-center">
                  <FileSearch className="h-4 w-4 mr-2 text-vendorsoluce-teal" /> SBOM Analysis
                </Link>
              </li>
              <li>
                <Link to="/vendor-risk-dashboard" className="hover:text-white flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-vendorsoluce-blue" /> Vendor Risk Dashboard
                </Link>
              </li>
              <li>
                <Link to="/vendor-assessments" className="hover:text-white flex items-center">
                  <Users className="h-4 w-4 mr-2 text-vendorsoluce-navy" /> Vendor Security Assessments
                  <span className="ml-1 px-1 py-0.5 text-xs font-semibold rounded-full bg-yellow-500 text-white flex items-center">
                    <Crown className="h-3 w-3 mr-1" /> Premium
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/templates" className="hover:text-white flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-vendorsoluce-green" /> Templates & Downloads
                </Link>
              </li>
              <li>
                <Link to="/api-docs" className="hover:text-white flex items-center">
                  <Code className="h-4 w-4 mr-2 text-vendorsoluce-teal" /> API Documentation
                </Link>
              </li>
              <li>
                <Link to="/integration-guides" className="hover:text-white flex items-center">
                  <Building className="h-4 w-4 mr-2 text-vendorsoluce-blue" /> Integration Guides
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-white flex items-center">
                  <PlayCircle className="h-4 w-4 mr-2 text-vendorsoluce-navy" /> How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-white flex items-center">
                  <Building className="h-4 w-4 mr-2 text-vendorsoluce-green" /> About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2 text-vendorsoluce-teal" /> Contact
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-white flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-vendorsoluce-blue" /> Pricing
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-vendorsoluce-navy" /> Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between text-sm">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <LanguageSwitcher variant="buttons" />
            <p>&copy; {new Date().getFullYear()} VendorSoluce. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <Link to="/privacy" className="hover:text-white">{t('footer.privacy')}</Link>
            <Link to="/terms" className="hover:text-white">{t('footer.terms')}</Link>
            <Link to="/security" className="hover:text-white">{t('footer.security')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;