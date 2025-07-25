import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import UserMenu from './UserMenu';
import AppTour from '../onboarding/AppTour';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showResourcesDropdown, setShowResourcesDropdown] = useState(false);
  const { isAuthenticated, isTourRunning, markTourComplete } = useAuth();
  const location = useLocation();

  const primaryNav = [
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Pricing', href: '/pricing' },
    {
      name: 'Resources',
      href: '#',
      dropdown: [
        { name: 'Templates', href: '/templates' },
        { name: 'API Documentation', href: '/api-docs' },
        { name: 'Integration Guides', href: '/integration-guides' }
      ]
    }
  ];

  const solutionsNav = [
    { name: 'Supply Chain Assessment', href: '/supply-chain-assessment' },
    { name: 'SBOM Analysis', href: '/sbom-analyzer' },
    { name: 'Vendor Risk Dashboard', href: '/vendor-risk-dashboard' },
    { name: 'Vendor Security Assessments', href: '/vendor-assessments', isPremium: true }
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700" data-tour="main-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and primary navigation */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <div className="w-8 h-8 bg-vendorsoluce-green rounded-lg flex items-center justify-center mr-3">
                  <ShieldCheck className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  VendorSoluce
                </span>
              </Link>
              
              {/* Desktop Navigation */}
              <div className="hidden md:ml-8 md:flex md:space-x-1">
                {/* Solutions Dropdown */}
                <div className="relative group">
                  <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">
                    Solutions
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </button>
                  <div className="absolute left-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-200 dark:border-gray-700">
                    {solutionsNav.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {item.name}
                        {item.isPremium && (
                          <span className="ml-2 px-2 py-0.5 text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full">
                            Premium
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>

                {primaryNav.map((item) => (
                  <div key={item.name} className="relative">
                    {item.dropdown ? (
                      <div
                        className="relative"
                        onMouseEnter={() => setShowResourcesDropdown(true)}
                        onMouseLeave={() => setShowResourcesDropdown(false)}
                      >
                        <button
                          className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                        >
                          {item.name}
                          <ChevronDown className="ml-1 h-3 w-3" />
                        </button>
                        {showResourcesDropdown && (
                          <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-10 border border-gray-200 dark:border-gray-700">
                            {item.dropdown.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.name}
                                to={dropdownItem.href}
                                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                onClick={() => setShowResourcesDropdown(false)}
                              >
                                {dropdownItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={item.href}
                        className={`px-3 py-2 text-sm font-medium rounded-md ${
                          isActive(item.href)
                            ? 'text-vendorsoluce-green bg-gray-50 dark:bg-gray-800'
                            : 'text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right side controls */}
            <div className="flex items-center md:ml-1 md:space-x-1">
              <LanguageSwitcher variant="icon" />
              <div data-tour="theme-toggle">
                <ThemeToggle />
              </div>
              <div data-tour="user-menu">
                <div className="ml-1">
                  <UserMenu />
                </div>
              </div>
              
              {/* Mobile menu button */}
              <div className="md:hidden ml-1">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
              {/* Mobile Solutions */}
              <div className="space-y-1">
                <div className="px-3 py-2 text-sm font-medium text-gray-900 dark:text-white">Solutions</div>
                {solutionsNav.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center px-6 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-vendorsoluce-green"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                    {item.isPremium && (
                      <span className="ml-2 px-2 py-0.5 text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full">
                        Premium
                      </span>
                    )}
                  </Link>
                ))}
              </div>

              {/* Mobile Primary Nav */}
              {primaryNav.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div className="space-y-1">
                      <div className="px-3 py-2 text-sm font-medium text-gray-900 dark:text-white">{item.name}</div>
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.href}
                          className="block px-6 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-vendorsoluce-green"
                          onClick={() => setIsOpen(false)}
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className="block px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-vendorsoluce-green"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
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