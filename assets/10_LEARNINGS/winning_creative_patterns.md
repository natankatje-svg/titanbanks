# Winning Creative Patterns

Append-only log. Newest at the top.

---

## Run 2026-05-15 (e) — Three-route concept-specific pass (3 outputs, all approved)

### Pipeline reaches production-ready: 5 approved, 0 needs_revision, 0 rejected

This run proved a key principle: **route concepts to the model that handles the hardest constraint**, not "use one model for everything."

| Concept | Hardest constraint | Routed to | Result |
|---------|-------------------|-----------|--------|
| C1 50,000 mAh | Brand-correct dark cinematic background while keeping geometry | Ideogram + dark cinematic refs (slot-06/09/10), no marketplace refs | Approved — dark bg restored, brick correct |
| B2 strap-with-hand | Embossed "POWER BANK" on loop + correctly composed human hand | GPT Image 2 (handles hands, handles small embossed text) | **Approved — strongest asset of campaign** |
| B1 strap macro | Premium loop fiber detail without garbled text | Ideogram text-free (typography to be added in Photoshop) | Approved as master plate |

### Strongest asset across ALL 4 Ideogram + 1 GPT runs
**B2 v4 GPT Image 2 strap-with-hand**: brick geometry correct (chunky, display on front face, TITANBANKS wordmark below display), embossed "POWER BANK" on loop CLEANLY legible (first time in 4+ attempts), hand neutral and brand-safe, premium dark cinematic background, all 4 typography blocks rendered correctly.

### Cumulative recipe (use as default for future TitanBanks runs)

- **Geometry-led product hero** → Ideogram QUALITY + marketplace refs (slot-18/19/20) for geometry teaching, accept marketplace-leaning aesthetic OR
- **Brand-aesthetic product hero** → Ideogram QUALITY + dark cinematic refs (slot-06/09/10) preserves dark mood, sacrifices some geometry sharpness
- **Hand or human element involved** → GPT Image 2 via Higgsfield, no Ideogram
- **Loop embossing must read** → GPT Image 2 OR text-free render + Photoshop overlay
- **Lifestyle scene with environmental cues** → Ideogram QUALITY + NO refs (refs flatten scenes)
- **Cinematic master plate (text-free)** → Soul Cinematic via Higgsfield OR Ideogram + dark refs

---

## Run 2026-05-15 (d) — Ideogram with style_reference_images (5 outputs)

### Massive win
- **Attaching 3 OEM product photos as `style_reference_images` transformed the brick geometry.** Display now lands on the FRONT face (correct, per refs), proportions chunky, port array on TOP, TITANBANKS wordmark placed correctly. Refs solved what 2 rounds of prompt iteration could not.
- **A1 hero v3 became the new anchor pre-launch asset** — strongest Titan X likeness across all 3 Ideogram runs.

### API workflow that works
- Endpoint: `POST https://api.ideogram.ai/v1/ideogram-v3/generate` (multipart/form-data)
- Required when using refs: `style_type=AUTO` (or GENERAL) — REALISTIC is rejected with refs
- Resize refs to ~1024px JPEG (60-170 KB) to avoid SSL EOF on parallel uploads — original 2-6 MB PNGs caused connection drops at 5-parallel
- Up to 3 refs per call works reliably
- Cost still ~$0.08 per QUALITY image

### Winning seeds
| Output | Seed | Status |
|--------|------|--------|
| A1 hero v3 (with refs) | `143193188` | approved — best brick geometry yet |
| A2 lifestyle backpack v2 (no refs) | `865458342` | approved — best lifestyle (refs would flatten the scene) |

---

## Run 2026-05-15 (c) — Ideogram revision pass (4 outputs)

### Wins from prompt-fix iteration

- **Geometry lock works**: adding "chunky rectangular brick, taller than wide, NOT slim, NOT smartphone-shaped" + matching negatives flipped 3 of 3 brick-shape failures to correct geometry. Reusable across all future Ideogram product prompts.
- **Brick/loop text isolation partially works**: explicit "brick body is UNMARKED except top wordmark; embossing only on the loop" cleaned the brick face in B1 v2 and reduced (but didn't eliminate) the bleed in B2 v2.
- **Body-text completion improves with explicit phrasing**: A2 v2 includes the missing "an" that v1 dropped — the geometry-lock prompt also helped the model attend to body text more carefully.
- **Two-pass workflow proven**: 5 jobs run-1 → identify failure modes → 4 jobs run-2 with targeted fixes → moved from 1 approved / 1 rejected to 2 approved / 0 rejected. Total cost ~$0.70.

### Winning seeds

| Output | Seed | Status |
|--------|------|--------|
| A1 hero (run 1) | `30560189` | approved |
| A2 lifestyle backpack (run 2) | `865458342` | approved |

---

## Run 2026-05-15 (b) — Ideogram first run (5 outputs via API)

### Strongest patterns observed

- **Ideogram v3 QUALITY + 9:16 vertical I-stack rendered headline + CTA cleanly first try** on Angle 1 hero. Approved.
- **Ideogram respects "no plinth label / no museum nameplate" negative** — fixing yesterday's GPT bug. Output 05 plinth was unmarked.
- **Ideogram preserves comma in "50,000 mAh."** — comma + period both present (output 05). No "50000" drops.
- **Parallel API runs via thread pool: 5 jobs in ~17 seconds** (vs ~5 minutes for the equivalent Higgsfield batch). Use Ideogram API for any text-led pre-launch asset where speed matters.

### Winning seed

| Output | Job | Seed | Status |
|--------|-----|------|--------|
| Angle 1 A1 hero (9:16) | Ideogram v3 QUALITY | `30560189` | approved |

---

## Run 2026-05-15 — pre-launch first run (6 outputs)

### Strongest patterns observed

- **GPT Image 2 + 9:16 vertical I-stack + 5-block typography (TITANBANKS / Titan X · Coming Soon / headline / payoff / CTA pill) renders cleanly first try.** Confirmed on Angle 1 ("Never at 0."). Use this as the default template for Story / Reel pre-launch hero.
- **GPT Image 2 + 3:4 light-streak off-axis + macro carry-loop hero produces the cleanest embossed "POWER BANK" rendering in the set.** Confirmed on Angle 2 strap macro. Anchor template for any object-fetish creative where embossing must be legible.
- **The matte-black-pill CTA with thin orange border renders consistently in GPT Image 2.** Use as the universal pre-launch CTA chip across all assets.
- **Headlines with terminal periods ("Never at 0.", "The strap people ask about.", "50,000 mAh.") render with the period preserved in GPT Image 2.** No need to drop punctuation.
- **Six-device flanking silhouettes at low opacity render successfully in GPT Image 2** without leaking recognizable third-party brand logos. Confirmed on Angle 3.

### Winning seeds / job IDs

| Output | Job ID | Status |
|--------|--------|--------|
| Angle 1 Never at 0 (9:16) hero | `6715b724-7576-4a3e-902d-45eb62633691` | approved |
| Angle 2 Strap (3:4) macro | (in `03_gpt_angle2.json`) | approved — anchor asset |
