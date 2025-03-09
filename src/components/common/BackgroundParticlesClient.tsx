'use client';

import dynamic from 'next/dynamic';
import React from 'react';

interface ParticleProps {
  density?: number;
  speed?: number;
  color?: string;
  className?: string;
}

// Dynamic import with ssr: false (safely done in a client component)
const DynamicBackgroundParticles = dynamic(
  () => import('./BackgroundParticles'),
  { ssr: false }
);

const BackgroundParticlesClient: React.FC<ParticleProps> = (props) => {
  return <DynamicBackgroundParticles {...props} />;
};

export default BackgroundParticlesClient; 