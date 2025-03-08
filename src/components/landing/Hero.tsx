'use client';

import React, { useEffect, useState } from 'react';
import HeartModel from './HeartModel';
import Button from '../common/Button';
import Link from 'next/link';
import { scrollToElement } from '@/utils/scrollUtils';
import AnimatedSection from '../common/AnimatedSection';

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleScrollToFeatures = () => {
    scrollToElement('features-section');
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background gradient with animated pulse effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-50 via-red-50 to-white dark:from-gray-900 dark:via-gray-900 dark:to-black z-0">
        {isMounted && (
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>
        )}
      </div>
      
      <div className="container mx-auto px-4 py-16 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <AnimatedSection animation="slideRight" className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Explore the <span className="text-red-600 dark:text-red-500 relative">
                Human Heart
                <span className="absolute bottom-0 left-0 w-full h-1 bg-red-600 dark:bg-red-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </span>
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              Discover the wonders of the human heart through our interactive experiences. 
              Explore detailed 3D models, use practical tools, and test your knowledge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/anatomy">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  Explore Anatomy
                </Button>
              </Link>
              <Link href="/tools">
                <Button variant="outline" size="lg" className="border-2 border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 transform hover:-translate-y-1">
                  Try Interactive Tools
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 flex flex-wrap gap-6 justify-center lg:justify-start">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 dark:text-gray-300">Interactive 3D Model</span>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 dark:text-gray-300">Educational Content</span>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 dark:text-gray-300">Practical Tools</span>
              </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection animation="slideLeft" className="order-first lg:order-last">
            <div className="relative">
              <HeartModel />
              <div className="absolute bottom-4 left-4 bg-white/80 dark:bg-gray-900/80 p-3 rounded-lg text-sm text-gray-600 dark:text-gray-300 shadow-md backdrop-blur-sm">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-red-600 dark:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                  <span>Drag to rotate | Scroll to zoom</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
      
      {/* Scroll indicator with pulsing animation */}
      <button 
        onClick={handleScrollToFeatures}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer bg-transparent border-none focus:outline-none group"
        aria-label="Scroll to features"
      >
        <div className="flex flex-col items-center">
          <span className="text-gray-600 dark:text-gray-400 mb-2 text-sm">Scroll Down</span>
          <div className="relative">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 text-red-600 dark:text-red-500 animate-bounce" 
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
            <span className="absolute inset-0 rounded-full bg-red-100 dark:bg-red-900/30 animate-ping opacity-75"></span>
          </div>
        </div>
      </button>
      
      {/* Add a subtle wave divider at the bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          className="relative block w-full"
          height="40"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path
            className="text-white dark:text-gray-900 fill-current"
            d="M0,0 C240,95 480,95 720,47.5 C960,0 1200,0 1440,47.5 L1440,100 L0,100 Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero; 