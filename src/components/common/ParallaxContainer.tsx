'use client';

import React, { useEffect, useRef } from 'react';

interface ParallaxLayerProps {
  children: React.ReactNode;
  depth: 'back' | 'mid' | 'front';
  className?: string;
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({ 
  children, 
  depth,
  className = ''
}) => {
  const depthClass = `parallax-${depth}`;
  
  return (
    <div className={`parallax-layer ${depthClass} ${className}`} style={{ border: 'none' }}>
      {children}
    </div>
  );
};

interface ParallaxContainerProps {
  children: React.ReactNode;
  className?: string;
}

const ParallaxContainer: React.FC<ParallaxContainerProps> = ({ 
  children,
  className = '' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Check if we should disable parallax effects for accessibility
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion && containerRef.current) {
      containerRef.current.style.perspective = 'none';
      
      // Find all parallax layers and reset their transforms
      const layers = containerRef.current.querySelectorAll('.parallax-layer');
      layers.forEach((layer) => {
        (layer as HTMLElement).style.transform = 'none';
      });
    }
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`parallax-container ${className}`}
      style={{ 
        border: 'none', 
        overflow: 'visible',
        marginBottom: '0',
        paddingBottom: '0'
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxContainer; 