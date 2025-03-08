'use client';

import React from 'react';
import CalorieCalculator from '@/components/tools/calorie/CalorieCalculator';
import Link from 'next/link';
import Button from '@/components/common/Button';

export default function CalorieCalculatorPage() {
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
          Daily Calorie Requirements Calculator
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Estimate your daily calorie needs based on age, weight, height, gender, and activity level, with protein intake guidelines.
        </p>
        
        <CalorieCalculator />
      </div>
    </div>
  );
} 