
import React, { useRef } from 'react';
import { Brain, Rocket, Layers } from 'lucide-react';

const TechnologySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const technologies = [
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
  ];

  return (
    <section ref={sectionRef} className="relative py-24 px-4 bg-black z-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-electric-cyan via-neural-indigo to-kinetic-magenta">
            Cutting-Edge Technology
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {technologies.map((item, index) => (
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
  );
};

export default TechnologySection;
