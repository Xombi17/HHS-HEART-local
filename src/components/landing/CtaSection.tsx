'use client';

import React from 'react';
import Link from 'next/link';
import Button from '../common/Button';
import AnimatedSection from '../common/AnimatedSection';

const CtaSection = () => {
  return (
    <section className="bg-gradient-to-br from-red-900 to-red-800 py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="slideUp" className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Explore the Human Heart?
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Dive into our interactive tools, explore the detailed anatomy, test your knowledge, and discover the wonders of the human heart.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          <Link href="/anatomy" className="w-full">
            <Button 
              variant="outline" 
              className="w-full text-lg py-4 bg-white/10 hover:bg-white/20 border-white text-white"
            >
              Explore Anatomy
            </Button>
          </Link>
          <Link href="/tools" className="w-full">
            <Button 
              variant="outline" 
              className="w-full text-lg py-4 bg-white/10 hover:bg-white/20 border-white text-white"
            >
              Try Interactive Tools
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <AnimatedSection animation="fadeIn" delay={200} className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
              <svg className="w-12 h-12 text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <h3 className="text-xl font-semibold text-white mb-2">Interactive 3D Model</h3>
              <p className="text-gray-300">Explore the heart from every angle with our detailed 3D model</p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeIn" delay={400} className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
              <svg className="w-12 h-12 text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-semibold text-white mb-2">Practical Tools</h3>
              <p className="text-gray-300">Calculate heart rate zones, BMI, and more with our interactive tools</p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeIn" delay={600} className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
              <svg className="w-12 h-12 text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-white mb-2">Knowledge Quiz</h3>
              <p className="text-gray-300">Test your understanding with our interactive quiz and get instant feedback</p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default CtaSection; 