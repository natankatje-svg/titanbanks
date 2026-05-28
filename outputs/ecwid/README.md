# Ecwid product import — Titan X

Twee CSV-bestanden, één voor elke fallback-situatie:

| Bestand | Wanneer gebruiken |
|---|---|
| `titan-x-product.csv` | **Default**: rijke versie met description (HTML), 8 image-URLs, 10 attributes, SEO meta. |
| `titan-x-product-minimal.csv` | **Fallback**: bare-minimum bestand (SKU/Name/Price/Quantity/Weight/Enabled) om eerst de import te valideren. |

## Wat ging er fout met de eerste poging

Ecwid's importer verwerpt elk bestand waarvan de kolomnamen niet exact één-op-één matchen met zijn canonical schema. Mijn eerste versie gebruikte gangbare e-commerce naming (`Cost price`, `Tax class`, genummerde `Image URL 1/2/3/...`, aparte `Attribute N name`/`Attribute N value`-paren) — dat is hoe Shopify/WooCommerce-templates eruitzien, maar Ecwid weigert het als "third-party file".

**De fix**: kolomnamen zijn nu strikt Ecwid-canonical:

| Was → | Nu (correct) |
|---|---|
| `Cost price` | `Cost Price` |
| `Tax class` | `Tax Class` |
| `Compare to price` | `Compare to Price` |
| `Track quantity` | weggehaald — wordt afgeleid uit `Unlimited` (`No` = stock tracken) |
| `Low stock notification` | weggehaald (niet vereist; later vanuit Ecwid UI) |
| `Image URL 1, 2, 3, …, 8` | `Image URL` (hoofd) + `Gallery` (extra, `;`-gescheiden in één cel) |
| `Attribute N name` / `Attribute N value` | `Attribute: <naam>` per kolomheader, waarde in de cel |
| _(geen Brand / SEO)_ | `Brand`, `SEO Title`, `SEO Description` toegevoegd |

## Stap-voor-stap import

### Aanpak A — Direct de rijke CSV (snelste pad)

1. Login op https://my.ecwid.com → **Catalog** → **Products**.
2. Klik **Import & Export** (rechtsboven) → **Import products**.
3. Upload `titan-x-product.csv`.
4. Ecwid leest de headers en mapt automatisch. Controleer in het preview-scherm:
   - SKU, Name, Description, Price, Quantity moeten herkend zijn.
   - Image URL + Gallery → product- en galerij-foto's.
   - Attribute: kolommen → custom productattributen.
5. Klik **Import** → Ecwid maakt het product aan en downloadt de images.

### Aanpak B — Twee-staps (veilig bij twijfel)

1. Importeer eerst `titan-x-product-minimal.csv` → bewijst dat het column-schema werkt en maakt het product met SKU aan.
2. Daarna importeer `titan-x-product.csv` → Ecwid herkent de bestaande SKU en **update** in plaats van dubbel aanmaken. Description, images, attributen worden ingevuld.

## Wat staat er in de rijke CSV?

| Kolom | Waarde | Bron |
|---|---|---|
| `SKU` | `TITANX-50K-MB-001` | Convention: `TITANX-{capaciteit}K-{kleur}-{rev}` — moet matchen met ChannelDock |
| `Name` | "Titan X 50.000 mAh Power Bank — Matte Black" | Search-friendly + brand-bevestigend |
| `Description` | HTML (h2/h3/ul met specs, in-de-doos, garantie/verzending) | Volledig vanuit `lib/product-claims.ts` SSOT |
| `Price` | 59.99 | `TBD.priceEur` |
| `Compare to Price` | _(leeg)_ | Geen kunstmatige korting per positionering |
| `Cost Price` | 29.00 | **Schatting** — vervang door werkelijke landed cost voor accurate marge-rapportage |
| `Quantity` | 100 | Eerste batch |
| `Unlimited` | No | Track stock actief — Ecwid stopt verkoop bij 0 |
| `Weight` | 0.758 | `TBD.weightGrams` (in kg) |
| `Width/Height/Length` | 69 / 68 / 148 | `TBD.dimensionsMm` |
| `Enabled` | Yes | Product zichtbaar in store |
| `Categories` | Power Banks | **Maak deze eerst aan** in Ecwid Catalog → Categories — anders gaat het product zonder categorie binnen |
| `Tax Class` | Standard | NL 21% BTW — verwacht dat deze class al bestaat |
| `Image URL` | slot-02.png | Hoofdafbeelding |
| `Gallery` | slot-03/04/05/06/07/08/09 (`;`-gescheiden) | 7 extra views |
| `Tags` | "power bank;titan x;..." | Voor interne filtering + Google Shopping |
| `Brand` | TitanBanks | Brand-attribuut voor productpagina + structured data |
| `Attribute: <10 stuks>` | SSOT-waarden | Renderen als spec-tabel op product page |
| `SEO Title` / `SEO Description` | Klant-vriendelijk gevuld | Voor Google-snippet override |

## Belangrijke setup-stappen ná de import

1. **Productpagina-link kopiëren**: ga naar het geïmporteerde product, kopieer het Product ID uit de URL.
2. **Vul `lib/ecwid-config.ts` in**:
   - Store ID (Settings → General → Store ID)
   - Product ID (zojuist gekopieerd)
3. **Push de webshop deploy** → de `Bestel nu` knop op de hero callt vanaf dan `Ecwid.Cart.addProduct({id: <jouw_id>})` en opent de checkout-overlay.
4. **Connect ChannelDock**: Integrations → Ecwid → OAuth flow → map SKU `TITANX-50K-MB-001` aan je 3PL.
5. **Test-bestelling**: zet prijs tijdelijk op €0,01 → plaats testorder → verifieer dat ChannelDock de order pullt → zet prijs terug.

## Image-URL caveat (belangrijk)

De `Image URL` + `Gallery` velden wijzen naar `https://titan-banks.com/images/slots/*.png`. Ecwid moet die URLs publiek kunnen ophalen om de afbeeldingen naar zijn eigen CDN te kopiëren.

**Zolang de site achter HTTP Basic Auth zit (`!ZusjeBaller420789!$`)**, krijgt Ecwid een 401-respons en mislukken de image-downloads stilzwijgend (product wordt aangemaakt zonder fotos).

Twee opties:
1. **Tijdelijk Basic Auth uitschakelen**: zet `BASIC_AUTH_ENABLED=false` op Vercel → wacht 1 minuut tot herdeploy → importeer CSV → wacht tot Ecwid alle 8 images heeft binnengetrokken → zet `BASIC_AUTH_ENABLED=true` terug.
2. **Images los uploaden**: importeer CSV met lege `Image URL` + `Gallery` → ga handmatig naar het product in Ecwid → drag-and-drop de PNG-bestanden vanaf `C:\Users\natan\TitanBanks\public\images\slots\` in de Photo Gallery.

Optie 1 is sneller (1 import → 5 min totaal). Optie 2 is veiliger als je de site echt private wilt houden tot launch.

## Notes

- **Cost Price** (€29) is **een schatting**. Vervang door je werkelijke landed cost (manufacturing + freight + duties + 3PL fee per unit) voordat je margin-reports bekijkt.
- **Categorie `Power Banks` moet bestaan** vóór de import. Maak ze aan via Catalog → Categories → Add category. Anders importeert het product zonder categorie en moet je het achteraf koppelen.
- **HTML in Description** wordt door Ecwid gerenderd op de product-detail-page als formatted content. Wil je puur tekst? Vervang het HTML-blok in de CSV door simpele regels gescheiden door `\n`.
- **Wanneer je een anchor-prijs wilt** (doorgestreepte hogere "was" prijs): vul `Compare to Price` in (bv. 79.99). Anders leeg laten — past bij de "geen kunstmatige korting"-positionering.
