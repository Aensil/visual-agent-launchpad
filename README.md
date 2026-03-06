# Vuen AI – Visual Agent Launchpad

The official website for [Vuen AI](https://vuen.ai) — a voice-first Visual Data Agent that replaces traditional dashboards with real-time, conversational data exploration.

> **Talk to your data. Get answers in seconds. No dashboards. No waiting.**

## What is a Visual Agent?

A **Visual Agent** is an AI system that bridges the gap between raw data and human understanding through conversation. Instead of building dashboards, writing queries, or waiting on analyst teams, users simply speak to the agent and receive live visualizations and spoken explanations in return.

Here's how it works:

1. **Listen** — The agent receives a spoken question in natural language (e.g., "Show me revenue by region for Q4")
2. **Understand** — It interprets intent, identifies the relevant data sources, and plans the best visualization
3. **Fetch** — It queries connected SQL databases, Excel files, Google Sheets, or APIs in real time
4. **Visualize** — It generates the right chart type automatically — bar charts, line graphs, flow diagrams, maps, or metrics cards — rendered live while the user is still speaking
5. **Explain** — It verbally narrates the key patterns, anomalies, and actionable recommendations from the data

This creates a fundamentally different BI experience: instead of static reports that go stale, users have a live conversation with their data through a signature 3D animated orb interface.

## Why Visual Agents?

Traditional business intelligence is broken for the people who need it most:

- **Executives** wait days for analyst-prepared reports that answer yesterday's questions
- **Operations teams** toggle between dozens of pre-built dashboards hoping one has the right view
- **Finance teams** export data to spreadsheets just to slice it a different way

Visual Agents solve this by making data exploration as natural as asking a question. No SQL knowledge required. No dashboard configuration. No waiting. The AI handles the entire pipeline from question to insight.

## Who It's For

| Role | Use Case |
|------|----------|
| **Founders & CEOs** | Instant decision intelligence — ask about revenue, growth, churn, or unit economics on the fly |
| **Operations Teams** | Query-driven insights into logistics, fulfillment, inventory, and process bottlenecks |
| **Finance & BI Analysts** | Real-time reporting and ad-hoc analysis without writing SQL or building new views |
| **Real Estate Professionals** | Property performance, market comparisons, and portfolio analysis through conversation |

## About This Repository

This repository contains the marketing website and landing page that introduces the Visual Agent concept to the world. It is built as a high-performance, multilingual single-page application designed to communicate Vuen AI's vision and convert visitors into early adopters.

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 5 (SWC plugin) |
| Styling | Tailwind CSS 3 + custom "Serious Future" design system |
| Animation | Custom Canvas-based 3D orb (lightweight alternative to Three.js) |
| Routing | React Router v6 |
| i18n | Custom JSON-based translation system (6 languages) |
| SEO | react-helmet-async with structured data |
| Icons | Lucide React |
| Font | Inter (Google Fonts) |
| Deployment | GitHub Pages via GitHub Actions CI/CD |
| Domain | [vuen.ai](https://vuen.ai) |

### Project Structure

```
src/
├── App.tsx                     # Root component with lazy-loaded routing
├── main.tsx                    # Entry point
├── components/
│   ├── Header.tsx              # Fixed navigation with language switcher
│   ├── CTAButton.tsx           # Reusable call-to-action button
│   ├── OrbCanvas.tsx           # Custom canvas-based 3D orb animation
│   ├── OrbToGraphsAnimation.tsx # Hero demo: orb transforms into live charts
│   ├── LanguageSwitcher.tsx    # Language selection dropdown
│   ├── SEO.tsx                 # Per-page meta tags and structured data
│   ├── WaitlistModal.tsx       # Waitlist signup modal
│   └── sections/
│       ├── HeroSection.tsx     # Primary CTA with animated orb demo
│       ├── ProblemSection.tsx  # Pain points of traditional BI
│       ├── SolutionSection.tsx # Visual Agent value pillars
│       ├── FeaturesSection.tsx # 6 core capabilities with demo video
│       ├── SocialProofSection.tsx
│       ├── TestimonialsSection.tsx
│       ├── PricingSection.tsx  # Free / Pro / Enterprise tiers
│       ├── FounderSection.tsx  # Founder story
│       ├── UnderTheHoodSection.tsx # Backend tech credibility
│       ├── CTASection.tsx      # Final conversion prompt
│       ├── Footer.tsx
│       └── ...                 # Additional narrative sections
├── pages/
│   ├── Index.tsx               # Main landing page (composes all sections)
│   ├── ComingSoon.tsx          # Placeholder for upcoming pages
│   └── legal/
│       ├── Privacy.tsx
│       ├── Terms.tsx
│       └── Security.tsx
├── config/
│   └── site.ts                 # Centralized config: domains, SEO, nav, social links
├── hooks/
│   ├── useLanguage.tsx         # Language context with auto-detection
│   ├── useTranslation.ts      # Translation hook
│   └── useTheme.tsx            # Dark/light mode with system preference
├── i18n/
│   └── translations/          # en, es, fr, zh, hi, ar
└── lib/
    ├── languageDetection.ts    # IP geolocation + browser language detection
    └── supabaseclient.ts       # Legacy auth (redirects to app.vuen.ai)
```

### Design System: "Serious Future"

The site uses a custom design language built to feel premium, focused, and forward-looking:

- **Void background** — Deep navy-black (`#05070F`) eliminates distraction and creates depth
- **Accent triad** — Teal (`#00E5C8`) for action states, indigo (`#7C5CFA`) as a bridge, and violet (`#D946EF`) for active/speaking states
- **Glass morphism** — Frosted panels with `backdrop-blur` and subtle borders
- **Orb states** — The signature orb animates through breathing, listening, thinking, and speaking modes
- **Glow effects** — Layered radial gradients for visual depth
- **Dark/Light mode** — System preference detection with manual override and FOUC prevention

### Internationalization

6 languages with automatic detection via IP geolocation and browser preferences:

- English (default), Spanish, French, Mandarin Chinese, Hindi, Arabic (RTL supported)

## Getting Started

### Prerequisites

- Node.js >= 18
- npm

### Development

```bash
npm install           # Install dependencies
npm run dev           # Start dev server (port 8082)
npm run type-check    # TypeScript validation
npm run lint          # ESLint
npm run build         # Production build
npm run preview       # Preview production build
```

### Environment

No environment variables are required for the landing page. Authentication redirects to `app.vuen.ai`.

## Deployment

Automated via GitHub Actions on push to `main`:

1. Install dependencies (`npm ci`)
2. Build (`npm run build`)
3. Copy `index.html` → `404.html` for SPA routing
4. Deploy `dist/` to GitHub Pages

Custom domain `vuen.ai` configured via `CNAME`.

## Product Details

### Pricing

| | Free | Pro | Enterprise |
|---|------|-----|-----------|
| AI Interactions | 40/month | 600/month | Unlimited |
| Storage | 1 GB | 50 GB | Unlimited |
| Dashboards | 2 | Unlimited | Unlimited |
| Data Sources | File upload | 5 SQL connections | Unlimited |
| Voice Interface | — | Included | Included |
| SSO/SAML | — | — | Included |
| Price | Free | $200/month | Custom |

### Backend Architecture (Product)

The Visual Agent product (served at `app.vuen.ai`) is powered by:

- **FastAPI** — Backend API for data processing and agent orchestration
- **OpenAI Realtime API** — Live voice processing for sub-second response times
- **Per-tenant isolation** — Secure, isolated data storage per customer
- **SOC 2 compliance** — Enterprise-grade security with on-premise deployment options

## Contact

- General: hello@vuen.ai
- Founder: enoc.silva@vuen.ai
- Social: [@vuen.ai](https://instagram.com/vuen.ai) on Instagram, X, LinkedIn, Threads, and TikTok

## License

UNLICENSED — Proprietary software. All rights reserved.
