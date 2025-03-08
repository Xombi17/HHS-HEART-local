'use client';

import React, { ReactNode } from 'react';
import { useInView, animations } from '@/utils/animationUtils';

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
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
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
  }, [threshold, triggerOnce]);

  // Get animation classes
  const animationClass = animations[animation];
  const visibleClass = animations[`${animation}Visible`];

  // Apply delay if specified
  const delayStyle = delay ? { transitionDelay: `${delay}ms` } : {};

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