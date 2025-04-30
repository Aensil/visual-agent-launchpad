
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
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom colors for Visual Agents
				'electric-cyan': '#00D2FF',
				'neural-indigo': '#5C33FF',
				'kinetic-magenta': '#FF1E8C',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse-waveform': {
					'0%, 100%': { transform: 'scaleY(1)' },
					'50%': { transform: 'scaleY(0.5)' }
				},
				'color-cycle': {
					'0%, 100%': { backgroundColor: '#00D2FF' },
					'33%': { backgroundColor: '#5C33FF' },
					'66%': { backgroundColor: '#FF1E8C' }
				},
				'gradient-cycle': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' }
				},
				'flash-magenta': {
					'0%, 100%': { backgroundColor: 'transparent' },
					'50%': { backgroundColor: '#FF1E8C' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'scale-out': {
					from: { transform: 'scale(1)', opacity: '1' },
					to: { transform: 'scale(0.95)', opacity: '0' }
				},
				'slide-in-up': {
					'0%': { transform: 'translateY(30px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-in-left': {
					'0%': { transform: 'translateX(-100px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'nudge': {
					'0%': { transform: 'translateX(0)' },
					'25%': { transform: 'translateX(-2px)' },
					'75%': { transform: 'translateX(2px)' },
					'100%': { transform: 'translateX(0)' }
				},
				'waveform-pulse': {
					'0%, 100%': { transform: 'scaleY(1)' },
					'50%': { transform: 'scaleY(1.2)' }
				},
				'attention': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' }
				},
				'progress-spin': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'glow-cyan': {
					'0%, 100%': { boxShadow: '0 0 5px 2px rgba(0, 210, 255, 0.3)' },
					'50%': { boxShadow: '0 0 15px 5px rgba(0, 210, 255, 0.6)' }
				},
				'glow-indigo': {
					'0%, 100%': { boxShadow: '0 0 5px 2px rgba(92, 51, 255, 0.3)' },
					'50%': { boxShadow: '0 0 15px 5px rgba(92, 51, 255, 0.6)' }
				},
				'glow-magenta': {
					'0%, 100%': { boxShadow: '0 0 5px 2px rgba(255, 30, 140, 0.3)' },
					'50%': { boxShadow: '0 0 15px 5px rgba(255, 30, 140, 0.6)' }
				},
				'particle-float': {
					'0%': { transform: 'translateY(0) rotate(0deg)' },
					'25%': { transform: 'translateY(-15px) rotate(90deg)' },
					'50%': { transform: 'translateY(-30px) rotate(180deg)' },
					'75%': { transform: 'translateY(-15px) rotate(270deg)' },
					'100%': { transform: 'translateY(0) rotate(360deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-waveform': 'pulse-waveform 1.5s ease-in-out infinite',
				'color-cycle': 'color-cycle 3s ease-in-out infinite',
				'gradient-cycle': 'gradient-cycle 15s ease infinite',
				'flash-magenta': 'flash-magenta 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'scale-out': 'scale-out 0.2s ease-out',
				'slide-in-up': 'slide-in-up 0.6s ease-out',
				'slide-in-left': 'slide-in-left 0.6s ease-out',
				'slide-in-right': 'slide-in-right 0.6s ease-out',
				'nudge': 'nudge 0.6s ease-in-out',
				'waveform-pulse': 'waveform-pulse 4s ease-in-out infinite',
				'attention': 'attention 2s infinite',
				'progress-spin': 'progress-spin 1s linear infinite',
				'float': 'float 3s ease-in-out infinite',
				'glow-cyan': 'glow-cyan 2s ease-in-out infinite',
				'glow-indigo': 'glow-indigo 2s ease-in-out infinite',
				'glow-magenta': 'glow-magenta 2s ease-in-out infinite',
				'particle-float': 'particle-float 10s linear infinite'
			},
			backgroundImage: {
				'gradient-mesh': 'radial-gradient(circle at top left, rgba(0, 210, 255, 0.15), transparent 40%), radial-gradient(circle at bottom right, rgba(92, 51, 255, 0.15), transparent 40%), radial-gradient(circle at bottom left, rgba(255, 30, 140, 0.05), transparent 30%)',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, #00D2FF, #5C33FF, #FF1E8C, #00D2FF)',
				'gradient-radial': 'radial-gradient(circle, rgba(0,210,255,0.2) 0%, rgba(92,51,255,0.1) 50%, rgba(0,0,0,0) 100%)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
