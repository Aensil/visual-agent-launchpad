import React, { useEffect, useCallback } from 'react';

interface WaitlistModalProps {
  onClose: () => void;
}

const WaitlistModal: React.FC<WaitlistModalProps> = ({ onClose }) => {
  // Close on escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [handleKeyDown]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-void/80 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-lg glass-panel-elevated p-8 animate-fade-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-primary transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="text-center">
          {/* Icon */}
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary-cyan/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-primary-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <h3 id="modal-title" className="text-2xl font-bold text-text-primary mb-4">
            Join the Waitlist
          </h3>

          <p className="text-text-secondary mb-6">
            Scroll down to the waitlist form to apply for early access. We'll review your use case and reach out if it's a good fit.
          </p>

          <button
            onClick={() => {
              onClose();
              const waitlistSection = document.getElementById('waitlist-section');
              if (waitlistSection) {
                waitlistSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="btn-primary px-8 py-3 text-lg"
          >
            Go to Waitlist Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaitlistModal;
