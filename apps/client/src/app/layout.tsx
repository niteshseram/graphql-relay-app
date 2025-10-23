import type { Metadata } from 'next';
import RelayProvider from '~/components/relay/relay-provider';
import { ThemeProvider } from '~/components/themes-provider';
import './globals.css';
import { AppSidebar } from '~/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar';
import { cn } from '~/lib/utils';

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
            <div className="min-h-screen flex">
              <SidebarProvider>
                <AppSidebar />
                <main
                  className={cn('flex-1', 'mx-auto max-w-[1400px] px-8 py-6')}
                >
                  {children}
                </main>
              </SidebarProvider>
            </div>
          </ThemeProvider>
        </body>
      </RelayProvider>
    </html>
  );
}
