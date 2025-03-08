'use client';

import React from 'react';
import Image from 'next/image';
import { HeartPart } from './AnatomyModel';

// Heart part information data
const heartPartsInfo = {
  leftAtrium: {
    title: 'Left Atrium',
    description: 'The left atrium receives oxygenated blood from the lungs via the pulmonary veins. It then pumps this blood into the left ventricle through the mitral valve when the heart relaxes.',
    functions: [
      'Receives oxygenated blood from the lungs',
      'Serves as a reservoir for blood when the left ventricle contracts',
      'Contracts to help fill the left ventricle with blood'
    ],
    facts: 'The walls of the left atrium are slightly thicker than those of the right atrium, as it needs to generate higher pressure to push blood through the mitral valve.',
    imagePath: '/images/parts/left-atrium.svg'
  },
  rightAtrium: {
    title: 'Right Atrium',
    description: 'The right atrium receives deoxygenated blood from the body via the superior and inferior vena cava. It then pumps this blood into the right ventricle through the tricuspid valve when the heart relaxes.',
    functions: [
      'Receives deoxygenated blood from the body',
      'Serves as a reservoir for blood when the right ventricle contracts',
      'Contracts to help fill the right ventricle with blood'
    ],
    facts: 'The right atrium contains the sinoatrial (SA) node, which is the heart\'s natural pacemaker that initiates each heartbeat.',
    imagePath: '/images/parts/right-atrium.svg'
  },
  leftVentricle: {
    title: 'Left Ventricle',
    description: 'The left ventricle is the heart\'s main pumping chamber. It receives oxygenated blood from the left atrium and pumps it out to the body through the aorta. It has the thickest walls of all heart chambers.',
    functions: [
      'Pumps oxygenated blood to the entire body',
      'Generates the highest pressure in the circulatory system',
      'Maintains systemic blood pressure'
    ],
    facts: 'The left ventricle wall is 3-4 times thicker than the right ventricle because it needs to generate enough pressure to push blood throughout the entire body.',
    imagePath: '/images/parts/left-ventricle.svg'
  },
  rightVentricle: {
    title: 'Right Ventricle',
    description: 'The right ventricle receives deoxygenated blood from the right atrium and pumps it to the lungs through the pulmonary artery. Its walls are thinner than the left ventricle as it only needs to pump blood a short distance to the lungs.',
    functions: [
      'Pumps deoxygenated blood to the lungs for oxygenation',
      'Maintains pulmonary circulation',
      'Works at lower pressures than the left ventricle'
    ],
    facts: 'The right ventricle has a unique crescent shape that wraps partially around the more conical left ventricle.',
    imagePath: '/images/parts/right-ventricle.svg'
  },
  aorta: {
    title: 'Aorta',
    description: 'The aorta is the largest artery in the body. It receives oxygenated blood from the left ventricle through the aortic valve and distributes it to the rest of the body through its many branches.',
    functions: [
      'Carries oxygenated blood from the heart to the body',
      'Helps maintain blood pressure with its elastic walls',
      'Distributes blood to major arteries serving different body regions'
    ],
    facts: 'The aorta is approximately the diameter of a garden hose (about 1 inch or 2.5 cm) and has a distinctive arch shape as it exits the heart.',
    imagePath: '/images/parts/aorta.svg'
  },
  pulmonaryArtery: {
    title: 'Pulmonary Artery',
    description: 'The pulmonary artery carries deoxygenated blood from the right ventricle to the lungs. It is the only artery in the body that carries deoxygenated blood.',
    functions: [
      'Transports deoxygenated blood from the heart to the lungs',
      'Branches into left and right pulmonary arteries to serve both lungs',
      'Completes the pulmonary circulation loop'
    ],
    facts: 'Despite carrying deoxygenated blood, the pulmonary artery is still classified as an artery because it carries blood away from the heart.',
    imagePath: '/images/parts/pulmonary-artery.svg'
  },
  mitralValve: {
    title: 'Mitral Valve',
    description: 'The mitral valve (also called the bicuspid valve) is located between the left atrium and left ventricle. It has two flaps (cusps) that open to allow blood to flow from the left atrium to the left ventricle and close to prevent backflow.',
    functions: [
      'Controls blood flow between the left atrium and left ventricle',
      'Prevents backflow of blood into the left atrium during ventricular contraction',
      'Opens during ventricular relaxation to fill the left ventricle'
    ],
    facts: 'The mitral valve is named after its resemblance to a bishop\'s miter (a type of headwear). It is the only valve in the heart with two cusps; all others have three.',
    imagePath: '/images/parts/mitral-valve.svg'
  },
  tricuspidValve: {
    title: 'Tricuspid Valve',
    description: 'The tricuspid valve is located between the right atrium and right ventricle. It has three flaps (cusps) that open to allow blood to flow from the right atrium to the right ventricle and close to prevent backflow.',
    functions: [
      'Controls blood flow between the right atrium and right ventricle',
      'Prevents backflow of blood into the right atrium during ventricular contraction',
      'Opens during ventricular relaxation to fill the right ventricle'
    ],
    facts: 'The tricuspid valve gets its name from its three cusps or leaflets. It is slightly larger in diameter than the mitral valve.',
    imagePath: '/images/parts/tricuspid-valve.svg'
  },
  pulmonaryValve: {
    title: 'Pulmonary Valve',
    description: 'The pulmonary valve is located between the right ventricle and the pulmonary artery. It has three flaps (cusps) that open to allow blood to flow from the right ventricle to the pulmonary artery and close to prevent backflow.',
    functions: [
      'Controls blood flow from the right ventricle to the pulmonary artery',
      'Prevents backflow of blood into the right ventricle during ventricular relaxation',
      'Opens during ventricular contraction to allow blood to flow to the lungs'
    ],
    facts: 'The pulmonary valve is sometimes called the pulmonic valve. It experiences the lowest pressure of all heart valves.',
    imagePath: '/images/parts/pulmonary-valve.svg'
  },
  aorticValve: {
    title: 'Aortic Valve',
    description: 'The aortic valve is located between the left ventricle and the aorta. It has three flaps (cusps) that open to allow blood to flow from the left ventricle to the aorta and close to prevent backflow.',
    functions: [
      'Controls blood flow from the left ventricle to the aorta',
      'Prevents backflow of blood into the left ventricle during ventricular relaxation',
      'Opens during ventricular contraction to allow blood to flow to the body'
    ],
    facts: 'The aortic valve must withstand the highest pressures in the heart. Its cusps are thicker and stronger than those of the pulmonary valve.',
    imagePath: '/images/parts/aortic-valve.svg'
  },
  none: {
    title: 'Human Heart',
    description: 'The heart is a muscular organ about the size of a closed fist that functions as the body\'s circulatory pump. It is divided into four chambers: two atria (upper chambers) and two ventricles (lower chambers). The heart is located in the thoracic cavity, slightly left of center.',
    functions: [
      'Pumps blood throughout the body',
      'Delivers oxygen and nutrients to tissues',
      'Removes carbon dioxide and waste products',
      'Maintains blood pressure and flow'
    ],
    facts: 'The average adult heart beats about 60-100 times per minute, pumping about 2,000 gallons (7,570 liters) of blood each day. The heart can continue beating even when disconnected from the body, as it has its own electrical system.',
    imagePath: '/images/heart-diagram.svg'
  }
};

interface AnatomyDetailsProps {
  selectedPart: HeartPart;
}

const AnatomyDetails: React.FC<AnatomyDetailsProps> = ({ selectedPart }) => {
  const partInfo = heartPartsInfo[selectedPart];
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <div className="relative w-full aspect-square bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden">
            <Image 
              src={partInfo.imagePath}
              alt={partInfo.title}
              width={400}
              height={400}
              className="object-contain"
            />
          </div>
        </div>
        
        <div className="md:w-2/3">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {partInfo.title}
          </h2>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {partInfo.description}
          </p>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Functions
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              {partInfo.functions.map((func, index) => (
                <li key={index}>{func}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Interesting Facts
            </h3>
            <p className="text-gray-700 dark:text-gray-300 italic">
              {partInfo.facts}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnatomyDetails; 