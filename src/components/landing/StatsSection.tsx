'use client';

import React from 'react';
import AnimatedSection from '../common/AnimatedSection';

const stats = [
  {
    value: '100,000+',
    label: 'Heartbeats per Day',
    description: 'Your heart works tirelessly, beating over 100,000 times every day to keep you alive.'
  },
  {
    value: '60,000',
    label: 'Miles of Blood Vessels',
    description: 'The total length of blood vessels in an adult human body, enough to circle Earth twice.'
  },
  {
    value: '2,000',
    label: 'Gallons per Day',
    description: 'The amount of blood pumped by your heart daily, equivalent to about 2,000 gallons.'
  },
  {
    value: '2.5B',
    label: 'Lifetime Heartbeats',
    description: 'The average heart beats about 2.5 billion times over a lifetime.'
  }
];

const StatsSection = () => {
  return (
    <>
      {/* Gradient transition element */}
      <div className="features-to-stats-transition"></div>
      
      {/* Stats section with updated styling */}
      <section id="heart-facts" className="stats-section py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp" className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-blue-900/30 text-blue-400 font-medium text-sm mb-4 stats-badge">
              Heart Facts
            </span>
            <h2 className="text-4xl font-bold text-white mb-6">
              Heart Facts That Matter
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover fascinating statistics about the human heart, one of the most remarkable organs in your body
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimatedSection
                key={index}
                animation="fadeIn"
                delay={index * 200}
                className="feature-card bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700 hover:transform hover:-translate-y-2 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">{stat.value}</div>
                  <div className="text-lg font-semibold text-gray-300 mb-4">{stat.label}</div>
                  <p className="text-gray-400">{stat.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default StatsSection; 