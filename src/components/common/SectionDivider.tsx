'use client';

import React, { memo, useEffect, useState } from 'react';

interface SectionDividerProps {
  from?: string;
  to?: string;
  height?: string;
  wave?: boolean;
  className?: string;
}

// Memoize the component to prevent unnecessary re-renders
const SectionDivider: React.FC<SectionDividerProps> = memo(({
  from = 'from-red-50',
  to = 'to-white',
  height = 'h-24',
  wave = false,
  className = '',
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Extract color names for CSS variables
  const fromColor = from.replace('from-', '');
  const toColor = to.replace('to-', '');
  
  if (!isMounted) {
    return <div className={`${height} ${className}`} />;
  }
  
  if (wave) {
    return (
      <div className={`relative ${height} overflow-hidden ${className}`}>
        <div className={`absolute inset-0 bg-gradient-to-b ${from} ${to}`}></div>
        {/* Simplified SVG path with fewer points */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          height="100%"
        >
          <path
            fill="currentColor"
            className={`text-${toColor}`}
            d="M0,0 C300,90 900,90 1200,0 L1200,120 L0,120 Z"
          ></path>
        </svg>
      </div>
    );
  }

  // Use inline styles for better performance with gradients
  return (
    <div 
      className={`${height} ${className}`}
      style={{
        background: `linear-gradient(to bottom, var(--${fromColor}) 0%, var(--${toColor}) 100%)`
      }}
    ></div>
  );
});

// Add display name for debugging
SectionDivider.displayName = 'SectionDivider';

export default SectionDivider; 