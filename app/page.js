'use client';

import { useState } from 'react';
import styles from './page.module.css';

/**
 * IP Lookup, an APIVerve template.
 * https://apiverve.com/marketplace/iplookup
 */

function localTime(timezone) {
  try {
    return new Intl.DateTimeFormat('en-US', { timeZone: timezone, hour: 'numeric', minute: '2-digit' }).format(new Date());
  } catch {
    return null;
  }
}

export default function Home() {
  const [ip, setIp] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const lookup = async (target) => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch(`/api/lookup${target ? `?ip=${encodeURIComponent(target)}` : ''}`);
      const data = await res.json();
      if (res.ok) setResult(data);
      else setError(data.error || 'Lookup failed');
    } catch {
      setError('Couldn’t reach the server. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!ip.trim()) return setError('Enter an IP address, or use yours.');
    lookup(ip.trim());
  };

  const rows = result && [
    ['IP address', result.ip],
    ['Country', result.countryName ? `${result.countryName} (${result.country})` : result.country],
    ['Region', result.regionName || result.region],
    ['City', result.city],
    ['Postal code', result.postalCode],
    ['Timezone', result.timezone && `${result.timezone}${localTime(result.timezone) ? ` · ${localTime(result.timezone)}` : ''}`],
    ['Network', result.asnName ? `${result.asnName} (${result.asn})` : result.asn],
    ['In the EU', result.isEU == null ? null : result.isEU ? 'Yes' : 'No'],
  ];

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>IP Lookup</h1>
        <p className={styles.subtitle}>Find where an IP address is: city, timezone and network.</p>

        <form onSubmit={onSubmit} className={styles.form}>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder="IPv4 or IPv6, e.g. 8.8.8.8"
            className={styles.input}
            maxLength={45}
          />
          <div className={styles.actions}>
            <button type="submit" disabled={loading} className={styles.button}>
              {loading ? 'Looking up…' : 'Look up'}
            </button>
            <button type="button" disabled={loading} className={styles.secondary} onClick={() => { setIp(''); lookup(''); }}>
              Use my IP
            </button>
          </div>
        </form>

        {error && <div className={styles.error}>{error}</div>}

        {result && (
          <div className={styles.result}>
            <div className={styles.location}>
              {result.isYou && <span className={styles.you}>Your IP</span>}
              <span className={styles.city}>{result.city || result.regionName || result.countryName || 'Unknown'}</span>
              <span className={styles.region}>
                {[result.regionName, result.countryName].filter((x) => x && x !== result.city).join(', ')}
              </span>
            </div>

            <div className={styles.details}>
              {rows.filter(([, v]) => v).map(([label, value]) => (
                <div className={styles.detail} key={label}>
                  <span className={styles.label}>{label}</span>
                  <span className={styles.value}>{value}</span>
                </div>
              ))}
            </div>

            {result.coordinates && (
              <a
                className={styles.map}
                href={`https://www.openstreetmap.org/?mlat=${result.coordinates[0]}&mlon=${result.coordinates[1]}#map=11/${result.coordinates[0]}/${result.coordinates[1]}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {result.coordinates[0]}, {result.coordinates[1]}
                {result.accuracyRadius ? ` · within ${result.accuracyRadius} km` : ''} · View on map ↗
              </a>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
