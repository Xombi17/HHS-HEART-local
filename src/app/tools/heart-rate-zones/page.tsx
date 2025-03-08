'use client';

import React from 'react';
import HeartRateZones from '@/components/tools/heart-rate/HeartRateZones';
import Link from 'next/link';
import Button from '@/components/common/Button';

export default function HeartRateZonesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/tools">
            <Button variant="secondary" size="sm">
              <span className="mr-2">←</span> Back to Tools
            </Button>
          </Link>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Heart Rate Zones Calculator
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Calculate your optimal training zones based on your age, including resting heart rate, fat burning, cardio enhancement, and peak performance thresholds.
        </p>
        
        <HeartRateZones />
      </div>
    </div>
  );
} 