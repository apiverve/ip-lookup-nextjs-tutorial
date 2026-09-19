/**
 * IP Lookup API Route
 *
 * Looks up where an IP address is. With no ?ip=, it looks up the visitor's own IP.
 * The API key stays on the server: the browser only ever talks to this route.
 *
 * IP Lookup: https://apiverve.com/marketplace/iplookup
 */

import { NextResponse } from 'next/server';
import { isIP } from 'node:net';

// Set APIVERVE_API_KEY in .env.local (local) or your host's environment variables.
// Get a free key at https://dashboard.apiverve.com
const API_KEY = process.env.APIVERVE_API_KEY;
const API_URL = 'https://api.apiverve.com/v1/iplookup';

// ============================================
// Rate limit
// Once deployed, anyone who finds this URL can call it with YOUR key.
// This caps each visitor at RATE_LIMIT requests per minute. It is kept in
// memory, so it resets on cold starts and isn't shared between instances:
// good enough for a demo. For production, use a shared store (e.g. Upstash
// Redis) or put the page behind your own auth.
// ============================================
const RATE_LIMIT = 10;
const WINDOW_MS = 60_000;
const hits = new Map();

// Loopback and private ranges have no location. Locally, "your IP" is one of these.
const PRIVATE = /^(127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|169\.254\.|::1$|::ffff:127\.|f[cd][0-9a-f]{2}:|fe80:)/i;

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT;
}

export async function GET(request) {
  if (!API_KEY) {
    return NextResponse.json(
      { error: 'Missing APIVERVE_API_KEY. Add it to .env.local, or to your host’s environment variables, then restart.' },
      { status: 500 }
    );
  }

  const visitor = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim();
  if (rateLimited(visitor || 'local')) {
    return NextResponse.json({ error: 'Too many requests. Wait a minute and try again.' }, { status: 429 });
  }

  const asked = (new URL(request.url).searchParams.get('ip') || '').trim().slice(0, 45);
  const ip = asked || visitor;

  if (!ip || !isIP(ip)) {
    return NextResponse.json(
      { error: asked ? 'That isn’t a valid IPv4 or IPv6 address.' : 'Couldn’t detect your IP here. Enter one instead.' },
      { status: 400 }
    );
  }

  if (PRIVATE.test(ip)) {
    return NextResponse.json(
      { error: asked ? 'That’s a private network address, so it has no location.' : 'You’re on a local address, which has no location. Deploy the app to look up your real IP, or enter one.' },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(`${API_URL}?ip=${encodeURIComponent(ip)}`, {
      headers: { 'x-api-key': API_KEY },
      cache: 'no-store'
    });
    const body = await res.json().catch(() => null);
    if (!res.ok || body?.status !== 'ok') {
      return NextResponse.json({ error: body?.error || `APIVerve returned ${res.status}` }, { status: 502 });
    }
    return NextResponse.json({ ...body.data, isYou: !asked });
  } catch {
    return NextResponse.json({ error: 'Couldn’t reach APIVerve. Try again.' }, { status: 502 });
  }
}
