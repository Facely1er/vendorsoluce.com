import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Home, Layers, Shield, FileJson, BarChart3, BookOpen, Phone, Users, DollarSign } from 'lucide-react';
import { MenuItem } from '../../types';
import ThemeToggle from './ThemeToggle';
import UserMenu from './UserMenu';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleResources = () => setIsResourcesOpen(!isResourcesOpen);
  const toggleSolutions = () => setIsSolutionsOpen(!isSolutionsOpen);

  const primaryNav: MenuItem[] = [
    { title: t('navigation.home'), path: '/', icon: 'Home' },
    { title: t('navigation.howItWorks'), path: '/how-it-works', icon: 'Layers' },
    { title: t('navigation.solutions'), path: '#', icon: 'Layers' },
    { title: t('navigation.pricing'), path: '/pricing', icon: 'DollarSign' },
    { title: t('navigation.resources'), path: '#', icon: 'BookOpen' },
    { title: t('navigation.about'), path: '/about', icon: 'Users' },
    { title: t('navigation.contact'), path: '/contact', icon: 'Phone' },
  ];

  const solutionItems: MenuItem[] = [
    { title: t('navigation.assessment'), path: '/supply-chain-assessment' },
    { title: t('navigation.sbom'), path: '/sbom-analyzer' },
    { title: t('navigation.vendorRisk'), path: '/vendor-risk-dashboard' },
  ];

  const resourceItems: MenuItem[] = [
    { title: t('navigation.apiDocs'), path: '/api-docs' },
    { title: t('navigation.integration'), path: '/integration-guides' },
    { title: t('navigation.templates'), path: '/templates' },
  ];

  // Helper function to determine if a link is active
  const isActiveLink = (path: string, subItems?: MenuItem[]): boolean => {
    // Direct path match
    if (location.pathname === path) return true;
    
    // For dropdown items, check if any sub-item matches
    if (subItems) {
      return subItems.some(item => location.pathname === item.path);
    }
    
    return false;
  };

  // Define active and default link classes
  const getActiveLinkClasses = (isActive: boolean) => {
    return isActive
      ? 'px-3 py-2 rounded-md text-sm font-medium text-vendorsoluce-green dark:text-white bg-vendorsoluce-green/10 dark:bg-vendorsoluce-green/20 flex items-center'
      : 'px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center';
  };

  const getActiveButtonClasses = (isActive: boolean) => {
    return isActive
      ? 'px-3 py-2 rounded-md text-sm font-medium text-vendorsoluce-green dark:text-white bg-vendorsoluce-green/10 dark:bg-vendorsoluce-green/20 flex items-center'
      : 'px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center';
  };

  const getIcon = (iconName: string | undefined) => {
    if (!iconName) return null;
    
    const icons = {
      Home: <Home size={20} />,
      Layers: <Layers size={20} />,
      DollarSign: <DollarSign size={20} />,
      Shield: <Shield size={20} />,
      FileJson: <FileJson size={20} />,
      BarChart3: <BarChart3 size={20} />,
      BookOpen: <BookOpen size={20} />,
      Users: <Users size={20} />,
      Phone: <Phone size={20} />,
    };
    
    return iconName in icons ? icons[iconName as keyof typeof icons] : null;
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center" data-tour="main-nav">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img 
                src="/vendorsoluce.png" 
                alt="VendorSoluce Logo" 
                className="h-10 w-10" 
              />
              <span className="ml-2 text-xl font-bold text-vendorsoluce-green dark:text-white">
                VendorSoluce™
                <span className="block text-xs text-gray-600 dark:text-gray-400 font-normal">by ERMITS</span>
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-2">
            {primaryNav.map((item) => 
              item.title === t('navigation.solutions') ? (
                <div key={item.title} className="relative">
                  <button
                    onClick={toggleSolutions}
                    className={getActiveButtonClasses(isActiveLink(item.path, solutionItems))}
                  >
                    {getIcon(item.icon)}
                    <span className="ml-1">{item.title}</span>
                    <ChevronDown size={16} className="ml-1" />
                  </button>
                  
                  {isSolutionsOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
                      {solutionItems.map((solution) => (
                        <Link
                          key={solution.title}
                          to={solution.path}
                          className={`block px-4 py-2 text-sm ${
                            isActiveLink(solution.path)
                              ? 'text-vendorsoluce-green dark:text-white bg-vendorsoluce-green/10 dark:bg-vendorsoluce-green/20'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                          onClick={() => setIsSolutionsOpen(false)}
                        >
                          {solution.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : item.title === t('navigation.resources') ? (
                <div key={item.title} className="relative">
                  <button
                    onClick={toggleResources}
                    className={getActiveButtonClasses(isActiveLink(item.path, resourceItems))}
                  >
                    {getIcon(item.icon)}
                    <span className="ml-1">{item.title}</span>
                    <ChevronDown size={16} className="ml-1" />
                  </button>
                  
                  {isResourcesOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
                      {resourceItems.map((resource) => (
                        <Link
                          key={resource.title}
                          to={resource.path}
                          className={`block px-4 py-2 text-sm ${
                            isActiveLink(resource.path)
                              ? 'text-vendorsoluce-green dark:text-white bg-vendorsoluce-green/10 dark:bg-vendorsoluce-green/20'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                          onClick={() => setIsResourcesOpen(false)}
                        >
                          {resource.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.title}
                  to={item.path}
                  className={getActiveLinkClasses(isActiveLink(item.path))}
                >
                  {getIcon(item.icon)}
                  <span className="ml-1">{item.title}</span>
                </Link>
              )
            )}

            <div className="ml-2 flex items-center space-x-2">
              <LanguageSwitcher variant="icon" />
              <div data-tour="theme-toggle">
                <ThemeToggle />
              </div>
              <div data-tour="user-menu">
              <UserMenu />
              </div>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <LanguageSwitcher variant="icon" />
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {primaryNav.map((item) => 
              item.title === t('navigation.resources') ? (
                <div key={item.title}>
                  <button
                    onClick={toggleResources}
                    className={`w-full text-left text-base font-medium flex items-center ${
                      isActiveLink(item.path, resourceItems)
                        ? 'px-3 py-2 text-vendorsoluce-green dark:text-white bg-vendorsoluce-green/10 dark:bg-vendorsoluce-green/20'
                        : 'px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {getIcon(item.icon)}
                    <span className="ml-2">{item.title}</span>
                    <ChevronDown size={16} className="ml-1" />
                  </button>
                  
                  {isResourcesOpen && (
                    <div className="pl-6 py-2 space-y-1">
                      {resourceItems.map((resource) => (
                        <Link
                          key={resource.title}
                          to={resource.path}
                          className={`block px-3 py-2 text-base font-medium ${
                            isActiveLink(resource.path)
                              ? 'text-vendorsoluce-green dark:text-white bg-vendorsoluce-green/10 dark:bg-vendorsoluce-green/20'
                              : 'text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                          onClick={() => {
                            setIsOpen(false);
                            setIsResourcesOpen(false);
                          }}
                        >
                          {resource.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : item.title === t('navigation.solutions') ? (
                <div key={item.title}>
                  <button
                    onClick={toggleSolutions}
                    className={`w-full text-left text-base font-medium flex items-center ${
                      isActiveLink(item.path, solutionItems)
                        ? 'px-3 py-2 text-vendorsoluce-green dark:text-white bg-vendorsoluce-green/10 dark:bg-vendorsoluce-green/20'
                        : 'px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {getIcon(item.icon)}
                    <span className="ml-2">{item.title}</span>
                    <ChevronDown size={16} className="ml-1" />
                  </button>
                  
                  {isSolutionsOpen && (
                    <div className="pl-6 py-2 space-y-1">
                      {solutionItems.map((solution) => (
                        <Link
                          key={solution.title}
                          to={solution.path}
                          className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                          onClick={() => {
                            setIsOpen(false);
                            setIsSolutionsOpen(false);
                          }}
                        >
                          {solution.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.title}
                  to={item.path}
                  className={`block text-base font-medium flex items-center ${
                    isActiveLink(item.path)
                      ? 'px-3 py-2 text-vendorsoluce-green dark:text-white bg-vendorsoluce-green/10 dark:bg-vendorsoluce-green/20'
                      : 'px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {getIcon(item.icon)}
                  <span className="ml-2">{item.title}</span>
                </Link>
              )
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            <div className="px-4 py-2">
              <UserMenu />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;