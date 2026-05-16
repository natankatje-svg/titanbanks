# First-Run QA Report — 2026-05-15

Run: 6-step first-run pre-launch generation.
QA passes against `08_QA_CHECKLISTS/` (product_accuracy, text_accuracy, claim_compliance, brand_consistency).
Note: Higgsfield platform does not host Ideogram. Steps 1, 2, 3 substituted to **GPT Image 2** (the platform's strongest typography model). Step 4 ran on **FLUX.2 (max)**. Steps 5, 6 ran on **Soul Cinematic** as the cinematic master-plate engine.

---

## Per-output QA

### 01 — GPT Image 2 / Angle 1 "Never at 0." (9:16) → APPROVED
File: [approved/01_gpt_angle1_never_at_0.png](../approved/01_gpt_angle1_never_at_0.png)

| Checklist | Result |
|-----------|--------|
| Product accuracy | PASS — looks like Titan X; carry loop matches; LED display "100%" matches; logo TITANBANKS spelled correctly; both short ends not shown; no fake screens; no airplane/airport |
| Text accuracy | PASS — TITANBANKS correct; "Never at 0." with period; subhead clean; "Join the Waitlist" CTA correct; no extra/garbled text |
| Claim compliance | PASS — no aviation, no charging speed, no Micro-USB output claim, no urgency, no % off |
| Brand consistency | PASS — premium, dark, cinematic, sparing orange, Nothing/B&O feel |

Verdict: production-ready for waitlist hero asset.

### 02 — GPT Image 2 / Angle 3 "50,000 mAh. But that is not the point." (9:16) → NEEDS REVISION
File: [needs_revision/02_gpt_angle3_50000mah.png](../needs_revision/02_gpt_angle3_50000mah.png)

| Checklist | Result |
|-----------|--------|
| Product accuracy | MIXED — geometry correct; **extra "TITAN X / 50,000 mAh" text rendered on the plinth below product** (hallucinated label, not in brief) |
| Text accuracy | MIXED — headline "50,000 mAh." (comma + period present) ✓; subhead and CTA clean ✓; **but extra plinth text = "random extra words" violation** |
| Claim compliance | PASS |
| Brand consistency | PASS — silhouette flanking executed beautifully, ghostly low-opacity correct |

Revision instruction: re-run with explicit negative "no text on the plinth, no labels under the product, no extra TITAN X text outside the in-image typography block." Concept is otherwise the strongest of the 9:16 set.

### 03 — GPT Image 2 / Angle 2 "The strap people ask about." (3:4) → APPROVED
File: [approved/03_gpt_angle2_strap_macro.png](../approved/03_gpt_angle2_strap_macro.png)

| Checklist | Result |
|-----------|--------|
| Product accuracy | PASS — Titan X geometry correct; carry loop matches; **embossed "POWER BANK" cleanly legible (best of set)**; LED display "100%" correct on top face |
| Text accuracy | PASS — all spellings clean; "The strap people ask about." with period; subhead and CTA correct |
| Claim compliance | PASS |
| Brand consistency | PASS — light-streak floor executed; premium press-shot quality |

Verdict: **strongest output of the run.** Production-ready.

### 04 — FLUX.2 max / Angle 2 "The strap people ask about." (3:4) → NEEDS REVISION
File: [needs_revision/04_flux_angle2_strap_macro.png](../needs_revision/04_flux_angle2_strap_macro.png)

| Checklist | Result |
|-----------|--------|
| Product accuracy | PASS — geometry correct; macro fiber detail very strong |
| Text accuracy | FAIL — **subhead missing "· Coming Soon"**; **bottom CTA pill "Coming Soon" entirely missing**; **hallucinated "100%" / "1000%" text rendered on the strap label area** (random extra words violation); embossing reads as vertical "POWERBANK" stack rather than horizontal "POWER BANK" |
| Claim compliance | PASS |
| Brand consistency | PASS — dark, cinematic, premium |

Revision instruction: re-run with stronger negative on "no text or labels on the strap; embossed text reads horizontally exactly POWER BANK; CTA pill at bottom-right must be present." Macro fiber detail is FLUX's strength — keep this model for fiber close-ups.

### 05 — Soul Cinematic / Angle 1 master plate (9:16) → NEEDS REVISION
File: [needs_revision/05_higgsfield_angle1_master_plate.png](../needs_revision/05_higgsfield_angle1_master_plate.png)

| Checklist | Result |
|-----------|--------|
| Product accuracy | MIXED — Titan X geometry correct; LED reads "100" not "100%" (post-correctable); **carry loop drapes in an unnatural upright "U" shape rather than naturally falling to the side** |
| Text accuracy | N/A (master plate, text-free by design) |
| Claim compliance | PASS |
| Brand consistency | PASS — extremely cinematic, near-black, single warm orange accent |

Revision instruction: re-run with explicit "carry loop drapes downward to the side, naturally falling under gravity." Composition and atmosphere are excellent — only the loop drape needs fix.

### 06 — Soul Cinematic / Angle 2 master plate (3:4) → REJECTED
File: [rejected/06_higgsfield_angle2_master_plate.png](../rejected/06_higgsfield_angle2_master_plate.png)

| Checklist | Result |
|-----------|--------|
| Product accuracy | **FAIL — LED display rendered on the SIDE face (where the laser-engraved spec block belongs) instead of the TOP face**. Per `02_PRODUCT_REFERENCES/captions/INDEX.md` the display lives on the top face. This is a hard product-accuracy violation. |
| Text accuracy | N/A (master plate) — embossing on loop also not legible |
| Claim compliance | PASS |
| Brand consistency | PASS — aesthetically the most cinematic frame in the set |

Reason rejected: visually beautiful but the display-on-wrong-face violation makes it unusable for a brand-launching asset. Re-prompt with explicit face-position locks.

---

## Sort summary

| Bucket | Count | Files |
|--------|-------|-------|
| approved | 2 | 01 (Never at 0 hero), 03 (Strap macro) |
| needs_revision | 3 | 02 (50,000 mAh — plinth text), 04 (Flux Strap — missing CTA + hallucinated strap text), 05 (Soul master plate — loop drape) |
| rejected | 1 | 06 (Soul master plate — display on wrong face) |

## Strongest outputs and why

1. **03 — GPT Image 2 / Angle 2 Strap (3:4)** — the only output where the embossed "POWER BANK" reads cleanly horizontal, headline + subhead + CTA all clean, light-streak floor executed, LED on correct top face. Anchor asset for the pre-launch Meta feed.
2. **01 — GPT Image 2 / Angle 1 Never at 0 (9:16)** — five-block typography rendered cleanly first try, product geometry correct, premium near-black with sparing orange. Anchor asset for the pre-launch Story / Reel.

Together 01 + 03 give a usable two-asset pre-launch cover (one Story, one Feed) without further revisions.

## Pipeline readiness verdict

The pipeline produced 2/6 production-ready assets first try (33%). Three are revisable with targeted prompt fixes. One requires re-prompt for face-position. **GPT Image 2 outperformed FLUX.2 and Soul Cinematic on text rendering**, which matters most for these typography-led pre-launch ads. Soul Cinematic remains the right tool for text-free master plates if the loop-drape and face-position issues are locked down in the prompt.
