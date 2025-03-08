'use client';

import { useEffect, useState, useRef, RefObject } from 'react';

/**
 * Custom hook to detect when an element is in the viewport
 * @param options IntersectionObserver options
 * @returns [ref, isVisible] - ref to attach to the element, and whether it's visible
 */
export const useInView = <T extends HTMLElement>(
  options = { threshold: 0.1, triggerOnce: true }
): [RefObject<T>, boolean] => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (options.triggerOnce && ref.current) {
          observer.unobserve(ref.current);
        }
      } else if (!options.triggerOnce) {
        setIsVisible(false);
      }
    }, {
      threshold: options.threshold,
      rootMargin: '0px',
    });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options.threshold, options.triggerOnce]);

  return [ref, isVisible];
};

/**
 * CSS classes for common animations
 */
export const animations = {
  fadeIn: 'opacity-0 transition-opacity duration-1000 ease-in-out',
  fadeInVisible: 'opacity-100',
  
  slideUp: 'opacity-0 translate-y-10 transition-all duration-1000 ease-out',
  slideUpVisible: 'opacity-100 translate-y-0',
  
  slideDown: 'opacity-0 -translate-y-10 transition-all duration-1000 ease-out',
  slideDownVisible: 'opacity-100 translate-y-0',
  
  slideLeft: 'opacity-0 translate-x-10 transition-all duration-1000 ease-out',
  slideLeftVisible: 'opacity-100 translate-x-0',
  
  slideRight: 'opacity-0 -translate-x-10 transition-all duration-1000 ease-out',
  slideRightVisible: 'opacity-100 translate-x-0',
  
  scale: 'opacity-0 scale-95 transition-all duration-1000 ease-out',
  scaleVisible: 'opacity-100 scale-100',
}; 