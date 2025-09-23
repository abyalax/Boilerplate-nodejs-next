"use client";

import {
  MutationCache,
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useRef } from "react";

export function QueryClientProvider({ children }: { children: ReactNode }) {
  const mutationCache = new MutationCache({
    onSuccess: (_data, _variables, _context, mutation) => {
      if (mutation.meta?.invalidateQueries) {
        console.log("[DEBUG] mutation onSuccess:", mutation.meta);
        queryClient.invalidateQueries({
          queryKey: mutation.meta.invalidateQueries,
        });
      }
    },
  });

  const queryClient = new QueryClient({ mutationCache });
  const refQueryClient = useRef(queryClient);

  return (
    <ReactQueryClientProvider client={refQueryClient.current}>
      {children}
      <ReactQueryDevtools position="left" />
    </ReactQueryClientProvider>
  );
}
