
import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
}

const colors = ['#00D2FF', '#5C33FF', '#FF1E8C'];

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Initialize particles
    const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 20000));
    
    const initParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.5 + 0.2
        });
      }
    };
    
    initParticles();
    
    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    let animationId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Move particle
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Boundary check
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
        
        // Connect particles close to each other
        for (let j = index + 1; j < particlesRef.current.length; j++) {
          const nextParticle = particlesRef.current[j];
          const distance = Math.hypot(particle.x - nextParticle.x, particle.y - nextParticle.y);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `${particle.color}${Math.floor((1 - distance / 100) * particle.opacity * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(nextParticle.x, nextParticle.y);
            ctx.stroke();
          }
        }
        
        // Mouse interaction - particles react to mouse position
        const mouseDistance = Math.hypot(
          particle.x - mousePositionRef.current.x,
          particle.y - mousePositionRef.current.y
        );
        
        if (mouseDistance < 150) {
          const angle = Math.atan2(
            particle.y - mousePositionRef.current.y,
            particle.x - mousePositionRef.current.x
          );
          
          const force = (150 - mouseDistance) / 1500;
          particle.speedX += Math.cos(angle) * force;
          particle.speedY += Math.sin(angle) * force;
          
          // Limit speed
          const speed = Math.hypot(particle.speedX, particle.speedY);
          if (speed > 1.5) {
            particle.speedX = (particle.speedX / speed) * 1.5;
            particle.speedY = (particle.speedY / speed) * 1.5;
          }
        } else {
          // Gradually return to original speed
          particle.speedX *= 0.99;
          particle.speedY *= 0.99;
        }
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
      particlesRef.current = [];
    };
  }, [prefersReducedMotion]);
  
  if (prefersReducedMotion) {
    return null; // Don't render anything for users who prefer reduced motion
  }
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

export default ParticleBackground;
