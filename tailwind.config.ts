import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Brand-tokens (SSOT = app/globals.css :root) — hier gespiegeld zodat
      // componenten `bg-titan-bg` / `text-titan-accent` kunnen schrijven
      // i.p.v. losse hex-arbitraries.
      colors: {
        titan: {
          bg: '#080808',
          surface: '#0A0A0A',
          card: '#141214',
          accent: '#FF8C00',
          ink: '#F5F2EE',
          muted: '#9C9C9C',
        },
      },
      borderRadius: {
        // Industrial revamp: vierkantere taal (12px) i.p.v. de zachte 28px.
        stage: '0.75rem',
        pill: '980px',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 1.5s infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'accordion-down': 'accordionDown 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'accordion-up': 'accordionUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        accordionDown: {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        accordionUp: {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px 2px rgba(0,229,255,0.15)' },
          '50%': { boxShadow: '0 0 60px 8px rgba(0,229,255,0.35)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
