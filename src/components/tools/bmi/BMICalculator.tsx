'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/common/Button';

interface BMIResult {
  bmi: number;
  category: string;
  description: string;
  color: string;
}

const BMICalculator: React.FC = () => {
  const [height, setHeight] = useState<number>(170);
  const [weight, setWeight] = useState<number>(70);
  const [result, setResult] = useState<BMIResult | null>(null);

  // Calculate BMI when height or weight changes
  useEffect(() => {
    calculateBMI();
  }, [height, weight]);

  const calculateBMI = () => {
    if (height <= 0 || weight <= 0) {
      setResult(null);
      return;
    }

    // BMI formula: weight (kg) / (height (m))^2
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const roundedBMI = Math.round(bmi * 10) / 10;

    let category = '';
    let description = '';
    let color = '';

    // BMI Categories
    if (bmi < 18.5) {
      category = 'Underweight';
      description = 'You may need to gain some weight. Consult with a healthcare professional for advice.';
      color = 'text-blue-600 dark:text-blue-400';
    } else if (bmi >= 18.5 && bmi < 25) {
      category = 'Normal weight';
      description = 'Your weight is within the healthy range for your height.';
      color = 'text-green-600 dark:text-green-400';
    } else if (bmi >= 25 && bmi < 30) {
      category = 'Overweight';
      description = 'You may benefit from losing some weight. Consider healthy eating and regular physical activity.';
      color = 'text-yellow-600 dark:text-yellow-400';
    } else {
      category = 'Obesity';
      description = 'For health reasons, it is recommended to reduce your weight. Consult with a healthcare professional.';
      color = 'text-red-600 dark:text-red-400';
    }

    setResult({
      bmi: roundedBMI,
      category,
      description,
      color
    });
  };

  const resetForm = () => {
    setHeight(170);
    setWeight(70);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        BMI Calculator
      </h2>
      
      <div className="mb-8">
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Body Mass Index (BMI) is a measure of body fat based on height and weight that applies to adult men and women.
          Enter your height and weight below to calculate your BMI.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="height">
            Height (cm): {height} cm
          </label>
          <input
            type="range"
            id="height"
            min="100"
            max="250"
            step="1"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>100 cm</span>
            <span>250 cm</span>
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="weight">
            Weight (kg): {weight} kg
          </label>
          <input
            type="range"
            id="weight"
            min="30"
            max="200"
            step="1"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>30 kg</span>
            <span>200 kg</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end mb-8">
        <Button variant="secondary" onClick={resetForm} className="mr-4">
          Reset
        </Button>
        <Button onClick={calculateBMI}>
          Calculate BMI
        </Button>
      </div>
      
      {result && (
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Your Results
          </h3>
          
          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-700 dark:text-gray-300">Your BMI is:</p>
              <p className={`text-4xl font-bold ${result.color}`}>
                {result.bmi}
              </p>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-700 dark:text-gray-300">Category:</p>
              <p className={`text-2xl font-semibold ${result.color}`}>
                {result.category}
              </p>
            </div>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300">
            {result.description}
          </p>
          
          <div className="mt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <strong>Note:</strong> BMI is a screening tool, not a diagnostic tool. 
              Factors such as muscle mass, age, sex, ethnicity, and body fat distribution are not accounted for in BMI calculations.
              Consult with a healthcare provider for a more comprehensive health assessment.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BMICalculator; 