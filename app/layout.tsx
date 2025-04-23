import type { Metadata } from 'next';
import './globals.css';
import Navbar from '../components/Navbar'; // adjust the path if needed

export const metadata: Metadata = {
  title: 'AI Marketing Hub',
  description: 'AI-powered marketing content platform',
  generator: 'v0.dev',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
