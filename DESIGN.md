# DESIGN.md — TitanBanks webshop

## Theme

Donker, premium, rustig ("silent luxury"). Eén visuele wereld: matzwart met warme oranje gloed (embers). Geen lichte modus.

## Color

| Token | Waarde | Gebruik |
|---|---|---|
| `--c-bg` | `#080808` | body-achtergrond |
| `--c-surface` | `#0A0A0A` | sectie-achtergrond |
| `--c-surface-2` | `#141214` | cards, verhoogde vlakken |
| `--c-accent` | `#FF8C00` | hét merk-oranje: CTA's, gloed, accenten |
| `--c-border` | `rgba(255,255,255,0.07)` | hairline borders |
| ink | `#FFFFFF` / `#C9C9C9` / `#9C9C9C` | koppen / body / muted (AA op donker) |

Regels: oranje is schaars (≤1 dominant accent per viewport). Teal `#0EB5C8` en goud `#EAB308` zijn legacy — uitfaseren, niet opnieuw gebruiken. Status-groen alleen voor voorraad/checkmarks.

## Typography

- **Display:** Manrope 700–800, uppercase voor koppen, `letter-spacing -0.02em` à `-0.03em` (nooit krapper dan -0.04em), `leading 0.9–0.95`.
- **Body:** Plus Jakarta Sans 400–600, `leading-relaxed`, max 65–75ch.
- **Mono:** DM Mono, alleen voor kleine technische labels (specs, eyebrow-achtige microcopy) — spaarzaam.
- Schaal: fluid `clamp()`; hero ≤ 6rem; sectiekoppen ~`clamp(2.1rem, 5vw, 3.8rem)`.

## Components

- **CTA primair:** `.btn-orange` — oranje pill, witte tekst, warme glow-schaduw; hover = subtiele lift, geen schaal-stunts.
- **CTA secundair:** ghost-pill met hairline border.
- **Cards:** `#121212`–`#141214` vlak, 1px `white/[0.08]` border, `rounded-2xl`; hover = border-warmte + zachte gloed, géén volledige oranje fill.
- **Sectie-scheiding:** hairline `border-t white/[0.06]` of ambient orange halo; afwisselen voor ritme.

## Layout

- Container `max-w-7xl`, gutter `px-6`.
- Sectie-ritme: fluid `clamp()`-padding; varieer dichtheid (hero ruim → stats strak → CTA-band zeer ruim).
- Watermark-woorden (faint, reusachtig) als diepte-laag: maximaal op 2 secties per pagina.

## Motion

- Taal: **gloed en warmte** — embers, licht-sweeps, zachte fades. Traag (≥4s ambient loops), ease-out-expo voor entrances.
- Scroll-reveals: content is altijd zichtbaar als default; `initial` alleen gated zonder reduced-motion.
- `prefers-reduced-motion: reduce` → alle loops uit, transitions instant, content zichtbaar.
- Mobiel: geen WebGL/zware blurs (perf-gating via `lib/use-is-desktop.ts` behouden).

## Imagery

Echte productfotografie (OEM-trouw): hero-embers full-bleed, cutouts op donkere podium-cards. Energie = vloeiend oranje licht. Nooit het product AI-her-renderen (strap/poorten/display moeten exact kloppen).
