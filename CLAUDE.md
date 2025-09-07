# Project Context for Claude

## Project Overview
Visual Agent Launchpad - A React-based web application for showcasing AI visual agents and their capabilities.

## Tech Stack
- React with TypeScript
- Vite as build tool
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation

## Project Structure
```
src/
├── components/     # Reusable UI components
│   ├── sections/   # Page sections (Hero, Features, Demo, etc.)
│   └── ui/         # Base UI components
├── pages/          # Route pages
├── lib/            # Utilities and helpers
└── styles/         # Global styles
```

## Key Commands
```bash
# Development
npm run dev        # Start development server

# Build & Production
npm run build      # Build for production
npm run preview    # Preview production build

# Code Quality
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript type checking
```

## Development Guidelines
1. Follow existing code patterns and conventions
2. Use TypeScript for type safety
3. Components should be functional with hooks
4. Keep components modular and reusable
5. Use Tailwind CSS classes for styling
6. Ensure responsive design across all breakpoints

## Important Files
- `src/App.tsx` - Main application component
- `src/main.tsx` - Application entry point
- `vite.config.ts` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `package.json` - Project dependencies and scripts

## Testing
Before committing changes, always run:
1. `npm run lint` - to check for linting errors
2. `npm run typecheck` - to verify TypeScript types
3. `npm run build` - to ensure the project builds successfully