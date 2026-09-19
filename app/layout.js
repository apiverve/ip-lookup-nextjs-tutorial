import './globals.css';

export const metadata = {
  title: 'IP Lookup',
  description: 'Find where an IP address is: city, timezone and network. Built with APIVerve.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
