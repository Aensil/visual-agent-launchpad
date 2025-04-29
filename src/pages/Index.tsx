
import React, { useEffect, useState, useRef } from 'react';
import { Mic, Code, Clock, Brain, Rocket, Layers } from 'lucide-react';
import CTAButton from '@/components/CTAButton';
import BrowserMockup3D from '@/components/BrowserMockup3D';
import WaveformAnimation from '@/components/WaveformAnimation';
import ParticleBackground from '@/components/ParticleBackground';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [idleTime, setIdleTime] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  
  useEffect(() => {
    // Page load animation trigger
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    // Scroll detection
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 100);
      setIdleTime(0); // Reset idle time on scroll
    };
    
    // Idle time tracking for CTA nudge
    const idleTimer = setInterval(() => {
      setIdleTime(prev => prev + 1);
    }, 1000);
    
    // Custom cursor effect
    const handleMouseMove = (e: MouseEvent) => {
      setIdleTime(0); // Reset idle time on mouse movement
      
      if (cursorRef.current) {
        // Add slight lag to cursor movement for smoother effect
        setCursorPosition({
          x: e.clientX,
          y: e.clientY
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', () => setIdleTime(0));
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(idleTimer);
    };
  }, []);
  
  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`;
    }
  }, [cursorPosition]);
  
  // Check if reduced motion is preferred
  const prefersReducedMotion = 
    typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
      : false;

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Custom cursor effect */}
      {!prefersReducedMotion && (
        <div 
          ref={cursorRef}
          className="fixed w-6 h-6 rounded-full border-2 border-electric-cyan pointer-events-none z-50 mix-blend-difference hidden sm:block"
          style={{
            transition: 'transform 0.1s ease-out',
            top: '-3px',
            left: '-3px'
          }}
        ></div>
      )}
      
      {/* Interactive background */}
      <ParticleBackground />
      
      {/* Additional background effects */}
      <div className="fixed inset-0 futuristic-grid z-0 opacity-30"></div>
      
      {/* Hero Section */}
      <section ref={el => sectionRefs.current[0] = el} className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center z-10">
        <div className="mb-8 transition-transform duration-500 ease-out" style={{
          transform: isLoaded ? 'translateY(0)' : 'translateY(-20px)',
          opacity: isLoaded ? 1 : 0,
        }}>
          <div className="relative">
            <img 
              src="/lovable-uploads/e01af8db-8735-42de-adf8-38bb57beb961.png" 
              alt="VUEN AI Logo" 
              className="w-24 h-24 mx-auto animate-fade-in relative z-10"
            />
            {!prefersReducedMotion && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-electric-cyan/20 blur-xl animate-pulse-glow"></div>
            )}
          </div>
        </div>
        
        <h1 
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tight transition-all duration-800 relative"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'scale(1)' : 'scale(0.95)',
          }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-electric-cyan via-neural-indigo to-kinetic-magenta animate-gradient-cycle bg-[length:400%_100%]">
            VISUAL AGENTS ARE HERE
          </span>
          {!prefersReducedMotion && (
            <div className="absolute -inset-1 bg-gradient-to-r from-electric-cyan/20 via-neural-indigo/20 to-kinetic-magenta/20 rounded-lg blur-xl opacity-50 -z-10 animate-gradient-cycle"></div>
          )}
        </h1>
        
        <p 
          className="text-xl md:text-2xl mb-12 transition-all duration-600 delay-400"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '400ms',
          }}
        >
          Speak. Watch. Act. <span className="text-electric-cyan">No code.</span> <span className="text-neural-indigo">No clicks.</span>
        </p>
        
        <div 
          className={`flex flex-col sm:flex-row gap-6 transition-all duration-300 ${
            idleTime > 8 && !prefersReducedMotion ? 'animate-nudge' : ''
          }`}
        >
          <CTAButton 
            variant="primary" 
            onClick={() => console.log('Try Demo clicked')}
            className={`transition-all duration-200 ${idleTime > 8 ? 'animate-attention' : ''}`}
          >
            Try Demo
          </CTAButton>
          <CTAButton 
            variant="secondary" 
            onClick={() => console.log('Join Waiting List clicked')}
          >
            Join Waiting List
          </CTAButton>
        </div>
        
        {/* Scroll indicator */}
        {!prefersReducedMotion && (
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
            <span className="text-sm text-gray-400 mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center items-start p-1">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-float"></div>
            </div>
          </div>
        )}
      </section>

      {/* Features Strip */}
      <section ref={el => sectionRefs.current[1] = el} className="relative py-20 px-4 bg-black z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { Icon: Mic, text: "Voice-First UI", delay: 0 },
            { Icon: Code, text: "No-Code Builder", delay: 100 },
            { Icon: Clock, text: "<200 ms Updates", delay: 200 }
          ].map((feature, index) => (
            <div 
              key={index}
              className={`flex flex-col items-center transition-all duration-600 dynamic-border neumorphic p-8 rounded-lg ${
                hasScrolled && !prefersReducedMotion ? 'animate-slide-in-up' : 'opacity-0'
              }`}
              style={{ 
                animationDelay: `${feature.delay}ms`,
                animationFillMode: 'forwards'
              }}
            >
              <div className="relative mb-6">
                <feature.Icon size={64} className={`text-white relative z-10 ${!prefersReducedMotion ? 'animate-float' : ''}`} />
                {!prefersReducedMotion && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-electric-cyan/20 blur-md"></div>
                )}
              </div>
              <p className="text-base relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-electric-cyan to-white">
                  {feature.text}
                </span>
              </p>
            </div>
          ))}
        </div>

        <div className="mt-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className={`transition-all duration-500 ${hasScrolled ? 'animate-slide-in-left' : 'opacity-0'}`}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-electric-cyan to-neural-indigo">
                  Revolutionary Voice Interface
                </span>
              </h2>
              <p className="text-lg mb-6 text-gray-300">
                Our AI understands natural language and context, enabling you to build complex interfaces with simple voice commands.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Intuitive", "Fast", "Powerful", "Accessible"].map((tag, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 rounded-full text-sm border border-white/20 bg-neural-indigo/10 backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className={`transition-all duration-500 delay-300 ${hasScrolled ? 'animate-slide-in-right' : 'opacity-0'}`}>
              <div className="w-full h-64 rounded-lg bg-black/50 border border-white/10 overflow-hidden relative glassmorphism">
                <div className="absolute inset-0 mesh-gradient"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 h-24 flex items-center justify-center">
                    <div className="relative">
                      <div className="text-base text-electric-cyan mb-4">"Create a profile page with a 3D avatar"</div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2">
                        <div className="flex items-center justify-center space-x-1">
                          <div className="w-2 h-2 bg-electric-cyan rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-electric-cyan rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-electric-cyan rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Teaser */}
      <section ref={el => sectionRefs.current[2] = el} className="relative py-24 px-4 bg-black z-10">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="relative transition-all duration-500 ease-out" style={{
            transform: hasScrolled ? 'translateY(0)' : 'translateY(30px)',
            opacity: hasScrolled ? 1 : 0,
          }}>
            <BrowserMockup3D>
              <div className="w-full h-full rounded flex items-center justify-center bg-black relative overflow-hidden">
                <div className="absolute inset-0 mesh-gradient opacity-30"></div>
                <div className="relative z-10 w-3/4 h-48 flex flex-col items-center">
                  <WaveformAnimation />
                </div>
              </div>
            </BrowserMockup3D>
          </div>
          
          <p className="text-2xl mb-8 mt-12 transition-all duration-500" style={{
            transform: hasScrolled ? 'translateY(0)' : 'translateY(20px)',
            opacity: hasScrolled ? 1 : 0,
            transitionDelay: '200ms',
          }}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-electric-cyan to-neural-indigo">
              See it in action
            </span>
          </p>
          
          <CTAButton 
            variant="primary" 
            onClick={() => console.log('Try Live Demo clicked')}
            className="transition-all duration-500"
            style={{
              transform: hasScrolled ? 'translateY(0)' : 'translateY(20px)',
              opacity: hasScrolled ? 1 : 0,
              transitionDelay: '300ms',
            }}
          >
            Try Live Demo
          </CTAButton>
        </div>
      </section>

      {/* Technology Section */}
      <section ref={el => sectionRefs.current[3] = el} className="relative py-24 px-4 bg-black z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-electric-cyan via-neural-indigo to-kinetic-magenta">
              Cutting-Edge Technology
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                Icon: Brain, 
                title: "Neural Processing", 
                description: "Our AI processes voice commands with precise understanding of intent and context." 
              },
              { 
                Icon: Rocket, 
                title: "Real-time Rendering", 
                description: "See your changes instantly with our ultrafast rendering engine." 
              },
              { 
                Icon: Layers, 
                title: "Adaptive Interfaces", 
                description: "UI components that learn from your preferences and adapt automatically." 
              },
            ].map((item, index) => (
              <div 
                key={index} 
                className="glassmorphism rounded-lg p-6 border border-white/10 backdrop-blur-md transition-all hover:scale-105 duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-electric-cyan/20 to-neural-indigo/20 flex items-center justify-center mr-4">
                    <item.Icon size={24} className="text-electric-cyan" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                </div>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Bar */}
      <section ref={el => sectionRefs.current[4] = el} className="relative py-16 px-4 bg-black border-t border-gray-800 z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <p className="text-xl mb-8 md:mb-0">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-electric-cyan">
              Ready to build your own Visual Agent?
            </span>
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <CTAButton 
              variant="primary" 
              onClick={() => console.log('Try Demo clicked')}
            >
              Try Demo
            </CTAButton>
            <CTAButton 
              variant="secondary" 
              onClick={() => console.log('Join Waiting List clicked')}
            >
              Join Waiting List
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-4 bg-black border-t border-gray-800 z-10">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <img 
            src="/lovable-uploads/e01af8db-8735-42de-adf8-38bb57beb961.png" 
            alt="VUEN AI Logo" 
            className="w-12 h-12 mb-4"
          />
          <p className="text-sm text-gray-400">© 2025 VUEN AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
