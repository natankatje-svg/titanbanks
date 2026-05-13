# Titan X — Asset Pipeline

## master/
De enige bron van waarheid voor de Titan X product identity.
Bevat de originele OEM- en brandingfoto's die als referentie dienen bij elke generatie.
**Nooit wijzigen, nooit overschrijven.**

`TitanX_MASTER.png` is de primary identity reference.
Elke gegenereerde asset wordt visueel getoetst aan dit bestand.
Afwijkingen in body shape, strap kleur, display stijl of port layout → direct naar `outputs/rejected/`.

## angles/
Gegenereerde product shots per camerhoek, witte of neutrale achtergrond.

| Map | Inhoud |
|---|---|
| `left/` | 3/4 hoek van links |
| `right/` | 3/4 hoek van rechts |
| `top/` | Bovenaanzicht ports |
| `back/` | Achterkant — retractable kabels |
| `macro/` | Close-ups: display, strap detail, port detail |

## listing/
Geoptimaliseerde e-commerce gallery assets (witachtergrond, bijgesneden).
Klaar voor gebruik op webshop productpagina.

## social/
Formaat-specifieke crops en composities voor sociale media.
Vierkant (1:1) en story (9:16).

## prompts/
Opgeslagen prompt-templates per batch en angle.
Gebruik als basis bij nieuwe generaties om consistentie te bewaken.

## outputs/
| Map | Inhoud |
|---|---|
| `candidates/` | Ruwe Higgsfield outputs, nog niet goedgekeurd |
| `rejected/` | Inconsistente outputs — bewaren voor prompt-analyse |

---

## Naming convention

```
titanx_{angle}_{descriptor}_v{versie}.png

Voorbeelden:
titanx_left_3q_hero_v01.png
titanx_top_ports_studio_v01.png
titanx_back_cables_white_v02.png
titanx_macro_display_glow_v01.png
```

Regels:
- Lowercase, underscores
- Versienummer verplicht (`v01`, `v02`, ...)
- Nooit overschrijven — altijd nieuwe versie aanmaken
- Approved: verplaats van `outputs/candidates/` naar de juiste `angles/` of `listing/` map

---

## Gelockte product identifiers

Deze elementen mogen nooit wijzigen in gegenereerde assets:

- Matte zwarte rechthoekige body met afgeronde hoeken
- Oranje siliconen polsband met reliëftekst
- LED dot-matrix display
- Top: 4× USB-A + 1× USB-C (exact deze configuratie)
- Achterkant: retractable USB-C + Lightning kabels
- TITANBANKS logo op voorkant
