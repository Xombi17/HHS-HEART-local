'use client';

import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Separate the heart model to allow for lazy loading
function HeartModelObject({ url, heartRate = 70 }: { url: string; heartRate?: number }) {
  const heartRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(url);
  const [baseScale] = useState(2.5);
  const heartRateRef = useRef(heartRate);
  
  // Update heart rate when prop changes
  useEffect(() => {
    heartRateRef.current = heartRate;
  }, [heartRate]);
  
  // Optimize the scene
  useEffect(() => {
    if (scene) {
      // Lower the polygon count if possible
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Disable shadows for better performance
          child.castShadow = false;
          child.receiveShadow = false;
        }
      });
    }
  }, [scene]);

  // Apply heartbeat animation and subtle rotation
  useFrame((state, delta) => {
    if (heartRef.current) {
      // Subtle rotation for dynamic viewing
      heartRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.15;
      
      // Calculate the heartbeat phase (0 to 1)
      const heartbeatFrequency = heartRateRef.current / 60; // Convert BPM to beats per second
      const time = state.clock.getElapsedTime();
      const heartbeatPhase = (time * heartbeatFrequency) % 1;
      
      // Create a realistic heartbeat animation
      let scaleFactor = 1;
      
      // Systole (contraction) phase
      if (heartbeatPhase < 0.1) {
        // Quick contraction
        scaleFactor = 1 + 0.08 * Math.sin(heartbeatPhase * Math.PI * 5);
      } 
      // First relaxation
      else if (heartbeatPhase < 0.2) {
        scaleFactor = 1 + 0.05 * Math.sin((heartbeatPhase - 0.1) * Math.PI * 5);
      }
      // Diastole (relaxation) phase
      else if (heartbeatPhase < 0.4) {
        // Gradual relaxation back to normal size
        scaleFactor = 1 + 0.02 * (0.4 - heartbeatPhase) / 0.2;
      }
      // Rest phase
      else {
        scaleFactor = 1;
      }
      
      // Apply the scaling to the heart model
      heartRef.current.scale.set(
        baseScale * scaleFactor,
        baseScale * scaleFactor,
        baseScale * scaleFactor
      );
    }
  });

  return (
    <primitive 
      ref={heartRef}
      object={scene} 
      scale={baseScale} 
      position={[0, 0, 0]} 
    />
  );
}

// Loading placeholder
const LoadingPlaceholder = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="text-red-600 dark:text-red-500">
      <svg className="animate-spin h-12 w-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  </div>
);

const HeartModel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [heartRate, setHeartRate] = useState(70);

  // Only render the 3D model when it's visible in the viewport
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    observer.observe(containerRef.current);
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-[500px] md:h-[600px] relative">
      {isVisible ? (
        <>
          <Canvas 
            camera={{ position: [0, 0, 5], fov: 45 }}
            dpr={[1, 2]} // Limit pixel ratio for better performance
            performance={{ min: 0.5 }} // Allow frame rate to drop for better performance
            gl={{ 
              antialias: false, // Disable antialiasing for better performance
              powerPreference: 'high-performance'
            }}
          >
            {/* Base ambient lighting */}
            <ambientLight intensity={1.0} />
            <hemisphereLight args={['#ffffff', '#8080ff', 1.0]} />
            
            {/* Primary spotlights from different angles */}
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} />
            <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={1.2} />
            <spotLight position={[0, -15, 0]} angle={0.5} penumbra={0.8} intensity={1.0} />
            
            {/* Directional lights for overall illumination */}
            <directionalLight position={[0, 0, 5]} intensity={0.8} />
            <directionalLight position={[0, 0, -5]} intensity={0.6} />
            
            {/* Corner-specific point lights */}
            <pointLight position={[5, 5, 5]} intensity={0.5} />
            <pointLight position={[-5, 5, 5]} intensity={0.5} />
            <pointLight position={[5, -5, 5]} intensity={0.5} />
            <pointLight position={[-5, -5, 5]} intensity={0.5} />
            <pointLight position={[5, 5, -5]} intensity={0.5} />
            <pointLight position={[-5, 5, -5]} intensity={0.5} />
            <pointLight position={[5, -5, -5]} intensity={0.5} />
            <pointLight position={[-5, -5, -5]} intensity={0.5} />
            
            <Suspense fallback={null}>
              <HeartModelObject url="/models/heart.glb" heartRate={heartRate} />
            </Suspense>
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
          
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-white/80 dark:bg-gray-900/80 p-2 rounded text-xs text-gray-600 dark:text-gray-300">
            <span>Drag to rotate | Scroll to zoom</span>
            <div className="flex items-center ml-4">
              <span className="mr-2">Heart Rate: {heartRate} BPM</span>
              <input 
                type="range" 
                min="40" 
                max="180"
                step="1"
                value={heartRate}
                onChange={(e) => setHeartRate(parseInt(e.target.value))}
                className="w-32 h-2 bg-red-200 rounded-lg appearance-none cursor-pointer dark:bg-red-700"
              />
            </div>
          </div>
        </>
      ) : (
        <LoadingPlaceholder />
      )}
    </div>
  );
};

export default HeartModel; 