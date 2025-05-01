import React, { useRef } from 'react';
import { Mic, Code, Clock } from 'lucide-react';

interface FeaturesSectionProps {
  hasScrolled: boolean;
  prefersReducedMotion: boolean;
}

const FeaturesSection = ({ hasScrolled, prefersReducedMotion }: FeaturesSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const features = [
    { Icon: Mic, text: "Voice-First UI", delay: 0 },
    { Icon: Code, text: "No-Code Builder", delay: 100 },
    { Icon: Clock, text: "<200 ms Updates", delay: 200 }
  ];

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-black z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {features.map((feature, index) => (
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

      <VoiceInterfaceSection hasScrolled={hasScrolled} />
    </section>
  );
};

// Nested component for voice interface part
const VoiceInterfaceSection = ({ hasScrolled }: { hasScrolled: boolean }) => {
  return (
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
  );
};

export default FeaturesSection;
