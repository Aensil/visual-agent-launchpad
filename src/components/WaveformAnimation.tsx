
import React from 'react';

const WaveformAnimation = () => {
  return (
    <div className="w-full h-full flex items-center justify-center gap-1">
      {[...Array(30)].map((_, i) => (
        <div 
          key={i} 
          className="bg-electric-cyan"
          style={{
            width: '3px',
            height: `${30 + Math.sin(i/3) * 50}%`,
            animationDelay: `${i * 0.05}s`
          }}
          className="animate-pulse-waveform bg-electric-cyan"
        ></div>
      ))}
    </div>
  );
};

export default WaveformAnimation;
