import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, FileJson, TrendingUp } from 'lucide-react';
import Button from '../ui/Button';
import { useTranslation } from 'react-i18next';

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <section className="bg-gradient-to-r from-vendorsoluce-green to-vendorsoluce-light-green text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Secure Your Supply Chain with Enterprise-Grade Risk Management
            </h1>
            <p className="text-xl text-gray-100 max-w-2xl">
              VendorSoluce empowers organizations to assess, monitor, and mitigate third-party risks with NIST SP 800-161 aligned tools. 
              From vendor assessments to SBOM analysis, we make supply chain security accessible and actionable for teams of all sizes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/supply-chain-assessment">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Start Free Assessment
                </Button>
              </Link>
              <Link to="/sbom-analyzer">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Analyze SBOM
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">Why Choose VendorSoluce?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <ShieldCheck className="h-6 w-6 text-vendorsoluce-blue mr-3 flex-shrink-0 mt-0.5" />
                  <span>NIST SP 800-161 aligned assessments and controls</span>
                </li>
                <li className="flex items-start">
                  <FileJson className="h-6 w-6 text-vendorsoluce-blue mr-3 flex-shrink-0 mt-0.5" />
                  <span>Automated SBOM analysis with vulnerability detection</span>
                </li>
                <li className="flex items-start">
                  <TrendingUp className="h-6 w-6 text-vendorsoluce-blue mr-3 flex-shrink-0 mt-0.5" />
                  <span>Real-time vendor risk monitoring and reporting</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave separator */}
      <div className="relative h-16 md:h-24">
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 74" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M1440 74V0C1082.89 60 686.667 74 0 0V74H1440Z" fill="white" className="dark:fill-gray-900"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;