'use client';

import React, { useEffect, useState } from 'react';
import HeartModel from './HeartModel';
import Button from '../common/Button';
import Link from 'next/link';
import { scrollToElement } from '@/utils/scrollUtils';
import AnimatedSection from '../common/AnimatedSection';

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [reduceAnimations, setReduceAnimations] = useState(false);
  
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReduceAnimations(prefersReducedMotion);
    
    // Delay mounting animations slightly to improve initial load performance
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleScrollToFeatures = () => {
    scrollToElement('features-section');
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background gradient with simplified animation effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-50 via-red-50 to-white dark:from-gray-900 dark:via-gray-900 dark:to-black z-0">
        {isMounted && !reduceAnimations && (
          <div className="absolute inset-0 opacity-20">
            {/* Reduced number of blobs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>
        )}
      </div>
      
      <div className="container mx-auto px-4 py-16 z-10">
        {/* Mobile layout (stacked with text at top) - shown on small screens only */}
        <div className="flex flex-col items-center md:hidden">
          {/* Text content */}
          <AnimatedSection 
            animation="fadeIn" 
            className="text-center mb-8 w-full"
            disabled={reduceAnimations}
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Explore the <span className="text-red-600 dark:text-red-500">
                Human Heart
              </span>
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              Discover the wonders of the human heart through our interactive experiences. 
              Explore detailed 3D models, use practical tools, and test your knowledge.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link href="/anatomy">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white shadow-lg transition-all duration-300">
                  Explore Anatomy
                </Button>
              </Link>
              <Link href="/tools">
                <Button variant="outline" size="lg" className="border-2 border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300">
                  Try Interactive Tools
                </Button>
              </Link>
            </div>
          </AnimatedSection>
          
          {/* Heart Model */}
          <AnimatedSection 
            animation="fadeIn" 
            className="w-full"
            disabled={reduceAnimations}
          >
            <div className="mx-auto">
              <HeartModel />
            </div>
          </AnimatedSection>
          
          {/* Features */}
          <AnimatedSection 
            animation="fadeIn" 
            className="mt-6 w-full"
            disabled={reduceAnimations}
          >
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-2">
                  <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Interactive 3D Model</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-2">
                  <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Educational Content</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-2">
                  <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Practical Tools</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
        
        {/* Desktop layout (original 2-column) - hidden on small screens */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-8 md:items-center">
          <AnimatedSection 
            animation="slideRight" 
            className="text-left"
            disabled={reduceAnimations}
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Explore the <span className="text-red-600 dark:text-red-500">
                Human Heart
              </span>
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              Discover the wonders of the human heart through our interactive experiences. 
              Explore detailed 3D models, use practical tools, and test your knowledge.
            </p>
            <div className="flex flex-row gap-4 justify-start">
              <Link href="/anatomy">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white shadow-lg transition-all duration-300">
                  Explore Anatomy
                </Button>
              </Link>
              <Link href="/tools">
                <Button variant="outline" size="lg" className="border-2 border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300">
                  Try Interactive Tools
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 flex flex-wrap gap-6 justify-start">
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
          
          <AnimatedSection 
            animation="slideLeft" 
            className=""
            disabled={reduceAnimations}
          >
            <div className="relative">
              <HeartModel />
            </div>
          </AnimatedSection>
        </div>
      </div>
      
      {/* Scroll indicator */}
      {!reduceAnimations && (
        <button 
          onClick={handleScrollToFeatures}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer bg-transparent border-none focus:outline-none"
          aria-label="Scroll to features"
        >
          <div className="flex flex-col items-center">
            <span className="text-gray-600 dark:text-gray-400 mb-2 text-sm">Scroll Down</span>
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
          </div>
        </button>
      )}
      
      {/* Simplified wave divider */}
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
            d="M0,0 C480,95 960,95 1440,0 L1440,100 L0,100 Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero; 