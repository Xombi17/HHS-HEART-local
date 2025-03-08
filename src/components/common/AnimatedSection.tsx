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
  const [ref, isVisible] = useInView({ threshold, triggerOnce });

  // Get animation classes
  const animationClass = animations[animation];
  const visibleClass = animations[`${animation}Visible`];

  // Apply delay if specified
  const delayStyle = delay ? { transitionDelay: `${delay}ms` } : {};

  return (
    <section
      ref={ref}
      id={id}
      className={`${className} ${animationClass} ${isVisible ? visibleClass : ''}`}
      style={delayStyle}
    >
      {children}
    </section>
  );
};

export default AnimatedSection; 