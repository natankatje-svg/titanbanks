import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ipBucket = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 4;

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

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string;
}

function pickString(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Too many requests. Try again in a minute.' },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  const raw = body as Record<string, unknown>;
  const honeypot = pickString(raw.website);
  if (honeypot.length > 0) {
    // Silently accept — pretend success so bots don't retry.
    return NextResponse.json({ ok: true });
  }

  const payload: ContactPayload = {
    name: pickString(raw.name),
    email: pickString(raw.email).toLowerCase(),
    subject: pickString(raw.subject),
    message: pickString(raw.message),
  };

  if (!payload.name || payload.name.length > 120) {
    return NextResponse.json({ ok: false, error: 'Invalid name.' }, { status: 400 });
  }
  if (!payload.email || payload.email.length > 254 || !EMAIL_RE.test(payload.email)) {
    return NextResponse.json({ ok: false, error: 'Invalid email.' }, { status: 400 });
  }
  if (!payload.subject || payload.subject.length > 160) {
    return NextResponse.json({ ok: false, error: 'Invalid subject.' }, { status: 400 });
  }
  if (payload.message.length < 10 || payload.message.length > 4000) {
    return NextResponse.json({ ok: false, error: 'Invalid message length.' }, { status: 400 });
  }

  const record = {
    ...payload,
    ip,
    userAgent: req.headers.get('user-agent') || '',
    referer: req.headers.get('referer') || '',
    receivedAt: new Date().toISOString(),
    source: 'titan-banks.com/contact',
  };

  // TODO Day 6+: forward to Mailchimp transactional (Mandrill) once user
  // provides API key + audience ID. For now: dev-write to outputs/, prod-log.
  if (process.env.NODE_ENV !== 'production') {
    try {
      const outDir = path.join(process.cwd(), 'outputs');
      await fs.mkdir(outDir, { recursive: true });
      await fs.appendFile(
        path.join(outDir, 'contact-messages.jsonl'),
        JSON.stringify(record) + '\n',
        'utf8',
      );
    } catch (err) {
      console.error('[contact] fallback write failed', err);
    }
  } else {
    console.log('[contact] message', JSON.stringify(record));
  }

  return NextResponse.json({ ok: true });
}

export const runtime = 'nodejs';
