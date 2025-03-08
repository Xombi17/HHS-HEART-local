'use client';

import { useEffect, useState } from 'react';

interface PerformanceOptimizerProps {
  children: React.ReactNode;
}

/**
 * PerformanceOptimizer component that defers rendering of non-critical UI
 * until after the main content has loaded and the browser is idle.
 */
const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({ children }) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Check if the browser supports requestIdleCallback
    if ('requestIdleCallback' in window) {
      // @ts-ignore - TypeScript doesn't have proper types for requestIdleCallback
      window.requestIdleCallback(() => {
        setShouldRender(true);
      }, { timeout: 2000 }); // Timeout after 2 seconds if the browser remains busy
    } else {
      // Fallback for browsers that don't support requestIdleCallback
      const timeoutId = setTimeout(() => {
        setShouldRender(true);
      }, 1000);
      
      return () => clearTimeout(timeoutId);
    }
  }, []);

  // Render nothing until the browser is idle
  if (!shouldRender) {
    return null;
  }

  return <>{children}</>;
};

export default PerformanceOptimizer; 