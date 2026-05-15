# TitanBanks / Titan X Creative Pipeline

Before doing any Titan X creative work, read this file first.

## Language Rule

All TitanBanks / Titan X creative work must be written in English by default.

Dutch source material may be used as internal context, but all customer-facing copy, prompts, claims, creative briefs, folder documentation, QA checklists, and final outputs must be translated and adapted into natural, premium English.

Only use Dutch if the user explicitly asks for Dutch output.

## Source of Truth Priority

1. `01_BRAND_CONTEXT`
   Source of truth for brand positioning, tone of voice, target audience, claims, forbidden claims, product messaging, design language, website flow, and content direction.

2. `02_PRODUCT_REFERENCES`
   Source of truth for real Titan X product accuracy: shape, proportions, ports, cables, display, strap, logo placement, and material finish.

3. `03_COMPETITOR_ADS`
   Source of truth for competitor ad structure, psychology, layout, visual hierarchy, hooks, and swipe references.

4. `07_VIDEO_REFERENCES`
   Aesthetic reference only. Use for lighting, mood, motion, atmosphere, and cinematic pacing. Never use videos for product accuracy.

5. `08_QA_CHECKLISTS`
   Must be used before approving or exporting any generated creative.

## Core Execution Pipeline

1. Read `README_FOR_CLAUDE.md`
2. Read `00_MASTER_PROMPT\TITAN_X_MASTER_CREATIVE_PROMPT.md`
3. Load brand truth from `01_BRAND_CONTEXT`
4. Load product truth from `02_PRODUCT_REFERENCES`
5. Analyze selected competitor ad from `03_COMPETITOR_ADS`
6. Create a task-specific brief in `04_CREATIVE_BRIEFS`
7. Create model-specific prompts in `05_GENERATION_PROMPTS`
8. Save raw outputs in `06_GENERATED_OUTPUTS`
9. Run QA using `08_QA_CHECKLISTS`
10. Export approved final assets to `09_EXPORTS`
11. Log learnings in `10_LEARNINGS`

## Hard Rules

- Never market Titan X for airplanes, airports, flights, carry-on luggage, TSA, or flight-safe use.
- Never claim charging speed or wattage until confirmed.
- Never claim Micro-USB output until confirmed.
- Never invent product features.
- Never add fake ports, cables, buttons, screens, or labels.
- Logo spelling must always be exactly: TITANBANKS.
