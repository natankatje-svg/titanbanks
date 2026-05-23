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

## Huidige status — single source of truth

**De actuele status, beslissingen en open taken staan in de Obsidian-vault, niet hier.** CLAUDE.md zelf is statische projectcontext (stack/structuur/conventies) zodat hij niet verouderd raakt door elke werksessie.

### Lees deze twee files aan het begin van elke nieuwe sessie:

1. **`C:\Users\natan\Titanbanks Obsidian\Titanbanks 2\80_Webshop\Session_State.md`**
   → Werkprogressie, beslissingen, open content/design vragen, chronologische sessie-log
2. **`C:\Users\natan\Titanbanks Obsidian\Titanbanks 2\80_Webshop\Deploy_State.md`**
   → Live infra-status: URLs, Basic Auth creds, env vars, DNS records, deploy commando's

### Snelle samenvatting (kan verouderd zijn — bovenstaande files zijn waar)
- **Live URL**: https://titan-banks.com (achter HTTP Basic Auth — creds in Deploy_State)
- **Hosting**: Vercel Hobby (`natankatje-svgs-projects/titanbanks`), auto-deploy on push to `main`
- **Domein**: Cloudflare Registrar, DNS records → `76.76.21.21` (grijs wolkje)
- **Routes**: `/` = teaser, `/preview` = finalized webshop
- **Open infra**: Ecwid config invullen, Cloudflare API token intrekken, hero video v2

### Setup voor nieuwe omgeving (bv. Cursor)
```bash
npm install
npx skills sync       # installeer 57 skills
npm run dev           # check dat alles werkt (lokaal geen Basic Auth dankzij .env.local)
```

### Vault navigatie
- Vault root: `C:\Users\natan\Titanbanks Obsidian\Titanbanks 2\`
- Begin altijd bij `00_Index.md` voor cross-cutting context (Amazon sprint, team, brand)
