# Ecwid product import — Titan X

`titan-x-product.csv` bevat één product-row klaar voor import in je Ecwid store.

## Hoe te importeren

1. Login op https://my.ecwid.com → Catalog → Products
2. Klik **Import & Export** (rechtsboven) → **Import products**
3. Upload `titan-x-product.csv`
4. Map de kolommen (Ecwid herkent ze meestal automatisch):
   - `SKU` → SKU
   - `Name` → Name
   - `Description` → Description (HTML enabled)
   - `Price` → Price (default valuta = EUR)
   - `Cost price` → Cost (voor margin tracking)
   - `Quantity` → In stock (100 voor eerste batch)
   - `Track quantity` → Stock control
   - `Weight` → Weight (in kg)
   - `Width/Height/Length` → Dimensions (in mm)
   - `Image URL 1-8` → Product images (URLs worden gedownload door Ecwid)
   - `Attribute N name/value` → Custom product attributes (worden getoond op product page)
5. Run de import → Ecwid maakt het product aan en downloadt de images.

## Wat staat er in?

| Veld | Waarde | Bron |
|---|---|---|
| SKU | `TITANX-50K-MB-001` | Convention: `TITANX-{capaciteit}K-{kleur}-{rev}` |
| Prijs | €59,99 | [[TBD.priceEur]] (Telegram checkpoint 1) |
| Cost price | €29,00 | Geschatte landed cost — **PAS AAN naar werkelijke COGS** voor accurate margin tracking |
| Quantity | 100 | Eerste batch |
| Weight | 0.758 kg | [[TBD.weightGrams]] |
| Dimensions | 148 × 69 × 68 mm | [[TBD.dimensionsMm]] |
| Categorie | `Power Banks` | Maak eerst aan in Ecwid Catalog → Categories |
| Tax class | Standard | NL 21% BTW — instellen in Ecwid Settings → Taxes |

## Belangrijke setup-stappen ná de import

1. **Productpagina-link kopiëren**: ga naar het geïmporteerde product, kopieer het `Product ID` uit de URL.
2. **Vul `lib/ecwid-config.ts` in**:
   - Store ID (Settings → General → Store ID)
   - Product ID (zojuist gekopieerd)
3. **Push de webshop deploy** → de `Bestel nu` knop op de hero callt vanaf dan `Ecwid.Cart.addProduct({id: <jouw_id>})` en opent de checkout-overlay.
4. **Connect ChannelDock**: Integrations → Ecwid → OAuth flow → map SKU `TITANX-50K-MB-001` aan je 3PL.
5. **Test-bestelling**: zet prijs tijdelijk op €0,01 → plaats testorder → verifieer dat ChannelDock de order pullt → zet prijs terug.

## CSV-structuur (kolommen verklaard)

| Kolom | Pflicht | Notitie |
|---|---|---|
| `SKU` | Ja | Moet matchen met ChannelDock product-SKU anders breekt inventory sync |
| `Name` | Ja | Komt in browser-tab + Google search |
| `Description` | Optioneel | HTML toegestaan. Strip de `<h2>/<ul>` als je puur tekst wilt |
| `Price` | Ja | Default valuta van je store (EUR) |
| `Compare to price` | Optioneel | Lege string = geen anchor (zoals SSOT zegt) |
| `Cost price` | Optioneel | Privé veld voor margin-tracking, niet zichtbaar voor klant |
| `Quantity` | Optioneel | Alleen relevant als `Track quantity = Yes` |
| `Unlimited` | Ja/Nee | `No` betekent: stop verkopen wanneer Quantity = 0 |
| `Track quantity` | Ja/Nee | `Yes` zodat overselling voorkomen wordt |
| `Weight` | Optioneel | In store's default unit (kg) — gebruikt voor shipping calc |
| `Width/Height/Length` | Optioneel | In mm — gebruikt voor courier-tariefberekening |
| `Enabled` | Ja/Nee | `Yes` = product is zichtbaar in je store |
| `Visible` | Ja/Nee | `Yes` = product staat in catalogue listing |
| `Categories` | Optioneel | Categorie moet eerst aangemaakt zijn in Ecwid |
| `Tax class` | Optioneel | Default `Standard` = jouw NL 21% BTW class |
| `Image URL N` | Optioneel | Ecwid downloadt de file en host hem zelf. URLs moeten publiek bereikbaar zijn |
| `Attribute N name/value` | Optioneel | Verschijnt als spec-tabel op product page |

## Notes / TODO

- **Cost price** is een schatting (€29) — vervang door werkelijke landed cost (manufacturing + freight + duties + 3PL fee per unit) voor accurate margin reporting.
- **Image URLs** wijzen naar de slot-renders die nu op titan-banks.com staan. Wanneer de site nog achter Basic Auth zit kan Ecwid die NIET downloaden. Twee opties:
  1. Tijdelijk `BASIC_AUTH_ENABLED=false` op Vercel zetten, importeren, daarna terug op true.
  2. Images apart uploaden via Ecwid UI (slow drag-and-drop) ipv via CSV.
- Wanneer je een **anchor-prijs** wilt tonen (doorgestreepte hogere prijs): vul `Compare to price` in (bv. 79.99). Anders leeg laten — past bij de "geen kunstmatige korting"-positionering.
- De **HTML in Description** is rich (h2/h3/ul). Ecwid rendert die op de product-detail-page als standaard formatted text.
