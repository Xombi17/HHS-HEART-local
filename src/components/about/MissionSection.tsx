'use client';

import React from 'react';
import Image from 'next/image';
import AnimatedSection from '../common/AnimatedSection';

const MissionSection: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection animation="slideRight" className="order-2 lg:order-1">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              HHS Heart is an immersive educational platform dedicated to exploring the human heart through 
              interactive 3D visualization, practical tools, and engaging content. Our mission is to transform 
              complex medical concepts into accessible learning experiences for students, educators, healthcare 
              professionals, and curious minds.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              We believe that understanding the heart—its structure, function, and importance to overall health—should 
              be accessible to everyone. Through interactive technology and evidence-based information, we aim to 
              inspire curiosity and promote heart health awareness.
            </p>
            
            <div className="mt-10">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Our Values
              </h3>
              <ul className="space-y-6">
                <AnimatedSection animation="slideUp" delay={100} className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-4 mt-0.5">
                    <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong className="text-lg font-medium text-gray-900 dark:text-white block mb-1">Educational Excellence</strong>
                    We strive for scientific accuracy and engaging presentation.
                  </span>
                </AnimatedSection>
                <AnimatedSection animation="slideUp" delay={200} className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-4 mt-0.5">
                    <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong className="text-lg font-medium text-gray-900 dark:text-white block mb-1">Accessibility</strong>
                    We make complex medical information understandable for all.
                  </span>
                </AnimatedSection>
                <AnimatedSection animation="slideUp" delay={300} className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-4 mt-0.5">
                    <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong className="text-lg font-medium text-gray-900 dark:text-white block mb-1">Innovation</strong>
                    We leverage technology to create immersive learning experiences.
                  </span>
                </AnimatedSection>
                <AnimatedSection animation="slideUp" delay={400} className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-4 mt-0.5">
                    <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong className="text-lg font-medium text-gray-900 dark:text-white block mb-1">Community</strong>
                    We foster a collaborative environment for learning and sharing knowledge.
                  </span>
                </AnimatedSection>
              </ul>
            </div>
          </AnimatedSection>
          
          <AnimatedSection animation="slideLeft" className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-md h-[450px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/heart-illustration.svg"
                alt="Heart Illustration"
                fill
                className="object-contain"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default MissionSection; 