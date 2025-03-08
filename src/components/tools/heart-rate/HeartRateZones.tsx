'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/common/Button';

interface HeartRateZone {
  name: string;
  min: number;
  max: number;
  description: string;
  color: string;
}

const HeartRateZones: React.FC = () => {
  const [age, setAge] = useState<number>(30);
  const [restingHeartRate, setRestingHeartRate] = useState<number>(60);
  const [zones, setZones] = useState<HeartRateZone[]>([]);
  
  // Calculate heart rate zones when age or resting heart rate changes
  useEffect(() => {
    calculateZones();
  }, [age, restingHeartRate]);
  
  // Calculate heart rate zones using the Karvonen formula
  const calculateZones = () => {
    // Maximum heart rate using the formula: 220 - age
    const maxHeartRate = 220 - age;
    
    // Heart rate reserve (HRR) = Max HR - Resting HR
    const heartRateReserve = maxHeartRate - restingHeartRate;
    
    // Calculate zones using the Karvonen formula: 
    // Target HR = ((Max HR - Resting HR) × %Intensity) + Resting HR
    const calculateTargetHR = (intensity: number) => {
      return Math.round((heartRateReserve * intensity) + restingHeartRate);
    };
    
    const newZones: HeartRateZone[] = [
      {
        name: 'Zone 1: Recovery',
        min: restingHeartRate,
        max: calculateTargetHR(0.6),
        description: 'Very light intensity. Ideal for warm-up, cool-down, and recovery training.',
        color: 'bg-blue-500'
      },
      {
        name: 'Zone 2: Fat Burning',
        min: calculateTargetHR(0.6),
        max: calculateTargetHR(0.7),
        description: 'Light intensity. Improves basic endurance and fat burning. Good for long, easy training sessions.',
        color: 'bg-green-500'
      },
      {
        name: 'Zone 3: Aerobic',
        min: calculateTargetHR(0.7),
        max: calculateTargetHR(0.8),
        description: 'Moderate intensity. Improves aerobic fitness and efficiency. Challenging but sustainable pace.',
        color: 'bg-yellow-500'
      },
      {
        name: 'Zone 4: Anaerobic',
        min: calculateTargetHR(0.8),
        max: calculateTargetHR(0.9),
        description: 'High intensity. Improves anaerobic threshold and performance. Challenging and not sustainable for long periods.',
        color: 'bg-orange-500'
      },
      {
        name: 'Zone 5: Maximum',
        min: calculateTargetHR(0.9),
        max: maxHeartRate,
        description: 'Maximum intensity. Improves power and maximum performance. Very challenging and sustainable only for short periods.',
        color: 'bg-red-500'
      }
    ];
    
    setZones(newZones);
  };
  
  const resetForm = () => {
    setAge(30);
    setRestingHeartRate(60);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Heart Rate Zones Calculator
      </h2>
      
      <div className="mb-8">
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Calculate your personalized heart rate training zones based on your age and resting heart rate.
          These zones can help you optimize your workouts for different fitness goals.
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
          <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="restingHeartRate">
            Resting Heart Rate: {restingHeartRate} BPM
          </label>
          <input
            type="range"
            id="restingHeartRate"
            min="40"
            max="100"
            step="1"
            value={restingHeartRate}
            onChange={(e) => setRestingHeartRate(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>40 BPM</span>
            <span>100 BPM</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end mb-8">
        <Button variant="secondary" onClick={resetForm} className="mr-4">
          Reset
        </Button>
        <Button onClick={calculateZones}>
          Calculate Zones
        </Button>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Your Heart Rate Zones
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Maximum Heart Rate: <span className="font-bold">{220 - age} BPM</span>
        </p>
        
        <div className="space-y-4">
          {zones.map((zone, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-gray-900 dark:text-white">{zone.name}</h4>
                <span className="font-bold text-gray-900 dark:text-white">
                  {zone.min} - {zone.max} BPM
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mb-2">
                <div 
                  className={`h-2.5 rounded-full ${zone.color}`} 
                  style={{ 
                    width: `${Math.min(100, (zone.max - zone.min) / (220 - age) * 100)}%`,
                    marginLeft: `${(zone.min - restingHeartRate) / (220 - age) * 100}%`
                  }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {zone.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <strong>Note:</strong> These heart rate zones are calculated using the Karvonen formula, which takes into account your resting heart rate for more personalized results. 
            Always consult with a healthcare or fitness professional before starting a new exercise program.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeartRateZones; 