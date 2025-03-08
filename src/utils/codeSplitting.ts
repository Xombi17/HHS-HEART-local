'use client';

import React, { lazy, ComponentType } from 'react';

export type LazyComponentProps<T extends ComponentType<any>> = T extends ComponentType<infer P> ? P : never;

/**
 * Creates a lazily loaded component with options for error handling and load boundaries.
 * 
 * @param importFunc A function that returns a promise resolving to the component module
 * @param options Configuration options
 * @returns Lazy loaded component
 */
export function createLazyComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  options: { ssr?: boolean } = {}
) {
  return lazy(() => {
    // Handle server-side rendering
    if (options.ssr === false && typeof window === 'undefined') {
      return new Promise((resolve) => {
        resolve({ default: (() => null) as unknown as T });
      });
    }
    
    // Use the import function
    return importFunc().catch(error => {
      console.error('Error loading component:', error);
      // Create a fallback component when loading fails
      const ErrorComponent = () => (
        <div className="p-4 bg-red-100 text-red-800 rounded">
          Failed to load component
        </div>
      );
      return { default: ErrorComponent as unknown as T };
    });
  });
}

/**
 * Split large component by feature.
 * Use this for components that are conditionally shown or hidden.
 */
export function lazyLoadByFeature<T extends ComponentType<any>>(path: string, options = {}) {
  return createLazyComponent<T>(() => import(`@/components/${path}.tsx`), options);
}

/**
 * Split large component by route.
 * Use this for page-level components that are only used on specific routes.
 */
export function lazyLoadByRoute<T extends ComponentType<any>>(path: string, options = {}) {
  return createLazyComponent<T>(() => import(`@/app/${path}.tsx`), options);
}

/**
 * Preload a component without rendering it.
 * This is useful for components that are likely to be needed soon.
 */
export function preloadComponent(path: string): void {
  if (typeof window !== 'undefined') {
    // Use a timeout to ensure this happens in idle time
    setTimeout(() => {
      // Dynamic import to preload the component
      import(`@/components/${path}.tsx`).catch(e => {
        // Silently catch errors for preloading
        console.debug(`Preloading ${path} failed silently`, e);
      });
    }, 0);
  }
}

/**
 * Preload multiple components at once
 */
export function preloadComponents(paths: string[]): void {
  paths.forEach(path => preloadComponent(path));
} 