'use client';

import React from 'react';
import MissionSection from '@/components/about/MissionSection';
import ApproachSection from '@/components/about/ApproachSection';
import TeamSection from '@/components/about/TeamSection';
import ContactSection from '@/components/about/ContactSection';
import DisclaimerSection from '@/components/about/DisclaimerSection';

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-red-50 to-white dark:from-gray-900 dark:to-black">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About <span className="text-red-600 dark:text-red-500">HHS Heart</span>
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Learn about our mission to transform complex medical concepts into accessible learning experiences
            through interactive visualization and educational content.
          </p>
        </div>
      </section>
      
      {/* Mission Section */}
      <MissionSection />
      
      {/* Approach Section */}
      <ApproachSection />
      
      {/* Team Section */}
      <TeamSection />
      
      {/* Disclaimer Section */}
      <DisclaimerSection />
      
      {/* Contact Section */}
      <ContactSection />
    </>
  );
} 