import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 3, // 3 minutes cache fresh
      gcTime: 1000 * 60 * 15,    // 15 minutes garbage collection
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        // Do not retry on client 4xx errors
        if (error instanceof Error && error.message.includes("404")) return false;
        return failureCount < 2;
      },
    },
    mutations: {
      retry: 1,
    },
  },
});
