# Ideogram First Run — QA Report (2026-05-15)

5 jobs · API v3 · QUALITY · REALISTIC · magic OFF · 1 image each
Total wall time: ~17s (parallel via thread pool of 5)
Cost: ~$0.40 estimated (5 × ~$0.08 quality v3)

---

## Per-output QA

### 01 — Angle 1 / A1 hero (9:16) → APPROVED *(with note)*
File: [approved/ideogram_angle-01_A1_hero.png](approved/ideogram_angle-01_A1_hero.png) · seed `30560189`

| Checklist | Result |
|-----------|--------|
| Product accuracy | PASS — Titan X geometry recognizable; carry loop orange; LED display "100%" with green icon ✓; TITANBANKS top wordmark ✓; both short ends not shown ✓; no aviation |
| Text accuracy | **MIXED** — TITANBANKS spelled correctly ✓; headline "NEVER AT 0." with period ✓ (Ideogram uppercased it — acceptable); CTA "Join the waitlist" ✓; **subhead missing the word "an": reads "While the world looks for outlet, you keep going."** Should be "for an outlet" |
| Claim compliance | PASS |
| Brand consistency | PASS — premium, dark, cinematic, sparing orange |

Verdict: usable for pre-launch. The missing "an" is small body text on a 9:16 Story — barely noticeable on phone view. If you want it perfect, regen with the exact subhead text re-emphasized. Strongest of the 5.

### 02 — Angle 1 / A2 lifestyle backpack (9:16) → NEEDS REVISION
File: [needs_revision/ideogram_angle-01_A2_lifestyle.png](needs_revision/ideogram_angle-01_A2_lifestyle.png) · seed `1641924711`

| Checklist | Result |
|-----------|--------|
| Product accuracy | **FAIL** — brick rendered as a slim rounded handheld (smartphone-like form), not the chunky Titan X 50,000 mAh brick geometry; on-brick wordmark looks like "TITANBANK." (possibly missing the trailing S) |
| Text accuracy | PASS for ad typography (headline, subhead, CTA all correct); on-brick wordmark spelling is the issue, see above |
| Claim compliance | PASS |
| Brand consistency | PASS — pier/sunset framing premium |

Revision: re-prompt with stronger geometry lock — "chunky brick-shaped 50,000 mAh powerbank, NOT a slim handheld, NOT smartphone-shaped" plus explicit "TITANBANKS spelled with trailing S".

### 03 — Angle 2 / B1 hero macro (3:4) → NEEDS REVISION
File: [needs_revision/ideogram_angle-02_B1_macro.png](needs_revision/ideogram_angle-02_B1_macro.png) · seed `751854916`

| Checklist | Result |
|-----------|--------|
| Product accuracy | MIXED — light streak floor present ✓; carry loop orange ✓; brick visible but composition crops it heavily |
| Text accuracy | **FAIL** — embossed text on the carry loop renders as garbled letters (something like "ITITANBOWN"), NOT "POWER BANK"; additional garbled text appears on the brick body |
| Claim compliance | PASS |
| Brand consistency | PASS — dark cinematic |

Revision: explicit "embossed text on the loop must read EXACTLY POWER BANK as two words with a space, no other letters anywhere on the loop, and no text on the brick body except the small TITANBANKS wordmark on the top face."

### 04 — Angle 2 / B2 lifestyle hand (3:4) → REJECTED
File: [rejected/ideogram_angle-02_B2_lifestyle.png](rejected/ideogram_angle-02_B2_lifestyle.png) · seed `1098227781`

| Checklist | Result |
|-----------|--------|
| Product accuracy | **HARD FAIL** — large embossed text on the front face of the brick reads "TOWER BANK" (or distorted "POWER BANK") — wrong text in the wrong place. Brick geometry rendered as a slim smartphone-like form, not the Titan X chunky brick. |
| Text accuracy | FAIL — wrong brand text baked into the product |
| Claim compliance | PASS |
| Brand consistency | PASS aesthetically |

Reason rejected: Ideogram took the "embossed POWER BANK on the loop" instruction and applied it to the BRICK FACE instead. Result: a powerbank with the wrong brand on its body. Cannot ship a brand-launching ad with the wrong brand on the product.

Revision: separate the loop-embossing instruction from any brick-face descriptions — explicit "the brick body is unmarked except for the small TITANBANKS wordmark on the top face; the embossed POWER BANK text appears ONLY on the orange woven carry loop, never on the brick."

### 05 — Angle 3 / C1 hero with silhouettes (9:16) → NEEDS REVISION
File: [needs_revision/ideogram_angle-03_C1_hero.png](needs_revision/ideogram_angle-03_C1_hero.png) · seed `1229688904`

| Checklist | Result |
|-----------|--------|
| Product accuracy | PASS — geometry close to Titan X; LED display "100%" ✓; TITANBANKS top wordmark ✓; carry loop orange ✓; **plinth UNMARKED** (the museum-nameplate fix from the GPT run worked) ✓ |
| Text accuracy | MIXED — headline "50,000 MAH." with comma + period ✓; subhead and CTA correct ✓; **embossed text on the carry loop renders as garbled letters** (e.g. "FAGTGRY ABLLG"), not "POWER BANK" |
| Claim compliance | PASS |
| Brand consistency | PASS |

Concept gap: the **6 flanking device silhouettes did not render** — Ideogram dropped them entirely. This concept needs the silhouettes to land the "but that is not the point" message.

Revision: stronger silhouette prompting ("six clearly visible but low-opacity device outlines arranged in a V around the powerbank, faint white line drawings") AND the same loop-embossing fix as 03.

---

## Sort summary

| Bucket | Count | Files |
|--------|-------|-------|
| approved | 1 | 01 (A1 hero — minor subhead) |
| needs_revision | 3 | 02 (geometry), 03 (loop+brick text), 05 (loop text + missing silhouettes) |
| rejected | 1 | 04 (wrong brand on brick) |

## Strongest output

**01 — Angle 1 A1 hero**. The headline + CTA + display "100%" + top wordmark + premium aesthetic all landed. The subhead has a single missing word — small enough to ship as-is for pre-launch, or regen for perfection.

## Cross-cutting Ideogram patterns (this run)

- **Strength: typography fidelity for headline + CTA blocks is high** — every output rendered the headline cleanly with correct punctuation. Better than GPT Image 2 on punctuation, comparable on layout.
- **Strength: respects "no plinth label" negative** — output 05 plinth was unmarked, fixing the GPT learning from yesterday.
- **Weakness: Ideogram bleeds the "embossed POWER BANK" instruction onto the brick body** — 2 of 3 strap-related outputs (03, 04) put text on the brick where it doesn't belong.
- **Weakness: small UI text (the embossed loop text) garbles** — 2 of 5 outputs garbled the loop embossing despite explicit lock.
- **Weakness: Ideogram drops low-opacity scene elements** — the six flanking silhouettes (output 05) didn't render at all.
- **Weakness: brick geometry drifts toward smartphone shape** — 2 of 5 outputs (02, 04) rendered a slim handheld instead of the chunky Titan X brick.
- **Casing note: Ideogram uppercases mid-prompt headlines automatically** — "Never at 0." → "NEVER AT 0." Acceptable but not what we asked. To preserve mixed case, lock with explicit "use sentence case, not uppercase".

## Recommendations for revision pass

1. **Geometry lock**: add positive "chunky rectangular brick-shaped 50,000 mAh powerbank, taller than wide, NOT slim, NOT smartphone-shaped" + negative "slim phone, handheld phone, slim form factor".
2. **Loop-embossing isolation**: explicitly state "the brick body is matte black and UNMARKED except for the small TITANBANKS wordmark on the top face. The embossed POWER BANK text appears ONLY on the orange woven carry loop strap, never on the brick body."
3. **Silhouette visibility**: increase silhouette opacity description ("clearly visible faint white outline drawings, like architectural sketches") so they don't drop entirely.
4. **Casing lock**: add "render the headline in sentence case exactly as written, not uppercase."
