'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import BMICalculator from './bmi/BMICalculator';
import HeartRateSimulator from './heart-rate/HeartRateSimulator';
import HeartRateZones from './heart-rate/HeartRateZones';
import CalorieCalculator from './calorie/CalorieCalculator';
import Button from '@/components/common/Button';

type ToolType = 'bmi' | 'heartRateSimulator' | 'heartRateZones' | 'calorieCalculator';

const ToolsContainer: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolType>('bmi');
  
  const tools = [
    { 
      id: 'bmi', 
      name: 'BMI Calculator', 
      description: 'Calculate your Body Mass Index based on height and weight',
      link: '/tools/bmi-calculator'
    },
    { 
      id: 'heartRateSimulator', 
      name: 'Heart Rate Simulator', 
      description: 'Visualize different heart rates and understand what they mean',
      link: '/tools/heart-rate-simulator'
    },
    { 
      id: 'heartRateZones', 
      name: 'Heart Rate Zones', 
      description: 'Calculate your optimal heart rate zones for training',
      link: '/tools/heart-rate-zones'
    },
    { 
      id: 'calorieCalculator', 
      name: 'Calorie Calculator', 
      description: 'Estimate your daily calorie and protein requirements',
      link: '/tools/calorie-calculator'
    }
  ];
  
  const renderTool = () => {
    switch (activeTool) {
      case 'bmi':
        return <BMICalculator />;
      case 'heartRateSimulator':
        return <HeartRateSimulator />;
      case 'heartRateZones':
        return <HeartRateZones />;
      case 'calorieCalculator':
        return <CalorieCalculator />;
      default:
        return <BMICalculator />;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Interactive Health Tools
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Explore our collection of interactive tools designed to help you understand heart function, 
          fitness, and health metrics. These practical calculators provide personalized insights based on your data.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className={`p-4 rounded-lg text-left transition-colors ${
                activeTool === tool.id
                  ? 'bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500'
                  : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <button
                className="w-full text-left mb-3"
                onClick={() => setActiveTool(tool.id as ToolType)}
              >
                <h3 className={`font-semibold mb-1 ${
                  activeTool === tool.id
                    ? 'text-red-700 dark:text-red-400'
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {tool.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {tool.description}
                </p>
              </button>
              <Link href={tool.link}>
                <Button variant="outline" size="sm" className="w-full mt-2">
                  Open Full Page
                </Button>
              </Link>
            </div>
          ))}
        </div>
        
        {renderTool()}
      </div>
    </div>
  );
};

export default ToolsContainer; 