'use client';

import React from 'react';
import ExplorerView from '@/components/anatomy/ExplorerView';

export default function AnatomyPage() {
  return (
    <>
      <div className="bg-gradient-to-b from-red-50 to-white dark:from-gray-900 dark:to-black py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Heart Anatomy Explorer
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Explore the intricate structures of the human heart through our interactive 3D model. 
              Learn about chambers, valves, vessels, and how they work together to keep your body functioning.
            </p>
          </div>
        </div>
      </div>
      
      <ExplorerView />
    </>
  );
} 