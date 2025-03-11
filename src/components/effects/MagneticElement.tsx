'use client';

import React, { useRef, useEffect, ReactNode } from 'react';
import { motion, useSpring } from 'framer-motion';

interface MagneticElementProps {
  children: ReactNode;
  strength?: number;
  radius?: number;
  className?: string;
  damping?: number;
  stiffness?: number;
}

const MagneticElement: React.FC<MagneticElementProps> = ({
  children,
  strength = 0.5,
  radius = 200,
  className = '',
  damping = 10,
  stiffness = 100
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  
  // Spring animations for smooth movement
  const xSpring = useSpring(0, { damping, stiffness });
  const ySpring = useSpring(0, { damping, stiffness });
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from cursor to element center
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      // Only apply magnetic effect within radius
      if (distance < radius) {
        // Calculate movement (stronger when closer)
        const power = (1 - Math.min(1, distance / radius)) * strength;
        xSpring.set(distanceX * power);
        ySpring.set(distanceY * power);
      } else {
        // Reset position when cursor is far away
        xSpring.set(0);
        ySpring.set(0);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [radius, strength, xSpring, ySpring]);
  
  return (
    <motion.div
      ref={elementRef}
      className={`magnetic-element ${className}`}
      style={{
        x: xSpring,
        y: ySpring
      }}
    >
      {children}
    </motion.div>
  );
};

export default MagneticElement; 