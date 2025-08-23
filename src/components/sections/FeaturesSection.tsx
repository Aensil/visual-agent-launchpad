import React, { useRef, useMemo } from 'react';
import { Mic, Code, Clock, Brain } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface FeaturesSectionProps {
  hasScrolled: boolean;
  prefersReducedMotion: boolean;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ 
  hasScrolled, 
  prefersReducedMotion 
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();
  
  const features = useMemo(() => [
    { Icon: Mic, text: t('features.voiceFirst'), delay: 0, description: "Voice-first user interface for natural interaction" },
    { Icon: Code, text: t('features.noCode'), delay: 100, description: "Build interfaces without writing code" },
    { Icon: Brain, text: t('features.llmPowered'), delay: 200, description: "Powered by advanced language models" }
  ], [t]);

  return (
    <section 
      ref={sectionRef} 
      className="py-20 px-4 bg-black z-10"
      role="region"
      aria-label="Key Features"
    >
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-electric-cyan to-neural-indigo">
              Core Features
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Revolutionary AI-powered features that transform how you create digital interfaces
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <article 
              key={index}
              className={`flex flex-col items-center transition-all duration-600 dynamic-border neumorphic p-8 rounded-lg ${
                hasScrolled && !prefersReducedMotion ? 'animate-slide-in-up' : 'opacity-0'
              }`}
              style={{ 
                animationDelay: `${feature.delay}ms`,
                animationFillMode: 'forwards'
              }}
              role="article"
              aria-label={`Feature: ${feature.text}`}
            >
              <div className="relative mb-6">
                <feature.Icon 
                  size={64} 
                  className={`text-white relative z-10 ${!prefersReducedMotion ? 'animate-float' : ''}`}
                  aria-hidden="true"
                />
                {!prefersReducedMotion && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-electric-cyan/20 blur-md"></div>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-electric-cyan to-white">
                  {feature.text}
                </span>
              </h3>
              <p className="text-sm text-gray-400 text-center">
                {feature.description}
              </p>
            </article>
          ))}
        </div>

        <VoiceInterfaceSection hasScrolled={hasScrolled} />
      </div>
    </section>
  );
};

// Nested component for voice interface part
const VoiceInterfaceSection: React.FC<{ hasScrolled: boolean }> = ({ hasScrolled }) => {
  const { t } = useTranslation();
  
  return (
    <article className="mt-24 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className={`transition-all duration-500 ${hasScrolled ? 'animate-slide-in-left' : 'opacity-0'}`}>
          <header>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-electric-cyan to-neural-indigo">
                {t('features.revolutionaryTitle')}
              </span>
            </h2>
          </header>
          <p className="text-lg mb-6 text-gray-300">
            {t('features.revolutionaryDesc')}
          </p>
          <div className="flex flex-wrap gap-3" role="list" aria-label="Technology tags">
            {t('features.tags', { returnObjects: true }).map((tag, i) => (
              <span 
                key={i} 
                className="px-3 py-1 rounded-full text-sm border border-white/20 bg-neural-indigo/10 backdrop-blur-sm"
                role="listitem"
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
                  <blockquote className="text-base text-electric-cyan mb-4" cite="#">
                    "{t('features.voiceExample')}"
                  </blockquote>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2">
                    <div className="flex items-center justify-center space-x-1" aria-label="Processing indicator">
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
    </article>
  );
};

export default FeaturesSection;
