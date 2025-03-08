'use client';

import React, { useState } from 'react';
import Button from '@/components/common/Button';

interface CalorieResult {
  bmr: number;
  maintenance: number;
  weightLoss: number;
  weightGain: number;
  protein: { min: number; max: number };
}

const CalorieCalculator: React.FC = () => {
  const [age, setAge] = useState<number>(30);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);
  const [activityLevel, setActivityLevel] = useState<string>('moderate');
  const [result, setResult] = useState<CalorieResult | null>(null);
  
  const activityLevels = [
    { value: 'sedentary', label: 'Sedentary (little or no exercise)', multiplier: 1.2 },
    { value: 'light', label: 'Lightly active (light exercise 1-3 days/week)', multiplier: 1.375 },
    { value: 'moderate', label: 'Moderately active (moderate exercise 3-5 days/week)', multiplier: 1.55 },
    { value: 'active', label: 'Very active (hard exercise 6-7 days/week)', multiplier: 1.725 },
    { value: 'veryActive', label: 'Extra active (very hard exercise & physical job)', multiplier: 1.9 }
  ];
  
  const getActivityMultiplier = (level: string): number => {
    const activity = activityLevels.find(a => a.value === level);
    return activity ? activity.multiplier : 1.55; // Default to moderate if not found
  };
  
  const calculateCalories = () => {
    // Calculate BMR using the Mifflin-St Jeor Equation
    let bmr = 0;
    
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    
    // Round BMR to nearest whole number
    bmr = Math.round(bmr);
    
    // Calculate daily calorie needs based on activity level
    const activityMultiplier = getActivityMultiplier(activityLevel);
    const maintenance = Math.round(bmr * activityMultiplier);
    
    // Calculate calories for weight loss (20% deficit) and weight gain (15% surplus)
    const weightLoss = Math.round(maintenance * 0.8);
    const weightGain = Math.round(maintenance * 1.15);
    
    // Calculate protein requirements (0.8g to 1.6g per kg of body weight)
    const proteinMin = Math.round(weight * 0.8);
    const proteinMax = Math.round(weight * 1.6);
    
    setResult({
      bmr,
      maintenance,
      weightLoss,
      weightGain,
      protein: { min: proteinMin, max: proteinMax }
    });
  };
  
  const resetForm = () => {
    setAge(30);
    setGender('male');
    setWeight(70);
    setHeight(170);
    setActivityLevel('moderate');
    setResult(null);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Daily Calorie Requirements Calculator
      </h2>
      
      <div className="mb-8">
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Calculate your daily calorie needs based on your age, gender, weight, height, and activity level.
          This calculator uses the Mifflin-St Jeor Equation to estimate your basal metabolic rate (BMR) and daily calorie requirements.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="age">
            Age: {age} years
          </label>
          <input
            type="range"
            id="age"
            min="15"
            max="80"
            step="1"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>15 years</span>
            <span>80 years</span>
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Gender
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio h-5 w-5 text-red-600"
                name="gender"
                value="male"
                checked={gender === 'male'}
                onChange={() => setGender('male')}
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Male</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio h-5 w-5 text-red-600"
                name="gender"
                value="female"
                checked={gender === 'female'}
                onChange={() => setGender('female')}
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Female</span>
            </label>
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="weight">
            Weight: {weight} kg
          </label>
          <input
            type="range"
            id="weight"
            min="40"
            max="150"
            step="1"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>40 kg</span>
            <span>150 kg</span>
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="height">
            Height: {height} cm
          </label>
          <input
            type="range"
            id="height"
            min="140"
            max="220"
            step="1"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>140 cm</span>
            <span>220 cm</span>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Activity Level
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-700 dark:text-gray-300"
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
          >
            {activityLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="flex justify-end mb-8">
        <Button variant="secondary" onClick={resetForm} className="mr-4">
          Reset
        </Button>
        <Button onClick={calculateCalories}>
          Calculate Calories
        </Button>
      </div>
      
      {result && (
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Your Daily Calorie Requirements
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Basal Metabolic Rate (BMR)</h4>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{result.bmr} calories/day</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                This is the number of calories your body needs at complete rest to maintain vital functions.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Maintenance Calories</h4>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{result.maintenance} calories/day</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                This is the number of calories you need to maintain your current weight.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Weight Loss</h4>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{result.weightLoss} calories/day</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                A moderate calorie deficit for gradual, sustainable weight loss (approximately 0.5kg per week).
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Weight Gain</h4>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{result.weightGain} calories/day</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                A moderate calorie surplus for muscle building and weight gain.
              </p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Protein Recommendation</h4>
            <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
              {result.protein.min} - {result.protein.max} grams/day
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Protein intake recommendation based on your body weight. Higher amounts are beneficial for muscle building and recovery.
            </p>
          </div>
          
          <div className="mt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <strong>Note:</strong> These calculations provide estimates based on population averages. 
              Individual needs may vary based on factors such as body composition, genetics, and specific health conditions. 
              For personalized nutrition advice, consult with a registered dietitian or healthcare provider.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalorieCalculator; 