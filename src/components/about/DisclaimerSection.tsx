'use client';

import React from 'react';
import AnimatedSection from '../common/AnimatedSection';

export default function DisclaimerSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="slideUp" className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Disclaimer
            </h2>
          </AnimatedSection>
          
          <AnimatedSection animation="fadeIn" delay={200} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-10 border-l-4 border-yellow-500">
            <div className="flex items-start mb-8">
              <svg 
                className="w-10 h-10 text-yellow-500 mr-5 flex-shrink-0" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                />
              </svg>
              <p className="text-xl text-gray-700 dark:text-gray-300 font-medium">
                Educational Purpose Only
              </p>
            </div>
            
            <AnimatedSection animation="slideUp" delay={300} className="mb-6">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                HHS Heart is an educational resource only and is not intended to provide medical advice, 
                diagnosis, or treatment. The information provided on this website should not be used as a 
                substitute for professional medical care or advice.
              </p>
            </AnimatedSection>
            
            <AnimatedSection animation="slideUp" delay={400} className="mb-6">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                The tools, calculators, and simulations provided are for educational and informational 
                purposes only. They are designed to help understand concepts related to heart health but 
                should not be used to make health decisions without consulting a healthcare professional.
              </p>
            </AnimatedSection>
            
            <AnimatedSection animation="slideUp" delay={500}>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Always consult with qualified healthcare providers for any questions or concerns regarding 
                your health or the health of others.
              </p>
            </AnimatedSection>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
} 