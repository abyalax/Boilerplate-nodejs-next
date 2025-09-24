'use client';

import { DehydratedState, HydrationBoundary } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { FC, PropsWithChildren } from 'react';
import { QueryClientProvider } from '~/components/provider/query-client';
import { ThemeProvider } from '~/components/provider/theme';
import { Toaster } from '../ui/toaster';

interface ProviderProps extends PropsWithChildren {
  dehydratedState?: DehydratedState | null;
}

export const Providers: FC<ProviderProps> = ({ children, dehydratedState }) => {
  return (
    <SessionProvider>
      <ThemeProvider>
        <Toaster />
        <QueryClientProvider>
          <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
        </QueryClientProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};
