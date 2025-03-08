'use client';

import React from 'react';
import ParallaxSection from '../common/ParallaxSection';
import Button from '../common/Button';
import Link from 'next/link';

const ParallaxAboutSection = () => {
  return (
    <ParallaxSection 
      imageSrc="/images/heart-bg.svg" 
      height="500px"
      strength={400}
      overlayOpacity={0.3}
    >
      <div className="text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Dedicated to Heart Education
        </h2>
        <p className="text-xl max-w-3xl mx-auto mb-8">
          Our team of educators, medical professionals, and developers are committed to making heart anatomy and health accessible to everyone.
        </p>
        <Link href="/about#team-section">
          <Button size="lg">
            Meet Our Team
          </Button>
        </Link>
      </div>
    </ParallaxSection>
  );
};

export default ParallaxAboutSection; 