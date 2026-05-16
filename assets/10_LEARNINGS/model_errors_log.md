# Model Errors Log

Append-only log. Newest at the top.

---

## Run 2026-05-15 (d) — Ideogram with style_reference_images (5 outputs)

### NEW lesson: reference selection matters more than reference quantity

- **Marketplace-style refs (white background) pulled brand-cinematic prompts toward white backgrounds.** Outputs B2 v3 and C1 v3 rendered against white instead of near-black matte, despite explicit "deep matte black" in the prompt. The refs (slot-18/19/20 are all white marketplace shots) overrode the prompt aesthetic.
- **Lifestyle prompts lost their scenes entirely.** A2 v3 with refs dropped the backpack/pier/dusk context and rendered as a studio hero. Refs are stronger than scene-context prompts.
- **Fix:** rotate ref sets per concept type:
  - Hero/spec on dark studio: use slot-06 (warm orange rim hero) + slot-09 (material macro) + slot-10 (display macro). All dark cinematic, won't pull aesthetic to white.
  - Lifestyle: use NO refs, or use lifestyle-context refs (slot-15/16/17 if they're dark cinematic).
  - Marketplace/spec hero: slot-18/19/20 are correct for that aesthetic only.

### NEW lesson: attaching refs costs prompt-attention budget

- A1 v3 (with refs) dropped "an" from the subhead — "While the world looks for outlet, you keep going." A1 v1 (no refs) had this correct.
- C1 v3 (with refs) mangled the headline "50,000 mAh." → "50.00 Mah." with dropped zeros, dropped comma, weird casing.
- C1 v3 display also drifted to read "5000%" instead of "100%" — likely the headline number bled into the display readout.
- Pattern: when the model has to match style refs AND complex multi-block typography AND geometry locks, something gets dropped.
- Fix: keep the prompt typography brief minimal when refs are attached. Move long-form copy locks to negatives.

### Three-strikes-and-out

After 3 prompt iterations these failures persist in Ideogram and should be solved elsewhere:

1. **Loop embossing "POWER BANK"** — garbled in v1, v2, v3 (vertical stack, garbled letters, never two-words-with-space). Solution: render text-free, overlay in Photoshop.
2. **Six flanking device silhouettes** — absent in v1, v2, v3. Solution: drop from concept OR add as Figma vector layer.
3. **Hand-on-strap concept** — hand absent in v2 and v3. Solution: route to GPT Image 2.

### Solved in run 3

- **Brick geometry "smartphone drift"** — fully solved by refs. All 5 v3 outputs have correct chunky brick form.
- **Display position** — refs taught the model the display lives on the FRONT face (the wide face that also carries the wordmark), not the TOP face. Earlier prompts had this wrong.
- **TITANBANKS placement** — refs taught the wordmark sits at the BOTTOM of the front face, below the display panel.

### Multipart upload gotcha

- Original 2048×2048 PNGs (2-6 MB) at 5-parallel caused `SSLEOFError: EOF occurred in violation of protocol`. The Windows OpenSSL stack drops large concurrent multipart uploads.
- Fix: resize refs to 1024×1024 JPEG quality 88 (60-170 KB each). Total per request drops from ~10 MB to ~250 KB. 5-parallel works without issue.
- `style_type=AUTO` is required when sending `style_reference_images` — `REALISTIC` returns HTTP 400 "Please use AUTO or GENERAL style type with style_codes, style_reference_images or style_preset."

---

## Run 2026-05-15 (c) — Ideogram revision pass (4 outputs)

### Persistent failures across two iterations (do NOT keep retrying — change tool)

**Ideogram — embossed loop text never renders correctly**
- B1 v1: garbled "ITITANBOWN". B1 v2 (with stricter loop isolation + larger loop in composition): garbled "CINDIA". Two attempts, two fails.
- Pattern: small text on a textured curved fabric surface is permanently outside Ideogram's text-rendering capability at the strap scale we need.
- Decision: stop iterating loop-embossing prompts in Ideogram. **Render text-free, overlay POWER BANK in Photoshop.**

**Ideogram — flanking silhouettes never render**
- C1 v1: silhouettes absent ("dropped low-opacity elements"). C1 v2 (with "clearly visible faint white architectural-sketch outlines, like blueprint sketches"): silhouettes still absent.
- Pattern: Ideogram cannot draw faint background scene-graphic elements alongside a hero product subject. The model picks one or the other.
- Decision: stop iterating silhouettes in Ideogram. **Either drop them from the concept or draw them as a vector layer in Figma after the fact.**

**Ideogram — POWER BANK text bleeds onto brick face even with explicit isolation**
- B2 v1: large "TOWER BANK" embossed on brick (rejected). B2 v2 (with explicit "brick body UNMARKED except top wordmark, embossing ONLY on loop, NEVER on brick body" + negatives): smaller "POWER BANK" still embossed on brick.
- Pattern: when the prompt mentions both "brick" and "embossed POWER BANK", Ideogram's spatial association cannot be fully suppressed.
- Decision: for any strap concept involving a hand or contextual scene, **route to GPT Image 2** (which separated brick and loop cleanly in run-1).

### Solved by run-2 prompt fixes

- **Geometry drift to smartphone shape** — fixed in 3/3 outputs by "chunky brick, taller than wide, NOT slim" lock. Reusable pattern.
- **TITANBANKS missing trailing S** — fixed by spelling-out lock "T-I-T-A-N-B-A-N-K-S" + negative "TITANBANK without trailing S".
- **Subhead dropping articles** ("for outlet" → "for an outlet") — fixed by full geometry/isolation prompt giving Ideogram more attention budget.
- **Brick body extra text** (B1 v1) — fixed by explicit "brick body has NO other text, NO embossing, NO labels" rule. Confirmed clean in B1 v2.

### New issue surfaced in run 2

**Ideogram — "mAh" capitalization drift**
- C1 v1 rendered "50,000 MAH." (all caps — acceptable). C1 v2 rendered "50,000 MaH." (mixed casing M-a-H — non-standard).
- Pattern: Ideogram occasionally casing-mixes acronym-like tokens.
- Fix: explicit "render exactly mAh in lowercase-uppercase-lowercase, OR exactly MAH in all caps — never mixed casing M-a-H."

---

## Run 2026-05-15 (b) — Ideogram first run (5 outputs)

### Recurring failures

**Ideogram — bleeds "embossed POWER BANK" onto brick body**
- Outputs 03 and 04: instruction "embossed POWER BANK text on the orange woven carry loop" was interpreted as putting the text on the brick face. Output 04 rendered "TOWER BANK" / distorted "POWER BANK" as large embossed text on the front face of the brick — wrong brand on the product. Hard product-accuracy violation.
- Pattern: when the brick and loop are both subjects of the prompt, Ideogram conflates the embossing target.
- Fix for next run: explicit isolation — "the brick body is matte black and UNMARKED except for the small TITANBANKS wordmark on the top face. The embossed POWER BANK text appears ONLY on the orange woven carry loop strap, never anywhere on the brick body."

**Ideogram — small loop text garbles**
- Outputs 03 and 05: the embossed text on the carry loop renders as garbled letters ("ITITANBOWN", "FAGTGRY ABLLG") instead of "POWER BANK".
- Pattern: small in-image text on a textured curved surface is at the edge of Ideogram's text-rendering capability. Headline-scale typography succeeds; loop-scale embossing fails.
- Fix: keep the loop-embossing target larger in the composition (move loop closer to camera) or accept post-correction.

**Ideogram — drops low-opacity scene elements**
- Output 05: the six faint device silhouettes flanking the product did not render at all. The reframe concept needs them.
- Pattern: "extremely low opacity, almost invisible, like a dark constellation" got interpreted as "skip these entirely."
- Fix: phrase as "clearly visible but faint white architectural-sketch outlines" — visible enough to register, faint enough to not compete with the product.

**Ideogram — brick geometry drifts to smartphone shape**
- Outputs 02 and 04: the powerbank rendered as a slim rounded handheld (smartphone form factor) rather than the chunky Titan X brick.
- Pattern: "matte black 50,000 mAh powerbank" without explicit dimensional anchors lets Ideogram default to a sleek handheld archetype.
- Fix: add "chunky rectangular brick-shaped powerbank, taller than wide, substantial body, NOT slim, NOT smartphone-shaped, NOT handheld phone form factor" and matching negatives.

**Ideogram — uppercases mid-prompt headlines**
- All 5 outputs rendered the headline in UPPERCASE despite the prompt giving sentence case ("Never at 0.", "The strap people ask about.", "50,000 mAh.").
- Pattern: Ideogram favors caps for advertising headline blocks regardless of input casing.
- Fix (if sentence case is required): add explicit "render the headline in sentence case exactly as written, do not uppercase". Otherwise accept caps as a reasonable advertising convention.

**Ideogram — drops or alters small body words**
- Output 01: subhead rendered as "While the world looks for outlet, you keep going." — dropped the article "an".
- Pattern: small body text under a large headline can lose articles or short connector words.
- Fix: minor; only matters for body text that must read literally. Acceptable for pre-launch awareness.

### Aspect ratio constraints

- Ideogram v3 enums: `1x1, 16x9, 9x16, 4x3, 3x4, 16x10, 10x16, 3x2, 2x3, 1x3, 3x1`. No 4:5. Ran 3:4 as substitute (same workaround as Flux/GPT).

---

## Run 2026-05-15 — pre-launch first run (6 outputs)

### Recurring failures

**FLUX.2 max — text rendering**
- Output 04 (Strap macro): hallucinated a "100%" / "1000%" text label on the carry loop strap that was not in the prompt. Embossed "POWER BANK" rendered as vertically stacked "POWERBANK" (one word) instead of horizontal "POWER BANK". Bottom CTA pill entirely dropped. "Coming Soon" subhead trimmed to just "Titan X".
- Pattern: FLUX.2 prioritizes the visual scene fidelity (fiber detail was excellent) but sheds in-image typography blocks under load. Treat FLUX.2 as a master-plate engine and overlay text in post.
- Fix for next run: keep FLUX.2 prompts text-free; do not request CTA pills or multi-block typography from FLUX.2.

**Soul Cinematic — display face position**
- Output 06 (Angle 2 master plate): LED display rendered on the SIDE face (where the laser-engraved spec block belongs per `02_PRODUCT_REFERENCES/captions/INDEX.md`) instead of the TOP face. Hard product-accuracy violation.
- Pattern: Soul Cinematic biases toward dramatic side-light hero shots and may relocate the display to the lit face for compositional reasons.
- Fix for next run: add explicit positive prompt "the LED dot-matrix display is on the TOP face of the brick, NOT the side face" and explicit negative "display on the side face, display next to the laser-engraved spec block."

**Soul Cinematic — carry loop drape**
- Output 05 (Angle 1 master plate): carry loop drapes in an unnatural upright "U" shape rather than falling naturally to the side under gravity.
- Pattern: when the loop is positioned beside (not over) the brick, Soul Cinematic interprets it as standing rather than draping.
- Fix for next run: explicit positive "carry loop draping downward under gravity, falling to the side of the brick, hanging not standing."

**GPT Image 2 — extra plinth labels**
- Output 02 (Angle 3 50,000 mAh): GPT Image 2 rendered an extra "TITAN X / 50,000 mAh" plaque under the product on the plinth, not requested in the prompt.
- Pattern: when a spec headline appears above the product, GPT Image 2 sometimes mirrors a smaller version of the product name+spec on the plinth as a "museum label."
- Fix for next run: explicit negative "no text on the plinth, no labels under the product, no museum-style nameplate, no spec text outside the typography block specified above."

### Aspect-ratio constraints

- FLUX.2 enum has no 4:5 — closest is 3:4. Adopted 3:4 for Meta feed assets that target 4:5; minor crop in post.
- GPT Image 2 enum also has no 4:5 — same workaround.
- Note this in future briefs: spec asks for 4:5 → run at 3:4 and accept the slight aspect mismatch, or run square 1:1 if cropping is unacceptable.

### Display readout

- All five outputs that show the display rendered "100" or "100%" correctly. The earlier concern about needing "188%" + post-edit is unfounded for GPT Image 2 and Soul Cinematic at this prompt fidelity. Keep the rule: render "100%" directly, post-correct only on a per-asset basis.

### Platform substitution

- Higgsfield platform does NOT host Ideogram. Substituted with GPT Image 2 for steps 1, 2, 3. Outcome: GPT Image 2 typography fidelity proved sufficient for pre-launch (4/4 typography blocks rendered cleanly on output 01; 4/5 on output 02 with one extra plinth label; 4/4 on output 03). For future runs requiring Ideogram-grade typography fidelity, route the request to an out-of-platform Ideogram API or accept GPT Image 2 as the production substitute.
