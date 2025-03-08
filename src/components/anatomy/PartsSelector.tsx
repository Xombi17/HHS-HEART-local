'use client';

import React from 'react';
import { HeartPart } from './AnatomyModel';

interface PartsSelectorProps {
  selectedPart: HeartPart;
  onSelectPart: (part: HeartPart) => void;
}

// Define heart parts categories and their parts
const heartPartsCategories = [
  {
    name: 'Chambers',
    parts: [
      { id: 'leftAtrium', name: 'Left Atrium' },
      { id: 'rightAtrium', name: 'Right Atrium' },
      { id: 'leftVentricle', name: 'Left Ventricle' },
      { id: 'rightVentricle', name: 'Right Ventricle' }
    ]
  },
  {
    name: 'Vessels',
    parts: [
      { id: 'aorta', name: 'Aorta' },
      { id: 'pulmonaryArtery', name: 'Pulmonary Artery' }
    ]
  },
  {
    name: 'Valves',
    parts: [
      { id: 'mitralValve', name: 'Mitral Valve' },
      { id: 'tricuspidValve', name: 'Tricuspid Valve' },
      { id: 'pulmonaryValve', name: 'Pulmonary Valve' },
      { id: 'aorticValve', name: 'Aortic Valve' }
    ]
  }
];

const PartsSelector: React.FC<PartsSelectorProps> = ({ selectedPart, onSelectPart }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Heart Structures
      </h2>
      
      <button 
        className={`w-full text-left mb-4 p-2 rounded-md ${
          selectedPart === 'none' 
            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 font-medium' 
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
        onClick={() => onSelectPart('none')}
      >
        Overview (Whole Heart)
      </button>
      
      {heartPartsCategories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {category.name}
          </h3>
          <div className="space-y-1">
            {category.parts.map((part) => (
              <button 
                key={part.id} 
                className={`w-full text-left p-2 rounded-md ${
                  selectedPart === part.id 
                    ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 font-medium' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => onSelectPart(part.id as HeartPart)}
              >
                {part.name}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PartsSelector; 