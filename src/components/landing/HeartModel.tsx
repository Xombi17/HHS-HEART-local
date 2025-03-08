'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function HeartModelObject({ url }: { url: string }) {
  const heartRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(url);

  // Rotate the heart model slowly
  useFrame((state) => {
    if (heartRef.current) {
      heartRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
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

const HeartModel = () => {
  return (
    <div className="w-full h-[500px] md:h-[600px] relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <HeartModelObject url="/models/heart.glb" />
        <OrbitControls 
          enablePan={false}
          enableZoom={true}
          minDistance={3}
          maxDistance={8}
          autoRotate={false}
          autoRotateSpeed={0.5}
        />
      </Canvas>
      <div className="absolute bottom-4 left-4 bg-white/80 dark:bg-gray-900/80 p-2 rounded text-xs text-gray-600 dark:text-gray-300">
        Drag to rotate | Scroll to zoom
      </div>
    </div>
  );
};

export default HeartModel; 