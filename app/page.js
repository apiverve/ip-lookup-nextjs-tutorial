'use client';

import { useState } from 'react';
import styles from './page.module.css';

/**
 * IP Lookup App - Tutorial Example
 *
 * A simple Next.js app using the APIVerve IP Lookup API.
 * https://apiverve.com/marketplace/iplookup
 */

export default function Home() {
  const [ip, setIp] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const lookupIP = async (e) => {
    e.preventDefault();

    if (!ip.trim()) {
      setError('Please enter an IP address');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch(`/api/lookup?ip=${encodeURIComponent(ip)}`);
      const data = await response.json();

      if (data.success) {
        setResult(data.data);
      } else {
        setError(data.error || 'Lookup failed');
      }
    } catch (err) {
      setError('Failed to lookup IP address');
      console.error('Lookup Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>IP Lookup</h1>
        <p className={styles.subtitle}>Get location data from any IP address</p>

        <form onSubmit={lookupIP} className={styles.form}>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder="Enter IP address (e.g., 8.8.8.8)"
            className={styles.input}
          />
          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? 'Looking up...' : 'Lookup IP'}
          </button>
        </form>

        {error && <div className={styles.error}>{error}</div>}

        {result && (
          <div className={styles.result}>
            <div className={styles.location}>
              <span className={styles.city}>{result.city || 'Unknown'}</span>
              <span className={styles.region}>
                {[result.region, result.country].filter(Boolean).join(', ')}
              </span>
            </div>

            <div className={styles.details}>
              <div className={styles.detail}>
                <span className={styles.label}>IP Address</span>
                <span className={styles.value}>{result.ip}</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.label}>Country</span>
                <span className={styles.value}>{result.country || 'N/A'}</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.label}>Region</span>
                <span className={styles.value}>{result.region || 'N/A'}</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.label}>City</span>
                <span className={styles.value}>{result.city || 'N/A'}</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.label}>Timezone</span>
                <span className={styles.value}>{result.timezone || 'N/A'}</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.label}>Coordinates</span>
                <span className={styles.value}>
                  {result.coordinates
                    ? `${result.coordinates[0]}, ${result.coordinates[1]}`
                    : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
