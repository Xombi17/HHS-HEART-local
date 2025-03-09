'use client';

import React from 'react';
import Link from 'next/link';
import Button from '../common/Button';
import AnimatedSection from '../common/AnimatedSection';

const features = [
  {
    title: 'Anatomy Explorer',
    description: 'Comprehensive breakdown of cardiac structures with detailed visuals and interactive elements highlighting chambers, valves, and vessels.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    link: '/anatomy',
    color: 'bg-red-900/20'
  },
  {
    title: 'Interactive Tools',
    description: 'Explore heart rate simulation, calculate your BMI, determine optimal heart rate zones, and estimate daily calorie requirements.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    link: '/tools',
    color: 'bg-blue-900/20'
  },
  {
    title: 'Knowledge Assessment',
    description: 'Test your understanding with our interactive quiz on cardiac anatomy and function, with immediate feedback and educational explanations.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    link: '/quiz',
    color: 'bg-green-900/20'
  },
  {
    title: 'Learning Resources',
    description: 'Access a curated collection of authoritative sources and additional reading materials for deeper exploration of cardiac topics.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    link: '/resources',
    color: 'bg-purple-900/20'
  }
];

const FeatureHighlights = () => {
  return (
    <>
      {/* Gradient transition element */}
      <div className="section-transition"></div>
      
      {/* Features section with updated styles */}
      <section id="features" className="features-section py-10 scroll-mt-20">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp" className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-red-900/30 text-red-400 font-medium text-sm mb-4 feature-badge">
              Our Features
            </span>
            <h2 className="text-4xl font-bold text-white mb-6">
              Explore Our Interactive Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover the comprehensive tools and resources we offer to help you understand the human heart
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((feature, index) => (
              <AnimatedSection 
                key={index} 
                animation="fadeIn" 
                delay={index * 200}
                className={`feature-card ${feature.color} p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700`}
              >
                <div className="mb-6 flex justify-center">
                  <div className="p-3 rounded-xl bg-gray-800 shadow-md">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-300 mb-6 text-center">
                  {feature.description}
                </p>
                <div className="flex justify-center">
                  <Link href={feature.link}>
                    <Button variant="outline" size="md" className="w-full justify-center border-2 border-gray-700 text-gray-300 hover:bg-gray-800 hover:shadow-md transition-all duration-300">
                      Learn More
                      <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Button>
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
          
          <AnimatedSection animation="fadeIn" delay={800} className="mt-20 text-center features-to-stats-overflow">
            <Link href="/anatomy">
              
                
              
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default FeatureHighlights; 