import './globals.css';
import type { Metadata } from 'next';

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
      <body>
        {children}
      </body>
    </html>
  );
}
