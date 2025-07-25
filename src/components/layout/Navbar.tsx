import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import UserMenu from './UserMenu';
import AppTour from '../onboarding/AppTour';

const Navbar: React.FC = () => {
  const { isAuthenticated, isTourRunning, markTourComplete } = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const primaryNav = [
    { label: t('nav.home'), href: '/', current: location.pathname === '/' },
    {
      label: 'How It Works',
      href: '/how-it-works',
      current: location.pathname === '/how-it-works'
    },
    {
      label: 'Solutions',
      href: '#',
      current: ['/supply-chain-assessment', '/sbom-analyzer', '/vendor-risk-dashboard', '/vendor-assessments'].includes(location.pathname),
      hasDropdown: true,
      dropdownItems: [
        { label: 'Supply Chain Assessment', href: '/supply-chain-assessment', icon: '📊' },
        { label: 'SBOM Analysis', href: '/sbom-analyzer', icon: '🔍' },
        { label: 'Vendor Risk Dashboard', href: '/vendor-risk-dashboard', icon: '📈' },
        { label: 'Vendor Assessments', href: '/vendor-assessments', icon: '🛡️', isPremium: true }
      ]
    },
    { label: t('nav.pricing'), href: '/pricing', current: location.pathname === '/pricing' },
    {
      label: 'Resources',
      href: '#',
      current: ['/templates', '/api-docs', '/integration-guides'].includes(location.pathname),
      hasDropdown: true,
      dropdownItems: [
        { label: 'Templates', href: '/templates', icon: '📄' },
        { label: 'API Documentation', href: '/api-docs', icon: '🔧' },
        { label: 'Integration Guides', href: '/integration-guides', icon: '🔗' }
      ]
    }
  ];

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  return (
    <>
      <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700" data-tour="main-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <Shield className="h-8 w-8 text-vendorsoluce-green" />
                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                  VendorSoluce
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-1">
              {primaryNav.map((item) => (
                <div key={item.label} className="relative">
                  {item.hasDropdown ? (
                    <div className="relative">
                      <button
                        onClick={() => handleDropdownToggle(item.label)}
                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          item.current
                            ? 'text-vendorsoluce-navy dark:text-vendorsoluce-blue bg-gray-100 dark:bg-gray-700'
                            : 'text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-navy dark:hover:text-vendorsoluce-blue hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        {item.label}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>
                      
                      {openDropdown === item.label && (
                        <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
                          {item.dropdownItems?.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.href}
                              to={dropdownItem.href}
                              onClick={closeDropdown}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-vendorsoluce-navy dark:hover:text-vendorsoluce-blue"
                            >
                              <span className="mr-3">{dropdownItem.icon}</span>
                              <div className="flex-1">
                                <div className="flex items-center">
                                  <span>{dropdownItem.label}</span>
                                  {dropdownItem.isPremium && (
                                    <span className="ml-2 px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-medium rounded-full">
                                      Premium
                                    </span>
                                  )}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        item.current
                          ? 'text-vendorsoluce-navy dark:text-vendorsoluce-blue bg-gray-100 dark:bg-gray-700'
                          : 'text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-navy dark:hover:text-vendorsoluce-blue hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Right side controls */}
            <div className="hidden md:flex md:items-center md:ml-1 md:space-x-1">
              <LanguageSwitcher variant="icon" />
              <ThemeToggle />
              <div className="ml-1" data-tour="user-menu">
                <UserMenu />
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-vendorsoluce-navy"
              >
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {primaryNav.map((item) => (
                <div key={item.label}>
                  {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => handleDropdownToggle(`mobile-${item.label}`)}
                        className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-md text-base font-medium ${
                          item.current
                            ? 'text-vendorsoluce-navy dark:text-vendorsoluce-blue bg-gray-100 dark:bg-gray-700'
                            : 'text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-navy dark:hover:text-vendorsoluce-blue hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        {item.label}
                        <ChevronDown className={`h-4 w-4 transition-transform ${
                          openDropdown === `mobile-${item.label}` ? 'rotate-180' : ''
                        }`} />
                      </button>
                      
                      {openDropdown === `mobile-${item.label}` && (
                        <div className="pl-4 mt-2 space-y-1">
                          {item.dropdownItems?.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.href}
                              to={dropdownItem.href}
                              onClick={() => {
                                closeDropdown();
                                setIsMobileMenuOpen(false);
                              }}
                              className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-vendorsoluce-navy dark:hover:text-vendorsoluce-blue hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
                            >
                              <span className="mr-3">{dropdownItem.icon}</span>
                              <div className="flex items-center">
                                <span>{dropdownItem.label}</span>
                                {dropdownItem.isPremium && (
                                  <span className="ml-2 px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-medium rounded-full">
                                    Premium
                                  </span>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-3 py-2 rounded-md text-base font-medium ${
                        item.current
                          ? 'text-vendorsoluce-navy dark:text-vendorsoluce-blue bg-gray-100 dark:bg-gray-700'
                          : 'text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-navy dark:hover:text-vendorsoluce-blue hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
            
            {/* Mobile controls */}
            <div className="px-2 pt-2 pb-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <LanguageSwitcher variant="buttons" />
                  <ThemeToggle />
                </div>
                <UserMenu />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* App Tour */}
      {isTourRunning && (
        <AppTour
          isRunning={isTourRunning}
          onComplete={markTourComplete}
          onSkip={markTourComplete}
        />
      )}
    </>
  );
};

export default Navbar;