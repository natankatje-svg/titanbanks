# Flux — Angle 01 — "Never at 0."

Angle: Never at 0.
Template: A — Vertical I-Stack Hero (9:16)
Recommended model: Flux 1.1 Pro Ultra (best text rendering) or Flux Dev
Aspect: `--ar 9:16` (or 768×1344)
Suggested params: guidance 3.5, steps 28–35

Source-of-truth: see `02_PRODUCT_REFERENCES/captions/INDEX.md`, `01_BRAND_CONTEXT/approved_claims/`, `01_BRAND_CONTEXT/forbidden_claims/`. Display reads "100%". If Flux garbles small UI text, post-correct in Photoshop.

## Variants in this file
- A1 — Hero (product-only)
- A2 — Lifestyle: road trip dashboard (approved use case)

---

## VARIANT A1 — Hero (product-only)

```
Premium product advertisement photograph, 9:16 vertical, TITANBANKS Titan
X powerbank, matte black 50,000 mAh brick standing upright on a
barely-visible reflective plinth in the lower half of the frame, slight
3/4 off-axis angle, top face clearly showing a small "TITANBANKS"
wordmark and an LED dot-matrix display window reading "100%" with a tiny
green charge icon. Orange woven carry loop with embossed "POWER BANK"
text draping to the side. Single warm orange rim light, hex #FF6B00,
grazing the right edge from camera right. Faint cool fill from camera
left. Background deep near-black, hex #0A0A0A, soft radial vignette,
subtle warm underglow halo beneath the product. Centered axis with
generous negative space in the upper 50%. Cinematic low-key, silent
luxury aesthetic, closer to Bang & Olufsen and Nothing brand press
imagery than gaming hardware. Medium format, 85mm lens equivalent,
shallow depth of field, deep neutral blacks, slight orange highlight
roll-off. Photorealistic matte metal with satin micro-grain finish.

In-image typography (render exactly): top center small white
"TITANBANKS"; below it smaller light grey "Titan X · Coming Soon";
mid-upper very large white headline "Never at 0."; below it small white
"While the world looks for an outlet, you keep going."; bottom center
matte black pill with thin orange border containing white text "Join
the Waitlist".
```

Negative:
```
people, hands, fingers, body parts, faces, extra ports, extra buttons,
fake LED panels, secondary screens, fake labels, extra cables, second
carry loop, both short ends visible, airplane, airport, TSA, RGB
lighting, neon, rainbow, bokeh balls, white background, generic
powerbank, urgency timer, discount badge, percentage off, countdown,
date window, marketing slogans beyond the specified text, watermark,
second logo, misspelled wordmark, stretched proportions, port doubling,
plastic look, fingerprints, dust, charging-speed callout, wattage number
```

---

## VARIANT A2 — Lifestyle: road trip dashboard (approved use case)

```
Premium lifestyle product advertisement photograph, 9:16 vertical, dusk
hour, the matte black TITANBANKS Titan X 50,000 mAh powerbank sits
upright on the dashboard of a stationary modern car, lower-center of the
frame, 3/4 off-axis angle. The top face shows a small "TITANBANKS"
wordmark and an LED dot-matrix display reading "100%" with a tiny green
charge icon. The orange woven carry loop with embossed "POWER BANK"
drapes off the side. For this clean premium lifestyle shot show only one cable in use: the
USB-C retractable cable plugged into a phone resting on the passenger
seat just out of frame; the other retractable cable remains coiled into
the brick. Through
the windshield: a long empty road stretching toward a dusk horizon, deep
indigo sky transitioning to faint warm orange at the horizon line. The
dashboard is matte black, low-reflective. Single warm orange accent
(#FF6B00) from the horizon glow doubles as rim light on the powerbank.
No driver, no passenger, no hands on the wheel — the car is parked. Upper
40% of the frame is dusk sky and road, lower 60% dashboard and product.
Cinematic, calm, premium. Medium format, 50mm lens equivalent, shallow
depth of field on the powerbank.

In-image typography (render exactly): top center small white
"TITANBANKS"; below it smaller light grey "Titan X · Coming Soon";
mid-upper very large white headline "Never at 0."; below it small white
"Built for road trips."; bottom center matte black pill with thin orange
border containing white text "Join the Waitlist".
```

Negative:
```
driver, passenger, people, faces, hands on the wheel, full hands, body
parts, third cable, extra ports, extra buttons,
fake LED panels, secondary screens, fake labels, second carry loop, both
short ends visible, airplane, airport, TSA, runway, plane, neon road
signs, RGB, rainbow, bokeh balls, white background, urgency timer,
discount badge, percentage off, marketing slogans beyond the specified
text, watermark, second logo, recognizable car brand badges or logos,
mainstream brand logos in scene, stretched proportions, port doubling,
charging-speed callout, wattage number
```

## Verification

- [ ] TITANBANKS spelled correctly (Flux occasionally drops a letter)
- [ ] Display reads "100%" (post-correct if needed)
- [ ] Headline reads exactly "Never at 0."
- [ ] CTA reads "Join the Waitlist"
- [ ] A1: no people, no hands
- [ ] A2 (clean premium lifestyle): empty driver seat, no driver/passenger, no hands on wheel; only ONE retractable cable in use (the other coiled). Both-cables-in-use is reserved for multi-device-charging concepts only (not this one).
- [ ] No airplane / airport / TSA imagery
- [ ] No wattage / fast-charging text
- [ ] No discount / urgency / % off
- [ ] Background near-black (A1) or dusk-indigo (A2), not blue ad-tech palette
