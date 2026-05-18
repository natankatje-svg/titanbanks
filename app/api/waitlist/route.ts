import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ipBucket = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipBucket.get(ip);
  if (!entry || entry.resetAt < now) {
    ipBucket.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'Too many requests. Try again in a minute.' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }
  const email = typeof body === 'object' && body && 'email' in body ? String((body as { email: unknown }).email).trim().toLowerCase() : '';
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'Please enter a valid email.' }, { status: 400 });
  }

  const record = {
    email,
    ip,
    userAgent: req.headers.get('user-agent') || '',
    referer: req.headers.get('referer') || '',
    receivedAt: new Date().toISOString(),
    source: 'titan-banks.com/waitlist',
  };

  if (process.env.NODE_ENV !== 'production') {
    try {
      const outDir = path.join(process.cwd(), 'outputs');
      await fs.mkdir(outDir, { recursive: true });
      await fs.appendFile(path.join(outDir, 'waitlist-signups.jsonl'), JSON.stringify(record) + '\n', 'utf8');
    } catch (err) {
      console.error('[waitlist] fallback write failed', err);
    }
  } else {
    console.log('[waitlist] signup', JSON.stringify(record));
  }

  return NextResponse.json({ ok: true });
}

export const runtime = 'nodejs';
