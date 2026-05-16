#!/usr/bin/env bash
set -e
PROMPT='Create a premium 3:4 vertical lifestyle product advertisement for the TITANBANKS Titan X powerbank.

PRODUCT GEOMETRY:
- The Titan X is a chunky rectangular brick — substantially taller than wide, NOT slim, NOT smartphone-shaped.
- FRONT face (the wide tall face we look at): a glossy black recessed display panel near the top containing an LED dot-matrix readout reading "100%" with a small green charge icon. Below the display panel, near the bottom of the front face, the small "TITANBANKS" wordmark (T-I-T-A-N-B-A-N-K-S, ten letters, including the trailing S).
- TOP face (short end facing up): port array — four USB-A ports, one USB-C input, one Micro-USB input.
- The orange woven carry loop is anchored at the LEFT EDGE of the front face, mid-height, and drapes downward.
- The loop has "POWER BANK" embossed horizontally as two words on the orange woven fabric.

CRITICAL TEXT PLACEMENT: the brick body is matte black and UNMARKED except for the small TITANBANKS wordmark on the front face below the display. The brick body has NO other text, NO embossing, NO labels. The "POWER BANK" embossing appears ONLY on the orange woven carry loop, never on the brick.

TEXT IN IMAGE — render exactly:
- Top center, small caps, white: "TITANBANKS"
- Upper-left third, very large left-aligned white: "The strap people ask about."
- Below it, small white left-aligned: "Titan X · Coming Soon"
- Bottom-right, white text in matte-black pill with thin orange border: "Coming Soon"

SCENE:
A single human hand enters the frame from upper-right and lifts the TITANBANKS Titan X chunky matte black 50,000 mAh powerbank by its orange woven carry loop. Only the hand and a portion of the forearm are visible — no face, no shoulder, no second hand. The hand is neutral-toned, well-groomed, no rings, no nail polish, no watch, no jewelry, no tattoos. Index and middle finger hooked through the loop, the loop bears the powerbanks full weight. The matte black brick hangs at a 3/4 off-axis angle. Single warm orange rim light (#FF6B00) from camera right grazes the carry loop and the back edge of the brick. Background is a deep matte black gradient (#0A0A0A to #1A1A1A) with a faint horizon glow. Hand and product occupy the right two-thirds; left third clear for typography. Cinematic, low-key, premium.

DO NOT INCLUDE: full body, full arm, shoulder, face, head, second hand, multiple hands, hand at the brick body, rings, watches, nail polish, jewelry, tattoos, extra ports, extra buttons, fake LED panels, secondary screens, fake labels, extra cables, second carry loop, misspelled embossing, "POWERBANK" as one word, "TOWER BANK" anywhere, vertical text on the loop, additional small label on the strap, "100%" tag on the strap, both short ends visible, airplane, airport, TSA, RGB, neon, white background, urgency timer, discount badge, percentage off, watermark, second logo, recognizable third-party brand logos, charging-speed callout, wattage number, text on the brick body, embossing on the brick face, slim phone, smartphone shape, handheld phone, sleek slim form factor.'

higgsfield.cmd generate create gpt_image_2 \
  --prompt "$PROMPT" \
  --aspect_ratio 3:4 \
  --quality high \
  --resolution 2k \
  --wait --wait-timeout 20m --json > _b2_gpt_result.json 2>&1
