'use client';

import React, { useState, useEffect } from 'react';
import { scrollToTop } from '@/utils/scrollUtils';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Handle mounting to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (typeof window !== 'undefined' && window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set up scroll event listener
  useEffect(() => {
    if (!isMounted) return;
    
    window.addEventListener('scroll', toggleVisibility);
    // Initial check
    toggleVisibility();
    
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [isMounted]);

  const handleScrollToTop = () => {
    scrollToTop();
  };

  // Don't render anything during SSR
  if (!isMounted) return null;

  return (
    <button
      onClick={handleScrollToTop}
      className={`fixed bottom-8 right-8 p-3 rounded-full bg-red-600 text-white shadow-lg transition-opacity duration-300 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 z-50 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
};

export default ScrollToTopButton; 