import React from 'react';
import Card from '../components/ui/Card';

const Privacy: React.FC = () => {
  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Last updated: April 15, 2025
        </p>
      </div>
      
      <Card className="p-8 mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">1. Introduction</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          VendorSoluce ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website vendorsoluce.com, use our platform, or use our mobile application (collectively, the "Services").
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the Services. By accessing or using our Services, you consent to the collection, use, and storage of your information as outlined in this Privacy Policy.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the "Last updated" date of this Privacy Policy. You are encouraged to periodically review this Privacy Policy to stay informed of updates.
        </p>
      </Card>
      
      <Card className="p-8 mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">2. Information We Collect</h2>
        
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Personal Information</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          We may collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, participate in activities on the Services, or otherwise contact us. The personal information we collect may include:
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 mb-6 pl-4">
          <li>Name, email address, telephone number, and contact or authentication data</li>
          <li>Billing address, payment information, and financial data</li>
          <li>Employer information and job title</li>
          <li>User preferences and settings</li>
          <li>Other information you choose to provide</li>
        </ul>
        
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Data Collected Automatically</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity but may include:
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 mb-6 pl-4">
          <li>Device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, and information about how and when you use our Services</li>
          <li>Information collected through cookies, pixel tags, and other tracking technologies</li>
        </ul>
        
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Information from Third Parties</h3>
        <p className="text-gray-600 dark:text-gray-300">
          We may collect information about you from third-party sources, such as public databases, joint marketing partners, social media platforms, and other third parties. Examples of the information we receive from other sources include social media profile information, marketing leads, and search results and links, including paid listings.
        </p>
      </Card>
      
      <Card className="p-8 mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">3. How We Use Your Information</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          We use the information we collect for various business purposes, including:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-4 pl-4">
          <li>To provide, operate, and maintain our Services</li>
          <li>To improve, personalize, and expand our Services</li>
          <li>To understand and analyze how you use our Services</li>
          <li>To develop new products, services, features, and functionality</li>
          <li>To communicate with you, including for customer service, updates, and marketing purposes</li>
          <li>To process your transactions and manage your account</li>
          <li>To find and prevent fraud, and respond to trust and safety issues</li>
          <li>For compliance, legal process, and law enforcement purposes</li>
        </ul>
      </Card>
      
      <Card className="p-8 mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">4. Sharing Your Information</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          We may share your information in the following situations:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-6 pl-4">
          <li><strong>Service Providers:</strong> We may share your information with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf.</li>
          <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
          <li><strong>Affiliates:</strong> We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Policy.</li>
          <li><strong>Business Partners:</strong> We may share your information with our business partners to offer you certain products, services, or promotions.</li>
          <li><strong>With Your Consent:</strong> We may disclose your information for any other purpose with your consent.</li>
          <li><strong>Other Users:</strong> When you share personal information or otherwise interact with public areas of the Services, such information may be viewed by all users and may be publicly distributed.</li>
        </ul>
      </Card>
      
      <Card className="p-8 mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">5. Security of Your Information</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          We use administrative, technical, and physical security measures to help protect your personal information from unauthorized access, use, or disclosure. These include:
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 mb-4 pl-4">
          <li>Encryption of sensitive data at rest and in transit</li>
          <li>Regular security assessments and penetration testing</li>
          <li>Access controls and authentication requirements</li>
          <li>Monitoring for suspicious activities</li>
          <li>Physical security of our data centers and offices</li>
        </ul>
        <p className="text-gray-600 dark:text-gray-300">
          While we have implemented reasonable security measures, please understand that no security system is impenetrable, and we cannot guarantee the absolute security of our databases, nor can we guarantee that information you supply will not be intercepted while being transmitted over the Internet.
        </p>
      </Card>
      
      <Card className="p-8 mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">6. Your Privacy Rights</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Depending on your location, you may have the following rights regarding your personal information:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-4 pl-4">
          <li><strong>Right to Access:</strong> You may request to review the personal information we have collected about you.</li>
          <li><strong>Right to Rectification:</strong> You may request that we correct any inaccurate or incomplete personal information.</li>
          <li><strong>Right to Erasure:</strong> You may request the deletion of your personal information, subject to certain exceptions.</li>
          <li><strong>Right to Restrict Processing:</strong> You may request that we restrict the processing of your information under certain circumstances.</li>
          <li><strong>Right to Data Portability:</strong> You may request a copy of your personal information in a structured, machine-readable format.</li>
          <li><strong>Right to Object:</strong> You may object to our processing of your personal information in certain circumstances.</li>
        </ul>
        <p className="text-gray-600 dark:text-gray-300">
          To exercise these rights, please contact us using the contact information provided at the end of this Privacy Policy. We will respond to your request within a reasonable timeframe.
        </p>
      </Card>
      
      <Card className="p-8 mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">7. Cookies and Tracking Technologies</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          We use cookies and similar tracking technologies to collect and use information about you, including to serve interest-based advertising. Cookies are small data files placed on your device. We use both session cookies (which expire once you close your web browser) and persistent cookies (which stay on your device until you delete them).
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          You can set your browser to refuse all or some browser cookies, or to alert you when cookies are being sent. However, if you disable or refuse cookies, please note that some parts of the Services may be inaccessible or not function properly.
        </p>
      </Card>
      
      <Card className="p-8 mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">8. Children's Privacy</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Our Services are not intended for use by children under the age of 18. We do not knowingly collect personal information from children under 18. If you are under 18, do not use or provide any information on our Services. If we learn we have collected or received personal information from a child under 18 without verification of parental consent, we will delete that information.
        </p>
      </Card>
      
      <Card className="p-8 mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">9. International Data Transfers</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          We are based in the United States and process data both inside and outside of the United States. If you are accessing our Services from outside the United States, please be aware that your information may be transferred to, stored, and processed by us in our facilities and by our third-party service providers in the United States and other countries.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          If you are a resident of the European Economic Area (EEA), we ensure that your data is protected when transferred outside of the EEA. We rely on mechanisms such as standard contractual clauses, Privacy Shield certification, or other lawful means to transfer data internationally.
        </p>
      </Card>
      
      <Card className="p-8 mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">10. Data Retention</h2>
        <p className="text-gray-600 dark:text-gray-300">
          We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies. When we no longer need your personal information, we will securely delete or anonymize it.
        </p>
      </Card>
      
      <Card className="p-8 mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">11. Contact Us</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          If you have questions or comments about this Privacy Policy, please contact us at:
        </p>
        <div className="text-gray-600 dark:text-gray-300">
          <p><strong className="text-gray-900 dark:text-white">VendorSoluce</strong></p>
          <p>8300 McCullough Lane, Suite 203</p>
          <p>Gaithersburg, MD 20877</p>
          <p>Email: contact@ermits.com</p>
          <p>Phone: +1 (240) 599-0102</p>
        </div>
      </Card>
    </main>
  );
};

export default Privacy;