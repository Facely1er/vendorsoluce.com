import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react';

import { supabase } from '../lib/supabase';

const Contact: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    topic: '',
    message: '',
    terms: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setFormData({
      ...formData,
      [id]: checked
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setIsSubmitting(true);

    // Basic validation
    if (!formData.email || !formData.firstName || !formData.lastName || !formData.message) {
      setFormError('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    if (!formData.terms) {
      setFormError('Please agree to the privacy policy.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Submit to Supabase via edge function
      const { data, error } = await supabase.functions.invoke('contact-form', {
        body: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone || null,
          company: formData.company || null,
          topic: formData.topic || null,
          message: formData.message,
        }
      });

      if (error) {
        throw error;
      }

      // Show success message
      setFormSubmitted(true);
    } catch (err: any) {
      console.error('Error submitting form:', err);
      setFormError('Failed to submit your message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          We're here to help you secure your supply chain. Reach out with any questions about our platform or supply chain risk management.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className="lg:col-span-2">
          <Card className="p-8">
            {formSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Thank You!</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  We've received your message and will get back to you shortly.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({
                      firstName: '',
                      lastName: '',
                      email: '',
                      phone: '',
                      company: '',
                      topic: '',
                      message: '',
                      terms: false
                    });
                  }}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Get in Touch</h2>
                
                {formError && (
                  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-red-600 dark:text-red-400">{formError}</p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        First Name<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-vendortal-navy focus:border-vendortal-navy bg-white dark:bg-gray-800 dark:text-white"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Last Name<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-vendortal-navy focus:border-vendortal-navy bg-white dark:bg-gray-800 dark:text-white"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-vendortal-navy focus:border-vendortal-navy bg-white dark:bg-gray-800 dark:text-white"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-vendortal-navy focus:border-vendortal-navy bg-white dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-vendortal-navy focus:border-vendortal-navy bg-white dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      How can we help?
                    </label>
                    <select
                      id="topic"
                      value={formData.topic}
                      onChange={handleInputChange}
                      className="w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-vendortal-navy focus:border-vendortal-navy bg-white dark:bg-gray-800 dark:text-white"
                    >
                      <option value="">Select a topic</option>
                      <option value="Product Information">Product Information</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="Schedule a Demo">Schedule a Demo</option>
                      <option value="Partnership Opportunities">Partnership Opportunities</option>
                      <option value="Federal Compliance Questions">Federal Compliance Questions</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Message<span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-vendortal-navy focus:border-vendortal-navy bg-white dark:bg-gray-800 dark:text-white"
                      placeholder="Please provide details about your inquiry..."
                      required
                    ></textarea>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-start">
                      <input
                        id="terms"
                        type="checkbox"
                        checked={formData.terms}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-vendortal-navy focus:ring-vendortal-navy border-gray-300 dark:border-gray-600 rounded"
                        required
                      />
                      <label htmlFor="terms" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        I agree to the <Link to="/privacy" className="text-vendortal-navy dark:text-trust-blue hover:underline">privacy policy</Link> and consent to being contacted regarding my inquiry.
                      </label>
                    </div>
                  </div>
                  
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="w-full" 
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      'Submit'
                    )}
                  </Button>
                </form>
              </>
            )}
          </Card>
        </div>
        
        <div>
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Contact Information</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-vendortal-navy dark:text-trust-blue mr-3 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Email</p>
                  <a href="mailto:contact@vendorsoluce.com" className="text-gray-600 dark:text-gray-300 hover:text-vendortal-navy dark:hover:text-trust-blue">
                    contact@vendorsoluce.com
                  </a>
                </div>
              </li>
              
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-vendortal-navy dark:text-trust-blue mr-3 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Phone</p>
                  <a href="tel:+18886186160" className="text-gray-600 dark:text-gray-300 hover:text-vendortal-navy dark:hover:text-trust-blue">
                    +1 (888) 618-6160
                  </a>
                </div>
              </li>
              
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-vendortal-navy dark:text-trust-blue mr-3 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Headquarters</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    8300 McCullough Lane<br />
                    Suite 203<br />
                    Gaithersburg, MD 20877
                  </p>
                </div>
              </li>
              
              <li className="flex items-start">
                <Clock className="h-5 w-5 text-vendortal-navy dark:text-trust-blue mr-3 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Hours</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Monday - Friday: 9:00 AM - 6:00 PM ET<br />
                    Saturday - Sunday: Closed
                  </p>
                </div>
              </li>
            </ul>
          </Card>
          
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Schedule a Demo</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              See how VendorSoluce can help secure your supply chain and meet federal compliance requirements.
            </p>
            <div className="flex items-center mb-4">
              <MessageSquare className="h-5 w-5 text-supply-chain-teal mr-2" />
              <span className="text-sm text-gray-600 dark:text-gray-300">30-minute personalized demo</span>
            </div>
            <Button 
              variant="secondary" 
              className="w-full"
              onClick={() => {
                setFormData({
                  ...formData,
                  topic: 'Schedule a Demo'
                });
                document.getElementById('topic')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Schedule Now
            </Button>
          </Card>
        </div>
      </div>
      
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">How does VendorSoluce help with NIST 800-161 compliance?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              VendorSoluce provides assessment templates, controls mapping, and risk scoring that aligns with NIST SP 800-161 requirements, making it easier for organizations to implement and document their supply chain risk management program.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Can VendorSoluce integrate with our existing GRC platform?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes, VendorSoluce offers API integrations with major GRC platforms including ServiceNow, RSA Archer, MetricStream, and more. Our integration guides provide step-by-step instructions.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">What SBOM formats does VendorSoluce support?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              VendorSoluce supports all major SBOM formats including SPDX (JSON, XML, RDF), CycloneDX (JSON, XML), and can also process plain text component lists.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">How quickly can we get started with VendorSoluce?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Most customers are up and running within a day. Our onboarding process includes a dedicated customer success manager, and our platform is designed for easy self-service setup.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Does VendorSoluce offer professional services?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes, we offer professional services for customers who need help with implementation, customization, or creating custom assessment templates for specific industries or compliance requirements.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">What security certifications does VendorSoluce have?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              VendorSoluce is SOC 2 Type II certified and FedRAMP Moderate compliant, ensuring your data is protected according to the highest industry standards.
            </p>
          </div>
        </div>
      </section>
      
      <section className="bg-gradient-to-r from-vendortal-navy to-supply-chain-teal text-white rounded-lg overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Ready to secure your supply chain?</h2>
              <p className="text-gray-100 max-w-xl">
                Get started with VendorSoluce today and bring NIST SP 800-161 compliance to your organization.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white/20"
                onClick={() => {
                  setFormData({
                    ...formData,
                    topic: 'Schedule a Demo'
                  });
                  document.getElementById('topic')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Schedule a Demo
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white text-vendortal-navy hover:bg-gray-100"
                onClick={() => window.location.href = '/assessment'}
              >
                Try for Free
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;