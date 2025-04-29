
import React, { useEffect, useState } from 'react';
import { Mic, Code, Clock } from 'lucide-react';
import CTAButton from '@/components/CTAButton';
import BrowserMockup from '@/components/BrowserMockup';
import WaveformAnimation from '@/components/WaveformAnimation';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [idleTime, setIdleTime] = useState(0);

  useEffect(() => {
    // Page load animation trigger
    setIsLoaded(true);
    
    // Scroll detection
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 100);
      setIdleTime(0); // Reset idle time on scroll
    };
    
    // Idle time tracking for CTA nudge
    const idleTimer = setInterval(() => {
      setIdleTime(prev => prev + 1);
    }, 1000);
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', () => setIdleTime(0));
    window.addEventListener('click', () => setIdleTime(0));
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(idleTimer);
    };
  }, []);
  
  // Check if reduced motion is preferred
  const prefersReducedMotion = 
    typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
      : false;

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <div className="mb-8 transition-transform duration-500 ease-out" style={{
          transform: isLoaded ? 'translateY(0)' : 'translateY(-20px)',
          opacity: isLoaded ? 1 : 0,
        }}>
          <img 
            src="/lovable-uploads/e01af8db-8735-42de-adf8-38bb57beb961.png" 
            alt="VUEN AI Logo" 
            className="w-24 h-24 mx-auto animate-fade-in"
          />
        </div>
        <h1 
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tight transition-all duration-800"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'scale(1)' : 'scale(0.95)',
          }}
        >
          VISUAL AGENTS ARE HERE
        </h1>
        <p 
          className="text-xl md:text-2xl mb-12 transition-all duration-600 delay-400"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '400ms',
          }}
        >
          Speak. Watch. Act. No code. No clicks.
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
      </section>

      {/* Features Strip */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div 
            className={`flex flex-col items-center transition-all duration-600 ${
              hasScrolled && !prefersReducedMotion ? 'animate-slide-in-up' : ''
            }`}
            style={{ animationDelay: '0ms' }}
          >
            <Mic size={64} className="text-white mb-6" />
            <p className="text-base">Voice-First UI</p>
          </div>
          <div 
            className={`flex flex-col items-center transition-all duration-600 ${
              hasScrolled && !prefersReducedMotion ? 'animate-slide-in-up' : ''
            }`}
            style={{ animationDelay: '100ms' }}
          >
            <Code size={64} className="text-white mb-6" />
            <p className="text-base">No-Code Builder</p>
          </div>
          <div 
            className={`flex flex-col items-center transition-all duration-600 ${
              hasScrolled && !prefersReducedMotion ? 'animate-slide-in-up' : ''
            }`}
            style={{ animationDelay: '200ms' }}
          >
            <Clock size={64} className="text-white mb-6" />
            <p className="text-base">&lt;200 ms Updates</p>
          </div>
        </div>
      </section>

      {/* Demo Teaser */}
      <section className="py-24 px-4 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="relative transition-all duration-500 ease-out transform" style={{
            transform: hasScrolled ? 'translateY(0)' : 'translateY(30px)',
            opacity: hasScrolled ? 1 : 0,
          }}>
            <BrowserMockup>
              <div className="w-3/4 h-24 rounded flex items-center justify-center">
                <WaveformAnimation />
              </div>
            </BrowserMockup>
          </div>
          <p className="text-2xl mb-8 mt-12 transition-all duration-500" style={{
            transform: hasScrolled ? 'translateY(0)' : 'translateY(20px)',
            opacity: hasScrolled ? 1 : 0,
            transitionDelay: '200ms',
          }}>See it in action</p>
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

      {/* Final CTA Bar */}
      <section className="py-16 px-4 bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <p className="text-xl mb-8 md:mb-0">Ready to build your own Visual Agent?</p>
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
      <footer className="py-8 px-4 bg-black border-t border-gray-800">
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
