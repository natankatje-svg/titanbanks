# Prompt Performance Log

Append-only log. Newest at the top.

---

## Run 2026-05-15 (d) — Ideogram with style_reference_images via API

5 jobs · QUALITY · style_type=AUTO · 3 OEM refs attached (slot-18/19/20, plus slot-09 for strap concepts) · ~10s wall time

| Job | Seed | Aspect | Outcome | vs v2 |
|-----|------|--------|---------|-------|
| A1 hero v3 | `143193188` | 9:16 | **approved (NEW BEST)** | geometry massive win, subhead dropped "an" |
| A2 lifestyle backpack v3 | `1646009266` | 9:16 | archived (downgrade) | refs killed the lifestyle scene |
| B1 macro v3 | `675955324` | 3:4 | needs_revision | brick clean ✓, loop text garbled (3rd attempt) |
| B2 lifestyle hand v3 | `269186746` | 3:4 | needs_revision | brick clean ✓, no hand, white background |
| C1 50,000 mAh v3 | `135129598` | 9:16 | needs_revision | "50.00 Mah." text fail, "5000%" display fail, white background |

Cumulative state (after 3 Ideogram iterations, 14 jobs total):
- Approved: 2 (A1 v3, A2 v2)
- Needs revision: 3 (B1 v3, B2 v3, C1 v3)
- Rejected: 0
- Archived: 9 (4 v1 + 5 v2/v3-downgrades)

Per-tool-config fitness (refined):

| Concept type | Best config | Why |
|--------------|-------------|-----|
| Studio hero with brand-correct geometry | Ideogram v3 + 3 OEM marketplace refs (slot-18/19/20) + corrected geometry block | Refs solve geometry; A1 v3 proves it |
| Lifestyle scene with edge cues | Ideogram v3 + NO refs + scene description in prompt | Refs flatten lifestyle scenes — A2 v2 (no refs) beat A2 v3 (with refs) |
| Macro carry-loop with embossing | Any model + Photoshop overlay | Loop text never renders correctly in Ideogram across 3 attempts |
| Hand-on-strap | GPT Image 2 | Ideogram drops the hand reliably |
| Spec hero with flanking silhouettes | Drop silhouettes; render as plain spec hero OR add silhouettes as Figma vector | Ideogram won't draw faint background graphics |

---

## Run 2026-05-15 (c) — Ideogram revision pass via API

| Job | Seed | Aspect | Outcome | vs v1 |
|-----|------|--------|---------|-------|
| A2 lifestyle backpack v2 | `865458342` | 9:16 | **approved** | jumped from needs_revision → approved (geometry + subhead fixed) |
| B1 macro v2 | `128755207` | 3:4 | needs_revision | brick now clean, loop text still garbled |
| B2 lifestyle v2 | `400281816` | 3:4 | needs_revision | jumped from rejected → needs_revision (no more "TOWER BANK") |
| C1 50,000 mAh v2 | `1169859323` | 9:16 | needs_revision | geometry fixed, silhouettes still missing |

Wall time: ~9.5s for 4 parallel. Cost ~$0.32.

Cumulative Ideogram run state (after 2 iterations, 9 total jobs):
- Approved: 2 (A1 v1, A2 v2)
- Needs revision: 3 (B1 v2, B2 v2, C1 v2)
- Rejected: 0
- Archived v1: 4

Per-tool fitness (refined):

| Concept | Best tool | Why |
|---------|-----------|-----|
| Headline-led 9:16 hero | Ideogram v3 QUALITY | Cleanest typography first try, fast |
| Lifestyle scene with edge cues | Ideogram v3 QUALITY | A2 v2 backpack pier nailed |
| Macro carry-loop with embossing | GPT Image 2 + Photoshop overlay | Ideogram cannot render loop text reliably |
| Hand-on-strap | GPT Image 2 | Ideogram drops the hand or mis-places brick text |
| Spec headline + flanking silhouettes | Ideogram (drop silhouettes) OR GPT Image 2 OR vector overlay in Figma | Ideogram won't render low-opacity scene graphics |
| Cinematic master plate (text-free) | Soul Cinematic (Higgsfield) | Strongest mood, but watch face-position + loop drape |

---

## Run 2026-05-15 (b) — Ideogram first run via API

| Job | Model | Seed | Aspect | Outcome |
|-----|-------|------|--------|---------|
| Angle 1 A1 hero | Ideogram v3 QUALITY | `30560189` | 9:16 | approved (subhead missing "an") |
| Angle 1 A2 lifestyle | Ideogram v3 QUALITY | `1641924711` | 9:16 | needs_revision (geometry slim) |
| Angle 2 B1 macro | Ideogram v3 QUALITY | `751854916` | 3:4 | needs_revision (garbled loop+brick text) |
| Angle 2 B2 lifestyle | Ideogram v3 QUALITY | `1098227781` | 3:4 | rejected (TOWER BANK on brick) |
| Angle 3 C1 hero | Ideogram v3 QUALITY | `1229688904` | 9:16 | needs_revision (garbled loop, no silhouettes) |

Wall time: ~17s for 5 parallel jobs (thread pool 5). Massive speed advantage over Higgsfield platform.

Per-model fitness update:

| Model | Strength | Use for |
|-------|----------|---------|
| Ideogram v3 QUALITY | clean headline rendering, correct punctuation, comma preservation, respects "no plinth label" negative, fastest of all platforms via API | Headline-led pre-launch hero ads (9:16); first choice for typography-led concepts |
| GPT Image 2 | layout discipline, 5-block typography, accurate brick geometry | Strong second for typography ads; safer for brick geometry than Ideogram |
| FLUX.2 max | macro fiber detail | Text-free master plates only |
| Soul Cinematic | dramatic single-light cinematic mood | Text-free master plates; lock display face + loop drape |

---

## Run 2026-05-15 — pre-launch first run

| Job | Model | Job ID | Aspect | Outcome |
|-----|-------|--------|--------|---------|
| Angle 1 Never at 0 hero | gpt_image_2 | `6715b724-7576-4a3e-902d-45eb62633691` | 9:16 | approved |
| Angle 3 50,000 mAh | gpt_image_2 | `6b959b49-f763-4351-9f03-1c455d89d6d2` | 9:16 | needs_revision (extra plinth label) |
| Angle 2 Strap macro | gpt_image_2 | (in 03_gpt_angle2.json) | 3:4 | approved — anchor asset |
| Angle 2 Strap macro | flux_2 (max) | `e7229f6d-db77-46c2-b89f-68f3d8accef1` | 3:4 | needs_revision (text fail) |
| Angle 1 master plate | soul_cinematic | `d369ba0c-d1b9-4290-97ae-cc8f10a38202` | 9:16 | needs_revision (loop drape) |
| Angle 2 master plate | soul_cinematic | `f60d4946-b9dd-4072-b5bb-ec18700b853c` | 3:4 | rejected (display face position) |

Per-model fitness (this brief):

| Model | Strength | Use for |
|-------|----------|---------|
| GPT Image 2 | text-rendering, layout discipline, accurate product geometry | All typography-led ad variants; anchor model for pre-launch |
| FLUX.2 max | macro fiber detail, photoreal surface | Text-free master plates and product close-ups; do NOT request typography blocks |
| Soul Cinematic | dramatic single-light cinematic mood | Text-free master plates only; lock display face and loop drape direction in prompt |

Compute spent on this run: 6 jobs (3× GPT Image 2 high/2k, 1× FLUX.2 max/2k, 2× Soul Cinematic 2k). All --wait succeeded within ~1 minute each.
