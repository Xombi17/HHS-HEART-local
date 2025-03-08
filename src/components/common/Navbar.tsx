'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { scrollToElement } from '@/utils/scrollUtils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle smooth scrolling for hash links
  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If it's a hash link on the current page
    if (href.includes('#') && pathname === href.split('#')[0]) {
      e.preventDefault();
      const targetId = href.split('#')[1];
      scrollToElement(targetId);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white bg-opacity-95 shadow-md dark:bg-gray-900 dark:bg-opacity-95' 
          : 'bg-transparent dark:bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-red-600 dark:text-red-500">
            HHS Heart
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className={`transition-colors duration-300 ${
                pathname === '/' 
                  ? 'text-red-600 dark:text-red-500' 
                  : 'text-gray-800 hover:text-red-600 dark:text-gray-200 dark:hover:text-red-500'
              }`}
              onClick={(e) => handleNavLinkClick(e, '/')}
            >
              Home
            </Link>
            <Link 
              href="/anatomy" 
              className={`transition-colors duration-300 ${
                pathname === '/anatomy' 
                  ? 'text-red-600 dark:text-red-500' 
                  : 'text-gray-800 hover:text-red-600 dark:text-gray-200 dark:hover:text-red-500'
              }`}
              onClick={(e) => handleNavLinkClick(e, '/anatomy')}
            >
              Anatomy Explorer
            </Link>
            <Link 
              href="/tools" 
              className={`transition-colors duration-300 ${
                pathname === '/tools' 
                  ? 'text-red-600 dark:text-red-500' 
                  : 'text-gray-800 hover:text-red-600 dark:text-gray-200 dark:hover:text-red-500'
              }`}
              onClick={(e) => handleNavLinkClick(e, '/tools')}
            >
              Interactive Tools
            </Link>
            <Link 
              href="/quiz" 
              className={`transition-colors duration-300 ${
                pathname === '/quiz' 
                  ? 'text-red-600 dark:text-red-500' 
                  : 'text-gray-800 hover:text-red-600 dark:text-gray-200 dark:hover:text-red-500'
              }`}
              onClick={(e) => handleNavLinkClick(e, '/quiz')}
            >
              Quiz
            </Link>
            <Link 
              href="/resources" 
              className={`transition-colors duration-300 ${
                pathname === '/resources' 
                  ? 'text-red-600 dark:text-red-500' 
                  : 'text-gray-800 hover:text-red-600 dark:text-gray-200 dark:hover:text-red-500'
              }`}
              onClick={(e) => handleNavLinkClick(e, '/resources')}
            >
              Resources
            </Link>
            <Link 
              href="/about" 
              className={`transition-colors duration-300 ${
                pathname === '/about' 
                  ? 'text-red-600 dark:text-red-500' 
                  : 'text-gray-800 hover:text-red-600 dark:text-gray-200 dark:hover:text-red-500'
              }`}
              onClick={(e) => handleNavLinkClick(e, '/about')}
            >
              About
            </Link>
          </div>
          
          <div className="md:hidden">
            <button 
              className="text-gray-800 dark:text-gray-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="flex flex-col space-y-4 px-4">
              <Link 
                href="/" 
                className={`transition-colors duration-300 ${
                  pathname === '/' 
                    ? 'text-red-600 dark:text-red-500' 
                    : 'text-gray-800 hover:text-red-600 dark:text-gray-200 dark:hover:text-red-500'
                }`}
                onClick={(e) => {
                  handleNavLinkClick(e, '/');
                  setIsMenuOpen(false);
                }}
              >
                Home
              </Link>
              <Link 
                href="/anatomy" 
                className={`transition-colors duration-300 ${
                  pathname === '/anatomy' 
                    ? 'text-red-600 dark:text-red-500' 
                    : 'text-gray-800 hover:text-red-600 dark:text-gray-200 dark:hover:text-red-500'
                }`}
                onClick={(e) => {
                  handleNavLinkClick(e, '/anatomy');
                  setIsMenuOpen(false);
                }}
              >
                Anatomy Explorer
              </Link>
              <Link 
                href="/tools" 
                className={`transition-colors duration-300 ${
                  pathname === '/tools' 
                    ? 'text-red-600 dark:text-red-500' 
                    : 'text-gray-800 hover:text-red-600 dark:text-gray-200 dark:hover:text-red-500'
                }`}
                onClick={(e) => {
                  handleNavLinkClick(e, '/tools');
                  setIsMenuOpen(false);
                }}
              >
                Interactive Tools
              </Link>
              <Link 
                href="/quiz" 
                className={`transition-colors duration-300 ${
                  pathname === '/quiz' 
                    ? 'text-red-600 dark:text-red-500' 
                    : 'text-gray-800 hover:text-red-600 dark:text-gray-200 dark:hover:text-red-500'
                }`}
                onClick={(e) => {
                  handleNavLinkClick(e, '/quiz');
                  setIsMenuOpen(false);
                }}
              >
                Quiz
              </Link>
              <Link 
                href="/resources" 
                className={`transition-colors duration-300 ${
                  pathname === '/resources' 
                    ? 'text-red-600 dark:text-red-500' 
                    : 'text-gray-800 hover:text-red-600 dark:text-gray-200 dark:hover:text-red-500'
                }`}
                onClick={(e) => {
                  handleNavLinkClick(e, '/resources');
                  setIsMenuOpen(false);
                }}
              >
                Resources
              </Link>
              <Link 
                href="/about" 
                className={`transition-colors duration-300 ${
                  pathname === '/about' 
                    ? 'text-red-600 dark:text-red-500' 
                    : 'text-gray-800 hover:text-red-600 dark:text-gray-200 dark:hover:text-red-500'
                }`}
                onClick={(e) => {
                  handleNavLinkClick(e, '/about');
                  setIsMenuOpen(false);
                }}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 