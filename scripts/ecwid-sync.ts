/**
 * Ecwid product sync — leest product-spec uit SSOT en zet hem (idempotent)
 * in de Ecwid catalog. Vervangt de manuele CSV-import workflow.
 *
 * Run:
 *   npm run ecwid:sync             # echte sync naar Ecwid
 *   npm run ecwid:sync -- --dry    # toon wat het zou doen, geen POSTs
 *
 * Vereist in .env.local:
 *   ECWID_STORE_ID=12345678
 *   ECWID_ACCESS_TOKEN=secret_xxxxxxxxxxxxxxxxxxxxxxx
 *
 * Stappen:
 *   1. Zorg dat de categorie "Power Banks" bestaat (create if missing)
 *   2. Build product-payload uit lib/product-claims.ts SSOT
 *   3. SKU-lookup → bestaande product? PUT (update) : POST (create)
 *   4. Upload main image (slot-02) + gallery (slot-03..09)
 *   5. Schrijf product-id terug in lib/ecwid-config.ts
 *   6. Log naar outputs/ecwid-sync.log
 */

import { config } from 'dotenv';
import { resolve } from 'node:path';
import { appendFileSync, mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';

// Load .env.local explicitly — Next/Node niet automatisch in scripts/.
config({ path: resolve(process.cwd(), '.env.local') });

import {
  ecwidGet,
  ecwidPost,
  ecwidPut,
  ecwidUploadImage,
  type EcwidCategoriesResponse,
  type EcwidProductsResponse,
  type EcwidCategory,
  type EcwidProduct,
} from '../lib/ecwid-api';
import {
  BRAND,
  SPECS,
  TBD,
  capacityLabel,
  portsLabel,
  safe,
} from '../lib/product-claims';

const DRY_RUN = process.argv.includes('--dry') || process.argv.includes('--dry-run');
const CATEGORY_NAME = 'Power Banks';
const SKU = 'TITANX-50K-MB-001';
const ROOT = resolve(__dirname, '..');
const LOG_PATH = resolve(ROOT, 'outputs', 'ecwid-sync.log');
const CONFIG_PATH = resolve(ROOT, 'lib', 'ecwid-config.ts');

// ─── Logging ───────────────────────────────────────────────────────────────

mkdirSync(resolve(ROOT, 'outputs'), { recursive: true });

function log(line: string): void {
  const stamp = new Date().toISOString();
  const msg = `[${stamp}] ${line}`;
  console.log(msg);
  appendFileSync(LOG_PATH, msg + '\n');
}

// ─── Product payload uit SSOT ──────────────────────────────────────────────

function buildDescriptionHtml(): string {
  const wattage = safe(TBD.fastChargeWattage);
  const certs = safe(TBD.certifications) ?? [];
  const weight = safe(TBD.weightGrams);
  const dims = safe(TBD.dimensionsMm);
  return [
    `<h2>${BRAND.product} — ${capacityLabel()} in matte black</h2>`,
    '<p>Premium power bank gebouwd voor wie niet kan stoppen. Eén pack, dagen aan power. LED-display toont het exacte percentage, geen gokken meer.</p>',
    '<h3>Specs</h3>',
    '<ul>',
    `<li>Capaciteit: ${capacityLabel()}</li>`,
    `<li>Tot ${SPECS.simultaneousDevices.value} devices tegelijk laden</li>`,
    `<li>${portsLabel()}</li>`,
    wattage ? `<li>${wattage}W fast charge (max)</li>` : '',
    SPECS.hasLedDisplay.value ? '<li>LED-display met exact percentage</li>' : '',
    SPECS.hasFlashlight.value ? '<li>Ingebouwde zaklamp</li>' : '',
    (SPECS.builtInCableUsbC.value && SPECS.builtInCableLightning.value)
      ? '<li>2 ingebouwde, intrekbare kabels: USB-C + Lightning</li>'
      : '',
    `<li>${SPECS.finish.value}, gewoven oranje draagriem (embossed POWER BANK)</li>`,
    `<li>${SPECS.warrantyYears.value} jaar fabrieksgarantie</li>`,
    certs.length ? `<li>Certificering: ${certs.join(' · ')}</li>` : '',
    dims ? `<li>Afmetingen: ${dims}</li>` : '',
    weight ? `<li>Gewicht: ${weight} g</li>` : '',
    '</ul>',
    '<h3>Wat zit erin</h3>',
    '<ul>',
    '<li>1× Titan X power bank</li>',
    '<li>1× USB-C kabel (intrekbaar, ingebouwd)</li>',
    '<li>Handleiding NL/EN/DE</li>',
    '</ul>',
    '<h3>Verzending & garantie</h3>',
    `<p>Verzending vanuit Nederland, 1-3 werkdagen. ${safe(TBD.returnPolicyDays) ?? 14} dagen retourrecht. ${SPECS.warrantyYears.value} jaar fabrieksgarantie. Niet geschikt voor luchtvaart (>100 Wh ICAO-limiet).</p>`,
  ]
    .filter(Boolean)
    .join('');
}

function buildProductPayload(categoryId: number): Record<string, unknown> {
  const wattage = safe(TBD.fastChargeWattage);
  const weightG = safe(TBD.weightGrams);
  const dims = safe(TBD.dimensionsMm);
  const certs = safe(TBD.certifications) ?? [];

  // dimensies "148 × 69 × 68" → length × width × height
  const [length, width, height] = dims
    ? dims.split(/\s*[×x]\s*/).map((s) => parseInt(s.replace(/\D/g, ''), 10))
    : [0, 0, 0];

  return {
    sku: SKU,
    name: `${BRAND.product} ${capacityLabel()} Power Bank — Matte Black`,
    description: buildDescriptionHtml(),
    price: safe(TBD.priceEur) ?? 0,
    enabled: true,
    quantity: 100, // eerste batch
    unlimited: false,
    weight: weightG ? +(weightG / 1000).toFixed(3) : undefined, // kg
    dimensions: { length, width, height }, // mm
    categoryIds: [categoryId],
    defaultCategoryId: categoryId,
    productClass: undefined, // default
    attributes: [
      { name: 'Capaciteit', value: capacityLabel(), show: 'DESCR' },
      { name: 'Devices tegelijk', value: String(SPECS.simultaneousDevices.value), show: 'DESCR' },
      { name: 'Output poorten', value: `${SPECS.portsUsbA.value}× USB-A`, show: 'DESCR' },
      (SPECS.builtInCableUsbC.value && SPECS.builtInCableLightning.value)
        ? { name: 'Ingebouwde kabels', value: 'USB-C + Lightning (intrekbaar)', show: 'DESCR' }
        : null,
      wattage ? { name: 'Fast charge', value: `${wattage}W max`, show: 'DESCR' } : null,
      { name: 'LED-display', value: SPECS.hasLedDisplay.value ? 'Ja' : 'Nee', show: 'DESCR' },
      { name: 'Zaklamp', value: SPECS.hasFlashlight.value ? 'Ja' : 'Nee', show: 'DESCR' },
      { name: 'Afwerking', value: SPECS.finish.value, show: 'DESCR' },
      weightG ? { name: 'Gewicht', value: `${weightG} g`, show: 'DESCR' } : null,
      dims ? { name: 'Afmetingen', value: dims, show: 'DESCR' } : null,
      certs.length ? { name: 'Certificering', value: certs.join(' · '), show: 'DESCR' } : null,
    ].filter(Boolean),
    seoTitle: `${BRAND.product} ${capacityLabel()} Power Bank — ${BRAND.wordmark}`,
    seoDescription: `Premium ${capacityLabel()} power bank in matte black. ${SPECS.simultaneousDevices.value} devices tegelijk · ${wattage}W fast charge · LED-display. Eerste batch beperkt, bestel nu.`,
  };
}

// ─── Workflow stappen ──────────────────────────────────────────────────────

async function ensureCategory(): Promise<EcwidCategory> {
  log(`→ Categorie '${CATEGORY_NAME}' check...`);
  const res = await ecwidGet<EcwidCategoriesResponse>('/categories');
  const existing = res.items.find((c) => c.name.toLowerCase() === CATEGORY_NAME.toLowerCase());
  if (existing) {
    log(`✓ Categorie bestond al (id: ${existing.id})`);
    return existing;
  }
  if (DRY_RUN) {
    log(`[dry] zou POST /categories met name='${CATEGORY_NAME}'`);
    return { id: -1, name: CATEGORY_NAME };
  }
  const created = await ecwidPost<EcwidCategory>('/categories', {
    name: CATEGORY_NAME,
    enabled: true,
  });
  log(`✓ Categorie aangemaakt (id: ${created.id})`);
  return created;
}

async function findExistingProduct(): Promise<EcwidProduct | null> {
  const res = await ecwidGet<EcwidProductsResponse>('/products', { sku: SKU });
  const match = res.items.find((p) => p.sku === SKU);
  return match ?? null;
}

async function upsertProduct(categoryId: number): Promise<number> {
  const payload = buildProductPayload(categoryId);
  const existing = await findExistingProduct();

  if (existing) {
    log(`→ Product bestond (id: ${existing.id}) — PUT update`);
    if (DRY_RUN) {
      log(`[dry] zou PUT /products/${existing.id}`);
      return existing.id;
    }
    await ecwidPut(`/products/${existing.id}`, payload);
    log(`✓ Product ${existing.id} ge-update`);
    return existing.id;
  }

  log(`→ Product bestond niet — POST create`);
  if (DRY_RUN) {
    log(`[dry] zou POST /products met SKU=${SKU}`);
    return -1;
  }
  const created = await ecwidPost<{ id: number }>('/products', payload);
  log(`✓ Product aangemaakt (id: ${created.id})`);
  return created.id;
}

async function uploadImages(productId: number): Promise<void> {
  const slots = [
    'slot-02.png', // main
    'slot-03.png',
    'slot-04.png',
    'slot-05.png',
    'slot-06.png',
    'slot-07.png',
    'slot-08.png',
    'slot-09.png',
  ];

  // Main image (vervangt bestaande)
  const mainPath = resolve(ROOT, 'public', 'images', 'slots', slots[0]);
  log(`→ Main image upload: ${slots[0]}`);
  if (DRY_RUN) {
    log(`[dry] zou POST /products/${productId}/image (${mainPath})`);
  } else {
    const r = await ecwidUploadImage(`/products/${productId}/image`, mainPath);
    log(`✓ Main image (id: ${r.id})`);
  }

  // Gallery (rest)
  for (const slot of slots.slice(1)) {
    const path = resolve(ROOT, 'public', 'images', 'slots', slot);
    log(`→ Gallery image upload: ${slot}`);
    if (DRY_RUN) {
      log(`[dry] zou POST /products/${productId}/gallery (${path})`);
      continue;
    }
    try {
      const r = await ecwidUploadImage(`/products/${productId}/gallery`, path);
      log(`✓ Gallery image (id: ${r.id})`);
    } catch (e) {
      log(`✗ Gallery upload faalde voor ${slot}: ${(e as Error).message}`);
    }
  }
}

function persistIdsToConfig(productId: number): void {
  if (DRY_RUN) {
    log(`[dry] zou lib/ecwid-config.ts bijwerken met productId=${productId}`);
    return;
  }
  if (!existsSync(CONFIG_PATH)) {
    log(`! ${CONFIG_PATH} niet gevonden — handmatig invullen`);
    return;
  }
  const content = readFileSync(CONFIG_PATH, 'utf-8');
  const storeId = process.env.ECWID_STORE_ID!;
  const updated = content
    .replace(/ECWID_STORE_ID\s*=\s*['"][^'"]*['"]/, `ECWID_STORE_ID = '${storeId}'`)
    .replace(/ECWID_PRODUCT_ID\s*=\s*\d+/, `ECWID_PRODUCT_ID = ${productId}`);
  writeFileSync(CONFIG_PATH, updated, 'utf-8');
  log(`✓ lib/ecwid-config.ts bijgewerkt (store: ${storeId}, product: ${productId})`);
}

// ─── Main ──────────────────────────────────────────────────────────────────

async function main() {
  log(`═══ Ecwid sync gestart ${DRY_RUN ? '[DRY-RUN]' : ''} ═══`);
  log(`SKU: ${SKU} · Category: ${CATEGORY_NAME}`);

  try {
    const category = await ensureCategory();
    const productId = await upsertProduct(category.id);
    if (productId > 0) {
      await uploadImages(productId);
      persistIdsToConfig(productId);
    }
    log(`═══ Sync ${DRY_RUN ? 'dry-run ' : ''}voltooid ═══\n`);
  } catch (e) {
    log(`✗ FATAAL: ${(e as Error).message}`);
    log(`═══ Sync gestopt ═══\n`);
    process.exit(1);
  }
}

main();
