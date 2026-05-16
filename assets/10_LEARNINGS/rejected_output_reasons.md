# Rejected Output Reasons

Append-only log. Newest at the top.

---

## Run 2026-05-15 (b) — Ideogram first run

### Rejected

**04 — Ideogram / Angle 2 B2 lifestyle hand (3:4)**
- Reason: Ideogram embossed "TOWER BANK" (or distorted "POWER BANK") in large text on the front face of the brick body. The brand on the product is wrong. Brick geometry also rendered as a slim smartphone form rather than the Titan X chunky brick.
- Severity: hard product-accuracy violation. Cannot ship a brand-launching pre-launch ad with the wrong brand text baked into the product.
- Fix path: explicit isolation in the prompt — embossed POWER BANK appears ONLY on the loop, brick body is unmarked except for the small TITANBANKS top-face wordmark. Plus geometry lock against smartphone-shaped forms.

### Marked needs_revision

- **02** — Ideogram brick geometry drifts to slim smartphone shape; on-brick wordmark possibly missing trailing S. Add geometry + spelling locks.
- **03** — Garbled embossing on the loop ("ITITANBOWN") and extra garbled text on the brick body. Same loop-isolation fix as 04 + larger loop in composition for legibility.
- **05** — Garbled loop text + the six flanking silhouettes did not render at all. Increase silhouette visibility cue and isolate loop embossing.

---

## Run 2026-05-15 — pre-launch first run

### Rejected

**06 — Soul Cinematic / Angle 2 master plate (3:4)**
- Reason: LED display rendered on the SIDE face of the powerbank instead of the TOP face. Per `02_PRODUCT_REFERENCES/captions/INDEX.md` (Image-04 / Image-05 OEM references), the display window lives on the TOP face; the side face holds the laser-engraved certification icons and spec block.
- Severity: hard product-accuracy violation (rule "fake screens" / "wrong product geometry" per `08_QA_CHECKLISTS/product_accuracy_checklist.md`).
- Aesthetic note: this was the most cinematic frame in the run — the loop backlit by the orange streak is a striking composition. Worth re-prompting once with the face-position lock from `10_LEARNINGS/model_errors_log.md`.

### Marked needs_revision (not rejected)

- **02** — extra "TITAN X / 50,000 mAh" plinth label (random extra words). One re-run with negative lock should fix.
- **04** — Flux missing CTA pill, missing "Coming Soon" subhead, hallucinated "100%" on strap. Pull text out of Flux entirely; use it for text-free master plates only.
- **05** — Soul Cinematic loop drape unnatural (upright "U" instead of natural fall). Add gravity-direction prompt.
