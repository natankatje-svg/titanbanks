#!/usr/bin/env bash
# Batch 5: 7 regens (8, 12, 13, 16, 17, 19, 20)
set -e

REF1="/c/Users/natan/TitanBanks/assets/images/Front hero.jpg"
REF2="/c/Users/natan/TitanBanks/assets/images/Z10C-4 _2.jpg"
REF3="/c/Users/natan/TitanBanks/assets/images/Z10C-4 _1.jpg"
REF4="/c/Users/natan/TitanBanks/assets/images/WhatsApp Image 2024-05-13 at 10.18.06 (4).jpeg"

PRODUCT='PRODUCT (LOCKED — replicate from reference images, do not redesign): The subject is the Titan X powerbank shown in the four reference images. Reproduce the product EXACTLY as photographed across those references: keep the matte black body and the glossy black front panel with rounded corners, the display position on the glossy panel showing "188%" in white dot-matrix with the small green charge icon, the exact port arrangement on the top short face, the exact rear short face with flashlight aperture and two retractable cables, the bright orange woven carry loop hanging from the upper-left of the left side face, and the TITANBANKS wordmarks in their original subtle grey/white laser-etch positions which are: one on the lower-front face beneath the display, and one on the lower portion of the right-side face beneath the spec block — never on the left side face. The brick is a substantial three-dimensional rectangular box with significant depth and thickness — NOT thin or flat. The brick proportions, aspect ratio, body width, body height, body depth/thickness match the reference images exactly — do not stretch, squash, elongate, taper, fatten, narrow, thin, flatten, or distort. Do not add, remove, relocate, or restyle any feature. Do not change the carry loop color. ORIENTATION LOCK: port-face and rear-face are on opposite short ends, never simultaneously visible. Cables in the rear-face emerge from the SHORT end of the brick, NEVER from a long side edge.'

NEG='NEGATIVE: no matte front, no flat front panel, no relocated display, no invented ports or buttons, no new icons or text, no red or pink or brown carry loop, no garbled wordmark, no extra TITANBANKS instances, no TITANBANKS on the left side face, no logo on the carry-loop side, no marketing text overlays, no hands, no people, no RGB, no neon, no crushed shadows on the product body, no over-darkened product, no stretched or squashed body, no narrowed or fattened brick, no thinned or flattened brick, no widened brick, no incorrect brick proportions, no elongated or shortened brick, no cables emerging from a long edge of the brick.'

OUT_DIR="/c/Users/natan/TitanBanks/outputs/stage1-raw/2026-05-14"

declare -A SCENES

# Slot 8 v3 — strap macro, no printed text visible
SCENES[08_material-macro-strap]='SCENE: extreme macro material study of the bright orange woven nylon carry-loop strap shown HORIZONTALLY across the frame from left to right, the macro crop frames a section of the strap that shows ONLY the woven orange fibers and weave pattern in razor-sharp detail with no printed text or letters visible anywhere in the crop, the printed "POWER BANK" lettering area of the strap is NOT in this crop, pure orange fiber texture only, the brick body is mostly out of frame with at most a soft defocused suggestion of matte black behind, dramatic side raking light bringing out fiber texture, very shallow depth of field, premium textile feature shot.'

# Slot 12 v3 — flashlight feature, carry loop on camera LEFT
SCENES[12_flashlight-feature]='SCENE: hero feature shot of the Titan X powerbank in three-quarter view on a dark raw concrete surface, the brick stands upright with the REAR SHORT END (containing the rectangular flashlight aperture cut into the matte black body) angled toward the camera so the flashlight aperture is clearly visible, the brick is rotated so its LEFT SIDE FACE (the one carrying the bright orange carry loop) faces toward the camera-LEFT, meaning the orange carry loop is visible on the LEFT side of the frame from the camera point of view, never on the right side of the frame, the flashlight is turned ON emitting a focused warm-white beam outward from the rectangular aperture lighting atmospheric haze and dust particles in the dark air, the brick preserves its full reference shape and proportions exactly, subtle ambient bounce keeps the matte body legible, cinematic outdoor-gear hero mood.'

# Slot 13 v3 — rear-cables, calmer pose
SCENES[13_rear-cables-feature]='SCENE: clean studio hero feature shot of the Titan X powerbank standing upright on a dark matte surface in three-quarter view, the rear SHORT END (top of the brick) faces upward and is partially visible to the camera, both retractable output cables are extended from the rear short end and curve gently back down beside the brick in two clean S-curves, the USB-C connector head and the Lightning connector head rest visible on the dark surface beside the brick within the frame, soft low-key key light from camera-left, the brick preserves its full reference shape, proportions and substantial body depth, the carry loop hangs from the upper-left of the left side face as in references, cinematic product feature photography emphasizing the integrated retractable cables.'

# Slot 16 v3 — leather bag, no right-side engravings visible
SCENES[16_lifestyle-leather-bag]='SCENE: lifestyle in-context product photography, the Titan X powerbank peeks out from inside an open black leather laptop bag in three-quarter view, the camera angle shows ONLY the FRONT face and the LEFT side face of the brick (the side carrying the orange carry loop), the RIGHT side face with the spec block, certification icons and the side TITANBANKS wordmark is NOT visible in this frame — those engravings are on the hidden right side and must not appear in the composition, the leather grain and bag interior partially visible around the powerbank, the brick clearly shows its substantial three-dimensional body with full reference depth and thickness, soft low-light studio illumination with a single key light catching the top of the brick and the leather grain, deep ambient shadows in the bag interior, premium travel-gear mood, no people, no hands.'

# Slot 17 v2 — auto centre console, realistic scale
SCENES[17_lifestyle-auto]='SCENE: lifestyle in-context product photography, the Titan X powerbank rests upright in three-quarter view on the leather centre console of a premium dark-interior car at night, the powerbank is shown at REALISTIC REAL-WORLD SCALE of roughly 16 centimeters tall, occupying only a modest portion of the centre console alongside normal-sized car interior elements (gear shifter, cup holders, infotainment knobs) which are partially visible in the frame at correct scale, the brick is NOT oversized relative to the car interior, the dashboard ambient glow casts soft amber and cool blue light across the brick and surrounding leather, the steering wheel rim and dashboard digital cluster partially visible in soft defocus, deep night atmosphere outside the windows, the brick is in sharp focus with full reference proportions, premium driver-gear mood, no people, no hands.'

# Slot 19 v2 — marketplace side 3Q, exact width
SCENES[19_marketplace-side-3q]='SCENE: marketplace listing product photography, the Titan X powerbank stands upright rotated to show its RIGHT-SIDE face prominently in three-quarter view on a pure white seamless background, the long side face is shown at its EXACT reference width and not slightly wider, the right side face shows the power button near the top, the row of laser-engraved certification icons, the laser-engraved spec block, and the lower-side TITANBANKS wordmark in clean readable detail, very soft even product-photography lighting, only a subtle contact shadow under the brick, full reference proportions preserved precisely, e-commerce marketplace style, no marketing text overlays.'

# Slot 20 v2 — marketplace top-down ports, correct short-face aspect
SCENES[20_marketplace-top-down-ports]='SCENE: marketplace listing product photography, the Titan X powerbank is held vertically with the PORT-FACE SHORT END oriented directly toward the camera filling the central portion of a pure white seamless background, the short port-face rectangle has correct aspect ratio matching the references — the short end is roughly twice as wide as it is deep, NOT square and NOT a long rectangle, the exact arrangement of four USB-A output ports, one USB-C input port and one Micro USB input port set into the matte black short-end face is fully visible and centered, the brick body proportions match references exactly with no widening or narrowing, very soft even product-photography lighting with no harsh shadows, e-commerce marketplace hero detail of the connectivity feature, no marketing text overlays.'

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
