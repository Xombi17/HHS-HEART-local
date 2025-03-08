'use client';

import React, { Suspense, lazy, LazyExoticComponent, ComponentType } from 'react';

interface DynamicLoaderProps {
  component: LazyExoticComponent<ComponentType<any>>;
  fallback?: React.ReactNode;
  props?: any;
}

const DefaultFallback = () => (
  <div className="w-full h-full min-h-[200px] flex items-center justify-center">
    <div className="relative w-12 h-12">
      <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 dark:border-gray-700 rounded-full" />
      <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-red-600 dark:border-t-red-500 rounded-full animate-spin" />
    </div>
  </div>
);

export const DynamicLoader: React.FC<DynamicLoaderProps> = ({ 
  component: Component, 
  fallback = <DefaultFallback />,
  props = {} 
}) => {
  return (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );
};

// Helper function to create dynamic imports
export function createDynamicComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  options: { ssr?: boolean } = {}
): LazyExoticComponent<T> {
  return lazy(() => {
    if (options.ssr === false && typeof window === 'undefined') {
      // For components that should not be server-side rendered
      return new Promise((resolve) => {
        resolve({ default: (() => null) as unknown as T });
      });
    }
    return importFunc();
  });
}

export default DynamicLoader; 