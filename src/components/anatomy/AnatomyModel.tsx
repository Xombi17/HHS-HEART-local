'use client';

import React from 'react';
import Image from 'next/image';

// Define heart parts that can be highlighted
export type HeartPart = 
  | 'leftAtrium' 
  | 'rightAtrium' 
  | 'leftVentricle' 
  | 'rightVentricle' 
  | 'aorta' 
  | 'pulmonaryArtery' 
  | 'mitralValve' 
  | 'tricuspidValve' 
  | 'pulmonaryValve' 
  | 'aorticValve'
  | 'none';

interface HeartDiagramProps {
  selectedPart: HeartPart;
  onPartSelect: (part: HeartPart) => void;
}

const HeartDiagram: React.FC<HeartDiagramProps> = ({ selectedPart, onPartSelect }) => {
  // Map of heart parts to their positions in the image (for highlighting)
  // These would be the coordinates for clickable areas
  const partPositions = {
    leftAtrium: { top: '25%', left: '55%', width: '20%', height: '15%' },
    rightAtrium: { top: '25%', left: '25%', width: '20%', height: '15%' },
    leftVentricle: { top: '45%', left: '55%', width: '20%', height: '25%' },
    rightVentricle: { top: '45%', left: '25%', width: '20%', height: '25%' },
    aorta: { top: '15%', left: '60%', width: '15%', height: '15%' },
    pulmonaryArtery: { top: '15%', left: '25%', width: '15%', height: '15%' },
    mitralValve: { top: '40%', left: '50%', width: '10%', height: '5%' },
    tricuspidValve: { top: '40%', left: '35%', width: '10%', height: '5%' },
    pulmonaryValve: { top: '30%', left: '25%', width: '10%', height: '5%' },
    aorticValve: { top: '30%', left: '60%', width: '10%', height: '5%' }
  };

  return (
    <div className="w-full aspect-square max-w-2xl mx-auto relative">
      {/* Base heart image */}
      <div className="relative w-full h-full">
        <Image 
          src="/images/heart-diagram.svg" 
          alt="Heart Diagram" 
          width={800}
          height={800}
          priority
        />
        
        {/* Clickable areas for each part */}
        {Object.entries(partPositions).map(([part, position]) => (
          <div
            key={part}
            className={`absolute cursor-pointer ${
              selectedPart === part 
                ? 'border-2 border-red-500 bg-red-200 bg-opacity-40' 
                : 'border border-transparent hover:border-red-300 hover:bg-red-100 hover:bg-opacity-30'
            }`}
            style={{
              top: position.top,
              left: position.left,
              width: position.width,
              height: position.height,
              borderRadius: '4px',
              transition: 'all 0.2s ease'
            }}
            onClick={() => onPartSelect(part as HeartPart)}
            title={part.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
          />
        ))}
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        Click on different parts of the heart to learn more about them
      </div>
    </div>
  );
};

export default HeartDiagram; 