'use client';

import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Separate the heart model to allow for lazy loading
function HeartModelObject({ url, heartRate = 70, animationPaused = false, isMobile = false }: { 
  url: string; 
  heartRate?: number;
  animationPaused?: boolean;
  isMobile?: boolean;
}) {
  const heartRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(url);
  const [baseScale] = useState(isMobile ? 2.2 : 2.5); // Slightly smaller scale on mobile
  const heartRateRef = useRef(heartRate);
  const lastScaleRef = useRef(baseScale);
  
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
      // Subtle rotation - reduced on mobile for better performance
      const rotationSpeed = isMobile ? 0.1 : 0.2;
      const rotationAmount = isMobile ? 0.1 : 0.15;
      heartRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * rotationSpeed) * rotationAmount;
      
      // Skip animation if paused
      if (animationPaused) {
        // If paused, ensure the heart stays at its normal size
        if (heartRef.current.scale.x !== baseScale) {
          heartRef.current.scale.set(baseScale, baseScale, baseScale);
        }
        return;
      }
      
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
      
      // Apply the scaling to the heart model - less intense on mobile if needed
      const newScale = baseScale * (isMobile ? (scaleFactor * 0.8 + 0.2) : scaleFactor);
      heartRef.current.scale.set(newScale, newScale, newScale);
      lastScaleRef.current = newScale;
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
  const [animationPaused, setAnimationPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check initially
    checkMobile();
    
    // Listen for resize events
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    <div 
      ref={containerRef} 
      className={`w-full relative ${isMobile ? 'h-[400px]' : 'h-[500px] md:h-[600px]'}`}
    >
      {isVisible ? (
        <>
          <Canvas 
            camera={{ position: [0, 0, isMobile ? 6 : 5], fov: isMobile ? 50 : 45 }}
            dpr={[1, isMobile ? 1.5 : 2]} // Lower pixel ratio for mobile
            performance={{ min: isMobile ? 0.4 : 0.5 }} // Allow more performance drop on mobile
            gl={{ 
              antialias: false,
              powerPreference: 'high-performance'
            }}
          >
            {/* Base ambient lighting - simplified on mobile */}
            <ambientLight intensity={1.0} />
            <hemisphereLight args={['#ffffff', '#8080ff', 1.0]} />
            
            {/* Primary spotlights - reduced number on mobile */}
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} />
            <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={1.2} />
            
            {/* Conditional lights based on device type */}
            {!isMobile && (
              <>
                <spotLight position={[0, -15, 0]} angle={0.5} penumbra={0.8} intensity={1.0} />
                <directionalLight position={[0, 0, 5]} intensity={0.8} />
                <directionalLight position={[0, 0, -5]} intensity={0.6} />
              </>
            )}
            
            {/* Point lights - reduced on mobile */}
            {isMobile ? (
              <>
                <pointLight position={[5, 5, 5]} intensity={0.7} />
                <pointLight position={[-5, -5, -5]} intensity={0.7} />
              </>
            ) : (
              <>
                <pointLight position={[5, 5, 5]} intensity={0.5} />
                <pointLight position={[-5, 5, 5]} intensity={0.5} />
                <pointLight position={[5, -5, 5]} intensity={0.5} />
                <pointLight position={[-5, -5, 5]} intensity={0.5} />
                <pointLight position={[5, 5, -5]} intensity={0.5} />
                <pointLight position={[-5, 5, -5]} intensity={0.5} />
                <pointLight position={[5, -5, -5]} intensity={0.5} />
                <pointLight position={[-5, -5, -5]} intensity={0.5} />
              </>
            )}
            
            <Suspense fallback={null}>
              <HeartModelObject 
                url="/models/heart.glb" 
                heartRate={heartRate} 
                animationPaused={animationPaused}
                isMobile={isMobile}
              />
            </Suspense>
            <OrbitControls 
              enablePan={false}
              enableZoom={true}
              minDistance={isMobile ? 4 : 3}
              maxDistance={isMobile ? 7 : 8}
              autoRotate={false}
              enableDamping={true}
              dampingFactor={0.05}
              rotateSpeed={isMobile ? 0.7 : 1} // Slower rotation on mobile for better control
              zoomSpeed={isMobile ? 0.8 : 1} // Slower zoom on mobile for better control
            />
          </Canvas>
          
          <div className="absolute bottom-4 left-4 right-4 flex flex-col items-start bg-white/80 dark:bg-gray-900/80 p-3 rounded text-xs md:text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center w-full justify-between mb-3">
              <span className="font-medium">Heart Model Controls</span>
              <button
                onClick={() => setAnimationPaused(!animationPaused)}
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                  animationPaused 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
                }`}
              >
                {animationPaused ? 'Resume' : 'Pause'}
              </button>
            </div>
            
            <div className="flex flex-col w-full">
              <div className="flex justify-between items-center mb-1">
                <span>Heart Rate: {heartRate} BPM</span>
                <div className="text-xs opacity-70">
                  {heartRate < 60 ? 'Resting' : heartRate < 100 ? 'Normal' : heartRate < 140 ? 'Active' : 'Intense'}
                </div>
              </div>
              <input 
                type="range" 
                min="40" 
                max="180"
                step="1"
                value={heartRate}
                onChange={(e) => setHeartRate(parseInt(e.target.value))}
                className="w-full h-3 bg-red-200 rounded-lg appearance-none cursor-pointer dark:bg-red-700"
                disabled={animationPaused}
              />
            </div>
            
            <div className="w-full text-xs opacity-80 mt-2 text-center">
              Drag to rotate | Pinch or scroll to zoom
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