# TitanBanks caption library — Image 1-22

22 reference captions analysing source images for Stage 1 generation. Each caption is structured as:
1. **Visual description** — objective description of what's visible in the source
2. **Product accuracy notes** — canonical Titan X spec to enforce (ports, cables, display, laser-engraving)
3. **Style / background reference** — aesthetic direction
4. **Negative constraints** — explicit prohibitions
5. **Final ComfyUI caption** — single compact positive prompt ready for image generation

## Set classification

### OEM set (Image 1-8) — product geometry anchors
| # | File | Angle / focus |
|---|------|---------------|
| 1 | `WhatsApp Image 2024-05-13 at 10.18.06 (3).jpeg` | High 3Q hero, port face visible |
| 2 | `WhatsApp Image 2024-05-13 at 10.18.06 (4).jpeg` | 3Q from behind, side-face spec block |
| 3 | `WhatsApp Image 2024-05-13 at 10.18.06 (5).jpeg` | Upright front-facing hero, display dominant |
| 4 | `Z10C-4 -- 黑 3.jpg` | High isometric, both wordmarks visible |
| 5 | `Z10C-4 _1.jpg` | Rear face, retractable cables + flashlight |
| 6 | `Z10C-4 _2.jpg` | Top-down port face, exact port layout |
| 7 | `Z10C-4 _3.jpg` | Dark cinematic rear with flashlight ON |
| 8 | `Titan X Logo Specs Certificates.png` | **Reference plate only** — do not use as generation target |

### v1 Higgsfield set (Image 9-22) — style references (not product geometry)
| # | File | Sub-style |
|---|------|-----------|
| 9 | `hf_20260507_204306_6bd1be42...png` | Dark plinth hero, port face up |
| 10 | `hf_20260507_204306_799fc758...png` | Extreme low-key, side-face dominant |
| 11 | `hf_20260507_204306_87062e15...png` | Upright on reflective plinth |
| 12 | `hf_20260507_204306_dfa5a0a0...png` | Dark port-detail close-up |
| 13 | `hf_20260507_204306_f5dce00b...png` | Elevated dark hero |
| 14 | `hf_20260507_204306_f6de21a0...png` | Low-angle heroic, looking up |
| 15 | `hf_20260507_204307_373d4e15...png` | Campaign hero with prominent carry loop |
| 16 | `hf_20260507_204910_2754ad0f...png` | Elevated port-detail (v1 has hallucinated port-doubling — fix) |
| 17 | `hf_20260507_204910_894bfe42...png` | Standard hero, both wordmarks visible |
| 18 | `hf_20260507_204910_d965ea80...png` | Display macro close-up (188%) |
| 19 | `hf_20260507_204912_2eb379ca...png` | Dark hero with stretched proportions (do NOT replicate stretch) |
| 20 | `hf_20260507_205717_64e9e07e...png` | Luxury showcase on glossy plinth |
| 21 | `hf_20260511_075844_44870593...png` | Warm-orange backlight hero |
| 22 | `hf_20260511_181024_55b508cd...png` | Campaign-grade warm rim (strongest v1) |

## Canonical product spec (locked in every Final caption)

- **Product**: Titan X powerbank, 50,000 mAh
- **Port-end face** (one short end): exactly 4 USB-A output ports (one purple/blue quick-charge accent) + 1 USB-C input port + 1 Micro USB input port
- **Rear-end face** (other short end): rectangular flashlight aperture + exactly 2 retractable output cables (1 USB-C connector head + 1 Lightning connector head)
- **Top face**: small white TITANBANKS wordmark + LED dot-matrix display window
- **Side face** (long, narrow), top to bottom: recessed power button → row of 4 laser-engraved certification icons (FCC, CE, Recycle triangle, crossed-out wheelie bin) → tightly stacked laser-engraved spec block (ITEM, MODEL, CAPACITY, INPUT1, INPUT2, OUTPUT1, OUTPUT2, OUTPUT3, OUTPUT4, OUTPUT5, Made In China) in faint light grey → small TITANBANKS wordmark near the bottom
- **LED display readout**: "188%" (all-segments-on test pattern) with small green charge icon — user will hand-edit to "100%" later
- **Carry loop**: orange woven, "POWER BANK" print

## Universal negative constraints

Every Final caption locks the following:
- Spell TITANBANKS correctly (no garbled v1-style typos)
- No marketing text overlays, slogans, captions, watermarks
- No extra ports, no extra buttons, no secondary displays
- No hands, no people, no body parts
- Brick proportions match OEM aspect ratio (no v1 stretching)
- Display readout stays "188%"
- No RGB / neon / coloured lights / bokeh balls beyond what the scene calls for
