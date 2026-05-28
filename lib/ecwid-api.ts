/**
 * Ecwid REST API v3 client.
 *
 * Wrapper rondom `fetch` met:
 *   - Bearer-auth via ECWID_ACCESS_TOKEN env-var
 *   - Auto-injected base-URL met ECWID_STORE_ID
 *   - Consistente error-handling (gooit op !res.ok met body in message)
 *   - Multipart helper voor image-upload via form-data package
 *
 * Geen 3rd-party SDK — Ecwid heeft geen officiële Node SDK en hun REST API
 * is trivial via fetch. Houden we 0 dependencies, 0 magic.
 *
 * Endpoint docs: https://api-docs.ecwid.com
 */

import { readFileSync } from 'node:fs';
import { basename } from 'node:path';
import FormData from 'form-data';

const STORE_ID = process.env.ECWID_STORE_ID;
const TOKEN = process.env.ECWID_ACCESS_TOKEN;

if (!STORE_ID || !TOKEN) {
  // Lazy throw — alleen wanneer iemand de client daadwerkelijk gebruikt.
  // Permits importing during type-checking without env-vars set.
}

const BASE = STORE_ID ? `https://app.ecwid.com/api/v3/${STORE_ID}` : '';

function requireCreds(): { base: string; token: string } {
  if (!STORE_ID || !TOKEN) {
    throw new Error(
      'Ecwid creds ontbreken. Zet ECWID_STORE_ID en ECWID_ACCESS_TOKEN in .env.local.\n' +
        '  1. my.ecwid.com → My profile → Develop apps → Create app\n' +
        '  2. Scopes: read_catalog, create_catalog, update_catalog\n' +
        '  3. Get authorization → kopieer token + store-id naar .env.local',
    );
  }
  return { base: BASE, token: TOKEN };
}

interface EcwidError {
  errorCode?: string;
  errorMessage?: string;
}

async function handleResponse<T>(res: Response, label: string): Promise<T> {
  const body = await res.text();
  if (!res.ok) {
    let parsed: EcwidError = {};
    try { parsed = JSON.parse(body) as EcwidError; } catch { /* keep raw */ }
    const msg = parsed.errorMessage ?? body.slice(0, 200);
    throw new Error(`Ecwid ${label} faalde (${res.status}): ${msg}`);
  }
  return body ? (JSON.parse(body) as T) : ({} as T);
}

/** GET helper — query-string optioneel als plain object. */
export async function ecwidGet<T>(
  path: string,
  query?: Record<string, string | number>,
): Promise<T> {
  const { base, token } = requireCreds();
  const qs = query
    ? '?' + new URLSearchParams(Object.entries(query).map(([k, v]) => [k, String(v)])).toString()
    : '';
  const res = await fetch(`${base}${path}${qs}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse<T>(res, `GET ${path}`);
}

/** POST JSON helper. */
export async function ecwidPost<T>(path: string, body: unknown): Promise<T> {
  const { base, token } = requireCreds();
  const res = await fetch(`${base}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return handleResponse<T>(res, `POST ${path}`);
}

/** PUT JSON helper (gebruikt voor product-update). */
export async function ecwidPut<T>(path: string, body: unknown): Promise<T> {
  const { base, token } = requireCreds();
  const res = await fetch(`${base}${path}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return handleResponse<T>(res, `PUT ${path}`);
}

/**
 * Upload een lokale image als multipart/form-data.
 *
 * Ecwid endpoints:
 *   - POST /products/{id}/image     → hoofdafbeelding (vervangt bestaande)
 *   - POST /products/{id}/gallery   → voegt toe aan gallery
 *
 * Belangrijk: Ecwid verwacht de file in een `image`-veld voor /image en
 * `image` voor /gallery — dezelfde key. Content-type wordt afgeleid uit
 * de file-extension; png/jpg/webp werken allemaal.
 */
export async function ecwidUploadImage(
  path: string,
  localFilePath: string,
): Promise<{ id: number }> {
  const { base, token } = requireCreds();
  const buffer = readFileSync(localFilePath);
  const filename = basename(localFilePath);

  const form = new FormData();
  form.append('image', buffer, { filename });

  // form-data heeft een eigen fetch-incompatible body type op oudere Node.
  // Op Node 18+ accepteert undici de native FormData; we casten naar BodyInit.
  const res = await fetch(`${base}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      ...form.getHeaders(),
    },
    body: form as unknown as BodyInit,
  });

  return handleResponse<{ id: number }>(res, `POST ${path} (multipart)`);
}

// ─── Type-shapes voor de endpoints die we gebruiken ────────────────────────

export interface EcwidCategory {
  id: number;
  name: string;
  enabled?: boolean;
}

export interface EcwidProduct {
  id: number;
  sku: string;
  name: string;
  price: number;
  quantity?: number;
  enabled: boolean;
}

export interface EcwidProductsResponse {
  total: number;
  count: number;
  items: EcwidProduct[];
}

export interface EcwidCategoriesResponse {
  total: number;
  count: number;
  items: EcwidCategory[];
}
