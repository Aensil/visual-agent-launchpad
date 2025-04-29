
import React, { useEffect, useState } from 'react';

const WaveformAnimation = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    setIsAnimating(true);
    
    const intervalId = setInterval(() => {
      // This creates the waveform pulse effect every 4s
      const bars = document.querySelectorAll('.waveform-bar');
      bars.forEach((bar) => {
        bar.classList.add('pulsing');
        setTimeout(() => {
          bar.classList.remove('pulsing');
        }, 2000);
      });
    }, 4000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <div className="w-full h-full flex items-center justify-center gap-1">
      {[...Array(30)].map((_, i) => (
        <div 
          key={i} 
          className={`waveform-bar bg-electric-cyan transition-all duration-500 ${isAnimating ? 'animate-pulse-waveform' : ''}`}
          style={{
            width: '3px',
            height: `${30 + Math.sin(i/3) * 50}%`,
            animationDelay: `${i * 0.05}s`
          }}
        ></div>
      ))}
    </div>
  );
};

export default WaveformAnimation;
