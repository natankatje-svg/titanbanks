# Higgsfield — Angle 01 — "Never at 0."

Angle: Never at 0.
Template: A — Vertical I-Stack Hero (9:16) — see `03_COMPETITOR_ADS/winning_structures/winning_structures.md`
Aspect: 9:16 (Story / TikTok / Reels)
Recommended models: text2image_soul_v2 / Soul Cinema Studio (image) · Seedance 2.0 (video)

Source-of-truth references:
- Product geometry: `02_PRODUCT_REFERENCES/product_accuracy_rules.md` + `02_PRODUCT_REFERENCES/captions/INDEX.md`
- Brand voice / approved CTAs: `01_BRAND_CONTEXT/brand_voice_tone/`
- Approved use cases: `01_BRAND_CONTEXT/target_audience/` (festivals, road trips, remote work, coffee shops, long workdays — never airplane/airport/TSA)
- Display readout: render directly as "100%". Higgsfield text rendering is unreliable for small UI text — if the display renders garbled, post-correct in Photoshop. Do NOT intentionally generate "188%".

## Variants in this file
- A1 — Master plate, product-only (text-free, for design overlay in Figma/Photoshop)
- A2 — Ad variant, product-only (with in-image text attempted in Higgsfield)
- A3 — Lifestyle variant, festival night context (approved use case, edge-of-frame human cue allowed)

---

## VARIANT A1 — Master plate (product-only, text-free)

Use this when typography will be added in post. This is the highest-quality path.

```
A premium product hero photograph of the TITANBANKS Titan X powerbank, shot
in a deep matte-black studio. The powerbank stands upright on an unseen
reflective plinth in the lower 50% of a 9:16 vertical frame, slightly
off-axis 3/4 angle so the small TITANBANKS wordmark and the LED dot-matrix
display window on the top face are clearly visible. The display is lit and
reads "100%" with a small green charge icon. The orange woven carry loop
with embossed "POWER BANK" text drapes naturally to the side. Material is
deep matte black metal with subtle satin micro-grain. Single warm orange
rim light (#FF6B00) acting as directional key from camera right; faint
cool fill from camera left. Background is near-black (#0A0A0A) with a soft
radial vignette and a barely-visible warm underglow halo beneath the
product. Generous negative space in the upper 50% of the frame. Centered
axis composition. Cinematic, low-key, silent-luxury aesthetic — Bang &
Olufsen tier, closer to Nothing brand than gaming hardware. Shot on medium
format, 85mm lens equivalent, shallow depth of field, deep neutral blacks,
slight orange highlight roll-off, sensor noise minimal.
```

Negative:
```
no people, no hands, no body parts, no extra ports, no extra buttons, no
fake LED panels, no secondary screens, no fake labels, no extra cables on
the brick body, no second carry loop, do not show both short ends of the
powerbank in the same frame, no airplane, no airport, no TSA, no aviation
imagery, no RGB lighting, no neon, no rainbow, no bokeh balls, no white
background, no generic powerbank shape, no speaker shape, no router shape,
no urgency timer, no discount badge, no percentage off, no marketing text,
no slogans, no captions burnt into the image, no watermark, no logo other
than TITANBANKS, no misspelled wordmark, no stretched proportions, no
v1-style port-doubling
```

---

## VARIANT A2 — Ad variant (in-image text)

Same scene as A1 but with typography attempted in-engine. Higgsfield text rendering is uneven — accept that headline + CTA may need post-correction. If text fails, fall back to A1 + overlay.

Append this typography brief to the A1 prompt:
```
Above the product, in clean modern sans-serif white type on the near-black
background:
- Small caps wordmark at the top center: "TITANBANKS"
- Below it, smaller light grey: "Titan X · Coming Soon"
- Mid-upper, very large centered: "Never at 0."
- Just below, smaller centered: "While the world looks for an outlet, you keep going."
- Bottom center, white text inside a small matte-black pill with a thin
  orange border: "Join the Waitlist"
```

Same negative prompt as A1.

---

## VARIANT A3 — Lifestyle: festival night

Approved use case: festivals (`01_BRAND_CONTEXT/target_audience/`). Edge-of-frame human presence cue is permitted; full faces and identifiable people are still excluded.

```
A premium lifestyle product photograph at a night-time outdoor festival
context, shot in a deep low-key palette. The TITANBANKS Titan X powerbank
sits upright on a wood plank at the lower-right of a 9:16 vertical frame,
3/4 off-axis, top face showing the small TITANBANKS wordmark and an LED
dot-matrix display window reading "100%" with a small green charge icon.
The orange woven carry loop with embossed "POWER BANK" text drapes off
the edge of the plank. A single warm orange festival light (#FF6B00) acts
as directional key from camera right, mimicking distant stage lighting.
Background: deep night with extremely soft, distant, defocused orange and
amber stage glow at very low intensity (no recognizable bokeh balls, no
neon, no RGB) — atmosphere only, not a stage shot. A festival wristband
or a hand resting on the edge of the plank may be at the extreme edge of
the frame, partially cropped, never showing a full face or full hand.
Lower 60% of the frame: product theatre. Upper 40%: dark negative space
for typography. Cinematic, calm, premium — not a party shot. Medium
format, 85mm lens equivalent, shallow depth of field. Photorealistic.
```

Negative:
```
no full faces, no identifiable people, no full hands, no fingers in
critical focus, no extra ports, no extra buttons, no fake LED panels, no
secondary screens, no fake labels, no extra cables on the brick, no
second carry loop, do not show both short ends, no airplane, no airport,
no TSA, no party crowd, no concert stage, no neon signs, no RGB, no
rainbow, no bright bokeh balls, no urgency timer, no discount badge, no
percentage off, no marketing text burnt in, no watermark, no logo other
than TITANBANKS, no stretched proportions, no port doubling, no
mainstream brand logos in the background
```

---

## Video variant (Seedance 2.0, 6–10s) — applies to A1 or A3

```
Camera begins at a slight low angle two meters from the product, slowly
dollies in over 8 seconds while the warm orange rim light gradually
intensifies from 30% to 100% strength. The LED display fades up from
black to "100%" at the 4-second mark. No camera shake, no fast cuts, no
zoom punches. Final frame holds 1.5 seconds with the display fully lit
and the carry loop catching the rim light. Slow, calm, premium pacing.
```

## Verification (run before drop into `06_GENERATED_OUTPUTS/`)

- [ ] TITANBANKS spelled correctly everywhere it appears
- [ ] Display reads "100%" (post-correct in Photoshop if rendered garbled)
- [ ] Port-end face geometry correct if visible (4 USB-A + 1 USB-C + 1 Micro-USB — port present, no functional claim in copy)
- [ ] No second carry loop, no extra cables on the brick body
- [ ] No airplane / airport / TSA cues
- [ ] No wattage callout, no fast-charging text
- [ ] No discount, urgency, % off, date window
- [ ] Background is near-black, not blue
- [ ] A3 only: no full faces, no identifiable people; edge-of-frame cue is partial only
