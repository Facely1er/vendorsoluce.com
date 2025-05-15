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
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Leadership Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="h-48 bg-gray-100 dark:bg-gray-700"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Sarah Chen</h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium mb-2">Co-Founder & CEO</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Former CISO with 15+ years of experience in cybersecurity for federal contractors. Led supply chain security programs at multiple Fortune 500 companies.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-vendortal-navy dark:hover:text-trust-blue">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-1-.02-2.28-1.39-2.28-1.39 0-1.6 1.08-1.6 2.2v4.258H8.014v-8.59h2.558v1.18h.037c.356-.678 1.228-1.39 2.528-1.39 2.7 0 3.2 1.778 3.2 4.09v4.71zM5.5 6.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm.23 9.838H2.868v-8.59H5.73v8.59z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-vendortal-navy dark:hover:text-trust-blue">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="h-48 bg-gray-100 dark:bg-gray-700"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Michael Rodriguez</h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium mb-2">Co-Founder & CTO</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Security architect with expertise in NIST frameworks and supply chain security. Previously led security engineering at a major defense contractor.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-vendortal-navy dark:hover:text-trust-blue">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-1-.02-2.28-1.39-2.28-1.39 0-1.6 1.08-1.6 2.2v4.258H8.014v-8.59h2.558v1.18h.037c.356-.678 1.228-1.39 2.528-1.39 2.7 0 3.2 1.778 3.2 4.09v4.71zM5.5 6.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm.23 9.838H2.868v-8.59H5.73v8.59z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-vendortal-navy dark:hover:text-trust-blue">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="h-48 bg-gray-100 dark:bg-gray-700"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Maya Johnson</h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium mb-2">VP of Product</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Product leader specializing in security and compliance tools. Previously designed GRC solutions for Fortune 500 companies and federal agencies.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-vendortal-navy dark:hover:text-trust-blue">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-1-.02-2.28-1.39-2.28-1.39 0-1.6 1.08-1.6 2.2v4.258H8.014v-8.59h2.558v1.18h.037c.356-.678 1.228-1.39 2.528-1.39 2.7 0 3.2 1.778 3.2 4.09v4.71zM5.5 6.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm.23 9.838H2.868v-8.59H5.73v8.59z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-vendortal-navy dark:hover:text-trust-blue">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
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