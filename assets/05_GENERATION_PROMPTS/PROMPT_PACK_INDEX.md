# Pre-Launch Prompt Pack Index

Last revised 2026-05-15 (revision 2 — source-of-truth alignment + variant split).
Covers the 3 strongest pre-launch ad angles × 4 generation models = 12 prompt files, each with multiple variants.

---

## Angles

| # | Angle | Template | Aspect | Source ad ref |
|---|-------|----------|--------|---------------|
| 01 | Never at 0. | A — Vertical I-Stack | 9:16 | `03_COMPETITOR_ADS/raw_ads/media-3fffad1244cf.jpg` |
| 02 | The strap people ask about. | D — Light-Streak Off-Axis | 4:5 | `03_COMPETITOR_ADS/raw_ads/media-9a0d91af4181.jpg` |
| 03 | 50,000 mAh. But that is not the point. | C — Spec Reframe | 9:16 | `03_COMPETITOR_ADS/raw_ads/media-80c9c09a9527.jpg` |

## Files

| Angle | Higgsfield | GPT Image 2 | Flux | Ideogram |
|-------|------------|-------------|------|----------|
| 01 | [→](higgsfield/angle-01_never-at-0.md) | [→](gpt_image/angle-01_never-at-0.md) | [→](flux/angle-01_never-at-0.md) | [→](ideogram/angle-01_never-at-0.md) |
| 02 | [→](higgsfield/angle-02_strap-people-ask-about.md) | [→](gpt_image/angle-02_strap-people-ask-about.md) | [→](flux/angle-02_strap-people-ask-about.md) | [→](ideogram/angle-02_strap-people-ask-about.md) |
| 03 | [→](higgsfield/angle-03_50000mah-not-the-point.md) | [→](gpt_image/angle-03_50000mah-not-the-point.md) | [→](flux/angle-03_50000mah-not-the-point.md) | [→](ideogram/angle-03_50000mah-not-the-point.md) |

## Variant matrix

Each file contains multiple variants. Total variant count: 27.

| Angle × Model | Variants |
|---------------|----------|
| Angle 01 — Higgsfield | A1 master plate (text-free), A2 ad variant (in-image text), A3 lifestyle festival night |
| Angle 01 — GPT Image | A1 hero, A2 lifestyle remote work / coffee shop |
| Angle 01 — Flux | A1 hero, A2 lifestyle road trip dashboard |
| Angle 01 — Ideogram | A1 hero, A2 lifestyle backpack on city bench |
| Angle 02 — Higgsfield | B1 master plate (text-free), B2 ad variant (in-image text), B3 lifestyle hand on strap |
| Angle 02 — GPT Image | B1 hero macro, B2 lifestyle hand on strap |
| Angle 02 — Flux | B1 hero macro, B2 lifestyle hand on strap |
| Angle 02 — Ideogram | B1 hero macro, B2 lifestyle hand on strap |
| Angle 03 — Higgsfield | C1 master plate (text-free), C2 ad variant (in-image text) |
| Angle 03 — GPT Image | C1 hero with flanking silhouettes |
| Angle 03 — Flux | C1 hero with flanking silhouettes |
| Angle 03 — Ideogram | C1 hero with flanking silhouettes |

## Recommended model per angle (first attempt)

| Angle | Recommended | Reason |
|-------|-------------|--------|
| 01 — Never at 0. | **Ideogram 2.0** | Five text blocks must render clean first try |
| 02 — Strap | **Ideogram 2.0** primary, **Flux 1.1 Pro Ultra** for macro fiber detail | Embossed "POWER BANK" on woven fabric is the hardest text-rendering challenge in the pack |
| 03 — 50,000 mAh | **Ideogram 2.0** | Comma in "50,000" tends to drop in Flux / GPT Image |

**Higgsfield** is the highest-quality cinematic path but its in-engine text rendering is unreliable. Always run the **master plate** variant in Higgsfield (text-free) and overlay typography in Figma/Photoshop. The **ad variant** is provided for fast iteration; expect post-correction.

## Cross-cutting locks (every prompt enforces these)

- Logo spelling exact: TITANBANKS
- Product geometry per `02_PRODUCT_REFERENCES/product_accuracy_rules.md` and `02_PRODUCT_REFERENCES/captions/INDEX.md`
- Display readout always "100%". Render directly. If model garbles small UI text, post-correct in Photoshop. Do not intentionally generate "188%" or any other value.
- Single warm orange `#FF6B00` accent. Background `#0A0A0A`–`#1A1A1A`.
- People / hands rule (per-variant, not global):
  - Hero variants: no people, no hands
  - Lifestyle variants: edge-of-frame partial human cue allowed for approved contexts only (festival, road trip, remote work, coffee shop, commute / backpack); hand-on-strap permitted for Angle 02
  - Lifestyle variants forbid: full faces, identifiable people, jewelry, watches, rings, nail polish, tattoos, second hand
- No airplane / airport / TSA / aviation imagery (hard rule, every variant)
- No wattage / fast-charging text (open question — see `01_BRAND_CONTEXT/open_questions/`)
- Do not mention Micro-USB input/output role in ad copy until confirmed. Visually preserve the port if visible in product shots, but do not make functional claims about it (no "Micro-USB in", no "Micro-USB out", no "charges via Micro-USB" copy).
- Cable usage (lifestyle shots): for clean premium lifestyle shots, show only one cable in use unless the specific concept is about multi-device charging. Do not globally forbid use of both retractable cables.
- No discount, urgency, date window, % off (forbidden claims)
- CTAs only from approved waitlist set: Join the Waitlist · Coming Soon · Be First to Know · Discover the build · Power Is Coming · The Drop Is Coming

## Workflow

1. Open the prompt file for chosen (angle × model)
2. Pick a variant (hero or lifestyle) per the deliverable list in `04_CREATIVE_BRIEFS/pre_launch_awareness/titan_x_pre_launch_brief.md`
3. Run prompt verbatim with the listed parameters
4. Generate 4 variants
5. Run the embedded verification checklist
6. Run the 5 checklists in `08_QA_CHECKLISTS/`
7. If pass → drop into `06_GENERATED_OUTPUTS/<platform>/needs_revision/` (or `approved/` after second review)
8. Final approved → `09_EXPORTS/ready_for_<platform>/`
9. Log learnings (winning seeds, recurring failures) in `10_LEARNINGS/`

## Recommended generation order (first run)

1. **Angle 01 / Ideogram / A1 hero** → fastest waitlist-ready hero asset
2. **Angle 03 / Ideogram / C1** → confirms comma + period + low-opacity silhouette rendering
3. **Angle 02 / Ideogram / B1 hero macro + B2 hand-on-strap** in parallel → carry loop is the highest-craft asset; pick best
4. **Angle 02 / Flux / B1 + B2** in parallel with Ideogram → compare macro fiber detail
5. **All three angles / Higgsfield / master plates (A1, B1, C1)** → cinematic master plates for design overlay
6. **Lifestyle variants** for the platforms that need them (Story / TikTok benefit most from lifestyle context)
7. Compare paths, lock the winner per (angle × variant), log to `10_LEARNINGS/winning_creative_patterns.md`

## Open items before first generation

- Confirm preferred model stack (this pack covers all 4 — pick or run all)
- Confirm `01_BRAND_CONTEXT/open_questions/` items remain blocked. If wattage or Micro-USB function is later supplier-confirmed, ad-copy claims can be added; visual rendering of the port is already permitted.
- Confirm hand-shot creative direction for Angle 02 B2 variant (neutral skin tone, no jewelry, no watch, no nail polish — this is the brand-safe default; flag if a different aesthetic is preferred)
