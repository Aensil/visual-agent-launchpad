import React, { useRef, useState } from 'react';
import CTAButton from '@/components/CTAButton';
import WaitlistModal from '@/components/WaitlistModal';

interface HeroSectionProps {
  isLoaded: boolean;
  idleTime: number;
  prefersReducedMotion: boolean;
}

const HeroSection = ({ isLoaded, idleTime, prefersReducedMotion }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  
  const handleTryDemoClick = () => {
    window.location.href = "https://real-estate.vuen.org/";
  };
  
  const openWaitlistModal = () => {
    setShowWaitlistModal(true);
  };
  
  const closeWaitlistModal = () => {
    setShowWaitlistModal(false);
  };
  
  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center z-10">
      <div 
        className="mb-8 transition-transform duration-500 ease-out" 
        style={{
          transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
          opacity: isLoaded ? 1 : 0,
        }}
      >
        <div className="relative">
          <img 
            src="/lovable-uploads/e01af8db-8735-42de-adf8-38bb57beb961.png" 
            alt="VUEN AI Logo" 
            className="w-24 h-24 mx-auto animate-fade-in relative z-10"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-electric-cyan/20 blur-xl animate-pulse-glow"></div>
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
        className="text-xl md:text-2xl mb-6 transition-all duration-600 delay-400"
        style={{
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
          transitionDelay: '400ms',
        }}
      >
        Speak. Watch. Act. <span className="text-electric-cyan">No code.</span> <span className="text-neural-indigo">No clicks.</span>
      </p>
      

      
      <div className="mb-8 w-full max-w-4xl">
        <div className="relative">
          <iframe
            width="100%"
            height="400"
            src="https://www.youtube.com/embed/TS1T9m-HKk8?autoplay=1&mute=1&playsinline=1&enablejsapi=1"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className="bg-gray-200 relative z-10 rounded-lg"
            allowFullScreen
          ></iframe>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[102%] h-[102%] rounded-lg bg-electric-cyan/20 blur-xl animate-pulse-glow -z-10"></div>
        </div>
      </div> 
      
      <div
        className={`flex flex-col sm:flex-row gap-6 transition-all duration-300 ${
          idleTime > 8 && !prefersReducedMotion ? 'animate-nudge' : ''
        }`}
      >
        <CTAButton
          variant="primary"
          onClick={handleTryDemoClick}
          className={`transition-all duration-200 ${idleTime > 8 ? 'animate-attention' : ''}`}
        >
          Try Demo
        </CTAButton>
        <CTAButton
          variant="secondary"
          onClick={openWaitlistModal}
        >
          Join Waiting List
        </CTAButton>
      </div>
      
      
      
      {/* Modal para la lista de espera */}
      {showWaitlistModal && (
        <WaitlistModal onClose={closeWaitlistModal} />
      )}
    </section>
  );
};

export default HeroSection;
