import './globals.css';

export const metadata = {
  title: 'IP Lookup | APIVerve Tutorial',
  description: 'Get location data from any IP address using APIVerve',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
