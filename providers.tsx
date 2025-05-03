// providers.tsx
'use client';

import { ReactNode } from 'react';
import { ClerkProvider } from '@clerk/nextjs';  // Clerk provides its own context
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FiltersProvider } from '@/context/FiltersContext';

const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <FiltersProvider>
          {children}
        </FiltersProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
