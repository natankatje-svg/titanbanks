# Image 21

**File**: `hf_20260511_075844_44870593-eb4b-4375-9a0d-e2ef1f7a5282.png`
**Set**: v1 Higgsfield-output
**Intent**: Style reference — warm-orange backlight hero (sparing brand-accent use)

## Visual description
Small-format three-quarter hero of the Titan X standing upright with a strong warm-orange backlight glowing from behind the brick, creating a halo effect around its silhouette. LED display reads "100%" with the green charge icon (note: this v1 source frame happens to show 100% rather than the canonical all-segments-on "188%"). Orange woven "POWER BANK" carry loop hangs from the left side, picking up the warm rim light. TITANBANKS wordmark visible on the lower front face. Side face shows the laser-engraved cert icon row and spec block in subdued grey. Foreground plinth is dark; background is a deep black graduating into warm amber/orange behind the brick. Strong brand-aligned scene where the orange accent reads against the dark body.

## Product accuracy notes
Canonical Titan X powerbank, 50,000 mAh. Side face content + port layout match Image 8 canonical. **Display readout in the canonical generated output must be "188%" (all-segments-on test pattern) with a small green charge icon — do NOT carry the "100%" from this v1 source frame into output**, even though it's the user's eventual hand-corrected value, because the model is being trained/prompted on the all-segments-on state. (User will hand-edit 188 → 100 later.) Carry loop: orange woven, "POWER BANK" printed.

## Style / background reference
Strong warm-orange backlight cinematic style. Black foreground plinth, deep black background graduating into warm amber/orange directly behind the brick, creating a backlit halo. Brand-aligned use of orange accent #FF6B00 (per brand-doc). Strong reference for "amber rim" hero compositions — sparingly used per brand-doc ("oranje verschijnt spaarzaam, als een accentlamp die aangaat").

## Negative constraints
Do NOT carry "100%" from this v1 source into generated output — generated display must read "188%". Do not let the orange backlight wash out into a full warm scene — keep the foreground/plinth cool/dark and the amber confined to the backlight halo. Do not add or remove ports. Do not stretch brick proportions. Do not replicate garbled wordmark text. No marketing text overlays, no slogans, no watermarks, no neon, no RGB, no second device, no hands, no people, no props.

## Final ComfyUI caption
```
Titan X powerbank, matte black rectangular brick standing upright on a dark plinth, three-quarter hero angle, dark cinematic studio with a deep black background graduating into a warm amber/orange backlight directly behind the brick creating a soft halo silhouette, dark cool foreground and plinth, port-end short face at the top with exactly four USB-A output ports (one accented in deeper purple/blue as the quick-charge port), one USB-C input port and one smaller Micro USB input port, LED dot-matrix display on the upper front face reading "188%" with a small green charge icon (all-segments-on test pattern), small TITANBANKS wordmark in faint light grey laser-etch along the lower front face beneath the display, orange woven POWER BANK carry loop hanging from the left side of the brick picking up the warm rim light, on the visible right side face a recessed power button near the top, a horizontal row of small laser-engraved certification icons (FCC, CE, Recycle triangle, crossed-out wheelie bin) below it, and a tightly stacked laser-engraved spec block (ITEM, MODEL, CAPACITY, INPUT1, INPUT2, OUTPUT1 through OUTPUT5, Made In China) in faint light grey laser-etched on matte black further below, two retractable output cables (USB-C and Lightning) on the opposite rear-end short face out of frame, premium cinematic warm-backlight hero product photography, moody, sparing use of orange as an accent, no marketing text overlays, no extra ports, no extra buttons, no secondary display, do not change the display readout away from "188%", spell TITANBANKS correctly
```
