# Project Context for Claude

## Project Overview
Visual Agent Launchpad - A high-performance React-based web application for showcasing AI visual agents and their capabilities. Optimized for fast loading and minimal bundle sizes.

## Tech Stack
- React with TypeScript
- Vite as build tool with optimized chunking
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation
- Supabase for backend services
- i18n for internationalization

## Project Structure
```
src/
├── components/     # Reusable UI components
│   ├── sections/   # Page sections (Hero, Features, Demo, etc.)
│   └── ui/         # Base UI components (many unused - candidates for removal)
├── pages/          # Route pages with lazy loading
├── lib/            # Utilities and helpers
├── hooks/          # Custom React hooks
├── contexts/       # React contexts
├── locales/        # Translation files
└── i18n/           # Internationalization config
```

## Performance Optimizations Applied
- **Code Splitting**: All non-critical components lazy loaded
- **Bundle Chunking**: Vendors separated (React, Router, UI, i18n, Utils)
- **Resource Hints**: Critical components preloaded, secondary prefetched  
- **Lazy Loading**: Supabase client loads only when needed
- **Bundle Size**: Reduced from 526KB to ~231KB initial load

## Key Commands
```bash
# Development
npm run dev        # Start development server

# Build & Production  
npm run build      # Build for production (optimized with Terser)
npm run preview    # Preview production build

# Code Quality
npm run lint       # Run ESLint (fix with --fix)
npm run typecheck  # Run TypeScript type checking
```

## Bundle Analysis
Current optimized bundle structure:
- `vendor-react`: 140KB (React core)
- `index`: 91KB (main app code)
- `vendor-ui`: 42KB (Radix UI components)
- `vendor-i18n`: 52KB (translation system)
- `supabaseclient`: 64KB (database client)
- Additional chunks: Router, Utils, individual sections

## Development Guidelines
1. **Performance First**: Always consider bundle impact
2. Use lazy loading for non-critical components
3. Prefer dynamic imports for heavy libraries
4. Follow existing code patterns and conventions
5. Use TypeScript for type safety
6. Components should be functional with hooks
7. Keep components modular and reusable
8. Use Tailwind CSS classes for styling
9. Ensure responsive design across all breakpoints

## Architecture Notes
- **Lazy Loading Pattern**: Non-critical components wrapped in `lazy()` and `Suspense`
- **Progressive Loading**: Hero loads immediately, other sections load as needed
- **Resource Strategy**: Critical resources preloaded, secondary resources prefetched
- **Bundle Strategy**: Manual chunking separates vendors for optimal caching

## Unused Dependencies (Removal Candidates)
Many UI components in `src/components/ui/` are unused and could be removed:
- 32+ unused Radix UI components
- Heavy dependencies not used in the landing page context
- Consider cleanup for further bundle size reduction

## Important Files
- `src/App.tsx` - Main application component with providers
- `src/pages/Index.tsx` - Main page with lazy loading implementation
- `src/main.tsx` - Application entry point
- `vite.config.ts` - Optimized Vite configuration with chunking
- `src/components/LazyLoader.tsx` - Utility for progressive loading
- `tailwind.config.js` - Tailwind CSS configuration
- `package.json` - Project dependencies and scripts

## Testing & Quality Assurance
Before committing changes, always run:
1. `npm run lint` - to check for linting errors
2. `npm run typecheck` - to verify TypeScript types  
3. `npm run build` - to ensure optimized build succeeds

## Performance Metrics
- **Initial Bundle**: ~231KB (vs 526KB before optimization)
- **Lazy Chunks**: Load progressively as user interacts
- **First Contentful Paint**: Significantly improved
- **Bundle Warnings**: Eliminated through proper chunking