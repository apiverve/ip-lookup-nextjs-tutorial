import { NextResponse } from 'next/server';

/**
 * API Route: /api/lookup
 *
 * Proxies requests to the APIVerve IP Lookup API.
 * This keeps your API key secure on the server side.
 */

// ============================================
// CONFIGURATION - Add your API key here
// Get a free key at: https://dashboard.apiverve.com
// ============================================
const API_KEY = 'your-api-key-here';
const API_URL = 'https://api.apiverve.com/v1/iplookup';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const ip = searchParams.get('ip');

  // Validate input
  if (!ip) {
    return NextResponse.json(
      { success: false, error: 'IP address is required' },
      { status: 400 }
    );
  }

  // Check API key
  if (API_KEY === 'your-api-key-here') {
    return NextResponse.json(
      { success: false, error: 'API key not configured. Add your key to app/api/lookup/route.js' },
      { status: 500 }
    );
  }

  try {
    // Call the APIVerve IP Lookup API
    const response = await fetch(`${API_URL}?ip=${encodeURIComponent(ip)}`, {
      method: 'GET',
      headers: {
        'x-api-key': API_KEY
      }
    });

    const data = await response.json();

    if (data.status === 'ok') {
      return NextResponse.json({
        success: true,
        data: data.data
      });
    } else {
      return NextResponse.json(
        { success: false, error: data.error || 'Lookup failed' },
        { status: 400 }
      );
    }
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to lookup IP address' },
      { status: 500 }
    );
  }
}
