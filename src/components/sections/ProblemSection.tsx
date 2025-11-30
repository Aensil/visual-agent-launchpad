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
    <section className="py-24 px-4 bg-black relative z-10" aria-label="Problem Section">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-kinetic-magenta to-neural-indigo">
              If this sounds like you, your BI is failing you.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            You're not short on tools. You're short on answers when it matters – in front of your team, your investors, your customers.
          </p>
        </div>

        {/* Problem Bullets */}
        <div className="space-y-6 mb-12">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm hover:border-kinetic-magenta/50 transition-all duration-300"
            >
              <p className="text-white font-semibold text-lg mb-2">
                {problem.text}
              </p>
              <p className="text-white/50 italic">
                {problem.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Punchline */}
        <div className="text-center">
          <p className="text-xl md:text-2xl font-bold text-white">
            You don't have a data problem.{' '}
            <span className="text-kinetic-magenta">
              You have a "cannot answer on the spot" problem.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
