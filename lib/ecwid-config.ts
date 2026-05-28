// =============================================
// ECWID CONFIGURATIE — TitanBanks
// =============================================
// E-commerce backend voor titan-banks.com. De Next.js frontend op Vercel
// rendert het storefront; Ecwid handelt cart, checkout en payment af via
// hun in-page script (zie components/EcwidProvider.tsx).
//
// ┌─────────────────────────────────────────────────────────────────────┐
// │ ORDER FLOW: Frontend → Ecwid → ChannelDock → 3PL fulfilment center  │
// └─────────────────────────────────────────────────────────────────────┘
//
//  1. Klant klikt "Bestel Titan X" op titan-banks.com
//     └─► HeroVariantB / BuyBox callt useEcwid().addToCart(qty)
//
//  2. EcwidProvider roept window.Ecwid.Cart.addProduct({
//       id: ECWID_PRODUCT_ID, quantity: qty
//     }) — werkt via het Ecwid-script dat op alle pagina's geladen wordt.
//
//  3. Ecwid in-page checkout opent (overlay). Klant kiest betaalmethode
//     (iDEAL/Klarna/etc.) en bevestigt. Order wordt aangemaakt in Ecwid.
//
//  4. ChannelDock pullt orders uit Ecwid via hun Ecwid-app-integratie
//     (REST API + webhooks). Sync-frequentie configureerbaar in
//     ChannelDock dashboard, default ~elke 5-15 min.
//
//  5. ChannelDock forwardt de order naar het ingekoppelde 3PL fulfilment
//     center via hun WMS-integratie. Inventory wordt teruggesynct naar
//     Ecwid (en optioneel andere channels) zodat overselling voorkomen
//     wordt.
//
//  6. Tracking + verzending → ChannelDock → Ecwid → klant per e-mail.
//
// =============================================
// VEREISTE SETUP (eenmalig)
// =============================================
//
//  In Ecwid (https://my.ecwid.com):
//   1. Maak een account / store aan.
//   2. Voeg Titan X toe als product. Vul exact dezelfde SKU in als
//      ChannelDock gebruikt (anders breekt inventory-sync).
//   3. Configureer betaalmethodes (iDEAL via Mollie/Stripe, Klarna, etc.).
//   4. Configureer verzendzones: NL (gratis), BE/DE, Rest EU, etc.
//   5. Noteer Store ID (Settings → General) en Product ID (Products →
//      Titan X → ID in URL) en vul ze hieronder in.
//
//  In ChannelDock (https://app.channeldock.com):
//   1. Voeg Ecwid toe als channel via "Integrations → Ecwid".
//   2. Geef ChannelDock API-toegang tot je Ecwid store (OAuth flow).
//   3. Map het Titan X product op SKU-niveau aan een ChannelDock-product.
//   4. Koppel ChannelDock aan je 3PL via "Warehouses → Connect WMS".
//   5. Test met een €0.01 testbestelling om de end-to-end flow te
//      verifiëren voordat ads aan gaan.
//
//  In Vercel (al gedaan):
//   - Frontend deploy auto via push naar `main`. Geen env-vars voor
//     Ecwid nodig (alles client-side via het script). ChannelDock praat
//     direct met Ecwid's API, niet met onze Vercel-deployment.
//
// =============================================

// Geëxtraheerd uit de officiële Ecwid-embed-code (xProductBrowser snippet,
// 2026-05-28). Het getal achter `script.js?` is de canonical store-id en
// is dezelfde ID die de REST API verwacht op /api/v3/{storeId}/.
export const ECWID_STORE_ID = '136509793';

// Wordt automatisch ingevuld door scripts/ecwid-sync.ts na de eerste sync.
// Tot dan staat hij op 0 — de hero "Bestel nu"-knop opent in dat geval
// alleen de cart-overlay zonder product (Ecwid logt een no-op warning).
export const ECWID_PRODUCT_ID = 0;
