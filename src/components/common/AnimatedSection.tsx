'use client';

import React, { ReactNode, useEffect, useRef } from 'react';

type AnimationType = 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale';

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  className?: string;
  threshold?: number;
  triggerOnce?: boolean;
  id?: string;
  disabled?: boolean; // Add option to disable animations
}

// Animation classes - simplified for better performance
const animations = {
  fadeIn: 'opacity-0 transition-opacity duration-700 ease-in-out',
  fadeInVisible: 'opacity-100',
  
  slideUp: 'opacity-0 translate-y-8 transition-all duration-700 ease-out',
  slideUpVisible: 'opacity-100 translate-y-0',
  
  slideDown: 'opacity-0 -translate-y-8 transition-all duration-700 ease-out',
  slideDownVisible: 'opacity-100 translate-y-0',
  
  slideLeft: 'opacity-0 translate-x-8 transition-all duration-700 ease-out',
  slideLeftVisible: 'opacity-100 translate-x-0',
  
  slideRight: 'opacity-0 -translate-x-8 transition-all duration-700 ease-out',
  slideRightVisible: 'opacity-100 translate-x-0',
  
  scale: 'opacity-0 scale-95 transition-all duration-700 ease-out',
  scaleVisible: 'opacity-100 scale-100',
};

// Create a shared IntersectionObserver instance
let sharedObserver: IntersectionObserver | null = null;
const observerCallbacks = new Map<Element, (isIntersecting: boolean) => void>();

// Throttle function to limit how often a function can be called
const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  animation = 'fadeIn',
  delay = 0,
  className = '',
  threshold = 0.1,
  triggerOnce = true,
  id,
  disabled = false,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Handle mounting to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    
    // Check if reduced motion is preferred
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      hasAnimated.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isMounted || disabled || hasAnimated.current) return;
    
    // Create shared observer if it doesn't exist
    if (!sharedObserver) {
      sharedObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const callback = observerCallbacks.get(entry.target);
            if (callback) {
              callback(entry.isIntersecting);
            }
          });
        },
        { threshold, rootMargin: '20px' }
      );
    }

    // Throttled state update function
    const handleIntersection = throttle((isIntersecting: boolean) => {
      if (isIntersecting) {
        setIsVisible(true);
        if (triggerOnce) {
          hasAnimated.current = true;
          if (ref.current) {
            observerCallbacks.delete(ref.current);
            sharedObserver?.unobserve(ref.current);
          }
        }
      } else if (!triggerOnce) {
        setIsVisible(false);
      }
    }, 100);

    // Register callback and observe
    const currentRef = ref.current;
    if (currentRef) {
      observerCallbacks.set(currentRef, handleIntersection);
      sharedObserver.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observerCallbacks.delete(currentRef);
        sharedObserver?.unobserve(currentRef);
      }
    };
  }, [threshold, triggerOnce, isMounted, disabled]);

  // Get animation classes
  const animationClass = disabled ? '' : animations[animation];
  const visibleClass = disabled ? '' : (isVisible ? animations[`${animation}Visible`] : '');

  // Apply delay if specified
  const delayStyle = (delay && !disabled) ? { transitionDelay: `${delay}ms` } : {};

  // Render without animations until client-side hydration is complete or if animations are disabled
  if (!isMounted || disabled) {
    return (
      <div
        id={id}
        className={className}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      id={id}
      className={`${className} ${animationClass} ${visibleClass} will-change-transform`}
      style={delayStyle}
    >
      {children}
    </div>
  );
};

export default AnimatedSection; 