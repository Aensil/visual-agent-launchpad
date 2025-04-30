
import React, { useRef } from 'react';
import BrowserMockup3D from '@/components/BrowserMockup3D';
import WaveformAnimation from '@/components/WaveformAnimation';
import CTAButton from '@/components/CTAButton';

interface DemoTeaserSectionProps {
  hasScrolled: boolean;
}

const DemoTeaserSection = ({ hasScrolled }: DemoTeaserSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="relative py-24 px-4 bg-black z-10">
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
  );
};

export default DemoTeaserSection;
