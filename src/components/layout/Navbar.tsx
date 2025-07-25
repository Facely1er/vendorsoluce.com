import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Shield, 
  Menu, 
  X, 
  ChevronDown,
  FileCheck,
  BarChart3,
  FileJson,
  Users,
  FileText,
  Code,
  Target,
  Calculator,
  CheckSquare,
  Crown
} from 'lucide-react';
import { Button } from '../ui/Button';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import UserMenu from './UserMenu';
import { useAuth } from '../../context/AuthContext';
import AppTour from '../onboarding/AppTour';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { isAuthenticated, profile, markTourComplete, isTourRunning } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const primaryNav = [
    { 
      label: t('navigation.home'), 
      href: '/',
      icon: Shield
    },
    { 
      label: t('navigation.howItWorks'), 
      href: '/how-it-works'
    },
    {
      label: t('navigation.solutions'),
      dropdown: [
        {
          label: t('navigation.solutions.supplyChainAssessment'),
          href: '/supply-chain-assessment',
          icon: FileCheck,
          description: t('navigation.solutions.supplyChainAssessmentDesc')
        },
        {
          label: t('navigation.solutions.sbomAnalyzer'),
          href: '/sbom-analyzer',
          icon: FileJson,
          description: t('navigation.solutions.sbomAnalyzerDesc')
        },
        {
          label: t('navigation.solutions.vendorRiskDashboard'),
          href: '/vendor-risk-dashboard',
          icon: BarChart3,
          description: t('navigation.solutions.vendorRiskDashboardDesc')
        },
        {
          label: t('navigation.solutions.vendorAssessments'),
          href: '/vendor-assessments',
          icon: Users,
          description: t('navigation.solutions.vendorAssessmentsDesc'),
          badge: 'Premium'
        }
      ]
    },
    { 
      label: t('navigation.pricing'), 
      href: '/pricing'
    },
    {
      label: t('navigation.resources'),
      dropdown: [
        {
          label: t('navigation.resources.templates'),
          href: '/templates',
          icon: FileText,
          description: t('navigation.resources.templatesDesc')
        },
        {
          label: t('navigation.resources.apiDocs'),
          href: '/api-docs',
          icon: Code,
          description: t('navigation.resources.apiDocsDesc')
        },
        {
          label: t('navigation.resources.integrationGuides'),
          href: '/integration-guides',
          icon: Code,
          description: t('navigation.resources.integrationGuidesDesc')
        },
        {
          label: t('navigation.resources.quickTools'),
          href: '#',
          icon: Target,
          description: t('navigation.resources.quickToolsDesc'),
          submenu: [
            {
              label: t('navigation.resources.quickTools.riskCalculator'),
              href: '/tools/vendor-risk-calculator',
              icon: Calculator
            },
            {
              label: t('navigation.resources.quickTools.sbomScan'),
              href: '/tools/sbom-quick-scan',
              icon: FileJson
            },
            {
              label: t('navigation.resources.quickTools.nistChecklist'),
              href: '/tools/nist-checklist',
              icon: CheckSquare
            }
          ]
        }
      ]
    }
  ];

  const isCurrentPath = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const handleTourComplete = () => {
    markTourComplete();
  };

  const handleTourSkip = () => {
    markTourComplete();
  };

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40" data-tour="main-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-vendorsoluce-green" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                VendorSoluce
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1" ref={dropdownRef}>
              {primaryNav.map((item) => (
                <div key={item.label} className="relative">
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.label)}
                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isCurrentPath(item.href || '#')
                            ? 'text-vendorsoluce-green bg-vendorsoluce-pale-green'
                            : 'text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        {item.label}
                        <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${
                          openDropdown === item.label ? 'rotate-180' : ''
                        }`} />
                      </button>

                      {openDropdown === item.label && (
                        <div className="absolute top-full left-0 mt-1 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                          {item.dropdown.map((dropdownItem) => (
                            <div key={dropdownItem.label}>
                              {dropdownItem.submenu ? (
                                <div className="px-4 py-2">
                                  <div className="flex items-center text-sm font-medium text-gray-900 dark:text-white mb-2">
                                    <dropdownItem.icon className="h-4 w-4 mr-2 text-vendorsoluce-green" />
                                    {dropdownItem.label}
                                  </div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                                    {dropdownItem.description}
                                  </p>
                                  <div className="space-y-1">
                                    {dropdownItem.submenu.map((subItem) => (
                                      <Link
                                        key={subItem.label}
                                        to={subItem.href}
                                        className="flex items-center px-2 py-1 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                                        onClick={() => setOpenDropdown(null)}
                                      >
                                        <subItem.icon className="h-3 w-3 mr-2" />
                                        {subItem.label}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ) : (
                                <Link
                                  to={dropdownItem.href}
                                  className="flex items-start px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                                  onClick={() => setOpenDropdown(null)}
                                >
                                  <dropdownItem.icon className="h-5 w-5 mr-3 mt-0.5 text-vendorsoluce-green flex-shrink-0" />
                                  <div className="flex-1">
                                    <div className="flex items-center">
                                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                                        {dropdownItem.label}
                                      </span>
                                      {dropdownItem.badge && (
                                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                                          <Crown className="h-3 w-3 mr-1" />
                                          {dropdownItem.badge}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                      {dropdownItem.description}
                                    </p>
                                  </div>
                                </Link>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href!}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isCurrentPath(item.href!)
                          ? 'text-vendorsoluce-green bg-vendorsoluce-pale-green'
                          : 'text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Right Side Items */}
            <div className="hidden lg:flex items-center space-x-3">
              <LanguageSwitcher variant="icon" />
              <div data-tour="theme-toggle">
                <ThemeToggle />
              </div>
              <div data-tour="user-menu">
                {isAuthenticated ? (
                  <UserMenu />
                ) : (
                  <Link to="/signin">
                    <Button variant="primary" size="sm">
                      {t('auth.signIn')}
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-vendorsoluce-green"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
                {primaryNav.map((item) => (
                  <div key={item.label}>
                    {item.dropdown ? (
                      <div>
                        <button
                          onClick={() => toggleDropdown(item.label)}
                          className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                        >
                          {item.label}
                          <ChevronDown className={`h-4 w-4 transition-transform ${
                            openDropdown === item.label ? 'rotate-180' : ''
                          }`} />
                        </button>
                        
                        {openDropdown === item.label && (
                          <div className="pl-4 mt-2 space-y-1">
                            {item.dropdown.map((dropdownItem) => (
                              <div key={dropdownItem.label}>
                                {dropdownItem.submenu ? (
                                  <div>
                                    <div className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                      {dropdownItem.label}
                                    </div>
                                    <div className="pl-4 space-y-1">
                                      {dropdownItem.submenu.map((subItem) => (
                                        <Link
                                          key={subItem.label}
                                          to={subItem.href}
                                          className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                                          onClick={() => {
                                            setIsMobileMenuOpen(false);
                                            setOpenDropdown(null);
                                          }}
                                        >
                                          {subItem.label}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                ) : (
                                  <Link
                                    to={dropdownItem.href}
                                    className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                                    onClick={() => {
                                      setIsMobileMenuOpen(false);
                                      setOpenDropdown(null);
                                    }}
                                  >
                                    <dropdownItem.icon className="h-4 w-4 mr-2" />
                                    {dropdownItem.label}
                                    {dropdownItem.badge && (
                                      <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                                        <Crown className="h-3 w-3 mr-1" />
                                        {dropdownItem.badge}
                                      </span>
                                    )}
                                  </Link>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={item.href!}
                        className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                          isCurrentPath(item.href!)
                            ? 'text-vendorsoluce-green bg-vendorsoluce-pale-green'
                            : 'text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
                
                <div className="border-t border-gray-200 dark:border-gray-800 pt-3 mt-3">
                  <div className="flex items-center justify-between px-3 py-2">
                    <LanguageSwitcher variant="buttons" />
                    <ThemeToggle />
                  </div>
                  
                  <div className="px-3 py-2">
                    {isAuthenticated ? (
                      <UserMenu />
                    ) : (
                      <Link to="/signin" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="primary" size="sm" className="w-full">
                          {t('auth.signIn')}
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* App Tour */}
      {isAuthenticated && profile && !profile.tour_completed && (
        <AppTour
          isRunning={isTourRunning}
          onComplete={handleTourComplete}
          onSkip={handleTourSkip}
        />
      )}
    </>
  );
};

export default Navbar;