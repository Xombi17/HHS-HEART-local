'use client';

import React, { ReactNode, useEffect } from 'react';

type AnimationType = 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale';

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  className?: string;
  threshold?: number;
  triggerOnce?: boolean;
  id?: string;
}

// Animation classes
const animations = {
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

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  animation = 'fadeIn',
  delay = 0,
  className = '',
  threshold = 0.1,
  triggerOnce = true,
  id,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  // Handle mounting to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, triggerOnce, isMounted]);

  // Get animation classes
  const animationClass = animations[animation];
  const visibleClass = animations[`${animation}Visible`];

  // Apply delay if specified
  const delayStyle = delay ? { transitionDelay: `${delay}ms` } : {};

  // Render without animations until client-side hydration is complete
  if (!isMounted) {
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
      className={`${className} ${animationClass} ${isVisible ? visibleClass : ''}`}
      style={delayStyle}
    >
      {children}
    </div>
  );
};

export default AnimatedSection; 