import React from 'react';

interface ProblemSectionProps {
  hasScrolled?: boolean;
  prefersReducedMotion?: boolean;
}

const ProblemSection: React.FC<ProblemSectionProps> = () => {
  const problems = [
    {
      text: 'You ask a simple question and the room dies.',
      detail: '"Give me a second, let me find the dashboard… what\'s the filter again?"'
    },
    {
      text: 'You pay for Power BI/Tableau/Looker, but 90% of the company never logs in.',
      detail: 'They take screenshots, export to PowerPoint, or "follow up in an email."'
    },
    {
      text: 'Follow-up questions kill momentum.',
      detail: '"And what about by region? By channel? Last year?" → 10 more clicks, 0 conviction.'
    },
    {
      text: 'Only a couple of analysts know how to drive the tools.',
      detail: 'Everyone else nods along, half blind.'
    },
    {
      text: 'Latency makes you look weak.',
      detail: 'Waiting 2–5 seconds every time you click feels like the tool is thinking harder than your team.'
    }
  ];

  return (
    <section className="py-24 px-4 section-gradient-magenta relative z-10" aria-label="Problem Section">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="heading-gradient-warm">
              If this sounds like you, your BI is failing you.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
            You're not short on tools. You're short on answers when it matters – in front of your team, your investors, your customers.
          </p>
        </div>

        {/* Problem Bullets */}
        <div className="space-y-4 mb-12">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="glass-panel p-6 hover:glass-glow-magenta transition-all duration-300 group"
            >
              <p className="text-text-primary font-semibold text-lg mb-2 group-hover:text-accent-magenta transition-colors">
                {problem.text}
              </p>
              <p className="text-text-muted italic">
                {problem.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Punchline */}
        <div className="text-center">
          <p className="text-xl md:text-2xl font-bold text-text-primary">
            You don't have a data problem.{' '}
            <span className="text-accent-magenta text-glow-magenta">
              You have a "cannot answer on the spot" problem.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
