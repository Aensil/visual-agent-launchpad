
import React from 'react';
import { Mic, Code, Clock } from 'lucide-react';
import CTAButton from '@/components/CTAButton';
import BrowserMockup from '@/components/BrowserMockup';
import WaveformAnimation from '@/components/WaveformAnimation';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <div className="mb-8">
          <img 
            src="/lovable-uploads/e01af8db-8735-42de-adf8-38bb57beb961.png" 
            alt="VUEN AI Logo" 
            className="w-24 h-24 mx-auto"
          />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tight">VISUAL AGENTS ARE HERE</h1>
        <p className="text-xl md:text-2xl mb-12">Speak. Watch. Act. No code. No clicks.</p>
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
      </section>

      {/* Features Strip */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center">
            <Mic size={64} className="text-white mb-6" />
            <p className="text-base">Voice-First UI</p>
          </div>
          <div className="flex flex-col items-center">
            <Code size={64} className="text-white mb-6" />
            <p className="text-base">No-Code Builder</p>
          </div>
          <div className="flex flex-col items-center">
            <Clock size={64} className="text-white mb-6" />
            <p className="text-base">&lt;200 ms Updates</p>
          </div>
        </div>
      </section>

      {/* Demo Teaser */}
      <section className="py-24 px-4 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <BrowserMockup>
            <div className="w-3/4 h-24 rounded flex items-center justify-center">
              <WaveformAnimation />
            </div>
          </BrowserMockup>
          <p className="text-2xl mb-8 mt-12">See it in action</p>
          <CTAButton 
            variant="primary" 
            onClick={() => console.log('Try Live Demo clicked')}
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
