'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Preload links based on current route
const PreloadLinks: React.FC = () => {
  const pathname = usePathname() || '/';
  
  useEffect(() => {
    // Don't run on server
    if (typeof window === 'undefined') return;
    
    // Preload based on current path - idle callback for lower priority
    const preloadIdleCallback = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));
    
    const handlePreload = () => {
      // Always preload the 3D heart model for faster loading when needed
      const modelLink = document.createElement('link');
      modelLink.rel = 'prefetch';
      modelLink.href = '/models/heart.glb';
      modelLink.as = 'fetch';
      modelLink.crossOrigin = 'anonymous';
      document.head.appendChild(modelLink);
      
      // Preload likely next pages based on current page
      const pagesToPreload: string[] = [];
      
      if (pathname === '/') {
        // From home page, people often navigate to anatomy or tools
        pagesToPreload.push('/anatomy', '/tools');
      } else if (pathname === '/anatomy') {
        // From anatomy, people might go to tools or quiz
        pagesToPreload.push('/tools', '/quiz');
      } else if (pathname.startsWith('/tools')) {
        // From tools, preload other tools pages
        pagesToPreload.push(
          '/tools/heart-rate-simulator',
          '/tools/bmi-calculator',
          '/tools/calorie-calculator'
        );
      } else if (pathname === '/quiz') {
        // From quiz, preload results
        pagesToPreload.push('/quiz/results');
      }
      
      // Preload the pages
      pagesToPreload.forEach(path => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = path;
        document.head.appendChild(link);
      });
    };
    
    // Schedule preloading when browser is idle
    const idleCallbackId = preloadIdleCallback(handlePreload);
    
    // Clean up
    return () => {
      if (window.cancelIdleCallback) {
        window.cancelIdleCallback(idleCallbackId as number);
      } else {
        clearTimeout(idleCallbackId as number);
      }
    };
  }, [pathname]);
  
  // This component doesn't render anything
  return null;
};

export default PreloadLinks; 