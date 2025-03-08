'use client';

import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  fcp: number | null;
  lcp: number | null;
  cls: number | null;
  fid: number | null;
  fps: number | null;
}

// Define interface for PerformanceEventTiming which includes processingStart
interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number;
}

/**
 * PerformanceMonitor component that tracks and reports performance metrics.
 * This is a development tool and should be disabled in production.
 */
const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    cls: null,
    fid: null,
    fps: null,
  });
  const [isVisible, setIsVisible] = useState(false);
  const [frameCount, setFrameCount] = useState(0);
  const [lastFrameTime, setLastFrameTime] = useState(performance.now());

  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    // Toggle visibility with keyboard shortcut (Ctrl+Shift+P)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(prev => !prev);
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Track First Contentful Paint
    const fcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      if (entries.length > 0) {
        const fcp = entries[0].startTime;
        setMetrics(prev => ({ ...prev, fcp }));
      }
    });
    
    fcpObserver.observe({ type: 'paint', buffered: true });

    // Track Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      if (entries.length > 0) {
        const lcp = entries[entries.length - 1].startTime;
        setMetrics(prev => ({ ...prev, lcp }));
      }
    });
    
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

    // Track Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((entryList) => {
      let clsValue = 0;
      for (const entry of entryList.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      setMetrics(prev => ({ ...prev, cls: clsValue }));
    });
    
    clsObserver.observe({ type: 'layout-shift', buffered: true });

    // Track First Input Delay
    const fidObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      if (entries.length > 0) {
        // Cast to PerformanceEventTiming to access processingStart
        const entry = entries[0] as PerformanceEventTiming;
        const fid = entry.processingStart - entry.startTime;
        setMetrics(prev => ({ ...prev, fid }));
      }
    });
    
    fidObserver.observe({ type: 'first-input', buffered: true });

    // Track FPS
    let frameId: number;
    const trackFPS = () => {
      const now = performance.now();
      const elapsed = now - lastFrameTime;
      
      if (elapsed >= 1000) { // Update every second
        const fps = Math.round((frameCount * 1000) / elapsed);
        setMetrics(prev => ({ ...prev, fps }));
        setFrameCount(0);
        setLastFrameTime(now);
      } else {
        setFrameCount(prev => prev + 1);
      }
      
      frameId = requestAnimationFrame(trackFPS);
    };
    
    frameId = requestAnimationFrame(trackFPS);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      fcpObserver.disconnect();
      lcpObserver.disconnect();
      clsObserver.disconnect();
      fidObserver.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, [lastFrameTime, frameCount]);

  if (!isVisible || process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg z-50 text-xs font-mono">
      <div className="text-center font-bold mb-1">Performance Metrics</div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
        <div>FPS:</div>
        <div className={`${metrics.fps && metrics.fps < 30 ? 'text-red-400' : 'text-green-400'}`}>
          {metrics.fps !== null ? `${metrics.fps}` : 'Measuring...'}
        </div>
        
        <div>FCP:</div>
        <div className={`${metrics.fcp && metrics.fcp > 2000 ? 'text-red-400' : 'text-green-400'}`}>
          {metrics.fcp !== null ? `${(metrics.fcp / 1000).toFixed(2)}s` : 'Measuring...'}
        </div>
        
        <div>LCP:</div>
        <div className={`${metrics.lcp && metrics.lcp > 2500 ? 'text-red-400' : 'text-green-400'}`}>
          {metrics.lcp !== null ? `${(metrics.lcp / 1000).toFixed(2)}s` : 'Measuring...'}
        </div>
        
        <div>CLS:</div>
        <div className={`${metrics.cls && metrics.cls > 0.1 ? 'text-red-400' : 'text-green-400'}`}>
          {metrics.cls !== null ? metrics.cls.toFixed(3) : 'Measuring...'}
        </div>
        
        <div>FID:</div>
        <div className={`${metrics.fid && metrics.fid > 100 ? 'text-red-400' : 'text-green-400'}`}>
          {metrics.fid !== null ? `${metrics.fid.toFixed(0)}ms` : 'Measuring...'}
        </div>
      </div>
      <div className="text-center text-xs mt-2 opacity-70">Press Ctrl+Shift+P to hide</div>
    </div>
  );
};

export default PerformanceMonitor; 