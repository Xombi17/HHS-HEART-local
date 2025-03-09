'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, SpotLight } from '@react-three/drei';
import * as THREE from 'three';

// Preload both heart models
useGLTF.preload('/models/heart.glb');
useGLTF.preload('/models/unhealthy_heart.glb');

interface HeartModelComparisonProps {
  condition: string;
  animation?: 'normal' | 'irregular' | 'slow' | 'fast';
  size?: 'normal' | 'enlarged' | 'reduced';
  highlighted?: string[];
  transitioning?: boolean;
  isHealthy?: boolean;
}

// Custom heart model for comparisons
function HeartModel({
  condition,
  animation = 'normal',
  size = 'normal',
  highlighted = [],
  transitioning = false,
  isHealthy = true
}: HeartModelComparisonProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene: healthyScene } = useGLTF('/models/heart.glb');
  const { scene: unhealthyScene } = useGLTF('/models/unhealthy_heart.glb');
  const [model, setModel] = useState<THREE.Group | null>(null);
  
  // Get scale based on condition
  const getScale = () => {
    switch(size) {
      case 'enlarged': return 2.7;
      case 'reduced': return 2.3;
      default: return 2.5;
    }
  };
  
  // Initialize the model based on condition
  useEffect(() => {
    // Select appropriate model based on healthy/unhealthy state
    const sourceScene = isHealthy ? healthyScene : unhealthyScene;
    
    if (!sourceScene) return;
    
    // Clone the scene to avoid mutations affecting other instances
    const clonedScene = sourceScene.clone();
    
    // Apply highlighting without affecting other materials
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // IMPORTANT: We want to preserve the original material/texture
        // Just ensure the material has proper settings but don't create new materials
        if (child.material) {
          // Get a reference to the original material
          const mat = child.material as THREE.MeshStandardMaterial;
          
          // Keep all original maps and properties
          if (!isHealthy) {
            // Just enhance some properties without changing the material type or texture
            mat.roughness = Math.min(mat.roughness || 0.7, 0.6);
            mat.metalness = Math.min((mat.metalness || 0) + 0.2, 0.3);
            mat.emissiveIntensity = 0.2;
            // Don't change the color or maps
          }
        }
        
        // Apply highlighting if needed - ONLY for specific highlighted areas
        if (highlighted && highlighted.length > 0) {
          // Check if this mesh contains any of the highlighted areas
          const meshName = child.name.toLowerCase();
          const isHighlighted = highlighted.some(area => 
            area && meshName.includes(area.toLowerCase().replace(' ', ''))
          );
          
          if (isHighlighted) {
            // Apply highlight as new material
            const highlightMaterial = new THREE.MeshStandardMaterial({
              color: new THREE.Color('#ff0000'),
              emissive: new THREE.Color('#ff4444'),
              emissiveIntensity: 0.5,
              roughness: 0.5,
              metalness: 0.5
            });
            
            child.material = highlightMaterial;
          }
        }
      }
    });
    
    setModel(clonedScene);
  }, [healthyScene, unhealthyScene, highlighted, isHealthy]);
  
  // Handle animation
  useFrame((state) => {
    if (!groupRef.current || transitioning) return;
    
    const time = state.clock.getElapsedTime();
    
    // Different animation parameters based on condition
    let baseSpeed = 1.0;
    let variability = 0.05;
    let scaleFactor = 0.08;
    
    switch(animation) {
      case 'slow':
        baseSpeed = 0.6;
        variability = 0.05;
        scaleFactor = 0.06;
        break;
      case 'fast':
        baseSpeed = 1.8;
        variability = 0.05;
        scaleFactor = 0.08;
        break;
      case 'irregular':
        baseSpeed = 1.0;
        variability = 0.4;
        scaleFactor = 0.1;
        break;
    }
    
    // For irregular heartbeat, add randomness
    const speedVariation = animation === 'irregular' 
      ? Math.sin(time * 3) * variability
      : 0;
    
    // Calculate heartbeat phase
    const heartbeatPhase = Math.sin(time * Math.PI * 2 * (baseSpeed + speedVariation));
    
    // Apply scale with size factor
    const sizeFactor = getScale();
    const scale = sizeFactor * (1 + heartbeatPhase * scaleFactor);
    
    groupRef.current.scale.set(scale, scale, scale);
    
    // Slight rotation
    groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
  });
  
  if (!model) return null;
  
  return (
    <group ref={groupRef}>
      <primitive object={model} position={[0, 0, 0]} />
    </group>
  );
}

// Scene lighting component with adaptive brightness
function AdaptiveLighting({ isHealthy = true }) {
  return (
    <>
      {/* Base lighting for all models */}
      <ambientLight intensity={isHealthy ? 0.8 : 1.2} />
      
      {/* Main directional light - balanced for both models */}
      <directionalLight 
        position={[0, 10, 5]} 
        intensity={isHealthy ? 1.0 : 1.2} 
      />
      
      {/* Front fill light to show details */}
      <pointLight 
        position={[0, 0, 5]} 
        intensity={isHealthy ? 0.8 : 1.0} 
        distance={10}
      />
      
      {/* Side lights to show dimension */}
      <pointLight position={[5, 0, 0]} intensity={0.7} />
      <pointLight position={[-5, 0, 0]} intensity={0.7} />
      
      {/* Soft overhead light */}
      <SpotLight
        position={[0, 10, 0]}
        angle={0.6}
        penumbra={0.5}
        intensity={isHealthy ? 0.5 : 0.7}
        distance={20}
        attenuation={5}
        anglePower={5}
      />
    </>
  );
}

const HeartModelComparison: React.FC<HeartModelComparisonProps> = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Mark as loaded after a brief delay to allow the model to initialize
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timeout);
  }, []);
  
  return (
    <div className={`relative w-full h-[400px] overflow-hidden transition-opacity duration-300 ${
      props.transitioning ? 'opacity-70' : 'opacity-100'
    }`}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-red-600 dark:text-red-500">
            <svg className="animate-spin h-12 w-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        </div>
      )}
      
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true,
          preserveDrawingBuffer: true,
          powerPreference: 'high-performance'
        }}
      >
        {/* Use the adaptive lighting component */}
        <AdaptiveLighting isHealthy={props.isHealthy} />
        
        <HeartModel {...props} />
        
        <OrbitControls 
          enablePan={false}
          enableZoom={true}
          minDistance={3}
          maxDistance={8}
          autoRotate={false}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>
      
      {/* Labels for the heart condition */}
      <div className="absolute top-2 left-2 p-2 bg-gray-800/60 dark:bg-gray-900/60 rounded-md text-xs text-white z-10">
        {props.condition}
      </div>
      
      {/* Animation/Beat info */}
      <div className="absolute bottom-2 left-2 p-1 px-2 bg-gray-800/60 dark:bg-gray-900/60 rounded-md text-xs text-white z-10">
        Heartbeat: {
          props.animation === 'normal' ? 'Normal' :
          props.animation === 'slow' ? 'Slow' :
          props.animation === 'fast' ? 'Fast' :
          props.animation === 'irregular' ? 'Irregular' : 'Normal'
        }
      </div>
    </div>
  );
};

export default HeartModelComparison; 