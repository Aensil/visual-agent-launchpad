import React, { useState } from 'react';

interface WaitlistFormSectionProps {
  hasScrolled?: boolean;
  prefersReducedMotion?: boolean;
}

const WaitlistFormSection: React.FC<WaitlistFormSectionProps> = () => {
  const [formData, setFormData] = useState({
    painfulMoment: '',
    currentTools: '',
    liveMeetingWish: '',
    holyShitMoment: '',
    email: '',
    name: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Redirect to app.vuen.ai for login/signup
      window.location.href = 'https://app.vuen.ai';
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Form submission error:', err);
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="waitlist-section" className="py-24 px-4 bg-void relative z-10" aria-label="Waitlist Section">
        <div className="max-w-2xl mx-auto text-center">
          <div className="glass-panel-elevated p-12 glass-glow-success">
            <div className="w-16 h-16 rounded-full bg-status-success/20 border border-status-success/30 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-status-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-4">You're in the queue.</h3>
            <p className="text-text-secondary">
              If your use case is a strong fit, we'll reach out with next steps. If not, we won't waste your time.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="waitlist-section" className="py-24 px-4 bg-void relative z-10" aria-label="Waitlist Section">
      <div className="max-w-2xl mx-auto">
        {/* Top Text */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Tell us where your current tools fail you.
          </h2>
          <p className="text-lg text-text-secondary">
            We only say yes if we can clearly beat them.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
              Your name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input-glass"
              placeholder="Jane Smith"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
              Work email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-glass"
              placeholder="jane@company.com"
            />
          </div>

          {/* Painful Moment */}
          <div>
            <label htmlFor="painfulMoment" className="block text-sm font-medium text-text-secondary mb-2">
              What's the most painful reporting or data moment in your week?
            </label>
            <textarea
              id="painfulMoment"
              name="painfulMoment"
              value={formData.painfulMoment}
              onChange={handleChange}
              required
              rows={3}
              className="input-glass resize-none"
              placeholder="Tell us about the moment that makes you want to throw your laptop..."
            />
          </div>

          {/* Current Tools */}
          <div>
            <label htmlFor="currentTools" className="block text-sm font-medium text-text-secondary mb-2">
              What tools are you using today (Power BI, Excel, Tableau, etc.)?
            </label>
            <input
              type="text"
              id="currentTools"
              name="currentTools"
              value={formData.currentTools}
              onChange={handleChange}
              required
              className="input-glass"
              placeholder="Power BI, Excel, Google Sheets, Looker..."
            />
          </div>

          {/* Live Meeting Wish */}
          <div>
            <label htmlFor="liveMeetingWish" className="block text-sm font-medium text-text-secondary mb-2">
              What do you wish you could do live in a meeting that you can't do now?
            </label>
            <textarea
              id="liveMeetingWish"
              name="liveMeetingWish"
              value={formData.liveMeetingWish}
              onChange={handleChange}
              required
              rows={3}
              className="input-glass resize-none"
              placeholder="Answer a follow-up question without saying 'let me check'..."
            />
          </div>

          {/* Holy Shit Moment */}
          <div>
            <label htmlFor="holyShitMoment" className="block text-sm font-medium text-text-secondary mb-2">
              If Vuen worked perfectly, what would be the first "holy shit" moment for you and your team?
            </label>
            <textarea
              id="holyShitMoment"
              name="holyShitMoment"
              value={formData.holyShitMoment}
              onChange={handleChange}
              required
              rows={3}
              className="input-glass resize-none"
              placeholder="When I ask 'why are we down in Q3' and the answer just appears..."
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-status-error text-sm text-center glass-panel p-3">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Join the waitlist'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default WaitlistFormSection;
