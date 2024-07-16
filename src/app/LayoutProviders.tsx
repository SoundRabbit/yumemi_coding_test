'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export type LayoutProvidersProps = Readonly<{
  children: React.ReactNode;
}>;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const LayoutProviders = ({ children }: LayoutProvidersProps) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
