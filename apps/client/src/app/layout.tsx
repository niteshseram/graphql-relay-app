import './globals.css';
import type { Metadata } from 'next';
import RelayProvider from '~/components/relay/RelayProvider';

export const metadata: Metadata = {
  description: 'Minimal, fast, sensible defaults.',
  title: 'App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta content="#fff" name="theme-color" />
      </head>
      <RelayProvider>
        <body>{children}</body>
      </RelayProvider>
    </html>
  );
}
