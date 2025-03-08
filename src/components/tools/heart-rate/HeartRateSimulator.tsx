'use client';

import React, { useState, useEffect, useRef } from 'react';
import Button from '@/components/common/Button';

const HeartRateSimulator: React.FC = () => {
  const [heartRate, setHeartRate] = useState<number>(70);
  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  const heartRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  
  // Heart rate categories
  const getHeartRateCategory = (rate: number): { category: string; description: string; color: string } => {
    if (rate < 60) {
      return {
        category: 'Bradycardia',
        description: 'A resting heart rate below 60 BPM is considered bradycardia. This can be normal for athletes and physically fit individuals. However, it can also indicate a problem with the heart\'s electrical system.',
        color: 'text-blue-600 dark:text-blue-400'
      };
    } else if (rate >= 60 && rate <= 100) {
      return {
        category: 'Normal Resting Heart Rate',
        description: 'A normal resting heart rate for adults ranges from 60 to 100 beats per minute. A lower heart rate at rest generally implies more efficient heart function and better cardiovascular fitness.',
        color: 'text-green-600 dark:text-green-400'
      };
    } else if (rate > 100 && rate <= 170) {
      return {
        category: 'Tachycardia',
        description: 'A resting heart rate above 100 BPM is considered tachycardia. This is normal during exercise or stress, but at rest it may indicate an underlying condition.',
        color: 'text-yellow-600 dark:text-yellow-400'
      };
    } else {
      return {
        category: 'Extreme Tachycardia',
        description: 'Heart rates above 170 BPM at rest are extremely high and could indicate a serious medical condition. This would be normal only during intense exercise for healthy individuals.',
        color: 'text-red-600 dark:text-red-400'
      };
    }
  };
  
  const heartRateInfo = getHeartRateCategory(heartRate);
  
  // Animation timing based on heart rate
  const calculateAnimationDuration = (bpm: number): number => {
    // Convert BPM to milliseconds per beat
    return 60000 / bpm;
  };
  
  // Handle heart animation
  useEffect(() => {
    if (!heartRef.current) return;
    
    const heart = heartRef.current;
    const animationDuration = calculateAnimationDuration(heartRate);
    let startTime: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      // Reset animation cycle
      if (elapsed >= animationDuration) {
        startTime = timestamp;
        
        // Pulse effect
        heart.style.transform = 'scale(1.15)';
        setTimeout(() => {
          if (heart) heart.style.transform = 'scale(1)';
        }, animationDuration * 0.15);
      }
      
      if (isAnimating) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    if (isAnimating) {
      heart.style.transition = `transform ${animationDuration * 0.15}ms ease-in-out`;
      animationRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [heartRate, isAnimating]);
  
  // Toggle animation
  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Heart Rate Simulator
      </h2>
      
      <div className="mb-8">
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Visualize different heart rates and understand what they mean for your health.
          Use the slider to adjust the heart rate and see how the heart beats at different speeds.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="md:w-1/2">
          <div className="flex justify-center items-center h-64 bg-gray-50 dark:bg-gray-700 rounded-lg mb-4">
            <div 
              ref={heartRef} 
              className="relative w-32 h-32"
            >
              <svg 
                viewBox="0 0 32 32" 
                fill={heartRateInfo.color.includes('red') ? '#ef4444' : 
                      heartRateInfo.color.includes('yellow') ? '#eab308' : 
                      heartRateInfo.color.includes('green') ? '#22c55e' : 
                      '#3b82f6'}
              >
                <path d="M16,28.261c0,0-14-7.926-14-17.046c0-8.565,9.333-9.176,14-0.571c4.667-8.604,14-7.993,14,0.571
                  C30,20.335,16,28.261,16,28.261z" />
              </svg>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button 
              onClick={toggleAnimation}
              variant={isAnimating ? "secondary" : "primary"}
            >
              {isAnimating ? "Pause Animation" : "Start Animation"}
            </Button>
          </div>
        </div>
        
        <div className="md:w-1/2">
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="heartRate">
              Heart Rate: <span className="font-bold">{heartRate} BPM</span>
            </label>
            <input
              type="range"
              id="heartRate"
              min="40"
              max="220"
              step="1"
              value={heartRate}
              onChange={(e) => setHeartRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>40 BPM</span>
              <span>220 BPM</span>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className={`text-xl font-semibold mb-2 ${heartRateInfo.color}`}>
              {heartRateInfo.category}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              {heartRateInfo.description}
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Heart Rate Ranges
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">Resting Heart Rate</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
              <li>Athletes: 40-60 BPM</li>
              <li>Adults: 60-100 BPM</li>
              <li>Children (7-15 years): 70-100 BPM</li>
              <li>Infants: 100-160 BPM</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">Maximum Heart Rate</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              Estimated maximum heart rate: 220 - age
            </p>
            <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
              <li>20 years: ~200 BPM</li>
              <li>30 years: ~190 BPM</li>
              <li>40 years: ~180 BPM</li>
              <li>50 years: ~170 BPM</li>
              <li>60 years: ~160 BPM</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeartRateSimulator; 