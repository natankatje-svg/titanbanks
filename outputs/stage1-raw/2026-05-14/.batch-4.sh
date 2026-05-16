#!/usr/bin/env bash
# Batch 4: regens for 8, 9, 12, 13, 14, 16 + slots 17-20
# Adds a 4th reference image (side-profile) to help lock brick depth/thickness.
set -e

REF1="/c/Users/natan/TitanBanks/assets/images/Front hero.jpg"
REF2="/c/Users/natan/TitanBanks/assets/images/Z10C-4 _2.jpg"
REF3="/c/Users/natan/TitanBanks/assets/images/Z10C-4 _1.jpg"
REF4="/c/Users/natan/TitanBanks/assets/images/WhatsApp Image 2024-05-13 at 10.18.06 (4).jpeg"

PRODUCT='PRODUCT (LOCKED — replicate from reference images, do not redesign): The subject is the Titan X powerbank shown in the four reference images. Reproduce the product EXACTLY as photographed across those references: keep the matte black body and the glossy black front panel with rounded corners, the display position on the glossy panel showing "188%" in white dot-matrix with the small green charge icon, the exact port arrangement on the top short face, the exact rear short face with flashlight aperture and two retractable cables, the bright orange woven carry loop hanging from the upper-left of the left side face, and the TITANBANKS wordmarks in their original subtle grey/white laser-etch positions which are: one on the lower-front face beneath the display, and one on the lower portion of the right-side face beneath the spec block — never on the left side face (the left side face carries only the orange carry loop and is otherwise plain matte black). The brick is a substantial three-dimensional rectangular box with significant depth and thickness — NOT a thin or flat object. The brick proportions, aspect ratio, body width, body height, body depth/thickness, and overall body geometry match the reference images exactly — do not stretch, squash, elongate, taper, fatten, narrow, thin, flatten, or distort the body in any direction. The depth/thickness of the brick (distance from front face to rear) is substantial and clearly visible at any angled view. Do not add, remove, relocate, or restyle any feature of the product. Do not change the carry loop color. Do not redesign the side-face engravings. ORIENTATION LOCK: port-face and rear-face are on opposite short ends, never simultaneously visible. Cables in the rear-face emerge from the SHORT end of the brick (a top or bottom short face), NEVER from a long side edge.'

NEG='NEGATIVE: no matte front, no flat front panel, no relocated display, no invented ports or buttons, no new icons or text, no red or pink or brown carry loop, no garbled wordmark, no extra TITANBANKS instances, no TITANBANKS on the left side face, no logo on the carry-loop side, no marketing text overlays, no hands, no people, no RGB, no neon, no crushed shadows on the product body so the matte surface and laser-etch details remain readable, no over-darkened product, no stretched or squashed body, no narrowed or fattened brick, no thinned or flattened brick, no incorrect brick proportions, no elongated or shortened brick, no cables emerging from a long edge of the brick.'

OUT_DIR="/c/Users/natan/TitanBanks/outputs/stage1-raw/2026-05-14"

declare -A SCENES

# Slot 8 regen v2 — strap horizontal, brick out of frame
SCENES[08_material-macro-strap]='SCENE: extreme macro material study of the bright orange woven nylon carry-loop strap shown HORIZONTALLY across the frame from left to right, the strap runs as a horizontal band filling the middle of the composition with razor-sharp fiber detail showing individual thread structure and weave pattern, the brick body is mostly out of frame with only a soft defocused suggestion of the matte black body behind or beneath the strap, dramatic side raking light bringing out fiber texture, very shallow depth of field, premium textile feature shot, the carry loop stays its original bright orange color.'

# Slot 9 regen v2 — medium close-up, NO TITANBANKS visible
SCENES[09_material-macro-body]='SCENE: medium close-up product detail of the matte black plastic body surface of the powerbank, not extreme macro — pulled back enough to read the matte texture in context but not so tight that only particles dominate the frame, the visible body face is plain matte black surface with no laser-etched lettering visible anywhere in this frame, no TITANBANKS text visible, no engraved text of any kind in this crop, low-key side raking light revealing the surface finish, the curve where the glossy front panel meets the matte body catches a soft specular highlight at one side, premium materials feature shot.'

# Slot 12 regen v2 — flashlight feature, much stricter
SCENES[12_flashlight-feature]='SCENE: hero feature shot of the Titan X powerbank in three-quarter view on a dark raw concrete surface, the brick stands upright with the REAR SHORT END (containing the rectangular flashlight aperture cut into the matte black body) angled toward the camera so the flashlight aperture is clearly visible at the bottom or top end of the brick, the flashlight is turned ON emitting a focused warm-white beam that travels outward from the rectangular aperture and lights atmospheric haze and dust particles in the dark air ahead of it, the brick itself preserves its full reference shape and proportions exactly with no distortion, subtle ambient bounce light keeps the matte body legible, cinematic outdoor-gear hero mood, the rest of the concrete environment in deep shadow.'

# Slot 13 regen v2 — rear-cables, cables from REAR SHORT face
SCENES[13_rear-cables-feature]='SCENE: hero feature shot of the Titan X powerbank with both retractable output cables fully extended from the REAR SHORT END of the brick (the short top face), the cables emerge from the top short face of the upright-standing brick and trail upward and out of the upper part of the frame, the USB-C connector head and the Lightning connector head are visible at the cable ends, the brick stands upright in three-quarter view on a dark matte surface with the rear short face oriented upward toward the top of the frame, low-key studio lighting with a single soft side-light from camera-left, the matte body keeps subtle fill so details are legible, cinematic product feature photography emphasizing the integrated-cable feature, the brick preserves its full reference proportions including its substantial body depth.'

# Slot 14 regen v2 — low-angle heroic with proportions explicit
SCENES[14_low-angle-heroic]='SCENE: low-angle heroic product photography, the camera sits low looking up at the powerbank at a moderate upward angle making the brick feel monumental but without exaggerating any proportions, the front face of the brick is visible above the camera with its full reference width and substantial body depth preserved, the matte body extends up against a deep dark gradient background, a dramatic top key light from above produces a strong rim along the upper edges of the brick, the display "188%" glows softly from the upper portion of the front panel, the TITANBANKS wordmark visible only at its correct location on the lower-front face (never on the left side), cinematic launch-campaign hero feel, subtle fill keeps the body fully legible.'

# Slot 16 regen v2 — lifestyle leather bag with thickness explicit
SCENES[16_lifestyle-leather-bag]='SCENE: lifestyle in-context product photography, the Titan X powerbank peeks out from inside an open black leather laptop bag shown in three-quarter view, the leather grain and bag interior are partially visible around the powerbank, the brick clearly shows its substantial three-dimensional body with full reference depth and thickness — the brick is NOT flat or thin, both the side faces and the front face are clearly readable as a thick rectangular box, soft low-light studio illumination with a single key light catching the top of the brick and the leather grain, deep ambient shadows in the bag interior, premium travel-gear mood, no people, no hands.'

# Slot 17 — lifestyle auto centre console at night
SCENES[17_lifestyle-auto]='SCENE: lifestyle in-context product photography, the Titan X powerbank rests upright in three-quarter view on the leather centre console of a premium dark-interior car at night, the dashboard ambient glow casts soft amber and cool blue light across the brick and the surrounding leather and trim, the steering wheel rim and dashboard digital cluster are partially visible in soft defocus, deep night atmosphere outside the windows, the brick is in sharp focus with its full reference proportions including substantial body depth, premium driver-gear mood, no people, no hands.'

# Slot 18 — marketplace front 3Q hero, white seamless
SCENES[18_marketplace-front-3q]='SCENE: marketplace listing product photography, the Titan X powerbank stands upright in clean three-quarter front-facing view on a pure white seamless background with very soft even product-photography lighting, no shadow or only a very subtle contact shadow under the brick, the brick is centered and fills the frame at a comfortable margin showing the glossy front panel with "188%" display, the matte body sides, the bright orange carry loop, and the full reference proportions clearly, e-commerce marketplace style, crisp clinical lighting suitable for Amazon and Bol main-listing compliance, no marketing text overlays.'

# Slot 19 — marketplace side 3Q showing laser-engraving
SCENES[19_marketplace-side-3q]='SCENE: marketplace listing product photography, the Titan X powerbank stands upright rotated to show its RIGHT-SIDE face prominently in three-quarter view on a pure white seamless background, the right side face shows the power button near the top, the row of laser-engraved certification icons, the laser-engraved spec block, and the lower-side TITANBANKS wordmark all in clean readable detail, very soft even product-photography lighting, only a subtle contact shadow under the brick, full reference proportions, e-commerce marketplace style, no marketing text overlays.'

# Slot 20 — marketplace top-down port array hero
SCENES[20_marketplace-top-down-ports]='SCENE: marketplace listing product photography, true top-down view looking straight down at the port-face short end of the Titan X powerbank lying flat or held vertically with port-face toward camera, the exact arrangement of four USB-A output ports, one USB-C input port and one Micro USB input port set into the matte black short-end face is fully visible and centered in the frame on a pure white seamless background, very soft even product-photography lighting with no harsh shadows, e-commerce marketplace style hero detail of the connectivity feature, no marketing text overlays.'

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
