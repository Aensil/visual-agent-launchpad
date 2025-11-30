import React, { useState } from 'react';
import { domains } from '@/config/site';

interface PricingSectionProps {
  hasScrolled?: boolean;
  prefersReducedMotion?: boolean;
}

const PricingSection: React.FC<PricingSectionProps> = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Free',
      description: 'For individuals exploring AI-powered analytics',
      price: { monthly: 0, annual: 0 },
      features: [
        '100 queries/month',
        '1 data source',
        'Basic visualizations',
        'Community support',
      ],
      cta: 'Get Started',
      href: `${domains.app}/signup`,
      highlight: false,
    },
    {
      name: 'Pro',
      description: 'For teams that need real-time business intelligence',
      price: { monthly: 49, annual: 39 },
      features: [
        'Unlimited queries',
        '10 data sources',
        'Advanced visualizations',
        'Voice interface',
        'Custom dashboards',
        'Priority support',
        'API access',
      ],
      cta: 'Start Free Trial',
      href: `${domains.app}/signup?plan=pro`,
      highlight: true,
      badge: 'Most Popular',
    },
    {
      name: 'Enterprise',
      description: 'For organizations with advanced security & scale needs',
      price: { monthly: null, annual: null },
      priceLabel: 'Custom',
      features: [
        'Everything in Pro',
        'Unlimited data sources',
        'SSO & SAML',
        'Custom integrations',
        'Dedicated success manager',
        'SLA guarantee',
        'On-premise option',
        'Advanced security controls',
      ],
      cta: 'Contact Sales',
      href: `mailto:hello@vuen.ai?subject=Enterprise%20Inquiry`,
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="relative py-32 px-6">
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 100%, rgba(75, 63, 227, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 20% 80%, rgba(0, 212, 255, 0.05) 0%, transparent 50%)
          `,
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto mb-10">
            Start free. Upgrade when you're ready. No hidden fees.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-4 p-1.5 rounded-full bg-white/[0.03] border border-white/10">
            <button
              onClick={() => setIsAnnual(false)}
              className={`
                px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${!isAnnual
                  ? 'bg-white text-void'
                  : 'text-white/60 hover:text-white'
                }
              `}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`
                px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${isAnnual
                  ? 'bg-white text-void'
                  : 'text-white/60 hover:text-white'
                }
              `}
            >
              Annual
              <span className="ml-2 text-xs text-status-success">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`
                relative rounded-2xl p-8 transition-all duration-500
                ${plan.highlight
                  ? 'bg-gradient-to-b from-white/[0.08] to-white/[0.02] border-2 border-primary-cyan/30 scale-[1.02] shadow-[0_0_60px_rgba(0,212,255,0.15)]'
                  : 'bg-white/[0.02] border border-white/10 hover:border-white/20'
                }
              `}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 text-xs font-semibold text-void bg-primary-cyan rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan header */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-white/40">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-8">
                {plan.priceLabel ? (
                  <div className="text-4xl font-bold text-white">{plan.priceLabel}</div>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-white">
                      ${isAnnual ? plan.price.annual : plan.price.monthly}
                    </span>
                    {plan.price.monthly !== 0 && (
                      <span className="text-white/40">/month</span>
                    )}
                  </div>
                )}
                {plan.price.monthly !== 0 && plan.price.annual !== null && (
                  <p className="text-sm text-white/30 mt-2">
                    {isAnnual ? 'Billed annually' : 'Billed monthly'}
                  </p>
                )}
              </div>

              {/* CTA */}
              <a
                href={plan.href}
                className={`
                  block w-full py-3 px-6 rounded-full text-center font-semibold
                  transition-all duration-300
                  ${plan.highlight
                    ? 'bg-gradient-to-r from-primary-cyan to-deep-indigo text-white hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] hover:scale-[1.02]'
                    : 'bg-white/10 text-white hover:bg-white/20'
                  }
                `}
              >
                {plan.cta}
              </a>

              {/* Features */}
              <ul className="mt-8 space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg
                      className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.highlight ? 'text-primary-cyan' : 'text-white/40'}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-white/60">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-sm text-white/30 mt-12">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
