'use client';

import React, { useState } from 'react';
import { HeartPart } from './AnatomyModel';
import AnatomyDetails from './AnatomyDetails';
import PartsSelector from './PartsSelector';
import BloodFlowDiagram from './BloodFlowDiagram';

const ExplorerView: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<HeartPart>('none');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left sidebar - Parts selector */}
        <div className="lg:col-span-1">
          <PartsSelector 
            selectedPart={selectedPart} 
            onSelectPart={setSelectedPart} 
          />
        </div>
        
        {/* Main content - Details and blood flow */}
        <div className="lg:col-span-2">
          <AnatomyDetails selectedPart={selectedPart} />
          
          <div className="mt-8">
            <BloodFlowDiagram selectedPart={selectedPart} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorerView; 