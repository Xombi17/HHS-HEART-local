'use client';

import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Separate the heart model to allow for lazy loading
function HeartModelObject({ url }: { url: string }) {
  const heartRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(url);
  
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

  // Reduce animation complexity - only update every other frame
  useFrame((state, delta) => {
    if (heartRef.current && state.clock.elapsedTime % 0.1 < 0.05) {
      heartRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.15;
    }
  });

  return (
    <primitive 
      ref={heartRef}
      object={scene} 
      scale={2.5} 
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
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 2]} // Limit pixel ratio for better performance
          performance={{ min: 0.5 }} // Allow frame rate to drop for better performance
          gl={{ 
            antialias: false, // Disable antialiasing for better performance
            powerPreference: 'high-performance'
          }}
        >
          <ambientLight intensity={0.8} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} />
          <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={1.2} />
          <spotLight position={[0, -15, 0]} angle={0.5} penumbra={0.8} intensity={1.0} />
          <directionalLight position={[0, 0, 5]} intensity={0.8} />
          <directionalLight position={[0, 0, -5]} intensity={0.6} />
          <Suspense fallback={null}>
            <HeartModelObject url="/models/heart.glb" />
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
      ) : (
        <LoadingPlaceholder />
      )}
      <div className="absolute bottom-4 left-4 bg-white/80 dark:bg-gray-900/80 p-2 rounded text-xs text-gray-600 dark:text-gray-300">
        Drag to rotate | Scroll to zoom
      </div>
    </div>
  );
};

export default HeartModel; 