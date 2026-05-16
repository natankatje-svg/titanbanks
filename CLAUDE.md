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

---

## Huidige status (laatst bijgewerkt: 2026-05-16)

### Domein
- **Gekocht:** `titan-banks.com` via Cloudflare Registrar ($10.46/jr, auto-renewal aan)
- **WHOIS privacy:** ingebouwd & gratis bij Cloudflare
- **VOF tenaamstelling:** factuur op naam van VOF (NamaCorp), privé Visa gebruikt — €10,46 terugboeken vanaf zakelijke rekening zodra die weer werkt

### Volgende stappen (waar we waren gebleven)
1. **Deploy naar Vercel** — repo `natankatje-svg/titanbanks` importeren via [vercel.com/new](https://vercel.com/new)
2. **Domein koppelen aan Vercel** — `titan-banks.com` + `www.titan-banks.com` toevoegen in Vercel project Settings → Domains. DNS records komen in Cloudflare DNS dashboard, zet proxy (oranje wolkje) op **DNS only (grijs)** voor Vercel records om SSL-conflicten te voorkomen
3. **Build check** — `npx tsc --noEmit` en `npx next build` lokaal draaien vóór deploy
4. **Ecwid config invullen** — `lib/ecwid-config.ts` heeft nog placeholder Store ID + Product ID nodig
5. **Titan-Daniel toegang** — heeft al write access op GitHub repo; voor Vercel team-toegang is Pro plan nodig OF hij ziet PR preview-URLs gratis

### Beslissingen
- Hosting via **Vercel** (niet Cloudflare Pages) — beste Next.js DX
- Domein: `titan-banks.com` gekozen boven `.nl`/`.net`/`.org` voor internationale uitstraling
- Ecwid blijft de e-commerce backend

### Setup notes voor nieuwe omgeving (bv. Cursor)
Na clonen:
```bash
npm install
npx skills sync       # installeer 57 skills
npm run dev           # check dat alles werkt
```
