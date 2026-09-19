# IP Lookup | APIVerve Template

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000)](package.json)
[![React](https://img.shields.io/badge/React-19-61dafb)](package.json)
[![APIVerve | IP Lookup](https://img.shields.io/badge/APIVerve-IP_Lookup-purple)](https://apiverve.com/marketplace/iplookup?utm_source=github&utm_medium=template&utm_campaign=ip-lookup-nextjs-tutorial)

Find where an IP address is. Enter any IPv4 or IPv6 address, or look up your visitor's own, and get the city, region, country, postcode, local time, network provider and a map link.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fapiverve%2Fip-lookup-nextjs-tutorial&project-name=ip-lookup&repository-name=ip-lookup&env=APIVERVE_API_KEY&envDescription=Your%20APIVerve%20API%20key.%20Free%20to%20create%2C%20no%20card%20needed.&envLink=https%3A%2F%2Fdashboard.apiverve.com%2Fsignup%3Fapi%3Diplookup%26utm_source%3Dvercel%26utm_medium%3Dtemplate%26utm_campaign%3Dip-lookup-nextjs-tutorial)

![IP Lookup showing Montreal, Quebec for 24.48.0.1](https://raw.githubusercontent.com/apiverve/ip-lookup-nextjs-tutorial/main/screenshot.png)

---

### Get your free API key

This template needs an APIVerve API key. **[Sign up free](https://dashboard.apiverve.com/signup?api=iplookup&utm_source=github&utm_medium=template&utm_campaign=ip-lookup-nextjs-tutorial)**, no credit card required.

---

## Deploy in one click

Click **Deploy with Vercel** above. Vercel copies this repo to your GitHub account, asks for your `APIVERVE_API_KEY`, and gives you a live URL about a minute later. Once it's deployed, **Use my IP** looks up whoever opens the page.

## Run it locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/apiverve/ip-lookup-nextjs-tutorial.git
   cd ip-lookup-nextjs-tutorial
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add your API key**
   ```bash
   cp .env.example .env.local
   ```
   Then open `.env.local` and set `APIVERVE_API_KEY`.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open** `http://localhost:3000` and try `8.8.8.8`

Locally, **Use my IP** tells you you're on a local address: `localhost` has no location. It works once the app is deployed.

## How it works

1. The page calls `/api/lookup?ip=…`, or `/api/lookup` with no IP to look up the visitor.
2. That route checks the address, then calls IP Lookup. Your API key stays on the server and never reaches the browser.
3. With no IP given, the route uses the visitor's address from the `x-forwarded-for` header that Vercel sets.

```
app/
├── api/lookup/route.js   # Validates the IP, calls APIVerve
├── page.js               # The form and the results
├── page.module.css       # Styles
├── layout.js
└── globals.css
```

### The API call

```javascript
const res = await fetch(
  `https://api.apiverve.com/v1/iplookup?ip=${encodeURIComponent(ip)}`,
  { headers: { 'x-api-key': process.env.APIVERVE_API_KEY } }
);
const { data } = await res.json();
// data.city, data.regionName, data.countryName, data.timezone, data.coordinates, data.asnName …
```

## What you get back

| Field | Example |
|-------|---------|
| `city`, `regionName`, `countryName` | Montreal, Quebec, Canada |
| `country`, `region`, `continent` | CA, QC, NA |
| `postalCode` | H1K |
| `timezone` | America/Toronto |
| `coordinates`, `accuracyRadius` | [45.6085, -73.5493], 5 km |
| `asn`, `asnName` | AS5769, VIDEOTRON |
| `isEU` | false |

City-level location is an estimate. `accuracyRadius` tells you how far off it might be.

## Before you share your URL

Once deployed, anyone who finds your URL can run lookups on your API key. The route allows 10 requests per minute per visitor, which is fine for a demo. The limit is kept in memory, so it isn't shared between serverless instances. For production:

- Put the page behind your own sign-in, or
- Move the limit to a shared store such as [Upstash Redis](https://upstash.com/), or
- Call the lookup only from your own backend, for example when someone signs up.

## Ideas to extend it

- Pre-fill the country and currency on your checkout
- Show prices and times in the visitor's timezone
- Flag signups whose IP country doesn't match their billing country
- Add [VPN & Proxy Detector](https://apiverve.com/marketplace/vpndetector?utm_source=github&utm_medium=template&utm_campaign=ip-lookup-nextjs-tutorial) to spot visitors hiding their location

## API reference

- [IP Lookup](https://apiverve.com/marketplace/iplookup?utm_source=github&utm_medium=template&utm_campaign=ip-lookup-nextjs-tutorial): `GET https://api.apiverve.com/v1/iplookup?ip=`
- [Full documentation](https://docs.apiverve.com?utm_source=github&utm_medium=template&utm_campaign=ip-lookup-nextjs-tutorial)

## Tech stack

- **Next.js 16** (App Router, route handlers)
- **React 19**
- **CSS Modules**

## License

MIT. See [LICENSE](LICENSE).
