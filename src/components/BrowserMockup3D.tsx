
import React, { ReactNode, useRef, useEffect, useState } from 'react';

interface BrowserMockupProps {
  children: ReactNode;
}

const BrowserMockup3D = ({ children }: BrowserMockupProps) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const mockupRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!mockupRef.current) return;
      
      const rect = mockupRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate relative position to center
      const relativeX = (e.clientX - centerX) / (rect.width / 2);
      const relativeY = (e.clientY - centerY) / (rect.height / 2);
      
      // Apply subtle rotation based on mouse position
      setRotation({
        x: relativeY * -3, // Inverse Y for natural tilt effect
        y: relativeX * 3
      });
    };
    
    // Only add listener if mouse is over the mockup
    const handleMouseEnter = () => {
      document.addEventListener('mousemove', handleMouseMove);
    };
    
    const handleMouseLeave = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      
      // Smoothly reset rotation
      const resetRotation = () => {
        setRotation(prev => ({
          x: prev.x * 0.9,
          y: prev.y * 0.9
        }));
        
        if (Math.abs(rotation.x) > 0.1 || Math.abs(rotation.y) > 0.1) {
          requestAnimationFrame(resetRotation);
        } else {
          setRotation({ x: 0, y: 0 });
        }
      };
      
      resetRotation();
    };
    
    const mockupElement = mockupRef.current;
    
    if (mockupElement) {
      mockupElement.addEventListener('mouseenter', handleMouseEnter);
      mockupElement.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      if (mockupElement) {
        mockupElement.removeEventListener('mouseenter', handleMouseEnter);
        mockupElement.removeEventListener('mouseleave', handleMouseLeave);
      }
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [prefersReducedMotion]);

  return (
    <div 
      ref={mockupRef}
      className="w-full max-w-4xl h-[400px] md:h-[500px] transition-all duration-300 perspective-1000"
      style={{
        transform: prefersReducedMotion ? 'none' : `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="w-full h-full relative transform-style-3d">
        {/* Browser frame with glassy effect */}
        <div className="absolute inset-0 glassmorphism rounded-lg border border-white/10 shadow-[0_0_15px_rgba(0,210,255,0.3)] overflow-hidden" 
             style={{ transform: 'translateZ(0px)' }}>
          {/* Browser top bar */}
          <div className="h-10 bg-black/90 backdrop-blur-lg flex items-center px-4 border-b border-white/10">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500 relative">
                <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
              </div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="ml-4 flex-1 flex justify-center">
              <div className="h-6 w-1/2 bg-black/50 rounded-full flex items-center justify-center text-xs text-gray-400 border border-white/5">
                vuen.ai
              </div>
            </div>
          </div>
          <div className="h-[calc(100%-40px)] flex items-center justify-center bg-black">
            {children}
          </div>
        </div>
        
        {/* Add 3D shadow/glow effect below */}
        <div 
          className="absolute w-[90%] h-[10%] bottom-[-20px] left-[5%] rounded-[50%] bg-electric-cyan/20 blur-xl"
          style={{ transform: 'translateZ(-20px) rotateX(90deg)' }}
        ></div>
      </div>
    </div>
  );
};

export default BrowserMockup3D;
