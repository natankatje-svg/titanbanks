#!/usr/bin/env bash
# Batch 1: slots 2-6, all nano_banana_2 with 3-ref anchor trio
set -e

REF1="/c/Users/natan/TitanBanks/assets/images/Front hero.jpg"
REF2="/c/Users/natan/TitanBanks/assets/images/Z10C-4 _2.jpg"
REF3="/c/Users/natan/TitanBanks/assets/images/Z10C-4 _1.jpg"

PRODUCT='PRODUCT (LOCKED — replicate from reference images, do not redesign): The subject is the Titan X powerbank shown in the three reference images. Reproduce the product EXACTLY as photographed: keep the matte black body and the glossy black front panel with rounded corners, the display position on the glossy panel showing "188%" in white dot-matrix with the small green charge icon, the exact port arrangement on the top short face, the exact rear short face with flashlight aperture and two retractable cables, the bright orange woven carry loop hanging from the upper-left of the left side face, and the TITANBANKS wordmarks in their original subtle grey/white laser-etch positions. Do not add, remove, relocate, or restyle any feature of the product. Do not change the carry loop color. Do not redesign the side-face engravings. ORIENTATION LOCK: port-face and rear-face are on opposite short ends, never simultaneously visible.'

NEG='NEGATIVE: no matte front, no flat front panel, no relocated display, no invented ports or buttons, no new icons or text, no red or pink or brown carry loop, no garbled wordmark, no extra TITANBANKS instances, no marketing text overlays, no hands, no people, no RGB, no neon, no crushed shadows on the product body so the matte surface and laser-etch details remain readable, no over-darkened product.'

# Slot, sub-style filename, SCENE text
declare -A SCENES
SCENES[02_brutalist-environment]='SCENE: brutalist architectural environment, the powerbank rests on a raw exposed concrete plinth inside a wide cavernous concrete chamber with steel beams overhead, a single dramatic daylight shaft falls diagonally from a high narrow slit window catching the brick and casting a long sharp shadow across rough concrete, cool grey-blue palette, monumental architectural scale, product photography in the manner of Tadao Ando interiors, the product is the unmistakable subject in the lower-central portion of a wide environmental frame, the matte body keeps subtle fill so detail stays readable in the shadowed areas.'
SCENES[03_theatre-spotlight-angled]='SCENE: theatre stage product photography, the powerbank stands upright in a three-quarter angled view on a dark matte stage in a pure black void, a single sharp top-spotlight from above-right produces a precise cone of cool white light grazing the front-right of the brick with deep black falloff on the rest, a very low-intensity soft secondary fill keeps the matte body and laser-etch legible without disturbing the void, cinematic silent-luxury reveal mood, sharp contact shadow under the brick, no floating, the product reads as the singular hero.'
SCENES[04_backlit-silhouette]='SCENE: backlit silhouette editorial product photography, the powerbank stands centered on a dark matte stage with a single strong cold-white backlight directly behind it producing a thin sharp bright rim along all the brick edges, the front face is mostly low-key shadow but a very gentle fill keeps the glossy front panel and the "188%" display readable as soft low-glow detail, high-fashion editorial contrast, the orange carry loop catches a hint of the rim from behind.'
SCENES[05_storm-wet]='SCENE: stormy atmospheric product photography, the powerbank stands on a wet dark slate surface with shallow rain puddles reflecting it, fine rain droplets clinging to the matte body and beading on the glossy front panel, a single warm rim light from camera-right at low angle catches the water droplets and the right edge of the brick against a deep grey-blue moody fog background, cinematic outdoor expedition gear vibe, rugged durable tone, the "188%" display glows softly through the droplets.'
SCENES[06_warm-orange-rim]='SCENE: brand-accent warm-orange rim lighting, the powerbank stands centered in a low-key dark studio with a strong warm orange (#FF6B00) rim light from camera-back-right catching the right edge of the brick and producing a soft orange halo behind the product, foreground and front of the brick stay cool and dark but with very subtle fill keeping body detail and laser-etch readable, the orange carry loop on the left side echoes the rim accent, cinematic premium electronics launch mood, orange is the only color accent in an otherwise monochrome dark frame.'

OUT_DIR="/c/Users/natan/TitanBanks/outputs/stage1-raw/2026-05-14"

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

URL=$(python -c "import json; d=json.load(open('$OUT_DIR/.slot-${slot}.job.json')); print(d[0]['result_url'])")
curl -fsSL "$URL" -o "$OUT_DIR/slot-${slot}-nbpro.png"
echo "OK slot-${slot}-nbpro.png ($(du -h "$OUT_DIR/slot-${slot}-nbpro.png" | cut -f1))"
