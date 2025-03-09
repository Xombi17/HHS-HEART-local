'use client';

import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../common/Button';
import HeartModel from './HeartModel';
import ParallaxContainer, { ParallaxLayer } from '../common/ParallaxContainer';
import BackgroundParticles from '../common/BackgroundParticles';
import InteractiveGradient from '../common/InteractiveGradient';

const Hero = () => {
  const [isExploring, setIsExploring] = useState(false);

  const handleScrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreHeart = useCallback(() => {
    setIsExploring(prev => !prev);
  }, []);

  return (
    <ParallaxContainer className="relative w-full min-h-screen overflow-hidden">
      {/* Background with subtle pattern and blood cells */}
      <ParallaxLayer depth="back" className="blood-cell-pattern">
        <BackgroundParticles 
          density={40} 
          speed={0.5} 
          color="var(--primary)" 
          className="opacity-70"
        />
      </ParallaxLayer>

      {/* Gradient background with mid-level parallax */}
      <ParallaxLayer depth="mid" className="gradient-animation opacity-10">
        <div className="w-full h-full"></div>
      </ParallaxLayer>
      
      {/* Main content */}
      <ParallaxLayer depth="front" className="flex flex-col items-center justify-center">
        <InteractiveGradient className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12">
            {/* Left side: Text content */}
            <motion.div 
              className="flex-1 text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Explore the <span className="text-primary pulse-animation inline-block">Human Heart</span>
              </motion.h1>
              
              <motion.p 
                className="mt-4 md:mt-6 text-xl text-foreground/80 max-w-lg mx-auto md:mx-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Discover the wonders of the human heart through our interactive experiences and educational tools.
              </motion.p>
              
              <motion.div 
                className="mt-8 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Button onClick={handleExploreHeart} className="px-6 py-3">
                  {isExploring ? "Reset View" : "Explore Heart"}
                </Button>
                <Button 
                  onClick={handleScrollToFeatures} 
                  variant="outline" 
                  className="px-6 py-3"
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Right side: Heart Model */}
            <motion.div 
              className="flex-1 flex justify-center items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <div className="w-full max-w-md aspect-square">
                <HeartModel />
              </div>
            </motion.div>
          </div>
        </InteractiveGradient>
      </ParallaxLayer>
    </ParallaxContainer>
  );
};

export default Hero; 