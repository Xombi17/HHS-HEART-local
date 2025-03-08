'use client';

import { useEffect } from 'react';
import { registerServiceWorker } from '@/utils/serviceWorker';

/**
 * Component that registers the service worker on the client side.
 * This is a "fire and forget" component that doesn't render anything.
 */
const ServiceWorkerRegistration: React.FC = () => {
  useEffect(() => {
    // Only register in production to avoid caching issues during development
    if (process.env.NODE_ENV === 'production') {
      registerServiceWorker();
    }
  }, []);

  return null;
};

export default ServiceWorkerRegistration; 