'use client';

import { useEffect, useState, useCallback } from 'react';

// Provide a simple hook implementation
export const useSmoothScroll = (options = { strength: 0.1, ease: 0.05 }) => {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [targetScroll, setTargetScroll] = useState(0);
  const [currentScroll, setCurrentScroll] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Track cursor position
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setCursor({ x: e.clientX, y: e.clientY });
  }, []);

  // Update scroll position based on wheel events
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    setTargetScroll(prev => Math.max(0, Math.min(
      document.body.scrollHeight - window.innerHeight, 
      prev + e.deltaY
    )));
  }, []);

  // Animation loop for smooth scrolling
  useEffect(() => {
    if (isMobile) return; // Don't use custom scrolling on mobile
    
    let rafId: number;
    let prevTimestamp: number;
    
    const animate = (timestamp: number) => {
      if (!prevTimestamp) prevTimestamp = timestamp;
      const deltaTime = timestamp - prevTimestamp;
      prevTimestamp = timestamp;
      
      // Smoothly interpolate current scroll toward target scroll
      const newScroll = currentScroll + (targetScroll - currentScroll) * options.ease * Math.min(deltaTime, 32);
      setCurrentScroll(newScroll);
      
      // Apply scroll position
      window.scrollTo(0, newScroll);
      
      rafId = requestAnimationFrame(animate);
    };
    
    rafId = requestAnimationFrame(animate);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [handleMouseMove, handleWheel, targetScroll, currentScroll, options.ease, isMobile]);

  return { cursor, currentScroll, targetScroll };
}; 