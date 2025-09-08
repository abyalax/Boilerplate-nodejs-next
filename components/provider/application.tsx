'use client';

import { QueryClientProvider } from '~/components/provider/query-client';
import { ThemeProvider } from '~/components/provider/theme';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from '../ui/toaster';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <Toaster />
        <QueryClientProvider>{children}</QueryClientProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
