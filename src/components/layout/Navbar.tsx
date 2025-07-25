import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Globe,
  Sun,
  Moon,
  User,
  LogOut,
  Settings,
  UserCog,
  Crown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useI18n } from '../../context/I18nContext';
import { Button } from '../ui/Button';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { changeLanguage, currentLanguage, supportedLanguages } = useI18n();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  
  const userMenuRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (solutionsRef.current && !solutionsRef.current.contains(event.target as Node)) {
        setIsSolutionsOpen(false);
      }
      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) {
        setIsResourcesOpen(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActivePath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const solutions = [
    {
      title: 'Supply Chain Assessment',
      description: 'NIST SP 800-161 aligned risk assessment',
      href: '/supply-chain-assessment',
      icon: '🛡️'
    },
    {
      title: 'SBOM Analysis',
      description: 'Software bill of materials scanning',
      href: '/sbom-analyzer',
      icon: '🔍'
    },
    {
      title: 'Vendor Risk Dashboard',
      description: 'Monitor and manage vendor risks',
      href: '/vendor-risk-dashboard',
      icon: '📊'
    },
    {
      title: 'Vendor Security Assessments',
      description: 'CMMC & NIST Privacy Framework assessments',
      href: '/vendor-assessments',
      icon: '👥',
      isPremium: true
    }
  ];

  const resources = [
    {
      title: 'Templates & Downloads',
      description: 'Ready-to-use compliance templates',
      href: '/templates',
      icon: '📄'
    },
    {
      title: 'API Documentation',
      description: 'Integration guides and API reference',
      href: '/api-docs',
      icon: '⚙️'
    },
    {
      title: 'How It Works',
      description: 'Learn about our process',
      href: '/how-it-works',
      icon: '💡'
    }
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700" data-tour="main-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/vendorsoluce.png" 
                alt="VendorSoluce" 
                className="h-8 w-auto mr-3"
              />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                VendorSoluce
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Home */}
            <Link
              to="/"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActivePath('/')
                  ? 'text-vendorsoluce-green border-b-2 border-vendorsoluce-green'
                  : 'text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green'
              }`}
            >
              Home
            </Link>

            {/* Solutions Dropdown */}
            <div className="relative" ref={solutionsRef}>
              <button
                onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
                className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${
                  isActivePath('/supply-chain-assessment') || isActivePath('/sbom-analyzer') || 
                  isActivePath('/vendor-risk-dashboard') || isActivePath('/vendor-assessments')
                    ? 'text-vendorsoluce-green'
                    : 'text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green'
                }`}
              >
                Solutions
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${
                  isSolutionsOpen ? 'rotate-180' : ''
                }`} />
              </button>

              {isSolutionsOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                  <div className="p-4">
                    {solutions.map((solution) => (
                      <Link
                        key={solution.href}
                        to={solution.href}
                        onClick={() => setIsSolutionsOpen(false)}
                        className="flex items-start p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <span className="text-xl mr-3">{solution.icon}</span>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                              {solution.title}
                            </h3>
                            {solution.isPremium && (
                              <Crown className="h-3 w-3 text-yellow-500 ml-2" />
                            )}
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {solution.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* How It Works */}
            <Link
              to="/how-it-works"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActivePath('/how-it-works')
                  ? 'text-vendorsoluce-green border-b-2 border-vendorsoluce-green'
                  : 'text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green'
              }`}
            >
              How It Works
            </Link>

            {/* Pricing */}
            <Link
              to="/pricing"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActivePath('/pricing')
                  ? 'text-vendorsoluce-green border-b-2 border-vendorsoluce-green'
                  : 'text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green'
              }`}
            >
              Pricing
            </Link>

            {/* Resources Dropdown */}
            <div className="relative" ref={resourcesRef}>
              <button
                onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${
                  isActivePath('/templates') || isActivePath('/api-docs')
                    ? 'text-vendorsoluce-green'
                    : 'text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green'
                }`}
              >
                Resources
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${
                  isResourcesOpen ? 'rotate-180' : ''
                }`} />
              </button>

              {isResourcesOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                  <div className="p-4">
                    {resources.map((resource) => (
                      <Link
                        key={resource.href}
                        to={resource.href}
                        onClick={() => setIsResourcesOpen(false)}
                        className="flex items-start p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <span className="text-xl mr-3">{resource.icon}</span>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                            {resource.title}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {resource.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative" ref={languageRef} data-tour="language-toggle">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                aria-label="Change language"
              >
                <Globe className="h-5 w-5" />
              </button>
              
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                  {supportedLanguages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        changeLanguage(language.code);
                        setIsLanguageOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm ${
                        currentLanguage === language.code
                          ? 'bg-vendorsoluce-green text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {language.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              data-tour="theme-toggle"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>

            {/* User Menu / Sign In */}
            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef} data-tour="user-menu">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center focus:outline-none"
                  aria-expanded={isUserMenuOpen}
                  aria-haspopup="true"
                >
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-8 w-8 rounded-full object-cover border border-gray-200"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-vendorsoluce-green text-white flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                  <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300 hidden md:block">
                    {user?.name}
                  </span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <div className="font-medium text-gray-900 dark:text-white">{user?.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 truncate">{user?.email}</div>
                    </div>
                    
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <UserCog className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                    
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                    
                    <button
                      onClick={() => {
                        signOut();
                        setIsUserMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/signin">
                <Button variant="primary" size="sm" className="hidden sm:inline-flex">
                  Se connecter
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 text-base font-medium rounded-md ${
                  isActivePath('/')
                    ? 'text-vendorsoluce-green bg-vendorsoluce-green/10'
                    : 'text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                Home
              </Link>

              {/* Mobile Solutions */}
              <div className="space-y-1">
                <div className="px-3 py-2 text-base font-medium text-gray-900 dark:text-white">
                  Solutions
                </div>
                {solutions.map((solution) => (
                  <Link
                    key={solution.href}
                    to={solution.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-6 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-vendorsoluce-green hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
                  >
                    <div className="flex items-center">
                      <span className="mr-2">{solution.icon}</span>
                      {solution.title}
                      {solution.isPremium && (
                        <Crown className="h-3 w-3 text-yellow-500 ml-2" />
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              <Link
                to="/how-it-works"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 text-base font-medium rounded-md ${
                  isActivePath('/how-it-works')
                    ? 'text-vendorsoluce-green bg-vendorsoluce-green/10'
                    : 'text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                How It Works
              </Link>

              <Link
                to="/pricing"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 text-base font-medium rounded-md ${
                  isActivePath('/pricing')
                    ? 'text-vendorsoluce-green bg-vendorsoluce-green/10'
                    : 'text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                Pricing
              </Link>

              {/* Mobile Resources */}
              <div className="space-y-1">
                <div className="px-3 py-2 text-base font-medium text-gray-900 dark:text-white">
                  Resources
                </div>
                {resources.map((resource) => (
                  <Link
                    key={resource.href}
                    to={resource.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-6 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-vendorsoluce-green hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
                  >
                    <span className="mr-2">{resource.icon}</span>
                    {resource.title}
                  </Link>
                ))}
              </div>

              {!isAuthenticated && (
                <Link
                  to="/signin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-vendorsoluce-green hover:bg-vendorsoluce-green/10 rounded-md"
                >
                  Se connecter
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;