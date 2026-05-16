# TitanBanks Telegram Workflow — Cheat Sheet

## Aliases (per foto)

| Nummer | Naam | Concept |
|--------|------|---------|
| `1` | `hero` | Never at 0. (hero) |
| `2` | `lifestyle` / `backpack` | Never at 0. (backpack lifestyle) |
| `3` | `strap-macro` / `macro` | Strap (master plate, text-free) |
| `4` | `strap-hand` / `hand` | Strap (with hand) |
| `5` | `spec` / `50000` | 50,000 mAh. But that is not the point. |

Kapitalen maakt niets uit. Ook `a1`, `a2`, `b1`, `b2`, `c1` werken.

## Wat zeg je tegen mij (Claude)?

| Wat je zegt | Wat ik draai |
|-------------|--------------|
| "stuur naar telegram" | `python _send_telegram.py` (alle 5) |
| "stuur 1 4" of "stuur hero strap-hand" | `python _send_telegram.py 1 4` |
| "collect" of "haal feedback op" | `python _collect_feedback.py` |
| "regen" of "regenereer alles" | `python _regen_with_feedback.py` (alle photos met feedback) |
| "regen 1" of "regen hero" | `python _regen_with_feedback.py 1` |
| "regen 1 4 5" of "regen hero hand spec" | `python _regen_with_feedback.py 1 4 5` |

## Wat doe je in Telegram?

**Manier A — Reply op een foto:**
- Tap-en-hold op de foto → Reply → typ feedback → verstuur
- Werkt zonder dat je nummer/naam hoeft te onthouden

**Manier B — Alias prefix (als je niet wil scrollen):**
- Stuur een nieuw bericht beginnend met nummer of naam:
  - `1: display moet 100 zijn niet 888`
  - `hero: subhead mist het woord 'an'`
  - `strap-hand: vinger raakt brick aan, moet alleen loop vasthouden`
  - `5 - Mah moet mAh zijn`
- Scheiders die werken: `:`, `-`, `=`
- Hoofdletters maken niet uit

**Beide manieren werken naast elkaar** — stuur er zoveel als je wil per foto, alle worden bewaard.

## "Check telegram" — Telegram als jouw input naar mij

Stuur in Telegram wat dan ook (feedback, command, of een vrije prompt). Zeg in Claude **"check telegram"** of **"check"**. Ik draai `_check_telegram.py` en classificeer alles:

| Type bericht | Voorbeeld | Wat ik doe |
|--------------|-----------|------------|
| **Feedback (reply)** | reply op foto met "display fout" | Opgeslagen in `_feedback/<file>.feedback.md`. Wacht op "regen" of ik regen direct |
| **Feedback (alias)** | `1: display moet 100` | Idem |
| **Slash command** | `/regen 1 4` of `/push` of `/status` | Ik voer direct uit |
| **Vrije prompt** | "Genereer Titan X op een rotsachtig strand bij zonsondergang, premium look" | Ik bouw een prompt (canonical geometrie + brand voice + jouw scene), kies model, genereer, push terug |

### Slash commands die werken
- `/push` — push de huidige approved set
- `/push 1 4` — push specifieke photos
- `/regen` — regenereer alles met feedback
- `/regen 1 4` — regenereer specifieke photos
- `/status` — pipeline status (approved/needs_revision/rejected counts)
- `/list` — lijst van aliases

### Vrije prompt voorbeelden
- "Maak een variant van foto 4 met de hand zonder horloge en op een betonnen ondergrond"
- "Genereer een Titan X liggend in dauwgras bij zonsopgang, geen tekst, master plate"
- "Hero shot 9:16 met 'Power. Period.' als headline"

Ik kies model + aspect + refs op basis van de inhoud. Verkeerd? Dan corrigeer je gewoon.

## Cycle in 30 seconden

1. Ik zeg "klaar" + push → jij ziet 5 photos in Telegram met `#1 hero`, `#2 lifestyle` etc als caption
2. Jij stuurt: `1: display moet 100` en `4: hand te wit`
3. Jij zegt tegen mij: "regen 1 4"
4. Ik draai → 2 nieuwe photos in Telegram met caption "REVISION of …"
5. Repeat tot tevreden

## Onder de motorkap

| Bestand | Wat het doet |
|---------|--------------|
| `_aliases.py` | Mapping nummer/naam → filename |
| `_send_telegram.py` | Push photos + sla manifest op |
| `_collect_feedback.py` | Polled Telegram, schrijft `_feedback/<file>.feedback.md` |
| `_regen_with_feedback.py` | Leest feedback, draait juiste model, pusht revisie terug |
| `_telegram_manifest.json` | Mapping `message_id → recipe` (auto-bijgewerkt) |
| `_telegram_state.json` | Onthoudt waar collect gebleven was (idempotent) |
| `_feedback/<file>.feedback.md` | Per foto alle ontvangen feedback |
