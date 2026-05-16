# Ideogram Reference-Aware Run — QA Report (Run 3, 2026-05-15)

5 jobs · API v3 · QUALITY · `style_type=AUTO` (required for refs) · 3 style references attached per call · 1 image each
Wall time: ~10s parallel
Cost: ~$0.40

What changed vs run 2:
- Attached **3 OEM photos as `style_reference_images`**: `slot-18` (front 3Q), `slot-19` (side 3Q), `slot-20` (top-down ports). Resized to 1024 JPEG (60-170 KB each) to fit upload.
- **Geometry correction** injected into every prompt: display lives on the FRONT face (not the TOP face — that holds the port array). The first two runs had this wrong in the prompt text.
- Strap concepts (B1, B2) also got `slot-09` (material macro for fiber).

---

## Per-output QA

### A1 v3 — Angle 1 hero (9:16) → APPROVED *(replaces A1 v1)*
File: [approved/ideogram_angle-01_A1_hero_v3.png](approved/ideogram_angle-01_A1_hero_v3.png) · seed `143193188`

| Checklist | Result |
|-----------|--------|
| Product accuracy | **PASS — best Titan X likeness yet.** Chunky brick proportions ✓; **display now correctly on the FRONT face** with "100%" + green icon ✓; TITANBANKS wordmark on front face ✓; refs taught the geometry |
| Text accuracy | MIXED — TITANBANKS spelled correctly ✓; headline "Never at 0." in sentence case ✓ (v3 prompts now include the canonical block which preserves casing); CTA "Join the waitlist" ✓; **subhead lost "an" again — reads "looks for outlet"** (v1 bug returned because attention budget went to refs/geometry) |
| Claim compliance | PASS |
| Brand consistency | PASS — premium, dark cinematic |

Verdict: **the strongest pre-launch hero yet.** Use this as the anchor Story asset. The missing "an" is small body text — patch in Photoshop or accept.

### A2 v3 — Angle 1 lifestyle backpack (9:16) → ARCHIVED, A2 v2 stays approved
File moved to: [_v2_archive/ideogram_angle-01_A2_lifestyle_v3.png](_v2_archive/ideogram_angle-01_A2_lifestyle_v3.png) · seed `1646009266`

| Issue | Why |
|-------|-----|
| **Lost the lifestyle scene entirely** | Refs are marketplace product shots → Ideogram pulled the composition into a studio hero, dropped the backpack/pier/dusk scene |

Decision: keep **A2 v2** as the approved lifestyle asset. v3 traded scene context for geometry — bad trade for a lifestyle ad.

### B1 v3 — Angle 2 strap macro (3:4) → NEEDS REVISION
File: [needs_revision/ideogram_angle-02_B1_macro_v3.png](needs_revision/ideogram_angle-02_B1_macro_v3.png) · seed `675955324`

| Checklist | Result |
|-----------|--------|
| Product accuracy | PASS — brick body clean (isolation rule held), correct chunky geometry, TITANBANKS visible |
| Text accuracy | **FAIL — embossed loop text garbled for the THIRD time** (reads "TINTANENNETI" or similar). Headline + CTA clean. |
| Claim compliance | PASS |
| Brand consistency | PASS |

**Decision: stop iterating loop-embossing in Ideogram (3 attempts, 3 garbled outputs).** Recommendation: regen this concept text-free in Ideogram and overlay "POWER BANK" embossing in Photoshop. Or route to GPT Image 2 which rendered loop embossing cleanly in the first run.

### B2 v3 — Angle 2 strap lifestyle hand (3:4) → NEEDS REVISION
File: [needs_revision/ideogram_angle-02_B2_lifestyle_v3.png](needs_revision/ideogram_angle-02_B2_lifestyle_v3.png) · seed `269186746`

| Checklist | Result |
|-----------|--------|
| Product accuracy | MIXED — brick body finally clean (no "POWER BANK" / "TOWER BANK" on it ✓ — major win); correct geometry |
| Text accuracy | FAIL — loop embossing garbled vertically; **no hand in the scene** (concept lost again) |
| Claim compliance | PASS |
| Brand consistency | **FAIL — white background instead of near-black matte** (marketplace refs pulled the aesthetic toward white studio) |

The hand concept won't render in Ideogram. Per learnings, route hand-on-strap to GPT Image 2.

### C1 v3 — Angle 3 50,000 mAh (9:16) → NEEDS REVISION
File: [needs_revision/ideogram_angle-03_C1_hero_v3.png](needs_revision/ideogram_angle-03_C1_hero_v3.png) · seed `135129598`

| Checklist | Result |
|-----------|--------|
| Product accuracy | MIXED — geometry better than v2 ✓; **display reads "5000%" instead of "100%"** (display panel-readout drift caused by the "50,000" headline bleed); TITANBANKS visible |
| Text accuracy | **FAIL** — headline mangled to "50.00 Mah." — lost the comma + dropped digits + odd casing; subhead and CTA clean |
| Claim compliance | PASS |
| Brand consistency | **FAIL — white background** (same marketplace-ref pull as B2); 6 silhouettes still missing |

Multiple regressions vs v2. Decision: drop silhouettes from this concept entirely (Ideogram can't render them) and re-run with dark-cinematic refs instead of marketplace refs.

---

## Sort summary (current state)

| Bucket | Count | Files |
|--------|-------|-------|
| **approved** | **2** | A1 hero v3 (new geometry), A2 lifestyle v2 (still best lifestyle) |
| needs_revision | 3 | B1 v3, B2 v3, C1 v3 (all geometrically correct now, but each has remaining text/aesthetic issues) |
| rejected | 0 | — |
| _v1_archive | 4 | original v1 of regen'd concepts |
| _v2_archive | 5 | A1 v1, A2 v3, B1 v2, B2 v2, C1 v2 |

## Folder map

| What | Path |
|------|------|
| **Approved (production-ready)** | `C:\Users\natan\TitanBanks\assets\06_GENERATED_OUTPUTS\ideogram\approved\` |
| Needs revision | `C:\Users\natan\TitanBanks\assets\06_GENERATED_OUTPUTS\ideogram\needs_revision\` |
| v1 historical | `C:\Users\natan\TitanBanks\assets\06_GENERATED_OUTPUTS\ideogram\_v1_archive\` |
| v2 historical + A2 v3 (downgrade) | `C:\Users\natan\TitanBanks\assets\06_GENERATED_OUTPUTS\ideogram\_v2_archive\` |
| All raw outputs (every version) | `C:\Users\natan\TitanBanks\assets\06_GENERATED_OUTPUTS\ideogram\inbox\` |
| Resized refs (used for v3) | `C:\Users\natan\TitanBanks\assets\06_GENERATED_OUTPUTS\ideogram\_refs_resized\` |
| QA reports | `QA_REPORT_RUN1.md` · `QA_REPORT_RUN2.md` · `QA_REPORT_RUN3.md` (this file) |
| v3 runner script | `_run_ideogram_v3.py` |

---

## Run 3 wins

- **Geometry transformed** by `style_reference_images`. The brick now actually looks like the real Titan X across all 5 outputs — display in the right place (front face), correct chunky proportions, port array on top, TITANBANKS wordmark in the right spot. This was untouchable in runs 1 + 2.
- **A1 hero v3 is the strongest pre-launch hero across all three runs.** Use this for the Story / Reel anchor.
- **Brick body stays clean** — the run-2 brick/loop isolation rule held even with refs added.

## Run 3 trade-offs (important learning)

- **Marketplace refs pull aesthetic to white background.** Outputs B2 + C1 lost the dark cinematic background because the references (slot-18/19/20) are white-background marketplace shots. To preserve dark cinematic mood, swap to dark-cinematic refs (slot-06 warm orange rim, slot-09 material macro on dark, slot-10 display macro on dark).
- **Adding refs eats prompt-attention budget.** Outputs lost some text fidelity that v2 had: A1 v3 dropped "an" (was correct in v2), C1 v3 mangled "50,000 mAh." into "50.00 Mah.". Refs vs text-fidelity is a tension.
- **Lifestyle scenes get flattened.** A2 v3 lost the backpack/pier scene entirely because refs are studio shots. Lifestyle prompts shouldn't use studio-marketplace refs.

## Persistent failures (3 attempts, 3 fails — stop trying)

- **Loop embossing "POWER BANK"** — garbled in v1, v2, v3. Move to Photoshop overlay.
- **6 flanking silhouettes** — absent in v1, v2, v3. Drop from concept or draw in Figma.
- **Hand-on-strap (B2)** — dropped in v2 and v3. Route to GPT Image 2.

---

## Recommended next moves (when you say go)

**Reference-set rotation** (highest ROI for next run):
- For hero/spec concepts (A1, C1): use slot-18 (front), slot-19 (side), slot-20 (ports) — already done; A1 worked.
- For lifestyle concepts (A2): use NO refs OR refs from a different lifestyle shot (slot-15 bureau, slot-16 leather bag, slot-17 auto if those exist as dark cinematic).
- For strap macro (B1): swap to slot-09 (material macro) + slot-06 (warm orange rim) — both dark cinematic — to preserve mood while still hinting at fiber detail.

**Concept routing** (one-time decisions):
- B1 strap macro → text-free Ideogram + Photoshop loop overlay
- B2 strap-with-hand → GPT Image 2 (hand-handling beats Ideogram)
- C1 50,000 mAh → drop silhouettes from concept; render as pure spec hero with dark refs

Wil je dat ik dit nu uitvoer?
