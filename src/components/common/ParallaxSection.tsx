'use client';

import React, { ReactNode } from 'react';
import { Parallax } from 'react-parallax';

interface ParallaxSectionProps {
  imageSrc: string;
  strength?: number;
  height?: string;
  children: ReactNode;
  overlayColor?: string;
  overlayOpacity?: number;
  className?: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  imageSrc,
  strength = 300,
  height = '500px',
  children,
  overlayColor = '#000000',
  overlayOpacity = 0.5,
  className = '',
}) => {
  return (
    <Parallax
      bgImage={imageSrc}
      strength={strength}
      className={`relative ${className}`}
      bgClassName="object-cover"
      style={{ height }}
    >
      {/* Overlay */}
      <div 
        className="absolute inset-0" 
        style={{ 
          backgroundColor: overlayColor,
          opacity: overlayOpacity,
        }}
      />
      
      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="container mx-auto px-4 py-16 z-10">
          {children}
        </div>
      </div>
    </Parallax>
  );
};

export default ParallaxSection; 