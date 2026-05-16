# Run 4 — Three-Route Pass — QA Report (2026-05-15)

3 jobs · concept-specific routing per the run-3 learnings

| Concept | Route | Outcome |
|---------|-------|---------|
| C1 50,000 mAh | Ideogram + dark cinematic refs (slot-06/09/10) + drop silhouettes | **APPROVED** |
| B2 strap-with-hand | GPT Image 2 via Higgsfield | **APPROVED — strongest asset of all runs** |
| B1 strap macro | Ideogram + dark refs, text-free (master plate) | **APPROVED — overlay typography in Photoshop** |

Wall time: B1+C1 ~10s parallel; B2 ~3 min (one HTTP 502 retry).

---

## Per-output QA

### C1 v4 — 50,000 mAh with dark cinematic refs → APPROVED
File: [approved/ideogram_angle-03_C1_hero_v4_dark.png](approved/ideogram_angle-03_C1_hero_v4_dark.png) · seed `135129598`

| Checklist | Result |
|-----------|--------|
| Product accuracy | PASS — chunky brick geometry, display on FRONT face, TITANBANKS wordmark visible. Some digit drift in display (showing "888" not "100%") |
| Text accuracy | MIXED — headline rendered "50,000 Mah." (comma preserved this time ✓, but "Mah" casing still odd); subhead + CTA clean |
| Claim compliance | PASS |
| Brand consistency | **PASS — dark cinematic background restored** (refs swap solved the white-background bug from v3) |

Verdict: dark-refs strategy works. Minor "Mah" casing issue is a known Ideogram quirk; acceptable for pre-launch or patch in post.

### B2 v4 — strap-with-hand via GPT Image 2 → APPROVED *(strongest asset across all 4 runs)*
File: [approved/gpt_angle-02_B2_lifestyle_v4.png](approved/gpt_angle-02_B2_lifestyle_v4.png)

| Checklist | Result |
|-----------|--------|
| Product accuracy | **PASS — best Titan X likeness in the entire campaign so far.** Chunky brick, display on front face with "100%" + green icon, port array visible on top, TITANBANKS wordmark on bottom of front face |
| Text accuracy | **PASS — embossed "POWER BANK" CLEARLY LEGIBLE on the carry loop** (first time across any run); headline "The strap people ask about." sentence case + period; "Titan X – Coming Soon" subhead; "Coming Soon" CTA pill |
| Claim compliance | PASS |
| Brand consistency | PASS — premium, dark cinematic, sparing warm orange |

Hand: clean, neutral-toned, no jewelry/watch/rings, only one hand visible, finger correctly hooked through the loop, loop bearing the brick weight as intended.

Verdict: this is the **anchor pre-launch asset.** GPT Image 2 routing for hand concepts confirmed as the right call.

### B1 v4 — text-free strap macro → APPROVED as master plate
File: [approved/ideogram_angle-02_B1_macro_v4_textfree.png](approved/ideogram_angle-02_B1_macro_v4_textfree.png)

| Checklist | Result |
|-----------|--------|
| Product accuracy | PASS — chunky brick, display on front face with "100%" + green icon, TITANBANKS wordmark visible |
| Text accuracy | N/A (text-free master plate by design) |
| Claim compliance | PASS |
| Brand consistency | PASS — dark cinematic background ✓ |

Verdict: usable as a master plate. In Photoshop overlay: headline "The strap people ask about.", subhead "Titan X · Coming Soon", CTA "Coming Soon" pill, embossed "POWER BANK" on the loop.

---

## Sort summary (current state — pipeline-final)

| Bucket | Count | Files |
|--------|-------|-------|
| **approved** | **5** | A1 v3 (hero) · A2 v2 (lifestyle backpack) · B1 v4 textfree (master plate) · B2 v4 (hand on strap) · C1 v4 dark (spec hero) |
| needs_revision | **0** | — |
| rejected | **0** | — |

## Folder map

| What | Path |
|------|------|
| **All 5 approved** | `C:\Users\natan\TitanBanks\assets\06_GENERATED_OUTPUTS\ideogram\approved\` |
| v1/v2/v3 historical | `_v1_archive\` · `_v2_archive\` · `_v3_archive\` (in same parent) |
| All raw outputs | `inbox\` |
| Reference images (resized) | `_refs_resized\` |
| QA reports run 1–4 | `QA_REPORT_RUN1.md` through `QA_REPORT_RUN4.md` |
| Runner scripts | `_run_ideogram.py` · `_run_ideogram_v2.py` · `_run_ideogram_v3.py` · `_run_route_3way.py` · `_run_b2_clean.py` · `_send_telegram.py` |

## Key learnings from this 4-run campaign (logged in 10_LEARNINGS)

**What worked first try:** GPT Image 2 typography (run 1), Ideogram with marketplace refs for geometry (run 3 A1).

**What needed iteration:** brick geometry (3 attempts before refs solved it), brick/loop text isolation (improved each run, never perfect in Ideogram), display position correction (was wrong in prompts for 2 runs).

**What only works in specific tools:**
- Loop "POWER BANK" embossing → GPT Image 2 (4 attempts in Ideogram, all garbled; GPT Image 2 nailed it first try in B2 v4)
- Hand-on-strap → GPT Image 2 (Ideogram drops the hand)
- Cinematic master plates → Soul Cinematic OR Ideogram with dark refs

**What never works in Ideogram, regardless of prompting:**
- Six low-opacity flanking silhouettes (4 attempts, never rendered) — drop or Figma vector
- Loop embossed text (4 attempts, all garbled) — Photoshop overlay or use GPT Image 2

**Aesthetic-pulling rule:** style_reference_images don't just guide style, they pull the WHOLE composition aesthetic. Marketplace refs = white background. Dark cinematic refs = dark cinematic. Pick refs that match the desired final look, not just the geometry you want to teach.

## Next steps

The pre-launch creative pipeline is production-ready:
- 1 Story 9:16 hero (A1)
- 1 Story 9:16 lifestyle (A2)
- 1 Meta 4:5 with hand (B2)
- 1 Meta 4:5 master plate ready for Photoshop overlay (B1)
- 1 Story 9:16 spec reframe (C1)

Recommended export workflow: copy approved files to `09_EXPORTS/ready_for_<platform>/` after final brand review, then schedule via your social tooling.
