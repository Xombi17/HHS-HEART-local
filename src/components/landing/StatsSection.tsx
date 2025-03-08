'use client';

import React from 'react';
import AnimatedSection from '../common/AnimatedSection';
import { useInView } from 'react-intersection-observer';

const stats = [
  {
    value: '100K+',
    label: 'Heartbeats per day',
    description: 'Your heart beats approximately 100,000 times every day, pumping about 2,000 gallons of blood.'
  },
  {
    value: '11K',
    label: 'Miles of blood vessels',
    description: 'The human body contains about 60,000 miles of blood vessels, enough to circle the Earth more than twice.'
  },
  {
    value: '5L',
    label: 'Blood pumped per minute',
    description: 'Your heart pumps about 5 liters of blood through your body every minute.'
  },
  {
    value: '2B+',
    label: 'Heartbeats in a lifetime',
    description: 'The average heart will beat more than 2.5 billion times during a typical lifetime.'
  }
];

const StatsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-20 bg-gradient-to-b from-red-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="slideUp" className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Heart Facts That Matter
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover fascinating statistics about the human heart, one of the most remarkable organs in the body
          </p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10" ref={ref}>
          {stats.map((stat, index) => (
            <AnimatedSection 
              key={index} 
              animation="fadeIn" 
              delay={index * 200}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 mb-6 mx-auto">
                <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className="counter-value text-4xl font-bold text-red-600 dark:text-red-500 mb-2">
                {stat.value}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {stat.label}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {stat.description}
              </p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection; 