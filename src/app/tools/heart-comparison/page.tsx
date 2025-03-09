'use client';

import React from 'react';
import HeartComparisonTool from '@/components/tools/HeartComparisonTool';

export default function HeartComparisonPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Heart Comparison Tool
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Compare a healthy heart with various heart conditions to understand how heart disease affects cardiac anatomy and function.
          Use the controls to switch between conditions and learn about their effects on heart structure and blood flow.
        </p>
        
        <HeartComparisonTool />
      </div>
    </div>
  );
} 