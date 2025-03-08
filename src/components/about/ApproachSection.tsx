'use client';

import React from 'react';
import AnimatedSection from '../common/AnimatedSection';

const ApproachSection: React.FC = () => {
  const approaches = [
    {
      title: 'Educational Excellence',
      description: 'All content is developed with scientific accuracy and educational best practices in mind. We strive to present information that is both academically sound and engaging.',
      icon: (
        <svg className="w-14 h-14 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      )
    },
    {
      title: 'Interactive Learning',
      description: 'We believe in learning by doing. Our interactive tools and visual models allow users to explore concepts hands-on, enhancing understanding and retention.',
      icon: (
        <svg className="w-14 h-14 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      )
    },
    {
      title: 'Accessibility',
      description: 'We design our platform to be accessible to users of all backgrounds, technical abilities, and learning styles. Our content is structured to accommodate different levels of prior knowledge.',
      icon: (
        <svg className="w-14 h-14 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="slideUp" className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Our Approach
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            How we create engaging and educational content about the human heart
          </p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {approaches.map((approach, index) => (
            <AnimatedSection 
              key={index} 
              animation="fadeIn"
              delay={index * 200}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex justify-center mb-6">
                {approach.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                {approach.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-center">
                {approach.description}
              </p>
            </AnimatedSection>
          ))}
        </div>
        
        <AnimatedSection animation="slideUp" delay={300} className="mt-20 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-10">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
            Our Commitment to Accuracy
          </h3>
          <div className="flex flex-col md:flex-row items-center gap-10">
            <AnimatedSection animation="slideRight" delay={400} className="md:w-1/2">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                All content on HHS Heart is developed with a commitment to scientific accuracy and educational value. 
                We work with medical professionals to ensure that our information is correct and up-to-date.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                While our platform is designed for educational purposes and not as a substitute for medical advice, 
                we strive to provide reliable information that helps users better understand heart anatomy and function.
              </p>
            </AnimatedSection>
            <AnimatedSection animation="slideLeft" delay={400} className="md:w-1/2 flex justify-center">
              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-8 rounded-r-lg max-w-md">
                <h4 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-4">
                  Educational Disclaimer
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  HHS Heart is an educational resource only and is not intended to provide medical advice, 
                  diagnosis, or treatment. The information provided on this website should not be used as a 
                  substitute for professional medical care or advice.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ApproachSection; 