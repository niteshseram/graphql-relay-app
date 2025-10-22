import type { Metadata } from 'next';
import RelayProvider from '~/components/relay/RelayProvider';
import { ThemeProvider } from '~/components/themes-provider';
import './globals.css';

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
    <html lang="en" suppressHydrationWarning>
      <RelayProvider>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </RelayProvider>
    </html>
  );
}
