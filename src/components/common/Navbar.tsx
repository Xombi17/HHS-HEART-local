'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { scrollToElement } from '@/utils/scrollUtils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  // Handle mounting to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMounted]);

  // Handle smooth scrolling for hash links
  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If it's a hash link on the current page
    if (href.includes('#') && pathname === href.split('#')[0]) {
      e.preventDefault();
      const targetId = href.split('#')[1];
      scrollToElement(targetId);
    }
  };

  // Use a consistent initial state for server-side rendering
  const navbarClass = isMounted 
    ? `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white bg-opacity-95 backdrop-blur-sm shadow-md dark:bg-gray-900 dark:bg-opacity-95' 
          : 'bg-transparent dark:bg-transparent'
      }`
    : 'fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-95 backdrop-blur-sm shadow-md dark:bg-gray-900 dark:bg-opacity-95';

  return (
    <nav className={navbarClass}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-red-600 dark:text-red-500 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            HHS Heart
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="/" isActive={pathname === '/'} onClick={handleNavLinkClick}>
              Home
            </NavLink>
            <NavLink href="/anatomy" isActive={pathname === '/anatomy'} onClick={handleNavLinkClick}>
              Anatomy Explorer
            </NavLink>
            <NavLink href="/tools" isActive={pathname === '/tools'} onClick={handleNavLinkClick}>
              Tools
            </NavLink>
            <NavLink href="/quiz" isActive={pathname === '/quiz'} onClick={handleNavLinkClick}>
              Quiz
            </NavLink>
            <NavLink href="/resources" isActive={pathname === '/resources'} onClick={handleNavLinkClick}>
              Resources
            </NavLink>
            <NavLink href="/about" isActive={pathname === '/about'} onClick={handleNavLinkClick}>
              About
            </NavLink>
            <Link href="/anatomy" className="ml-4">
              <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-full transition-colors duration-300 flex items-center">
                <span>Explore Heart</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </Link>
          </div>
          
          <div className="md:hidden">
            <button 
              className="text-gray-800 dark:text-gray-200 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
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
          <div className="md:hidden mt-4 py-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg animate-fadeIn">
            <div className="flex flex-col space-y-4 px-4">
              <MobileNavLink href="/" isActive={pathname === '/'} onClick={handleNavLinkClick}>
                Home
              </MobileNavLink>
              <MobileNavLink href="/anatomy" isActive={pathname === '/anatomy'} onClick={handleNavLinkClick}>
                Anatomy Explorer
              </MobileNavLink>
              <MobileNavLink href="/tools" isActive={pathname === '/tools'} onClick={handleNavLinkClick}>
                Interactive Tools
              </MobileNavLink>
              <MobileNavLink href="/quiz" isActive={pathname === '/quiz'} onClick={handleNavLinkClick}>
                Quiz
              </MobileNavLink>
              <MobileNavLink href="/resources" isActive={pathname === '/resources'} onClick={handleNavLinkClick}>
                Resources
              </MobileNavLink>
              <MobileNavLink href="/about" isActive={pathname === '/about'} onClick={handleNavLinkClick}>
                About
              </MobileNavLink>
              <Link href="/anatomy" className="mt-2">
                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-full transition-colors duration-300 flex items-center justify-center">
                  <span>Explore Heart</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// NavLink component for desktop navigation
const NavLink = ({ 
  href, 
  isActive, 
  onClick, 
  children 
}: { 
  href: string; 
  isActive: boolean; 
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void; 
  children: React.ReactNode 
}) => {
  return (
    <Link 
      href={href} 
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
        isActive 
          ? 'text-red-600 dark:text-red-500 bg-red-50 dark:bg-red-900/20' 
          : 'text-gray-800 hover:text-red-600 hover:bg-red-50 dark:text-gray-200 dark:hover:text-red-500 dark:hover:bg-red-900/10'
      }`}
      onClick={(e) => onClick(e, href)}
    >
      {children}
    </Link>
  );
};

// MobileNavLink component for mobile navigation
const MobileNavLink = ({ 
  href, 
  isActive, 
  onClick, 
  children 
}: { 
  href: string; 
  isActive: boolean; 
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void; 
  children: React.ReactNode 
}) => {
  return (
    <Link 
      href={href} 
      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
        isActive 
          ? 'text-red-600 dark:text-red-500 bg-red-50 dark:bg-red-900/20' 
          : 'text-gray-800 hover:text-red-600 hover:bg-red-50 dark:text-gray-200 dark:hover:text-red-500 dark:hover:bg-red-900/10'
      }`}
      onClick={(e) => onClick(e, href)}
    >
      {children}
    </Link>
  );
};

export default Navbar; 