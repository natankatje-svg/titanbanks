#!/usr/bin/env bash
# Batch 3: slots 12-16 + regens for slots 7, 8, 9, 10
set -e

REF1="/c/Users/natan/TitanBanks/assets/images/Front hero.jpg"
REF2="/c/Users/natan/TitanBanks/assets/images/Z10C-4 _2.jpg"
REF3="/c/Users/natan/TitanBanks/assets/images/Z10C-4 _1.jpg"

PRODUCT='PRODUCT (LOCKED — replicate from reference images, do not redesign): The subject is the Titan X powerbank shown in the three reference images. Reproduce the product EXACTLY as photographed: keep the matte black body and the glossy black front panel with rounded corners, the display position on the glossy panel showing "188%" in white dot-matrix with the small green charge icon, the exact port arrangement on the top short face, the exact rear short face with flashlight aperture and two retractable cables, the bright orange woven carry loop hanging from the upper-left of the left side face, and the TITANBANKS wordmarks in their original subtle grey/white laser-etch positions which are: one on the lower-front face beneath the display, and one on the lower portion of the right-side face beneath the spec block — never on the left side face (the left side face carries only the orange carry loop and is otherwise plain matte black). The brick proportions, aspect ratio, and overall body geometry match the reference images exactly — do not stretch, squash, elongate, taper, fatten, narrow, or distort the body in any direction. Do not add, remove, relocate, or restyle any feature of the product. Do not change the carry loop color. Do not redesign the side-face engravings. ORIENTATION LOCK: port-face and rear-face are on opposite short ends, never simultaneously visible.'

NEG='NEGATIVE: no matte front, no flat front panel, no relocated display, no invented ports or buttons, no new icons or text, no red or pink or brown carry loop, no garbled wordmark, no extra TITANBANKS instances, no TITANBANKS on the left side face, no logo on the carry-loop side, no marketing text overlays, no hands, no people, no RGB, no neon, no crushed shadows on the product body so the matte surface and laser-etch details remain readable, no over-darkened product, no stretched or squashed body, no narrowed or fattened brick, no incorrect brick proportions, no elongated or shortened brick.'

OUT_DIR="/c/Users/natan/TitanBanks/outputs/stage1-raw/2026-05-14"

declare -A SCENES

# Slot 7 regen — flat-lay with port orientation fix
SCENES[07_editorial-flat-lay]='SCENE: editorial top-down flat-lay product photography, the camera is directly overhead in true top-down view, the powerbank lies flat on its back on a dark slate or charcoal linen surface with the glossy front face fully facing the camera, the port-face short end is positioned toward the UPPER edge of the frame and never toward the bottom of the frame, soft directional natural daylight from the side casts a long subtle shadow, minimalist composition with at most one small dark secondary object (a dark leather passport cover or dark stainless travel watch) in one corner for scale and lifestyle context, magazine editorial style in the manner of Kinfolk and Aesop, monochrome warm-grey palette, premium silent-luxury mood.'

# Slot 8 regen — material macro strap with proportions explicit
SCENES[08_material-macro-strap]='SCENE: extreme macro material study of the bright orange woven nylon carry-loop fibers, the orange weave fills roughly two-thirds of the frame in razor-sharp detail showing individual thread structure and weave pattern, the matte black brick body is partially visible in soft defocus behind the loop attachment point and the visible portion of that body shows correct OEM proportions and full body width and thickness without being narrowed or stretched, dramatic side raking light bringing out the fiber texture, very shallow depth of field, premium textile feature shot, the carry loop stays its original bright orange color.'

# Slot 9 regen — material macro body, no TITANBANKS on left side
SCENES[09_material-macro-body]='SCENE: extreme macro material study of the matte black plastic body surface of the powerbank shot on the FRONT or RIGHT-SIDE face only, the texture of the matte finish fills the frame revealing subtle granular finish, if any laser-etched TITANBANKS lettering edge is glimpsed in soft focus it is on the lower-front face or lower-right side face only and never on the left side face, low-key side raking light revealing micro-surface detail, the curve where the glossy front panel meets the matte body may catch a thin specular highlight edge at one side, premium materials feature shot, hero detail crop, the left side face with carry loop is not in this frame.'

# Slot 10 regen — display macro with carry-loop glimpse
SCENES[10_display-macro]='SCENE: extreme close-up macro of the LED dot-matrix display on the glossy black front panel showing "188%" reading with the small green charge icon beside it, the display occupies the central two-thirds of the frame in tack-sharp focus, the framing is just wide enough to include a small glimpse of the bright orange carry loop hanging from the left side of the brick in soft defocus at the left edge of the frame anchoring product identity, the rest of the matte black body falls into soft darkness, tight dramatic key light from above-left, hero feature crop with cinematic high contrast.'

# Slot 12 — flashlight feature
SCENES[12_flashlight-feature]='SCENE: hero feature shot of the powerbank with the flashlight aperture on the rear short face turned ON emitting a focused warm-white beam visible against dark atmospheric haze in a dark raw concrete environment, the powerbank stands or rests in three-quarter view positioned so the rear face is visible to the camera showing the flashlight beam, the matte body subtly lit by ambient bounce keeping detail readable, cinematic outdoor-gear hero mood, dramatic side rim accent on the brick edge, the rest of the scene in deep shadow with volumetric light from the flashlight beam catching dust particles in air.'

# Slot 13 — rear-cables feature
SCENES[13_rear-cables-feature]='SCENE: hero feature shot of the powerbank with both retractable output cables extended from the rear short face, the USB-C connector head and the Lightning connector head visible at the ends of the two cables which trail off into the dark frame, the powerbank rests on a dark matte surface in low-key studio lighting with a single soft side-light from camera-left, the rear face faces toward the camera so the cables and flashlight aperture are visible, the matte body keeps subtle fill so details are legible, cinematic product feature photography emphasizing the integrated-cable feature.'

# Slot 14 — low-angle heroic
SCENES[14_low-angle-heroic]='SCENE: low-angle heroic product photography, the camera sits below the powerbank looking up at it at a strong upward angle making the brick appear monumental and towering, the front face fills much of the frame above with the matte black body extending up against a deep dark gradient background, a dramatic top key light from above produces a strong rim along the upper edges of the brick, the display "188%" glows softly from the upper portion of the panel, cinematic launch-campaign hero feel, subtle fill keeps the body legible.'

# Slot 15 — lifestyle bureau walnoot
SCENES[15_lifestyle-bureau]='SCENE: lifestyle in-context product photography, the powerbank rests upright in three-quarter view on a dark walnut wood desk surface, the edge of a closed dark laptop and a matte black ceramic coffee cup are partially visible in the foreground out of primary focus, warm ambient practical lighting from a window or a small desk lamp casts a soft warm glow across the scene, a moody evening study setting, premium professional workspace mood, no people, no hands, the brick is the clear subject in sharp focus.'

# Slot 16 — lifestyle leren laptop-tas
SCENES[16_lifestyle-leather-bag]='SCENE: lifestyle in-context product photography, the powerbank peeks out from inside an open black leather laptop bag in three-quarter view, the leather grain and bag interior are partially visible around the powerbank, soft low-light studio illumination with a single key light catching the top of the brick and the leather grain, deep ambient shadows in the bag interior, premium travel-gear mood, no people, no hands, the brick is the focused subject with the bag context recognizable but secondary.'

slot="$1"
SCENE="${SCENES[$slot]}"
if [ -z "$SCENE" ]; then echo "Unknown slot: $slot"; exit 1; fi

PROMPT="$PRODUCT $SCENE $NEG"

higgsfield generate create nano_banana_2 \
  --prompt "$PROMPT" \
  --image "$REF1" \
  --image "$REF2" \
  --image "$REF3" \
  --aspect_ratio 1:1 \
  --resolution 2k \
  --wait \
  --wait-timeout 25m \
  --json > "$OUT_DIR/.slot-${slot}.job.json"

URL=$(grep -oE 'https://d8j0ntlcm91z4[^"]+\.png' "$OUT_DIR/.slot-${slot}.job.json" | head -1)
curl -fsSL "$URL" -o "$OUT_DIR/slot-${slot}-nbpro.png"
echo "OK slot-${slot}-nbpro.png ($(du -h "$OUT_DIR/slot-${slot}-nbpro.png" | cut -f1))"
