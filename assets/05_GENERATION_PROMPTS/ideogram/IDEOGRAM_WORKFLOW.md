# Ideogram Workflow

You run Ideogram manually in your own browser. I never see your credentials. This file plus the `_paste/` folder contain everything you need.

---

## Folder map

| What | Path |
|------|------|
| Copy-paste prompt files | `05_GENERATION_PROMPTS/ideogram/_paste/` |
| Long-form context files (reference, not for paste) | `05_GENERATION_PROMPTS/ideogram/angle-*.md` |
| Drop downloaded outputs here | `06_GENERATED_OUTPUTS/ideogram/inbox/` |
| QA-sorted outputs | `06_GENERATED_OUTPUTS/ideogram/{approved, needs_revision, rejected}/` |
| QA criteria | `08_QA_CHECKLISTS/{product_accuracy, text_accuracy, claim_compliance, brand_consistency}/` |

---

## Per-run workflow

1. Open one file from `_paste/` (e.g. `angle-01_never-at-0_A1_hero.txt`).
2. The file has 4 sections separated by `━━━` rules:
   - **IDEOGRAM SETTINGS** — copy values into Ideogram's UI controls (model, aspect, style, magic prompt off, quality).
   - **PROMPT** — paste into the main prompt box.
   - **NEGATIVE** — paste into the negative prompt box.
   - **SAVE OUTPUTS TO** — local path + filename pattern.
3. Generate 4 variants in Ideogram.
4. Download the keepers using the filename pattern in the file (e.g. `ideogram_angle-01_A1_hero_1.png`, `_2`, `_3`, `_4`).
5. Save into `06_GENERATED_OUTPUTS/ideogram/inbox/`.
6. Tell me "QA the Ideogram inbox" and I'll run all four QA checklists, sort into approved / needs_revision / rejected, and log learnings to `10_LEARNINGS/`.

---

## Available paste-ready prompt files (5 variants)

| File | Angle | Variant | Aspect |
|------|-------|---------|--------|
| `_paste/angle-01_never-at-0_A1_hero.txt` | Never at 0. | Hero (product-only) | 9:16 |
| `_paste/angle-01_never-at-0_A2_lifestyle-backpack.txt` | Never at 0. | Lifestyle: backpack on city bench | 9:16 |
| `_paste/angle-02_strap_B1_hero-macro.txt` | The strap people ask about. | Hero macro (product-only) | 4:5 |
| `_paste/angle-02_strap_B2_lifestyle-hand.txt` | The strap people ask about. | Lifestyle: hand on strap | 4:5 |
| `_paste/angle-03_50000mah-not-the-point_C1_hero.txt` | 50,000 mAh. But that is not the point. | Hero with flanking silhouettes | 9:16 |

All five have first-run learnings baked in:
- explicit "no plinth label / no museum nameplate / no label under the product" (lesson from output 02)
- explicit "embossing reads horizontal POWER BANK with a space, not vertical, not stacked, not one word" (lesson from output 04)
- explicit "display on TOP face, not side face" (lesson from output 06)
- explicit "no extra small labels on the strap, no '100%' tag on the strap" (lesson from output 04)
- corrected cable rule (only-one-cable-in-use guidance retained for clean lifestyle shots, no global forbid)
- corrected Micro-USB rule (no functional claim in copy; visual port preserved)

---

## When you drop outputs in the inbox

Default expectation: filenames follow the pattern in the prompt file. If you rename them, that's fine — just keep the angle and variant in the name so I can map back to the source prompt.

I'll run QA against:
- `08_QA_CHECKLISTS/product_accuracy/product_accuracy_checklist.md` — geometry, no fake parts, logo spelling, display readout, no aviation
- `08_QA_CHECKLISTS/text_accuracy/text_accuracy_checklist.md` — spelling, no garbled letters, no extra words, no Buy Now / More Info
- `08_QA_CHECKLISTS/claim_compliance/claim_compliance_checklist.md` — no aviation, no charging speed, no Micro-USB output claim, no urgency
- `08_QA_CHECKLISTS/brand_consistency/brand_consistency_checklist.md` — premium, dark/cinematic, sparing orange, Nothing/B&O feel

Sort outcome and recurring errors will be appended to `10_LEARNINGS/` so the next prompt revision can incorporate them.
