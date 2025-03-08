'use client';

import React from 'react';
import AnimatedSection from '@/components/common/AnimatedSection';
import ParallaxSection from '@/components/common/ParallaxSection';
import Button from '@/components/common/Button';
import { scrollToElement } from '@/utils/scrollUtils';

export default function DemoPage() {
  const handleScrollToAnimations = () => {
    scrollToElement('animations-section');
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-50 to-white dark:from-gray-900 dark:to-black z-0"></div>
        
        <div className="container mx-auto px-4 py-16 z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Scroll Animation <span className="text-red-600 dark:text-red-500">Demo</span>
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            This page demonstrates the various scroll animations and parallax effects available in the HHS Heart website.
          </p>
          <Button size="lg" onClick={handleScrollToAnimations}>
            Explore Animations
          </Button>
        </div>
        
        {/* Scroll indicator */}
        <button 
          onClick={handleScrollToAnimations}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer bg-transparent border-none focus:outline-none"
          aria-label="Scroll to animations"
        >
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
        </button>
      </section>
      
      {/* Animations Section */}
      <section id="animations-section" className="py-16 bg-white dark:bg-gray-900 scroll-mt-20">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp" className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Scroll Animations
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Scroll down to see various animations triggered by scrolling
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <AnimatedSection animation="fadeIn" className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Fade In</h3>
              <p className="text-gray-700 dark:text-gray-300">
                This element fades in when it enters the viewport.
              </p>
            </AnimatedSection>
            
            <AnimatedSection animation="slideUp" className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Slide Up</h3>
              <p className="text-gray-700 dark:text-gray-300">
                This element slides up when it enters the viewport.
              </p>
            </AnimatedSection>
            
            <AnimatedSection animation="slideDown" className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Slide Down</h3>
              <p className="text-gray-700 dark:text-gray-300">
                This element slides down when it enters the viewport.
              </p>
            </AnimatedSection>
            
            <AnimatedSection animation="slideLeft" className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Slide Left</h3>
              <p className="text-gray-700 dark:text-gray-300">
                This element slides from the right when it enters the viewport.
              </p>
            </AnimatedSection>
            
            <AnimatedSection animation="slideRight" className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Slide Right</h3>
              <p className="text-gray-700 dark:text-gray-300">
                This element slides from the left when it enters the viewport.
              </p>
            </AnimatedSection>
            
            <AnimatedSection animation="scale" className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Scale</h3>
              <p className="text-gray-700 dark:text-gray-300">
                This element scales up when it enters the viewport.
              </p>
            </AnimatedSection>
          </div>
          
          <AnimatedSection animation="slideUp" className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Staggered Animations
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
              Elements can be animated with delays for a staggered effect
            </p>
          </AnimatedSection>
          
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <AnimatedSection 
                key={index} 
                animation="fadeIn" 
                delay={index * 200}
                className="w-16 h-16 bg-red-500 dark:bg-red-600 rounded-lg flex items-center justify-center text-white font-bold"
              >
                {index + 1}
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      
      {/* Parallax Section */}
      <ParallaxSection 
        imageSrc="/images/heart-bg.svg" 
        height="500px"
        strength={400}
        overlayOpacity={0.3}
      >
        <div className="text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Parallax Scrolling
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            This section demonstrates parallax scrolling, where the background moves at a different speed than the foreground content.
          </p>
          <Button size="lg">
            Learn More
          </Button>
        </div>
      </ParallaxSection>
      
      {/* More Animations */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp" className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Combined Animations
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Animations can be combined with other effects for more complex interactions
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection animation="slideRight" className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Interactive Elements</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Animated elements can also be interactive. Try hovering and clicking on this button:
              </p>
              <Button>
                Hover Me
              </Button>
            </AnimatedSection>
            
            <AnimatedSection animation="slideLeft" className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Nested Animations</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Animations can be nested for more complex effects:
              </p>
              <div className="space-y-4">
                <AnimatedSection animation="fadeIn" delay={200} className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                  <p className="text-gray-700 dark:text-gray-300">First item</p>
                </AnimatedSection>
                <AnimatedSection animation="fadeIn" delay={400} className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                  <p className="text-gray-700 dark:text-gray-300">Second item</p>
                </AnimatedSection>
                <AnimatedSection animation="fadeIn" delay={600} className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                  <p className="text-gray-700 dark:text-gray-300">Third item</p>
                </AnimatedSection>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
} 