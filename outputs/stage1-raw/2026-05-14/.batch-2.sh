#!/usr/bin/env bash
# Batch 2: slots 7-11 + slot 4 regen with proportion-lock
set -e

REF1="/c/Users/natan/TitanBanks/assets/images/Front hero.jpg"
REF2="/c/Users/natan/TitanBanks/assets/images/Z10C-4 _2.jpg"
REF3="/c/Users/natan/TitanBanks/assets/images/Z10C-4 _1.jpg"

PRODUCT='PRODUCT (LOCKED — replicate from reference images, do not redesign): The subject is the Titan X powerbank shown in the three reference images. Reproduce the product EXACTLY as photographed: keep the matte black body and the glossy black front panel with rounded corners, the display position on the glossy panel showing "188%" in white dot-matrix with the small green charge icon, the exact port arrangement on the top short face, the exact rear short face with flashlight aperture and two retractable cables, the bright orange woven carry loop hanging from the upper-left of the left side face, and the TITANBANKS wordmarks in their original subtle grey/white laser-etch positions. The brick proportions, aspect ratio, and overall body geometry match the reference images exactly — do not stretch, squash, elongate, taper, fatten, or distort the body in any direction. Do not add, remove, relocate, or restyle any feature of the product. Do not change the carry loop color. Do not redesign the side-face engravings. ORIENTATION LOCK: port-face and rear-face are on opposite short ends, never simultaneously visible.'

NEG='NEGATIVE: no matte front, no flat front panel, no relocated display, no invented ports or buttons, no new icons or text, no red or pink or brown carry loop, no garbled wordmark, no extra TITANBANKS instances, no marketing text overlays, no hands, no people, no RGB, no neon, no crushed shadows on the product body so the matte surface and laser-etch details remain readable, no over-darkened product, no stretched or squashed body, no incorrect brick proportions, no elongated or shortened brick.'

OUT_DIR="/c/Users/natan/TitanBanks/outputs/stage1-raw/2026-05-14"

declare -A SCENES

# Slot 4 regen — backlit silhouette with explicit proportion-lock
SCENES[04_backlit-silhouette]='SCENE: backlit silhouette editorial product photography, the powerbank stands centered upright on a dark matte stage with a single strong cold-white backlight directly behind it producing a thin sharp bright rim along all the brick edges, the front face is mostly low-key shadow but a very gentle fill keeps the glossy front panel and the "188%" display readable as soft low-glow detail, high-fashion editorial contrast, the orange carry loop catches a hint of the rim from behind, the brick proportions match the references exactly with no stretching or squashing of the body.'

# Slot 7 — editorial flat-lay
SCENES[07_editorial-flat-lay]='SCENE: editorial top-down flat-lay product photography, the powerbank lies flat on a dark slate or charcoal linen surface viewed straight from directly above, soft directional natural daylight from the side casts a long subtle shadow, minimalist composition with at most one small secondary object in the corner (a dark leather passport cover or a dark stainless steel travel watch) for scale and lifestyle context, magazine editorial style in the manner of Kinfolk and Aesop product features, monochrome warm-grey palette, premium silent-luxury mood.'

# Slot 8 — material macro orange weave strap
SCENES[08_material-macro-strap]='SCENE: extreme macro material study of the bright orange woven nylon carry-loop fibers, the orange weave fills roughly two-thirds of the frame in razor-sharp detail showing individual thread structure and weave pattern, the matte black brick body partially visible in soft defocus behind the loop attachment point, dramatic side raking light bringing out the fiber texture, very shallow depth of field, premium textile feature shot, the carry loop stays its original bright orange color.'

# Slot 9 — material macro matte black plastic body
SCENES[09_material-macro-body]='SCENE: extreme macro material study of the matte black plastic body surface of the powerbank, the texture of the matte finish fills the frame revealing subtle granular finish and a glimpse of laser-etched TITANBANKS lettering edge in soft focus at one side, low-key side raking light revealing micro-surface detail, the curve where the glossy front panel meets the matte body catches a thin specular highlight edge, premium materials feature shot, hero detail crop.'

# Slot 10 — display macro
SCENES[10_display-macro]='SCENE: extreme close-up macro of the LED dot-matrix display on the glossy black front panel showing "188%" reading with the small green charge icon beside it, the display occupies most of the frame in tack-sharp focus, dramatic shallow depth of field with the rest of the matte black body falling into soft darkness, tight dramatic key light from above-left, hero feature crop showing the readout in cinematic high contrast detail, the glossy panel surface reflects a hint of light.'

# Slot 11 — port-detail top-down
SCENES[11_port-detail]='SCENE: tight top-down detail shot of the port-face of the powerbank, the camera looks straight down at the short end showing the exact arrangement of four USB-A output ports, one USB-C input port and one Micro USB input port set into the matte black body, a single sharp key light from above grazes the port openings revealing recessed depth and subtle plastic micro-bevels, dark surrounding context falling off to black, hero detail crop emphasizing the connectivity feature.'

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
