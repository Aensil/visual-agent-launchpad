import React from 'react';
import WaitlistForm from '@/components/WaitlistForm';

interface WaitlistModalProps {
  onClose: () => void;
}

const WaitlistModal: React.FC<WaitlistModalProps> = ({ onClose }) => {
  // Para evitar que los clics dentro del formulario cierren el modal
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={stopPropagation}
      >
        <div className="bg-[#030311] border border-white/10 rounded-2xl shadow-xl">
          <div className="p-4 flex justify-between items-center border-b border-white/10">
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-electric-cyan to-neural-indigo">
              Joint into the waitlist
            </h2>
            <button 
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div className="p-6">
            <WaitlistForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitlistModal;