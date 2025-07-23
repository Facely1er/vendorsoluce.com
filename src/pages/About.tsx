import React from 'react';
import { Shield, Award, UserCheck, FileDigit, Network, Building } from 'lucide-react';
import Card from '../components/ui/Card';

const About: React.FC = () => {
  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About VendorSoluce</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          We're on a mission to make supply chain security accessible, actionable, and aligned with federal standards for organizations of all sizes.
        </p>
      </section>
      
      <section className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              VendorSoluce was founded in 2023 by a team of cybersecurity and supply chain experts who recognized the critical need for better tools to manage third-party risk, especially for organizations working with federal contracts.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              After years of helping organizations manually implement NIST SP 800-161 controls and struggling with spreadsheets and disconnected tools, we decided to build a comprehensive platform that makes supply chain risk management accessible, effective, and aligned with federal requirements.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Today, VendorSoluce helps organizations of all sizes assess, monitor, and mitigate risks across their supply chain with powerful tools designed specifically for NIST SP 800-161 compliance.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-vendortal-navy to-supply-chain-teal p-8 rounded-lg text-white">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-gray-100 mb-6">
              To secure the digital supply chain by making enterprise-grade security assessments accessible to all organizations and aligning them with federal compliance requirements.
            </p>
            
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-gray-100">
              A world where organizations can confidently manage their supply chain risks with tools that are powerful yet simple to use, enabling them to focus on innovation while maintaining security and compliance.
            </p>
          </div>
        </div>
      </section>
      
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 text-center">
            <div className="mx-auto w-12 h-12 bg-vendortal-navy/10 dark:bg-vendortal-navy/30 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-vendortal-navy dark:text-trust-blue" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Security First</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We believe in security by design, not as an afterthought. This principle guides our product development and our company operations.
            </p>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="mx-auto w-12 h-12 bg-vendortal-navy/10 dark:bg-vendortal-navy/30 rounded-full flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-vendortal-navy dark:text-trust-blue" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Excellence</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We strive for excellence in all we do, from our product quality to customer support, and maintaining the highest standards.
            </p>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="mx-auto w-12 h-12 bg-vendortal-navy/10 dark:bg-vendortal-navy/30 rounded-full flex items-center justify-center mb-4">
              <UserCheck className="h-6 w-6 text-vendortal-navy dark:text-trust-blue" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Integrity</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We build trust through transparency, honest communication, and always doing what's right for our customers and partners.
            </p>
          </Card>
        </div>
      </section>
      
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Why Choose VendorSoluce</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex">
            <div className="flex-shrink-0 mt-1">
              <div className="h-10 w-10 rounded-full bg-vendortal-navy/10 dark:bg-vendortal-navy/30 flex items-center justify-center">
                <FileDigit className="h-5 w-5 text-vendortal-navy dark:text-trust-blue" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">NIST Alignment</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our platform is built specifically for NIST SP 800-161 compliance, making it ideal for federal contractors and organizations working with government agencies.
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 mt-1">
              <div className="h-10 w-10 rounded-full bg-vendortal-navy/10 dark:bg-vendortal-navy/30 flex items-center justify-center">
                <Building className="h-5 w-5 text-vendortal-navy dark:text-trust-blue" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Federal Experience</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Founded by leaders with extensive experience working with federal agencies and contractors on supply chain security challenges.
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 mt-1">
              <div className="h-10 w-10 rounded-full bg-vendortal-navy/10 dark:bg-vendortal-navy/30 flex items-center justify-center">
                <Shield className="h-5 w-5 text-vendortal-navy dark:text-trust-blue" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Comprehensive Solution</h3>
              <p className="text-gray-600 dark:text-gray-300">
                From vendor assessments to SBOM analysis and risk dashboards, we provide all the tools you need for effective supply chain risk management.
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 mt-1">
              <div className="h-10 w-10 rounded-full bg-vendortal-navy/10 dark:bg-vendortal-navy/30 flex items-center justify-center">
                <Network className="h-5 w-5 text-vendortal-navy dark:text-trust-blue" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">API-First Architecture</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our API-first approach allows for seamless integration with your existing systems, workflows, and security tools.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Join Our Team</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We're always looking for talented individuals who are passionate about security, supply chain risk management, and building great products.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Security Engineer</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Help build and secure our platform with a focus on supply chain security best practices.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Remote • Full-time</p>
          </div>
          
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Product Manager</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Lead the development of new features focused on supply chain risk management.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Remote • Full-time</p>
          </div>
          
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Customer Success Engineer</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Help customers implement and get the most out of our supply chain risk management tools.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Remote • Full-time</p>
          </div>
        </div>
        
        <div className="text-center">
          <a href="/careers" className="inline-block bg-vendortal-navy text-white px-5 py-3 rounded-md font-medium hover:bg-vendortal-navy/90 transition-colors">
            View All Open Positions
          </a>
        </div>
      </section>
    </main>
  );
};

export default About;