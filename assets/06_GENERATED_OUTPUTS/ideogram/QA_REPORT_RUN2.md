# Ideogram Revision Pass — QA Report (Run 2, 2026-05-15)

4 jobs · API v3 · QUALITY · REALISTIC · magic OFF · 1 image each
Wall time: ~9.5s parallel
Revision targets: A2 (geometry), B1 (loop+brick text), B2 (rejected — wrong brand on brick), C1 (loop text + missing silhouettes)

Prompt fixes applied:
- explicit brick/loop text isolation ("brick body unmarked except top wordmark; embossing only on the loop")
- geometry lock ("chunky rectangular brick, taller than wide, NOT slim, NOT smartphone-shaped")
- silhouette visibility upgrade ("clearly visible faint white architectural-sketch outlines")
- TITANBANKS spelling lock with all 10 letters

---

## Per-output QA

### A2 v2 — Angle 1 lifestyle backpack (9:16) → APPROVED *(big jump from v1)*
File: [approved/ideogram_angle-01_A2_lifestyle_v2.png](approved/ideogram_angle-01_A2_lifestyle_v2.png) · seed `865458342`

| Checklist | Result |
|-----------|--------|
| Product accuracy | **PASS** — geometry lock worked: chunky brick form, no longer smartphone-shaped ✓; TITANBANKS wordmark visible on top face |
| Text accuracy | **PASS** — subhead now reads correctly "Built for long days without an outlet." (the missing "an" from v1 is fixed); headline + CTA clean |
| Claim compliance | PASS |
| Brand consistency | PASS — pier/sunset framing premium |

Verdict: production-ready. Pre-launch lifestyle hero.

### B1 v2 — Angle 2 strap macro (3:4) → NEEDS REVISION *(brick fixed, loop still garbles)*
File: [needs_revision/ideogram_angle-02_B1_macro_v2.png](needs_revision/ideogram_angle-02_B1_macro_v2.png) · seed `128755207`

| Checklist | Result |
|-----------|--------|
| Product accuracy | MIXED — brick body now clean (no extra text on the brick face — isolation fix worked); large hero loop in foreground (composition fix worked) |
| Text accuracy | **FAIL** — embossed loop text still renders garbled (reads as "CINDIA" / "CIN DIA" / similar nonsense), not "POWER BANK"; headline + CTA clean |
| Claim compliance | PASS |
| Brand consistency | PASS |

Verdict: improved on v1 (brick is now clean). Loop text remains unsolvable for Ideogram at this scale. Recommend: render this concept text-free in Ideogram and overlay the loop embossing in Photoshop (faster than further regen attempts).

### B2 v2 — Angle 2 strap lifestyle (3:4) → NEEDS REVISION *(out of REJECTED bucket — major improvement)*
File: [needs_revision/ideogram_angle-02_B2_lifestyle_v2.png](needs_revision/ideogram_angle-02_B2_lifestyle_v2.png) · seed `400281816`

| Checklist | Result |
|-----------|--------|
| Product accuracy | MIXED — geometry lock worked: chunky brick, no longer smartphone-shaped ✓; **but small "POWER BANK" still embossed on the brick front face** (much smaller than v1 "TOWER BANK" but still wrong placement); the lifting hand did not render |
| Text accuracy | MIXED — headline + CTA clean; on-brick "POWER BANK" wrong location |
| Claim compliance | PASS |
| Brand consistency | PASS |

Verdict: the catastrophic "TOWER BANK on brick" of v1 is gone. The "POWER BANK on brick" still appears but smaller. Hand was dropped from the scene entirely. Either accept the no-hand version (and re-prompt to remove the brick text), or accept that the hand-lift concept may need a different model (GPT Image 2 handled hands better). Out of rejected, into needs_revision.

### C1 v2 — Angle 3 50,000 mAh (9:16) → NEEDS REVISION *(geometry fixed, silhouettes still missing)*
File: [needs_revision/ideogram_angle-03_C1_hero_v2.png](needs_revision/ideogram_angle-03_C1_hero_v2.png) · seed `1169859323`

| Checklist | Result |
|-----------|--------|
| Product accuracy | PASS — geometry chunky, plinth unmarked, display "100%" on top face, TITANBANKS wordmark visible |
| Text accuracy | MIXED — headline rendered as "50,000 MaH." (mixed casing — should be "mAh" or all-caps "MAH"); subhead + CTA clean |
| Claim compliance | PASS |
| Brand consistency | PASS but the **6 flanking silhouettes still did not render** despite explicit "clearly visible faint white architectural-sketch outlines" prompt |

Verdict: geometry + plinth + display + brick all clean. Two remaining issues: weird "MaH" casing and the silhouettes never landing. The silhouettes are a structural part of the concept — without them the ad reads as a plain spec hero, losing the "but that is not the point" tension. Recommendation: regen with even stronger silhouette prompting, OR drop the silhouettes entirely and let the ad work as a pure spec hero (the headline does the heavy lifting).

---

## Sort summary

| Bucket | Count | Files |
|--------|-------|-------|
| approved | **2** | A1 hero v1, A2 lifestyle v2 |
| needs_revision | 3 | B1 macro v2, B2 lifestyle v2, C1 hero v2 |
| rejected | **0** *(was 1)* | — |
| _v1_archive | 4 | A2, B1, B2, C1 from run 1 (kept for comparison) |

## Folder map (where to find everything)

| What | Path |
|------|------|
| **Approved (production-ready)** | `C:\Users\natan\TitanBanks\assets\06_GENERATED_OUTPUTS\ideogram\approved\` |
| Needs revision | `C:\Users\natan\TitanBanks\assets\06_GENERATED_OUTPUTS\ideogram\needs_revision\` |
| Rejected (currently empty) | `C:\Users\natan\TitanBanks\assets\06_GENERATED_OUTPUTS\ideogram\rejected\` |
| v1 historical (for comparison) | `C:\Users\natan\TitanBanks\assets\06_GENERATED_OUTPUTS\ideogram\_v1_archive\` |
| All raw outputs (v1 + v2) | `C:\Users\natan\TitanBanks\assets\06_GENERATED_OUTPUTS\ideogram\inbox\` |
| QA reports | this file + `QA_REPORT_RUN1.md` in the same folder |
| Updated paste prompts | `C:\Users\natan\TitanBanks\assets\05_GENERATION_PROMPTS\ideogram\_paste\` |

## Run-2 wins

- **2 approved assets** instead of 1 — A2 lifestyle backpack is now usable
- **0 rejected** (was 1 — the "TOWER BANK on brick" disaster is gone)
- Geometry lock works (A2, B2, C1 all have correct brick form now)
- Brick/loop isolation partially works (B1 brick is clean; B2 still has small "POWER BANK" but no longer "TOWER BANK")
- Plinth-no-label rule continues to hold (C1 plinth clean, second run in a row)

## Run-2 unsolved problems

- **Embossed loop text** — Ideogram garbles this at every scale and prompt strength. Move loop-embossing to post-production overlay.
- **Flanking silhouettes** — Ideogram won't render low-opacity scene elements regardless of prompting. Consider dropping from C1 and letting the spec headline carry alone, OR drawing them in post.
- **B2 hand** — the lifting hand dropped between v1 and v2. If hand-on-strap is creative-critical, route this concept through GPT Image 2 (handled hands well in run-1).

## Recommended next steps (when you say go)

1. Use the 2 approved assets (A1 hero + A2 lifestyle) as the pre-launch pair right now.
2. For B1 strap macro: render text-free in Ideogram + overlay "POWER BANK" loop embossing in Photoshop.
3. For B2 strap lifestyle (with hand): regenerate via GPT Image 2 instead of Ideogram.
4. For C1 50,000 mAh: either drop silhouettes (keep clean spec hero) or draw silhouettes as a vector layer in Figma.
