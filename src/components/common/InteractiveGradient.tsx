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
  const gradientActive = useRef<boolean>(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;

    // Activate the gradient
    if (!gradientActive.current) {
      gradientActive.current = true;
      containerRef.current.style.setProperty('--gradient-opacity', '1');
    }
    
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate the percentage position of the mouse within the element with padding
    // This ensures the gradient appears even when mouse is slightly outside the element
    const padding = 100; // Virtual padding in pixels
    const width = rect.width + padding * 2;
    const height = rect.height + padding * 2;
    
    // Calculate position with the virtual padding offset
    const x = ((e.clientX - rect.left + padding) / width) * 100;
    const y = ((e.clientY - rect.top + padding) / height) * 100;
    
    // Clamp values between 0 and 100 to prevent gradient from disappearing
    const clampedX = Math.max(0, Math.min(100, x));
    const clampedY = Math.max(0, Math.min(100, y));
    
    // Update the custom properties
    containerRef.current.style.setProperty('--x', `${clampedX}%`);
    containerRef.current.style.setProperty('--y', `${clampedY}%`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!containerRef.current) return;
    
    // Maintain the last position but reduce opacity
    gradientActive.current = false;
    containerRef.current.style.setProperty('--gradient-opacity', '0');
  }, []);

  // Handle touch movement for mobile devices
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!containerRef.current || !e.touches[0]) return;

    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    
    // Similar padding handling for touch events
    const padding = 100;
    const width = rect.width + padding * 2;
    const height = rect.height + padding * 2;
    
    const x = ((touch.clientX - rect.left + padding) / width) * 100;
    const y = ((touch.clientY - rect.top + padding) / height) * 100;
    
    const clampedX = Math.max(0, Math.min(100, x));
    const clampedY = Math.max(0, Math.min(100, y));
    
    containerRef.current.style.setProperty('--x', `${clampedX}%`);
    containerRef.current.style.setProperty('--y', `${clampedY}%`);
    containerRef.current.style.setProperty('--gradient-opacity', '1');
  }, []);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    // Set initial gradient opacity to 0
    element.style.setProperty('--gradient-opacity', '0');

    // Extend the hover effect beyond the component's borders
    const handleDocumentMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const expandedBounds = {
        left: rect.left - 100,
        right: rect.right + 100,
        top: rect.top - 100,
        bottom: rect.bottom + 100
      };
      
      if (
        e.clientX >= expandedBounds.left && 
        e.clientX <= expandedBounds.right && 
        e.clientY >= expandedBounds.top && 
        e.clientY <= expandedBounds.bottom
      ) {
        handleMouseMove(e);
      } else if (gradientActive.current) {
        handleMouseLeave();
      }
    };

    // Add event listeners to the document instead of just the element
    document.addEventListener('mousemove', handleDocumentMouseMove);
    element.addEventListener('touchmove', handleTouchMove as EventListener);

    // Clean up event listeners
    return () => {
      document.removeEventListener('mousemove', handleDocumentMouseMove);
      element.removeEventListener('touchmove', handleTouchMove as EventListener);
    };
  }, [handleMouseMove, handleTouchMove, handleMouseLeave]);

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