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
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Shield className="h-10 w-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Turn Vendor Risk into Competitive Advantage
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-4xl mx-auto">
            Secure Your Supply Chain. Accelerate Your Business.
          </p>
          
          <p className="text-lg text-gray-100 mb-10 max-w-3xl mx-auto">
            Stop worrying about vendor vulnerabilities and start leveraging supply chain intelligence. 
            VendorSoluce transforms vendor risk management from a bottleneck into a business accelerator 
            with automated assessments and complete supply chain visibility.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link to="/supply-chain-assessment">
              <Button variant="secondary" size="lg" className="bg-white text-vendorsoluce-green hover:bg-gray-100">
                <Target className="h-5 w-5 mr-2" />
                Start Free Assessment
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/20">
                <Users className="h-5 w-5 mr-2" />
                Schedule Live Demo
              </Button>
            </Link>
          </div>
          
          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 text-yellow-300" />
              </div>
              <h3 className="text-xl font-semibold mb-4">70% Faster Onboarding</h3>
              <div className="text-gray-100 text-sm space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-300" />
                  Automate vendor security assessments
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-300" />
                  Self-service vendor portal
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-300" />
                  Streamlined compliance workflows
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center justify-center mb-4">
                <Eye className="h-8 w-8 text-blue-300" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Complete Supply Chain Visibility</h3>
              <div className="text-gray-100 text-sm space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-300" />
                  See all vendor risks in one place
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-300" />
                  nth-party risk mapping
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-300" />
                  Real-time monitoring & alerts
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-green-300" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Always Audit-Ready</h3>
              <div className="text-gray-100 text-sm space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-300" />
                  NIST SP 800-161 compliance
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-300" />
                  Automated documentation
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-300" />
                  Continuous compliance tracking
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-sm text-gray-200">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-300" />
                <span>500+ Enterprise Customers</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-300" />
                <span>10,000+ Vendors Assessed</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-300" />
                <span>99.7% Compliance Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;