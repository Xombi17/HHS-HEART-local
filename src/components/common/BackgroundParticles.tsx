'use client';

import React, { useEffect, useRef } from 'react';

interface ParticleProps {
  density?: number;
  speed?: number;
  color?: string;
  className?: string;
}

const BackgroundParticles: React.FC<ParticleProps> = ({
  density = 50,
  speed = 1,
  color = 'var(--primary)',
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = containerRef.current.clientWidth;
    let height = containerRef.current.clientHeight;

    const resizeCanvas = () => {
      if (!containerRef.current || !canvas) return;
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create blood cell particles
    const particleCount = Math.floor(density * (width * height) / 100000);
    const particles: {
      x: number;
      y: number;
      radius: number;
      color: string;
      speedX: number;
      speedY: number;
      opacity: number;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 3 + 1;  // Blood cells vary in size
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: radius,
        color: i % 5 === 0 ? '#ffffff' : color, // Some white blood cells
        speedX: (Math.random() - 0.5) * speed,
        speedY: (Math.random() - 0.5) * speed,
        opacity: Math.random() * 0.5 + 0.3
      });
    }

    const drawParticle = (particle: typeof particles[0]) => {
      if (!ctx) return;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.opacity;
      ctx.fill();
      ctx.closePath();
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off walls
        if (particle.x < particle.radius || particle.x > width - particle.radius) {
          particle.speedX *= -1;
        }
        if (particle.y < particle.radius || particle.y > height - particle.radius) {
          particle.speedY *= -1;
        }

        drawParticle(particle);
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [density, speed, color]);

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};

export default BackgroundParticles; 