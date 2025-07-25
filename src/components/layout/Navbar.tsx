import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu, X, Home, Layers, PlayCircle, DollarSign, BookOpen,
  ShieldCheck, Crown, FileSearch, TrendingUp, Users, MessageSquare, Building, Code, FileText, Target, ArrowRight
} from 'lucide-react';
import UserMenu from './UserMenu';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';

const Navbar: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsDropdownOpen, setIsSolutionsDropdownOpen] = useState(false);
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);

  const solutionsRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (solutionsRef.current && !solutionsRef.current.contains(event.target as Node)) {
        setIsSolutionsDropdownOpen(false);
      }
      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) {
        setIsResourcesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleSolutionsDropdown = () => {
    setIsSolutionsDropdownOpen(!isSolutionsDropdownOpen);
    setIsResourcesDropdownOpen(false); // Close other dropdown
  };

  const toggleResourcesDropdown = () => {
    setIsResourcesDropdownOpen(!isResourcesDropdownOpen);
    setIsSolutionsDropdownOpen(false); // Close other dropdown
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center" onClick={closeMobileMenu}>
              <img src="/vendorsoluce.png" alt="VendorSoluce Logo" className="h-8 w-auto mr-3" />
            </Link>
          </div>

          {/* Desktop Menu Items */}
          <div className="hidden md:flex items-center space-x-4 h-full">
            <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
              <Home className="h-4 w-4 mr-1" /> Home
            </Link>

            <div className="relative h-full flex items-center" ref={solutionsRef}>
              <button
                onClick={toggleSolutionsDropdown}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center h-full"
                aria-expanded={isSolutionsDropdownOpen}
                aria-haspopup="true"
                data-tour="solutions-menu"
              >
                <Layers className="h-4 w-4 mr-1" /> Solutions
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isSolutionsDropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}></path>
                </svg>
              </button>
              {isSolutionsDropdownOpen && (
                <div className="absolute top-full left-0 mt-0 w-72 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
                  <Link to="/supply-chain-assessment" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center" onClick={closeMobileMenu}>
                    <Target className="h-4 w-4 mr-2 text-vendorsoluce-green" /> Supply Chain Assessment
                  </Link>
                  <Link to="/sbom-analyzer" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center" onClick={closeMobileMenu}>
                    <FileSearch className="h-4 w-4 mr-2 text-vendorsoluce-teal" /> SBOM Analysis
                  </Link>
                  <Link to="/vendor-risk-dashboard" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center" onClick={closeMobileMenu}>
                    <TrendingUp className="h-4 w-4 mr-2 text-vendorsoluce-blue" /> Vendor Risk Dashboard
                  </Link>
                  <Link to="/vendor-assessments" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center" onClick={closeMobileMenu}>
                    <Users className="h-4 w-4 mr-2 text-vendorsoluce-navy" /> Vendor Security Assessments
                    <span className="ml-auto px-2 py-0.5 text-xs font-semibold rounded-full bg-yellow-500 text-white flex items-center">
                      <Crown className="h-3 w-3 mr-1" /> Premium
                    </span>
                  </Link>
                </div>
              )}
            </div>

            <Link to="/how-it-works" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
              <PlayCircle className="h-4 w-4 mr-1" /> How It Works
            </Link>

            <Link to="/pricing" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
              <DollarSign className="h-4 w-4 mr-1" /> Pricing
            </Link>

            <div className="relative h-full flex items-center" ref={resourcesRef}>
              <button
                onClick={toggleResourcesDropdown}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center h-full"
                aria-expanded={isResourcesDropdownOpen}
                aria-haspopup="true"
              >
                <BookOpen className="h-4 w-4 mr-1" /> Resources
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isResourcesDropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}></path>
                </svg>
              </button>
              {isResourcesDropdownOpen && (
                <div className="absolute top-full left-0 mt-0 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
                  <Link to="/templates" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center" onClick={closeMobileMenu}>
                    <FileText className="h-4 w-4 mr-2" /> Templates & Downloads
                  </Link>
                  <Link to="/api-docs" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center" onClick={closeMobileMenu}>
                    <Code className="h-4 w-4 mr-2" /> API Documentation
                  </Link>
                  <Link to="/integration-guides" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center" onClick={closeMobileMenu}>
                    <Building className="h-4 w-4 mr-2" /> Integration Guides
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right side: Language, Theme, User Menu/Sign In */}
          <div className="hidden md:flex items-center space-x-2">
            <LanguageSwitcher variant="icon" />
            <ThemeToggle />
            <UserMenu />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isMobileMenuOpen}
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
        <div className="md:hidden bg-gray-900 pb-3 space-y-1 sm:px-3" data-tour="main-nav">
          <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center" onClick={closeMobileMenu}>
            <Home className="h-5 w-5 mr-2" /> Home
          </Link>

          {/* Solutions Mobile Dropdown */}
          <div className="relative">
            <button
              onClick={toggleSolutionsDropdown}
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left flex items-center"
            >
              <Layers className="h-5 w-5 mr-2" /> Solutions
              <svg className="w-5 h-5 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isSolutionsDropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}></path>
              </svg>
            </button>
            {isSolutionsDropdownOpen && (
              <div className="pl-6 pr-3 py-1 space-y-1">
                <Link to="/supply-chain-assessment" className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center" onClick={closeMobileMenu}>
                  <Target className="h-4 w-4 mr-2 text-vendorsoluce-green" /> Supply Chain Assessment
                </Link>
                <Link to="/sbom-analyzer" className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center" onClick={closeMobileMenu}>
                  <FileSearch className="h-4 w-4 mr-2 text-vendorsoluce-teal" /> SBOM Analysis
                </Link>
                <Link to="/vendor-risk-dashboard" className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center" onClick={closeMobileMenu}>
                  <TrendingUp className="h-4 w-4 mr-2 text-vendorsoluce-blue" /> Vendor Risk Dashboard
                </Link>
                <Link to="/vendor-assessments" className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center" onClick={closeMobileMenu}>
                  <Users className="h-4 w-4 mr-2 text-vendorsoluce-navy" /> Vendor Security Assessments
                  <span className="ml-auto px-2 py-0.5 text-xs font-semibold rounded-full bg-yellow-500 text-white flex items-center">
                    <Crown className="h-3 w-3 mr-1" /> Premium
                  </span>
                </Link>
              </div>
            )}
          </div>

          <Link to="/how-it-works" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center" onClick={closeMobileMenu}>
            <PlayCircle className="h-5 w-5 mr-2" /> How It Works
          </Link>

          <Link to="/pricing" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center">
            <DollarSign className="h-5 w-5 mr-2" /> Pricing
          </Link>

          {/* Resources Mobile Dropdown */}
          <div className="relative">
            <button
              onClick={toggleResourcesDropdown}
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left flex items-center"
            >
              <BookOpen className="h-5 w-5 mr-2" /> Resources
              <svg className="w-5 h-5 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isResourcesDropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}></path>
              </svg>
            </button>
            {isResourcesDropdownOpen && (
              <div className="pl-6 pr-3 py-1 space-y-1">
                <Link to="/templates" className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center" onClick={closeMobileMenu}>
                  <FileText className="h-4 w-4 mr-2" /> Templates & Downloads
                </Link>
                <Link to="/api-docs" className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center" onClick={closeMobileMenu}>
                  <Code className="h-4 w-4 mr-2" /> API Documentation
                </Link>
                <Link to="/integration-guides" className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center" onClick={closeMobileMenu}>
                  <Building className="h-4 w-4 mr-2" /> Integration Guides
                </Link>
              </div>
            )}
          </div>

          {/* Mobile User Menu / Sign In */}
          <div className="px-3 py-2">
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <Link to="/signin" className="w-full">
                <Button variant="primary" className="w-full">Sign In</Button>
              </Link>
            )}
          </div>
          <div className="flex justify-center space-x-4 px-3 py-2">
            <LanguageSwitcher variant="icon" />
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;