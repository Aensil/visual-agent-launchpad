import React, { useRef } from 'react';
import CTAButton from '@/components/CTAButton';

const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="relative py-16 px-4 bg-black border-t border-gray-800 z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <p className="text-xl mb-8 md:mb-0">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-electric-cyan">
            Ready to build your own Visual Agent?
          </span>
        </p>
        <div className="flex flex-col sm:flex-row gap-6">
          <CTAButton 
            variant="primary" 
            onClick={() => window.location.href = "https://app.vuen.org"}
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
  );
};

export default CTASection;
