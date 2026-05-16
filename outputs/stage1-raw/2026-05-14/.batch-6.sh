#!/usr/bin/env bash
# Batch 6: 3 regens (12, 13, 17)
set -e

REF1="/c/Users/natan/TitanBanks/assets/images/Front hero.jpg"
REF2="/c/Users/natan/TitanBanks/assets/images/Z10C-4 _2.jpg"
REF3="/c/Users/natan/TitanBanks/assets/images/Z10C-4 _1.jpg"
REF4="/c/Users/natan/TitanBanks/assets/images/WhatsApp Image 2024-05-13 at 10.18.06 (4).jpeg"

PRODUCT='PRODUCT (LOCKED — replicate from reference images, do not redesign): The subject is the Titan X powerbank shown in the four reference images. Real-world dimensions: approximately 14.8 cm tall, 6.9 cm wide, 6.8 cm deep — a compact handheld-sized object roughly the size of a small hardcover paperback book. Reproduce the product EXACTLY as photographed: keep the matte black body and the glossy black front panel with rounded corners, the display position on the glossy panel showing "188%" in white dot-matrix with the small green charge icon, the exact port arrangement on the top short face, the exact rear short face with flashlight aperture, the bright orange woven carry loop hanging from the upper-left of the left side face, and the TITANBANKS wordmarks in their correct laser-etch positions (lower-front face and lower-right-side face only — never on the left side face which carries only the orange carry loop). The brick is a substantial three-dimensional rectangular box with significant depth and thickness — NOT thin or flat. The brick proportions, aspect ratio, width, height, depth and overall geometry match references exactly — do not stretch, squash, elongate, taper, fatten, narrow, thin, flatten, widen, or distort. Do not add, remove, relocate, or restyle any feature. Do not change the carry loop color. ORIENTATION LOCK: port-face (top short end with ports) and rear-face (opposite short end with flashlight aperture) are on OPPOSITE short ends and are NEVER simultaneously visible. The display is on the FRONT LONG face — it is NEVER on the same face as the flashlight aperture.'

NEG='NEGATIVE: no matte front, no flat front panel, no relocated display, no display and flashlight merged on the same face, no invented ports or buttons, no new icons or text, no red or pink or brown carry loop, no garbled wordmark, no extra TITANBANKS instances, no TITANBANKS on the left side face, no marketing text overlays, no hands, no people, no RGB, no neon, no crushed shadows on the product body, no over-darkened product, no stretched or squashed body, no narrowed or fattened brick, no thinned or flattened brick, no widened brick, no incorrect brick proportions, no oversized brick relative to environment, no pasted-in appearance, no floating product without contact shadow, no inconsistent lighting between product and scene.'

OUT_DIR="/c/Users/natan/TitanBanks/outputs/stage1-raw/2026-05-14"

declare -A SCENES

# Slot 12 v4 — flashlight feature, restore previous framing, only carry loop on camera-left
SCENES[12_flashlight-feature]='SCENE: hero feature shot of the Titan X powerbank in three-quarter view on a dark raw concrete surface, the brick stands upright with the REAR SHORT END (containing only the rectangular flashlight aperture and the retractable-cable slots — NO display, NO ports) angled toward the camera at roughly 45 degrees so the flashlight aperture is clearly visible at the visible short end of the brick, the front face with the display is NOT visible to the camera in this composition (the display is on the opposite long face), the orange carry loop on the left side face is visible on the LEFT of the frame from the camera point of view, the flashlight is turned ON emitting a focused warm-white beam outward from the rectangular aperture lighting atmospheric haze and dust particles in the dark air ahead of it, the brick preserves its full reference shape and proportions, subtle ambient bounce keeps the matte body legible, cinematic outdoor-gear hero mood.'

# Slot 13 v4 — drop cables entirely, clean hero
SCENES[13_rear-cables-feature]='SCENE: clean studio product hero shot of the Titan X powerbank standing upright in three-quarter view on a dark matte surface, NO cables visible anywhere in the frame, NO cables extended, the rear short end of the brick is angled away from the camera so the cable area is not the focus, the front face with the "188%" display is partially visible to the camera, single soft key light from camera-left grazes the matte body and the glossy front panel, the orange carry loop is visible on the left side face, the brick preserves its full reference shape, proportions and substantial body depth, cinematic premium electronics hero photography, dark moody minimal background with very subtle gradient.'

# Slot 17 v3 — auto centre console, exact dimensions + integration
SCENES[17_lifestyle-auto]='SCENE: lifestyle in-context product photography, the Titan X powerbank rests upright in three-quarter view on the leather centre console of a premium dark-interior car at night, the powerbank measures 14.8 cm tall by 6.9 cm wide by 6.8 cm deep — a compact handheld object roughly the size of a small paperback book, this scale is shown realistically alongside the gear shifter (typically 10-15 cm tall), cup holders (roughly 7 cm diameter), and infotainment knobs which are visible at correct scale around it, the powerbank occupies only a modest portion of the centre console area and is NOT oversized, the brick is integrated naturally into the scene with consistent ambient lighting matching the car interior — sitting flush on the leather surface with a soft natural contact shadow beneath it, NOT pasted-in or floating, the dashboard ambient glow casts amber and cool blue light across the brick and surrounding leather, the steering wheel rim and dashboard digital cluster partially visible in soft defocus, deep night atmosphere outside the windows, premium driver-gear mood, no people, no hands.'

slot="$1"
SCENE="${SCENES[$slot]}"
if [ -z "$SCENE" ]; then echo "Unknown slot: $slot"; exit 1; fi

PROMPT="$PRODUCT $SCENE $NEG"

higgsfield generate create nano_banana_2 \
  --prompt "$PROMPT" \
  --image "$REF1" \
  --image "$REF2" \
  --image "$REF3" \
  --image "$REF4" \
  --aspect_ratio 1:1 \
  --resolution 2k \
  --wait \
  --wait-timeout 25m \
  --json > "$OUT_DIR/.slot-${slot}.job.json"

URL=$(grep -oE 'https://d8j0ntlcm91z4[^"]+\.png' "$OUT_DIR/.slot-${slot}.job.json" | head -1)
curl -fsSL "$URL" -o "$OUT_DIR/slot-${slot}-nbpro.png"
echo "OK slot-${slot}-nbpro.png ($(du -h "$OUT_DIR/slot-${slot}-nbpro.png" | cut -f1))"
