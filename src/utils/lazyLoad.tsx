'use client';

import React, { Suspense, lazy, ComponentType } from 'react';

// Loading spinner component
const LoadingSpinner = () => (
  <div className="w-full h-full min-h-[200px] flex items-center justify-center">
    <div className="relative w-12 h-12">
      <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 dark:border-gray-700 rounded-full" />
      <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-red-600 dark:border-t-red-500 rounded-full animate-spin" />
    </div>
  </div>
);

// Simple wrapper for lazy-loaded components
export const LazyComponent = ({ 
  component, 
  fallback = <LoadingSpinner />,
  ...props 
}: { 
  component: React.ReactNode; 
  fallback?: React.ReactNode;
  [key: string]: any;
}) => {
  return (
    <Suspense fallback={fallback}>
      {component}
    </Suspense>
  );
};

// Helper function for lazy loading components safely
export function lazyLoad<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) {
  const LazyComponent = lazy(() => {
    return factory().catch(() => {
      return {
        default: (props: any) => (
          <div className="p-4 bg-red-100 text-red-800 rounded">
            Failed to load component
          </div>
        )
      } as { default: T };
    });
  });
  
  return LazyComponent;
} 