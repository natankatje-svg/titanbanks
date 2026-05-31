# Product Accuracy Rules

Use this folder as the source of truth for the real Titan X physical product.

Mandatory Rules:
- Do not show both short sides of the power bank at the same time.
- Preserve the correct port and cable layout.
- No extra ports.
- No extra cables.
- No fake buttons.
- No fake LED panels.
- No fake screens.
- No fake labels.
- No fake features.
- Logo spelling must be exactly: TITANBANKS.
- Display, ports, retractable cables, and strap must match reference assets.
- Product shape must match the real Titan X.
- Product proportions must match the real Titan X.
- Material finish must match reference assets.
- Do not create a generic power bank.
- Do not make the power bank look like a speaker, router, hard drive, flashlight, drone battery, or unrelated tech device.
- Do not invent charging speed.
- Do not invent wattage.
- Do not claim airplane compatibility.
- Do not show airport or airplane use cases.

## Side micro-text spec (right side of unit)

When the right side of the Titan X is visible and the micro-text printed on it is in frame, it MUST read exactly as below (line breaks, colons, capitalization, units preserved). If the AI model cannot render this exactly, instruct framing so the text is too small / out-of-focus / off-axis to be legible — NEVER fabricate or partial-fake spec text.

```
ITEM     : Power Bank
MODEL    : ITC-Z10C-4
CAPACITY : 50000mAh(185WH)
INPUT 1  : TYPE-C 5V3A,9V2A,12V1.5A 18W
INPUT 2  : MICRO-B 5V/2.0A, 9V/2.0A 18W
OUTPUT 1 : TYPE-A 5V/4.5A, 4.5V/5A, 9V/2.0A, 12V/1.5A 22.5W
OUTPUT 2 : TYPE-A 5V/4.5A, 4.5V/5A, 9V/2.0A, 12V/1.5A 22.5W
OUTPUT 3 : TYPE-A 5V/4.5A, 4.5V/5A, 9V/2.0A, 12V/1.5A 22.5W
OUTPUT 4 : TYPE-A 5V/4.5A, 4.5V/5A, 9V/2.0A, 12V/1.5A 22.5W
OUTPUT 5 : TYPE-C 5V3A,9V2.0A,12V1.5A 20W
Made In China
```

Note: this spec implies 5 outputs (4× USB-A + 1× USB-C) and 2 inputs (USB-C + Micro-B). The USB-C is bidirectional (in + out). Previous brand doc shorthand "4× USB-A + 1× USB-C + 1× Micro-USB" referred to physical ports, not in/out role distribution.

## Built-in retractable cables — static only

The Titan X has two built-in retractable cables (USB-C and Lightning per Brand document.md section 8) as part of the real product anatomy. AI video models reliably hallucinate when animating these — wrong cable types, wrong attachment points, invented extending/retracting motions, fabricated cable tips.

Rules:
- **SHOW the built-in cables in their static retracted state** when the relevant area of the device is in frame. They are part of the product and omitting them is also inaccurate.
- **NEVER animate the built-in cables.** No extending, no retracting, no plugging into anything, no whipping in or out of frame.
- **All cable animations must use a SEPARATE external accessory cable** plugging into one of the regular USB ports (e.g. a USB-A-to-USB-C accessory cable connecting an external smartphone into a top USB-A port).
- When a smartphone is shown being charged, the smartphone's screen must be OFF or show only a uniform soft glow. **No UI, no icons, no text, no numbers, no time, no charging indicator, no logos** — AI hallucinates phone UIs as badly as it hallucinates spec text.
