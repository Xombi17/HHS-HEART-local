'use client';

import React, { useCallback, useRef, useEffect } from 'react';

interface InteractiveGradientProps {
  children: React.ReactNode;
  intensity?: number;
  className?: string;
}

const InteractiveGradient: React.FC<InteractiveGradientProps> = ({
  children,
  intensity = 1,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate the percentage position of the mouse within the element
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Update the custom properties
    containerRef.current.style.setProperty('--x', `${x}%`);
    containerRef.current.style.setProperty('--y', `${y}%`);
  }, []);

  // Handle touch movement for mobile devices
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!containerRef.current || !e.touches[0]) return;

    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    
    // Calculate the percentage position of the touch within the element
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    const y = ((touch.clientY - rect.top) / rect.height) * 100;
    
    // Update the custom properties
    containerRef.current.style.setProperty('--x', `${x}%`);
    containerRef.current.style.setProperty('--y', `${y}%`);
  }, []);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    // Add event listeners
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('touchmove', handleTouchMove as EventListener);

    // Clean up event listeners
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('touchmove', handleTouchMove as EventListener);
    };
  }, [handleMouseMove, handleTouchMove]);

  return (
    <div 
      ref={containerRef} 
      className={`interactive-gradient ${className}`}
      style={{ 
        '--intensity': intensity,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

export default InteractiveGradient; 