import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-vendorsoluce-green rounded-lg flex items-center justify-center mr-3">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">VendorSoluce</span>
            </div>
            <p className="text-gray-300 text-sm">
              Supply chain risk management powered by NIST 800-161. Assess, monitor, and mitigate third-party risks in your supply chain.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-300">
                <Mail className="h-4 w-4 mr-2" />
                <a href="mailto:contact@ermits.com" className="hover:text-vendorsoluce-green">
                  contact@ermits.com
                </a>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Phone className="h-4 w-4 mr-2" />
                <a href="tel:+12405990102" className="hover:text-vendorsoluce-green">
                  +1 (240) 599-0102
                </a>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Gaithersburg, MD</span>
              </div>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/supply-chain-assessment" className="text-gray-300 hover:text-vendorsoluce-green text-sm transition-colors">
                  Supply Chain Assessment
                </Link>
              </li>
              <li>
                <Link to="/sbom-analyzer" className="text-gray-300 hover:text-vendorsoluce-green text-sm transition-colors">
                  SBOM Analysis
                </Link>
              </li>
              <li>
                <Link to="/vendor-risk-dashboard" className="text-gray-300 hover:text-vendorsoluce-green text-sm transition-colors">
                  Vendor Risk Dashboard
                </Link>
              </li>
              <li>
                <Link to="/vendor-assessments" className="text-gray-300 hover:text-vendorsoluce-green text-sm transition-colors flex items-center">
                  Vendor Security Assessments
                  <span className="ml-2 px-2 py-0.5 text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full">
                    Premium
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/templates" className="text-gray-300 hover:text-vendorsoluce-green text-sm transition-colors">
                  Templates & Downloads
                </Link>
              </li>
              <li>
                <Link to="/api-docs" className="text-gray-300 hover:text-vendorsoluce-green text-sm transition-colors">
                  API Documentation
                </Link>
              </li>
              <li>
                <Link to="/integration-guides" className="text-gray-300 hover:text-vendorsoluce-green text-sm transition-colors">
                  Integration Guides
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-300 hover:text-vendorsoluce-green text-sm transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-vendorsoluce-green text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-vendorsoluce-green text-sm transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-300 hover:text-vendorsoluce-green text-sm transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-vendorsoluce-green text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © {currentYear} VendorSoluce. All rights reserved.
              </p>
              <LanguageSwitcher variant="buttons" />
            </div>
            
            <div className="flex items-center space-x-6">
              <Link to="/supply-chain-assessment" className="text-gray-300 hover:text-vendorsoluce-green text-sm transition-colors flex items-center">
                Start Free Assessment
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;