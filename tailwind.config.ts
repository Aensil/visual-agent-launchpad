import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // === SERIOUS FUTURE COLOR SYSTEM ===

        // Background / Surfaces - Deep navy void
        "void": {
          DEFAULT: "#0f1726", // Deep navy
          surface: "#141f32", // Navy panels
          elevated: "#19273e", // Elevated surfaces (modals, hero cards)
          glass: "rgba(25, 39, 62, 0.6)", // Glass panel base
        },

        // Primary Accent: Cyan - "Listening / action / primary" (the cyan orb ring)
        "primary-cyan": {
          DEFAULT: "#00ffff", // Core cyan
          dim: "#00cccc", // Dimmed state
          bright: "#33ffff", // Hover/active state
          glow: "rgba(0, 255, 255, 0.4)", // Glow effect
          subtle: "rgba(0, 255, 255, 0.1)", // Subtle backgrounds
        },

        // Bridge Accent: Indigo - "Structure / depth" (gradient bridge between cyan & magenta)
        "deep-indigo": {
          DEFAULT: "#7C5CFA", // Core indigo
          dim: "#5B3FD6", // Dimmed state
          bright: "#9B7EFF", // Hover/active state
          glow: "rgba(124, 92, 250, 0.4)", // Glow effect
          subtle: "rgba(124, 92, 250, 0.1)", // Subtle backgrounds
        },

        // Secondary Accent: Purple-Magenta - "Speaking / active / alive" (the magenta orb ring)
        "accent-magenta": {
          DEFAULT: "#db00ff", // Core purple-magenta
          dim: "#af00cc", // Dimmed state
          bright: "#e540ff", // Hover/active state
          glow: "rgba(219, 0, 255, 0.4)", // Glow effect
          subtle: "rgba(219, 0, 255, 0.1)", // Subtle backgrounds
        },

        // Legacy colors (mapped to new brand colors)
        "electric-cyan": "#00ffff",
        "neural-indigo": "#7C5CFA",
        "kinetic-magenta": "#db00ff",

        // Text colors (synced with CSS variables in index.css)
        "text-primary": "#f0f4ff", // Off-white with slight blue
        "text-secondary": "#b8c4e0", // Light bluish gray
        "text-muted": "#8892a8", // Muted for microcopy

        // Status colors (used sparingly)
        "status-success": "#10B981", // Success green
        "status-warning": "#F59E0B", // Warning orange
        "status-error": "#EF4444", // Error red

        // Glass effects
        "glass-border": "rgba(255, 255, 255, 0.08)",
        "glass-border-hover": "rgba(0, 255, 255, 0.3)",
      },

      fontFamily: {
        sans: ["Inter", "SF Pro Display", "system-ui", "sans-serif"],
      },

      fontSize: {},

      boxShadow: {
        // Glass panel shadows
        "glass": "0 4px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        "glass-hover": "0 8px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)",

        // Glow effects
        "glow-cyan": "0 0 20px rgba(0, 255, 255, 0.3), 0 0 40px rgba(0, 255, 255, 0.1)",
        "glow-cyan-strong": "0 0 30px rgba(0, 255, 255, 0.5), 0 0 60px rgba(0, 255, 255, 0.2)",
        "glow-indigo": "0 0 20px rgba(124, 92, 250, 0.3), 0 0 40px rgba(124, 92, 250, 0.1)",
        "glow-magenta": "0 0 20px rgba(219, 0, 255, 0.3), 0 0 40px rgba(219, 0, 255, 0.1)",

        // Orb shadows
        "orb-idle": "0 0 60px rgba(0, 255, 255, 0.3), 0 0 120px rgba(124, 92, 250, 0.2)",
        "orb-listening": "0 0 80px rgba(0, 255, 255, 0.5), 0 0 160px rgba(0, 255, 255, 0.2)",
        "orb-speaking": "0 0 80px rgba(219, 0, 255, 0.5), 0 0 160px rgba(0, 255, 255, 0.2)",
      },

      backdropBlur: {
        "glass": "12px",
        "glass-strong": "20px",
      },

      borderRadius: {
        "glass": "16px",
        "glass-lg": "24px",
      },

      animation: {
        // Orb animations
        "orb-breathe": "orb-breathe 4s ease-in-out infinite",
        "orb-listening": "orb-listening 2s ease-in-out infinite",
        "orb-thinking": "orb-thinking 1.5s ease-in-out infinite",
        "orb-speaking": "orb-speaking 0.8s ease-in-out infinite",

        // Gradient animations
        "gradient-cycle": "gradient-cycle 8s ease infinite",
        "gradient-shift": "gradient-shift 6s ease-in-out infinite",

        // Glow animations
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "glow-breathe": "glow-breathe 4s ease-in-out infinite",

        // UI animations
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
        "nudge": "nudge 0.5s ease-in-out",
        "attention": "attention 2s ease-in-out infinite",

        // Chart animations
        "draw-in": "draw-in 1s ease-out forwards",
      },

      keyframes: {
        // Orb keyframes
        "orb-breathe": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.8" },
          "50%": { transform: "scale(1.02)", opacity: "0.9" },
        },
        "orb-listening": {
          "0%, 100%": { transform: "scale(1)", boxShadow: "0 0 60px rgba(0, 255, 255, 0.4)" },
          "50%": { transform: "scale(1.03)", boxShadow: "0 0 80px rgba(0, 255, 255, 0.6)" },
        },
        "orb-thinking": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "orb-speaking": {
          "0%, 100%": { boxShadow: "0 0 60px rgba(219, 0, 255, 0.5), 0 0 120px rgba(0, 255, 255, 0.2)" },
          "50%": { boxShadow: "0 0 80px rgba(219, 0, 255, 0.7), 0 0 160px rgba(0, 255, 255, 0.3)" },
        },

        // Gradient keyframes
        "gradient-cycle": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 0%" },
          "50%": { backgroundPosition: "100% 100%" },
        },

        // Glow keyframes
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.05)" },
        },
        "glow-breathe": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.6" },
        },

        // UI keyframes
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "nudge": {
          "0%, 100%": { transform: "translateY(0)" },
          "25%": { transform: "translateY(-4px)" },
          "75%": { transform: "translateY(2px)" },
        },
        "attention": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(0, 255, 255, 0.4)" },
          "50%": { boxShadow: "0 0 0 8px rgba(0, 255, 255, 0)" },
        },

        // Chart keyframes
        "draw-in": {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
      },

      transitionDuration: {
        "fast": "150ms",
        "normal": "250ms",
        "slow": "400ms",
      },

      transitionTimingFunction: {
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
        "bounce-subtle": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
