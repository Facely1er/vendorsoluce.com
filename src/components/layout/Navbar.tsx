 import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Home, 
  LayoutDashboard, 
  Users, 
  FileText, 
  DollarSign, 
  Info, 
  Mail, 
  BookOpen, 
  Code, 
  Globe, 
  Sun, 
  Moon,
  ChevronDown 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useI18n } from '../../context/I18nContext';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import UserMenu from './UserMenu';

const Navbar: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { t } = useI18n();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems = [
    { name: t('nav.home'), path: '/', icon: Home },
    { 
      name: t('nav.solutions'), 
      path: '/how-it-works', 
      icon: BookOpen, 
      dropdown: [
        { name: t('navigation.assessment'), path: '/supply-chain-assessment' },
        { name: t('navigation.sbom'), path: '/sbom-analyzer' },
        { name: t('navigation.vendorRisk'), path: '/vendor-risk-dashboard' },
        { name: t('navigation.vendorAssessments'), path: '/vendor-assessments' },
      ]
    },
    { name: t('nav.pricing'), path: '/pricing', icon: DollarSign },
    { 
      name: t('nav.resources'), 
      path: '/templates', 
      icon: FileText, 
      dropdown: [
        { name: t('navigation.templates'), path: '/templates' },
        { name: t('navigation.apiDocs'), path: '/api-docs' },
        { name: t('navigation.integration'), path: '/integration-guides' },
      ]
    },
    { name: t('nav.about'), path: '/about', icon: Info },
    { name: t('nav.contact'), path: '/contact', icon: Mail },
  ];

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Branding */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img className="h-8 w-auto" src="/vendorsoluce.png" alt="VendorSoluce Logo" />
              <div className="hidden md:block ml-2">
                <span className="block text-lg font-bold text-gray-900 dark:text-white">VendorSoluce™</span>
                <span className="block text-xs text-gray-600 dark:text-gray-400">by ERMITS</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:space-x-8 items-center">
            {navItems.map((item) => (
              item.dropdown ? (
                <div key={item.name} className="relative group">
                  <button className="text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-navy dark:hover:text-vendorsoluce-blue px-3 py-2 rounded-md text-sm font-medium flex items-center">
                    {item.icon && <item.icon className="h-4 w-4 mr-1" />}
                    {item.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 hidden group-hover:block">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                          role="menuitem"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-navy dark:hover:text-vendorsoluce-blue px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  {item.icon && <item.icon className="h-4 w-4 mr-1" />}
                  {item.name}
                </Link>
              )
            ))}
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-navy dark:hover:text-vendorsoluce-blue px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <LayoutDashboard className="h-4 w-4 mr-1" />
                {t('nav.dashboard')}
              </Link>
            )}
          </nav>

          {/* Right Section (Theme, Language, User Menu) */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <LanguageSwitcher />
            <UserMenu />
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-vendorsoluce-navy"
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
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden" ref={mobileMenuRef}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              item.dropdown ? (
                <div key={item.name}>
                  <button className="text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-navy dark:hover:text-vendorsoluce-blue block px-3 py-2 rounded-md text-base font-medium w-full text-left">
                    {item.icon && <item.icon className="h-5 w-5 mr-2 inline-block" />}
                    {item.name}
                  </button>
                  <div className="pl-6 mt-1 space-y-1">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-navy dark:hover:text-vendorsoluce-blue block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon && <item.icon className="h-5 w-5 mr-2 inline-block" />}
                  {item.name}
                </Link>
              )
            ))}
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-navy dark:hover:text-vendorsoluce-blue block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LayoutDashboard className="h-5 w-5 mr-2 inline-block" />
                {t('nav.dashboard')}
              </Link>
            )}
            <div className="flex items-center justify-between px-3 py-2">
              <ThemeToggle />
              <LanguageSwitcher variant="buttons" />
            </div>
            <div className="px-3 py-2">
              <UserMenu />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;