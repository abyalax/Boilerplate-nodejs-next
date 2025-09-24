import { defaultShouldDehydrateQuery, isServer, MutationCache, QueryClient, QueryClientConfig } from '@tanstack/react-query';

let browserQueryClient: QueryClient | undefined;

const makeQueryClient = (config?: QueryClientConfig) =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
      dehydrate: {
        // include pending queries in dehydration
        shouldDehydrateQuery: (query) => defaultShouldDehydrateQuery(query),
      },
    },
    mutationCache: new MutationCache({
      onSuccess: (_data, _variables, _context, mutation) => {
        if (mutation.meta?.invalidateQueries) {
          console.log('invalidateQueries: ', mutation.meta.invalidateQueries);
          browserQueryClient?.invalidateQueries({
            queryKey: mutation.meta.invalidateQueries,
          });
        }
      },
    }),
    ...config,
  });

export const getQueryClient = (config?: QueryClientConfig) => {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient(config);
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
};
