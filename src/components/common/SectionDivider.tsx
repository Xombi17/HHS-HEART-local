'use client';

import React from 'react';

interface SectionDividerProps {
  from?: string;
  to?: string;
  height?: string;
  wave?: boolean;
  className?: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({
  from = 'from-red-50',
  to = 'to-white',
  height = 'h-24',
  wave = false,
  className = '',
}) => {
  if (wave) {
    return (
      <div className={`relative ${height} overflow-hidden ${className}`}>
        <div className={`absolute inset-0 bg-gradient-to-b ${from} ${to}`}></div>
        <svg
          className="absolute bottom-0 left-0 w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            className={`text-${to.replace('to-', '')}`}
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <div 
      className={`${height} ${className}`}
      style={{
        background: `linear-gradient(to bottom, var(--${from.replace('from-', '')}) 0%, var(--${to.replace('to-', '')}) 100%)`
      }}
    ></div>
  );
};

export default SectionDivider; 