
import React, { useRef, useEffect, useState } from 'react';

const WaveformAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [audioActive, setAudioActive] = useState(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const parentWidth = canvas.parentElement?.clientWidth || window.innerWidth;
      const parentHeight = canvas.parentElement?.clientHeight || 200;
      canvas.width = parentWidth;
      canvas.height = parentHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    setIsAnimating(true);
    
    // Dynamic waveform variables
    let frequency = 0.5;
    let waveAmplitude = canvas.height / 4;
    let phase = 0;
    let barCount = 40;
    let barWidth = 3;
    let barGap = 2;
    
    // Audio simulation data
    const simulateAudioData = () => {
      return Array(barCount).fill(0).map((_, i) => {
        // Create dynamic, organic-looking waveform
        const normalizedIndex = i / barCount;
        const mainWave = Math.sin(normalizedIndex * Math.PI * frequency + phase);
        const secondaryWave = Math.sin(normalizedIndex * Math.PI * frequency * 2 + phase * 1.5) * 0.3;
        const tertiaryWave = Math.sin(normalizedIndex * Math.PI * frequency * 4 + phase * 0.5) * 0.15;
        
        // Combine waves for more organic feel
        let value = mainWave + secondaryWave + tertiaryWave;
        
        // Add some randomness for realism if audio is active
        if (audioActive) {
          value += (Math.random() - 0.5) * 0.5;
        }
        
        // Normalize to 0-1 range
        return Math.max(0.1, Math.abs(value) * 0.9);
      });
    };
    
    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update phase
      phase += 0.03;
      
      // Simulate audio data
      const audioData = simulateAudioData();
      
      // Calculate total width needed for bars
      const totalBarWidth = barCount * (barWidth + barGap) - barGap;
      const startX = (canvas.width - totalBarWidth) / 2;
      
      // Draw bars
      audioData.forEach((value, i) => {
        const x = startX + i * (barWidth + barGap);
        const height = value * waveAmplitude;
        
        // Create gradient
        const gradient = ctx.createLinearGradient(0, canvas.height/2 - height, 0, canvas.height/2 + height);
        
        if (audioActive) {
          // Electric cyan to neural indigo when active
          gradient.addColorStop(0, '#00D2FF');
          gradient.addColorStop(0.5, '#33FFF3');
          gradient.addColorStop(1, '#5C33FF');
        } else {
          // Just electric cyan when idle
          gradient.addColorStop(0, '#00D2FF88');
          gradient.addColorStop(1, '#00D2FF');
        }
        
        ctx.fillStyle = gradient;
        
        // Draw rounded bar
        const barHeight = height * 2;
        const y = canvas.height/2 - height;
        roundRect(ctx, x, y, barWidth, barHeight, 2);
      });
      
      // Pulse effect every 4s
      const pulseInterval = 4000; // 4s
      const time = Date.now() % pulseInterval;
      if (time < 500) {
        const pulseProgress = time / 500; // 0 to 1 over 500ms
        const pulseSize = 1 + Math.sin(pulseProgress * Math.PI) * 0.2;
        
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 
               Math.min(canvas.width, canvas.height) * 0.3 * pulseSize,
               0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 210, 255, ${(1 - pulseProgress) * 0.3})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      
      if (isAnimating) {
        requestAnimationFrame(animate);
      }
    };
    
    // Helper function for drawing rounded rectangles
    const roundRect = (context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) => {
      context.beginPath();
      context.moveTo(x + radius, y);
      context.lineTo(x + width - radius, y);
      context.quadraticCurveTo(x + width, y, x + width, y + radius);
      context.lineTo(x + width, y + height - radius);
      context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      context.lineTo(x + radius, y + height);
      context.quadraticCurveTo(x, y + height, x, y + height - radius);
      context.lineTo(x, y + radius);
      context.quadraticCurveTo(x, y, x + radius, y);
      context.closePath();
      context.fill();
    };
    
    // Toggle audio active state every 6 seconds to simulate listening
    const audioToggleInterval = setInterval(() => {
      setAudioActive(prev => {
        const next = !prev;
        // When activating, make frequency more dynamic
        if (next) {
          frequency = 0.7 + Math.random() * 0.3;
          waveAmplitude = canvas.height / 3.5;
        } else {
          frequency = 0.5;
          waveAmplitude = canvas.height / 4;
        }
        return next;
      });
    }, 6000);
    
    animate();
    
    return () => {
      setIsAnimating(false);
      window.removeEventListener('resize', setCanvasDimensions);
      clearInterval(audioToggleInterval);
    };
  }, []);
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
      />
      <div className={`mt-4 text-sm font-light ${audioActive ? 'text-electric-cyan animate-pulse' : 'text-gray-400'}`}>
        {audioActive ? "Listening..." : "Click to speak"}
      </div>
    </div>
  );
};

export default WaveformAnimation;
