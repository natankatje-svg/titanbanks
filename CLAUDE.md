# Project: TitanBanks — Titan X Powerbank Webshop

## Stack
Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Ecwid (e-commerce)

## Structuur
- `app/` — Next.js App Router (layout, page, globals.css)
- `components/` — Alle UI componenten (Hero, Features, FinalCTA, Navigation, etc.)
- `lib/ecwid-config.ts` — Ecwid Store ID & Product ID (moet ingevuld worden)
- `public/images/` — Productfoto's, logo
- `.agents/skills/` — Marketing & SEO skills (sync via `npx skills sync`)

## Development
```bash
npm install        # dependencies
npm run dev        # localhost:3000
npx tsc --noEmit   # type check
npx next build     # production build
```

## Skills
57 skills geinstalleerd (marketing, SEO, CRO, design). Na clonen:
```bash
npx skills sync    # installeert alle skills uit skills-lock.json
```

## Design systeem
- Kleuren: oranje `#FF8C00`, teal `#0EB5C8`, goud `#EAB308`, bg `#080808`
- Fonts: Barlow Condensed (display), Plus Jakarta Sans (body), DM Mono (mono)
- Componenten: `.btn-orange`, `.btn-ghost`, `.glass-card`, `.text-gradient-orange`
- Alle animaties respecteren `prefers-reduced-motion`

## Git workflow
- Branch: `main`
- Push na elke afgeronde taak
- Commit messages: beschrijvend, Nederlands of Engels
