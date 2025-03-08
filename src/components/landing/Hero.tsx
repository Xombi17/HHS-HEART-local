'use client';

import React from 'react';
import HeartModel from './HeartModel';
import Button from '../common/Button';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-50 to-white dark:from-gray-900 dark:to-black z-0"></div>
      
      <div className="container mx-auto px-4 py-16 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Explore the <span className="text-red-600 dark:text-red-500">Human Heart</span>
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
              Discover the wonders of the human heart through our interactive experiences
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/anatomy">
                <Button size="lg">
                  Explore Anatomy
                </Button>
              </Link>
              <Link href="/tools">
                <Button variant="outline" size="lg">
                  Try Interactive Tools
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="order-first lg:order-last">
            <HeartModel />
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-8 w-8 text-red-600 dark:text-red-500" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3" 
          />
        </svg>
      </div>
    </div>
  );
};

export default Hero; 