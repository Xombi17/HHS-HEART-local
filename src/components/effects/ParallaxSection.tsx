'use client';

import React, { useRef, useEffect, ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { useSmoothScroll } from '@/utils/smoothScroll';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number; // Parallax speed (0-1)
  cursorInfluence?: number; // How much cursor affects movement (0-1)
  className?: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ 
  children, 
  speed = 0.2, 
  cursorInfluence = 0.05,
  className = '' 
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const { cursor } = useSmoothScroll();
  
  // Smooth parallax effect based on scroll
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const smoothY = useSpring(y, { damping: 15, stiffness: 100 });
  
  // State for cursor influence
  const [cursorOffset, setCursorOffset] = React.useState({ x: 0, y: 0 });
  
  // Update based on cursor position
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const rect = sectionRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center as a normalized value (-1 to 1)
    const offsetX = (cursor.x - centerX) / (window.innerWidth / 2);
    const offsetY = (cursor.y - centerY) / (window.innerHeight / 2);
    
    setCursorOffset({
      x: -offsetX * 20 * cursorInfluence, // Adjust multiplier for strength
      y: -offsetY * 20 * cursorInfluence
    });
  }, [cursor, cursorInfluence]);
  
  return (
    <motion.div
      ref={sectionRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        y: smoothY,
        x: cursorOffset.x,
        translateY: cursorOffset.y
      }}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxSection; 