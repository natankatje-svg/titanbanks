#!/usr/bin/env bash
# Batch 7: 2 regens (12, 17)
set -e

REF_FLASHLIGHT_OEM="/c/Users/natan/TitanBanks/assets/images/Z10C-4 _3.jpg"
REF1="/c/Users/natan/TitanBanks/assets/images/Front hero.jpg"
REF2="/c/Users/natan/TitanBanks/assets/images/Z10C-4 _2.jpg"
REF3="/c/Users/natan/TitanBanks/assets/images/Z10C-4 _1.jpg"
REF4="/c/Users/natan/TitanBanks/assets/images/WhatsApp Image 2024-05-13 at 10.18.06 (4).jpeg"

OUT_DIR="/c/Users/natan/TitanBanks/outputs/stage1-raw/2026-05-14"

slot="$1"

if [ "$slot" = "12_flashlight-feature" ]; then
  PROMPT='Take the Titan X powerbank EXACTLY as shown in the FIRST reference image (Z10C-4 _3.jpg, the OEM flashlight-on shot) — preserve the exact brick orientation, the exact rear-angled framing showing the rectangular flashlight aperture emitting a focused warm-white beam, the exact carry loop position on the left side face, the exact body proportions, and the exact relative position of every feature. The other reference images confirm product identity from other angles but the first reference defines the framing for this output. ONLY change the environment and lighting around the product: replace the original studio backdrop with a cinematic brand-identity scene — a dark raw concrete surface and deep matte black void background, moody atmospheric haze visible in the flashlight beam, single subtle ambient rim light on the brick edges from camera-right, deep shadow falloff, premium silent-luxury electronics campaign mood in the manner of Nothing and Bang & Olufsen product launches, sharp contact shadow under the brick. Do not modify the product itself in any way, do not re-orient the brick, do not move the carry loop, do not change the flashlight beam angle, do not stretch or distort the body. NEGATIVE: no people, no hands, no marketing text, no RGB, no neon, no flat or pasted-in look, no inconsistent lighting.'

  higgsfield generate create nano_banana_2 \
    --prompt "$PROMPT" \
    --image "$REF_FLASHLIGHT_OEM" \
    --image "$REF1" \
    --image "$REF3" \
    --image "$REF4" \
    --aspect_ratio 1:1 \
    --resolution 2k \
    --wait \
    --wait-timeout 25m \
    --json > "$OUT_DIR/.slot-${slot}.job.json"

elif [ "$slot" = "17_lifestyle-auto" ]; then
  PROMPT='PRODUCT (LOCKED — replicate from reference images, do not redesign): The subject is the Titan X powerbank shown in the four reference images. Real-world dimensions: 14.8 cm tall by 6.9 cm wide by 6.8 cm deep — a compact handheld-sized object that fits comfortably in one hand, roughly the size of a small hardcover book or a half-litre water bottle. Reproduce the product exactly as photographed: matte black body, glossy black front panel with rounded corners, "188%" display, port arrangement on top short face, flashlight aperture and retractable cables on opposite rear short face, bright orange woven carry loop on the upper-left of the left side face, TITANBANKS wordmarks on lower-front and lower-right-side only — never on the left side. The brick is a substantial 3D rectangular box with full reference depth, not thin or flat. Brick proportions, width, height, depth and overall geometry match references precisely.

SCENE: lifestyle in-context product photography of the Titan X powerbank placed naturally on the leather centre console of a premium dark-interior modern car at night. CRITICAL SCALE: the powerbank measures only 14.8 cm tall and 6.9 cm wide — it is SMALLER than the gear shifter knob beside it, SMALLER in diameter than a standard car cup holder, and would fit inside a closed adult hand. In this composition the powerbank occupies roughly 15 to 20 percent of the visible centre console area at most, not dominating the frame, with the surrounding car interior (gear shifter at correct ~12 cm height, cup holders at correct ~7 cm diameter, dashboard, infotainment knobs) clearly larger or comparable to it. The brick is fully INTEGRATED into the scene — not a flat cutout pasted on top. The same ambient lighting from the dashboard glow and city lights through the windscreen falls on the brick AND the leather console AND the gear shifter with consistent direction, intensity, color temperature, and softness. The brick has a soft natural contact shadow on the leather beneath it that matches the shadows cast by the gear shifter and other interior elements. Subtle leather grain reflections, soft amber and cool blue ambient glow across all surfaces equally. Deep night atmosphere outside. The brick is in sharp focus, but the lighting integration matches the rest of the frame perfectly. No people, no hands.

NEGATIVE: no oversized brick, no brick larger than the gear shifter knob, no brick dominating the console, no pasted-in look, no floating brick, no isolated brick lighting, no inconsistent lighting between brick and scene, no missing contact shadow, no people, no hands, no marketing text, no RGB, no flat brick, no thin brick, no narrowed body, no stretched body, no incorrect proportions.'

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

else
  echo "Unknown slot: $slot"
  exit 1
fi

URL=$(grep -oE 'https://d8j0ntlcm91z4[^"]+\.png' "$OUT_DIR/.slot-${slot}.job.json" | head -1)
curl -fsSL "$URL" -o "$OUT_DIR/slot-${slot}-nbpro.png"
echo "OK slot-${slot}-nbpro.png ($(du -h "$OUT_DIR/slot-${slot}-nbpro.png" | cut -f1))"
