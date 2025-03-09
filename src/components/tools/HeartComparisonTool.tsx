'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Tab } from '@headlessui/react';
import HeartModelComparison from './HeartModelComparison';
import { LazyComponent } from '@/utils/lazyLoad';
import { ErrorBoundary } from 'react-error-boundary';

type HeartCondition = 'healthy' | 'coronary-artery-disease' | 'heart-failure' | 'valve-disease' | 'arrhythmia';

// Add this component for error handling
const HeartErrorFallback = ({ condition, error, resetErrorBoundary }: 
  { condition: string, error: Error, resetErrorBoundary: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-800/20 rounded-lg p-4">
      <div className="text-red-500 mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-red-600 dark:text-red-500 mb-2">Error Loading Heart Model</h3>
      <p className="text-center text-gray-700 dark:text-gray-300">
        We couldn't load the 3D heart model for {condition}. 
        This could be due to WebGL not being supported or enabled in your browser.
      </p>
      <button 
        onClick={resetErrorBoundary}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
};

interface ConditionInfo {
  title: string;
  description: string;
  symptoms: string[];
  affectedAreas: string[];
  visualChanges: {
    size?: 'normal' | 'enlarged' | 'reduced';
    animation?: 'normal' | 'irregular' | 'slow' | 'fast';
    highlighted?: string[];
  };
}

const CONDITIONS: Record<HeartCondition, ConditionInfo> = {
  'healthy': {
    title: 'Healthy Heart',
    description: 'A normal heart pumps blood efficiently through the body. The chambers contract in a coordinated manner, and valves open and close properly to ensure one-way blood flow.',
    symptoms: ['Normal energy levels', 'Regular heartbeat', 'Good exercise tolerance', 'Normal blood pressure'],
    affectedAreas: [],
    visualChanges: {
      size: 'normal',
      animation: 'normal',
      highlighted: []
    }
  },
  'coronary-artery-disease': {
    title: 'Coronary Artery Disease',
    description: 'Narrowed or blocked coronary arteries reduce blood flow to the heart muscle. This limits oxygen supply and can cause chest pain (angina) or heart attack (myocardial infarction).',
    symptoms: ['Chest pain or pressure (angina)', 'Shortness of breath', 'Pain in the neck, jaw, or arm', 'Fatigue during activity'],
    affectedAreas: ['Left coronary artery', 'Right coronary artery', 'Heart muscle (myocardium)'],
    visualChanges: {
      size: 'normal',
      animation: 'normal',
      highlighted: ['coronary arteries']
    }
  },
  'heart-failure': {
    title: 'Heart Failure',
    description: 'The heart cannot pump blood efficiently enough to meet the body\'s needs. This can be due to weakened heart muscle, stiffened heart muscle, or valve problems.',
    symptoms: ['Shortness of breath', 'Fatigue', 'Swelling in legs and ankles', 'Rapid or irregular heartbeat'],
    affectedAreas: ['Left ventricle', 'Right ventricle', 'Both ventricles (in advanced cases)'],
    visualChanges: {
      size: 'enlarged',
      animation: 'slow',
      highlighted: ['ventricles']
    }
  },
  'valve-disease': {
    title: 'Heart Valve Disease',
    description: 'Heart valves don\'t open fully (stenosis) or don\'t close properly (regurgitation). This disrupts blood flow and can cause blood to flow backward or force the heart to work harder.',
    symptoms: ['Heart murmur', 'Fatigue', 'Shortness of breath', 'Swelling in ankles and feet'],
    affectedAreas: ['Mitral valve', 'Aortic valve', 'Tricuspid valve', 'Pulmonary valve'],
    visualChanges: {
      size: 'normal',
      animation: 'irregular',
      highlighted: ['valves']
    }
  },
  'arrhythmia': {
    title: 'Arrhythmia',
    description: 'Abnormal heart rhythm that can cause the heart to beat too fast, too slow, or irregularly. This affects how efficiently the heart pumps blood.',
    symptoms: ['Palpitations', 'Dizziness', 'Fainting', 'Chest discomfort'],
    affectedAreas: ['SA node', 'AV node', 'Electrical conduction system'],
    visualChanges: {
      size: 'normal',
      animation: 'irregular',
      highlighted: ['conduction system']
    }
  }
};

const HeartComparisonTool: React.FC = () => {
  const [selectedCondition, setSelectedCondition] = useState<HeartCondition>('healthy');
  const [showingHealthy, setShowingHealthy] = useState(true);
  const [animateTransition, setAnimateTransition] = useState(false);
  
  // Handle switching between conditions with animation
  const handleConditionChange = (condition: HeartCondition) => {
    if (condition === selectedCondition) return;
    
    setAnimateTransition(true);
    setTimeout(() => {
      setSelectedCondition(condition);
      setAnimateTransition(false);
    }, 300);
  };
  
  // Toggle between healthy and condition view
  const toggleHeartView = () => {
    setAnimateTransition(true);
    setTimeout(() => {
      setShowingHealthy(!showingHealthy);
      setAnimateTransition(false);
    }, 300);
  };
  
  // Get current condition data
  const currentCondition = CONDITIONS[selectedCondition];
  const displayCondition = showingHealthy ? CONDITIONS['healthy'] : currentCondition;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8">
      {/* Tab selection for conditions */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <Tab.Group onChange={(index) => handleConditionChange(Object.keys(CONDITIONS)[index] as HeartCondition)}>
          <Tab.List className="flex overflow-x-auto">
            {Object.entries(CONDITIONS).map(([key, condition]) => (
              <Tab 
                key={key}
                className={({ selected }) => 
                  `px-4 py-2 text-sm font-medium border-b-2 focus:outline-none whitespace-nowrap
                  ${selected 
                    ? 'text-red-600 dark:text-red-500 border-red-600 dark:border-red-500' 
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 border-transparent'
                  }`
                }
              >
                {condition.title}
              </Tab>
            ))}
          </Tab.List>
        </Tab.Group>
      </div>
      
      {/* 3D Heart Comparison Models */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div className="relative min-h-[400px] bg-transparent" key={`heart-model-${displayCondition.title}`}>
          <ErrorBoundary 
            fallbackRender={({ error, resetErrorBoundary }) => (
              <HeartErrorFallback 
                condition={displayCondition.title} 
                error={error} 
                resetErrorBoundary={resetErrorBoundary} 
              />
            )}
          >
            <HeartModelComparison 
              condition={displayCondition.title}
              animation={displayCondition.visualChanges.animation || 'normal'}
              size={displayCondition.visualChanges.size}
              highlighted={displayCondition.visualChanges.highlighted || []}
              transitioning={animateTransition}
              isHealthy={showingHealthy || selectedCondition === 'healthy'}
            />
          </ErrorBoundary>
        </div>
        
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {displayCondition.title}
            </h2>
            <button
              onClick={toggleHeartView}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
            >
              Show {showingHealthy ? currentCondition.title : 'Healthy Heart'}
            </button>
          </div>
          
          <div className="mb-4">
            <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-2">Description</h3>
            <p className="text-gray-700 dark:text-gray-300">
              {displayCondition.description}
            </p>
          </div>
          
          {displayCondition.affectedAreas.length > 0 && (
            <div className="mb-4">
              <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-2">Affected Areas</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                {displayCondition.affectedAreas.map((area, i) => (
                  <li key={i}>{area}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="mb-4">
            <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-2">Symptoms</h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              {displayCondition.symptoms.map((symptom, i) => (
                <li key={i}>{symptom}</li>
              ))}
            </ul>
          </div>
          
          {!showingHealthy && (
            <div className="mt-auto">
              <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400 p-4 rounded-md">
                <h3 className="font-semibold mb-2">How It Differs From A Healthy Heart</h3>
                <p className="text-sm">
                  {selectedCondition === 'coronary-artery-disease' && 
                    'Narrowed coronary arteries restrict blood flow to the heart muscle, leading to chest pain and an increased risk of heart attack.'}
                  {selectedCondition === 'heart-failure' && 
                    'The heart becomes enlarged and weakened, pumping less efficiently. This causes less blood to circulate through the body.'}
                  {selectedCondition === 'valve-disease' && 
                    'Heart valves don\'t open or close properly, disrupting blood flow through the heart chambers and potentially causing blood to flow backward.'}
                  {selectedCondition === 'arrhythmia' && 
                    'The heart\'s electrical system doesn\'t function properly, causing the heart to beat too fast, too slow, or irregularly.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeartComparisonTool; 