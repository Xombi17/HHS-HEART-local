'use client';

import React from 'react';
import Link from 'next/link';
import Button from '../common/Button';
import AnimatedSection from '../common/AnimatedSection';

const CtaSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-red-600 to-red-800 dark:from-red-900 dark:to-red-950">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection animation="fadeIn" className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Explore the Human Heart?
            </h2>
            <p className="text-xl text-red-100 mb-10 leading-relaxed">
              Dive into our interactive tools, explore the detailed anatomy, test your knowledge, and discover the wonders of the human heart.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/anatomy">
                <Button 
                  size="lg" 
                  className="bg-white text-red-600 hover:bg-red-50 border-2 border-white"
                >
                  Explore Anatomy
                </Button>
              </Link>
              <Link href="/tools">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="text-white border-2 border-white hover:bg-white/10"
                >
                  Try Interactive Tools
                </Button>
              </Link>
            </div>
          </AnimatedSection>
          
          <AnimatedSection animation="slideUp" delay={200} className="mt-16 text-red-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Interactive 3D Model</h3>
                <p>Explore the heart from every angle with our detailed 3D model</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Practical Tools</h3>
                <p>Calculate heart rate zones, BMI, and more with our interactive tools</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Knowledge Quiz</h3>
                <p>Test your understanding with our interactive quiz and get instant feedback</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default CtaSection; 