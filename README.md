# IP Lookup App | APIVerve API Tutorial

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Build](https://img.shields.io/badge/Build-Passing-brightgreen.svg)]()
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-18-61dafb)](https://react.dev)
[![APIVerve | IP Lookup](https://img.shields.io/badge/APIVerve-IP_Lookup-purple)](https://apiverve.com/marketplace/iplookup?utm_source=github&utm_medium=tutorial&utm_campaign=ip-lookup-nextjs-tutorial)

A modern IP geolocation app built with Next.js 14. Enter any IP address and get instant location data including city, country, timezone, and coordinates.

![Screenshot](https://raw.githubusercontent.com/apiverve/ip-lookup-nextjs-tutorial/main/screenshot.jpg)

---

### Get Your Free API Key

This tutorial requires an APIVerve API key. **[Sign up free](https://dashboard.apiverve.com?utm_source=github&utm_medium=tutorial&utm_campaign=ip-lookup-nextjs-tutorial)** - no credit card required.

---

## Features

- Instant IP geolocation lookups
- City, region, country, and timezone data
- Latitude/longitude coordinates
- Server-side API key protection (Route Handlers)
- Modern Next.js 14 App Router
- Clean, responsive UI

## Quick Start

1. **Clone this repository**
   ```bash
   git clone https://github.com/apiverve/ip-lookup-nextjs-tutorial.git
   cd ip-lookup-nextjs-tutorial
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add your API key**

   Open `app/api/lookup/route.js` and replace the placeholder with your API key:
   ```javascript
   const API_KEY = 'your-api-key-here';
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**

   Visit http://localhost:3000 and try looking up `8.8.8.8` (Google DNS)!

## Project Structure

```
ip-lookup-nextjs-tutorial/
├── app/
│   ├── api/
│   │   └── lookup/
│   │       └── route.js    # API route (server-side)
│   ├── page.js             # Main page component
│   ├── page.module.css     # Page styles
│   ├── layout.js           # Root layout
│   └── globals.css         # Global styles
├── package.json            # Dependencies
├── next.config.js          # Next.js config
├── screenshot.jpg          # Preview image
├── LICENSE                 # MIT license
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## How It Works

This tutorial demonstrates Next.js best practices:

1. **Client Component** (`page.js`) - Handles the UI and user input
2. **API Route** (`api/lookup/route.js`) - Proxies requests to APIVerve, keeping your API key secure
3. **Server-side fetch** - The API key never reaches the browser

### Architecture

```
Browser → Next.js API Route → APIVerve API
                ↓
         API key stays
         on the server
```

## API Reference

### Internal API Route

**Endpoint:** `GET /api/lookup`

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ip` | string | Yes | IP address to lookup |

**Example Response:**

```json
{
  "success": true,
  "data": {
    "ip": "8.8.8.8",
    "country": "US",
    "region": "CA",
    "city": "Mountain View",
    "timezone": "America/Los_Angeles",
    "coordinates": [37.3860, -122.0838]
  }
}
```

## Use Cases

IP geolocation is useful for:

- **Analytics** - Understand where your users are located
- **Personalization** - Show local content, currency, or language
- **Security** - Detect suspicious login locations
- **Compliance** - Enforce regional restrictions (GDPR, etc.)
- **Fraud Detection** - Flag mismatched billing/IP locations
- **Load Balancing** - Route to nearest server

## Customization Ideas

- Auto-detect visitor's IP on page load
- Add a map visualization with Leaflet or Google Maps
- Show ISP/ASN information
- Add IP history with localStorage
- Deploy to Vercel with environment variables
- Add rate limiting

## Related APIs

Explore more APIs at [APIVerve](https://apiverve.com/marketplace?utm_source=github&utm_medium=tutorial&utm_campaign=ip-lookup-nextjs-tutorial):

- [IP Blacklist Lookup](https://apiverve.com/marketplace/ipblacklistlookup?utm_source=github&utm_medium=tutorial&utm_campaign=ip-lookup-nextjs-tutorial) - Check if an IP is blacklisted
- [ASN Lookup](https://apiverve.com/marketplace/asnlookup?utm_source=github&utm_medium=tutorial&utm_campaign=ip-lookup-nextjs-tutorial) - Get ASN details for an IP
- [DNS Lookup](https://apiverve.com/marketplace/dnslookup?utm_source=github&utm_medium=tutorial&utm_campaign=ip-lookup-nextjs-tutorial) - Query DNS records

## Deploy to Vercel

1. Push to GitHub
2. Import to [Vercel](https://vercel.com)
3. Add `API_KEY` as an environment variable
4. Deploy!

## License

MIT - see [LICENSE](LICENSE)

## Links

- [Get API Key](https://dashboard.apiverve.com?utm_source=github&utm_medium=tutorial&utm_campaign=ip-lookup-nextjs-tutorial) - Sign up free
- [APIVerve Marketplace](https://apiverve.com/marketplace?utm_source=github&utm_medium=tutorial&utm_campaign=ip-lookup-nextjs-tutorial) - Browse 300+ APIs
- [IP Lookup API](https://apiverve.com/marketplace/iplookup?utm_source=github&utm_medium=tutorial&utm_campaign=ip-lookup-nextjs-tutorial) - API details
