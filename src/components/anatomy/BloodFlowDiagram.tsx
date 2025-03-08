'use client';

import React from 'react';
import { HeartPart } from './AnatomyModel';

interface BloodFlowDiagramProps {
  selectedPart: HeartPart;
}

const BloodFlowDiagram: React.FC<BloodFlowDiagramProps> = ({ selectedPart }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Blood Flow
      </h2>
      
      <div className="relative w-full h-[300px] bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden">
        {/* This is a simplified diagram - in a real implementation, you would use SVG or Canvas to draw a proper diagram */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <svg width="280" height="240" viewBox="0 0 280 240" className="mx-auto">
              {/* Lungs */}
              <ellipse cx="50" cy="60" rx="40" ry="50" fill="#f0f0f0" stroke="#666" strokeWidth="1" />
              <ellipse cx="230" cy="60" rx="40" ry="50" fill="#f0f0f0" stroke="#666" strokeWidth="1" />
              <text x="50" y="60" textAnchor="middle" fill="#333" fontSize="12">Lungs</text>
              <text x="230" y="60" textAnchor="middle" fill="#333" fontSize="12">Lungs</text>
              
              {/* Heart chambers */}
              <rect 
                x="110" 
                y="40" 
                width="30" 
                height="40" 
                fill={selectedPart === 'rightAtrium' ? '#ffcccc' : '#eeeeee'} 
                stroke={selectedPart === 'rightAtrium' ? '#ff0000' : '#666'} 
                strokeWidth={selectedPart === 'rightAtrium' ? '2' : '1'} 
              />
              <text x="125" y="65" textAnchor="middle" fill="#333" fontSize="10">RA</text>
              
              <rect 
                x="140" 
                y="40" 
                width="30" 
                height="40" 
                fill={selectedPart === 'leftAtrium' ? '#ffcccc' : '#eeeeee'} 
                stroke={selectedPart === 'leftAtrium' ? '#ff0000' : '#666'} 
                strokeWidth={selectedPart === 'leftAtrium' ? '2' : '1'} 
              />
              <text x="155" y="65" textAnchor="middle" fill="#333" fontSize="10">LA</text>
              
              <rect 
                x="110" 
                y="90" 
                width="30" 
                height="60" 
                fill={selectedPart === 'rightVentricle' ? '#ffcccc' : '#eeeeee'} 
                stroke={selectedPart === 'rightVentricle' ? '#ff0000' : '#666'} 
                strokeWidth={selectedPart === 'rightVentricle' ? '2' : '1'} 
              />
              <text x="125" y="125" textAnchor="middle" fill="#333" fontSize="10">RV</text>
              
              <rect 
                x="140" 
                y="90" 
                width="30" 
                height="60" 
                fill={selectedPart === 'leftVentricle' ? '#ffcccc' : '#eeeeee'} 
                stroke={selectedPart === 'leftVentricle' ? '#ff0000' : '#666'} 
                strokeWidth={selectedPart === 'leftVentricle' ? '2' : '1'} 
              />
              <text x="155" y="125" textAnchor="middle" fill="#333" fontSize="10">LV</text>
              
              {/* Valves */}
              <line 
                x1="125" 
                y1="85" 
                x2="125" 
                y2="85" 
                stroke={selectedPart === 'tricuspidValve' ? '#ff0000' : '#666'} 
                strokeWidth={selectedPart === 'tricuspidValve' ? '4' : '2'} 
              />
              <line 
                x1="155" 
                y1="85" 
                x2="155" 
                y2="85" 
                stroke={selectedPart === 'mitralValve' ? '#ff0000' : '#666'} 
                strokeWidth={selectedPart === 'mitralValve' ? '4' : '2'} 
              />
              
              {/* Vessels */}
              <path 
                d="M 110 60 C 90 60, 90 60, 90 60" 
                stroke={selectedPart === 'pulmonaryArtery' ? '#ff0000' : '#666'} 
                strokeWidth={selectedPart === 'pulmonaryArtery' ? '3' : '2'} 
                fill="none" 
              />
              <path 
                d="M 170 60 C 190 60, 190 60, 190 60" 
                stroke="#666" 
                strokeWidth="2" 
                fill="none" 
              />
              <path 
                d="M 125 150 C 125 180, 140 200, 155 180" 
                stroke="#666" 
                strokeWidth="2" 
                fill="none" 
              />
              <path 
                d="M 155 150 C 155 170, 170 180, 190 160" 
                stroke={selectedPart === 'aorta' ? '#ff0000' : '#666'} 
                strokeWidth={selectedPart === 'aorta' ? '3' : '2'} 
                fill="none" 
              />
              
              {/* Blood flow arrows */}
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#ff0000" />
                </marker>
              </defs>
              
              {/* Pulmonary circulation */}
              <path 
                d="M 90 50 C 70 40, 50 30, 30 50" 
                stroke="#ff0000" 
                strokeWidth="2" 
                fill="none" 
                markerEnd="url(#arrowhead)" 
              />
              <path 
                d="M 70 70 C 90 80, 100 90, 110 70" 
                stroke="#ff0000" 
                strokeWidth="2" 
                fill="none" 
                markerEnd="url(#arrowhead)" 
              />
              
              {/* Systemic circulation */}
              <path 
                d="M 190 70 C 210 80, 220 90, 230 70" 
                stroke="#0000ff" 
                strokeWidth="2" 
                fill="none" 
                markerEnd="url(#arrowhead)" 
              />
              <path 
                d="M 250 50 C 230 40, 210 30, 190 50" 
                stroke="#0000ff" 
                strokeWidth="2" 
                fill="none" 
                markerEnd="url(#arrowhead)" 
              />
              
              {/* Body */}
              <ellipse cx="140" cy="210" rx="60" ry="20" fill="#f0f0f0" stroke="#666" strokeWidth="1" />
              <text x="140" y="215" textAnchor="middle" fill="#333" fontSize="12">Body</text>
              
              {/* Body circulation */}
              <path 
                d="M 190 160 C 200 180, 180 200, 160 210" 
                stroke="#0000ff" 
                strokeWidth="2" 
                fill="none" 
                markerEnd="url(#arrowhead)" 
              />
              <path 
                d="M 120 210 C 100 200, 80 180, 90 150" 
                stroke="#ff0000" 
                strokeWidth="2" 
                fill="none" 
                markerEnd="url(#arrowhead)" 
              />
            </svg>
            
            <div className="mt-4 flex justify-center space-x-6">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-600 rounded-full mr-2"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Deoxygenated Blood</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-600 rounded-full mr-2"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Oxygenated Blood</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Blood Flow Path
        </h3>
        <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
          <li>Deoxygenated blood enters the <strong>right atrium</strong> from the body</li>
          <li>Blood passes through the <strong>tricuspid valve</strong> to the <strong>right ventricle</strong></li>
          <li>The <strong>right ventricle</strong> pumps blood through the <strong>pulmonary valve</strong> to the <strong>pulmonary artery</strong></li>
          <li>Blood travels to the <strong>lungs</strong> where it picks up oxygen</li>
          <li>Oxygenated blood returns to the <strong>left atrium</strong> via the pulmonary veins</li>
          <li>Blood passes through the <strong>mitral valve</strong> to the <strong>left ventricle</strong></li>
          <li>The <strong>left ventricle</strong> pumps blood through the <strong>aortic valve</strong> to the <strong>aorta</strong></li>
          <li>Blood is distributed to the body, delivering oxygen to tissues</li>
          <li>Deoxygenated blood returns to the <strong>right atrium</strong>, completing the cycle</li>
        </ol>
      </div>
    </div>
  );
};

export default BloodFlowDiagram; 