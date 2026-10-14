import { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  // Created per request: a module-level client would share cached data between users on the server
  const queryClient = new QueryClient({
    defaultOptions: {
      // Avoids refetching on the client right after SSR hydration
      queries: { staleTime: 60_000 },
    },
  });

  const router = createTanStackRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreload: "intent",
    // Loaders always run; Query's staleTime decides what is refetched
    defaultPreloadStaleTime: 0,
  });

  setupRouterSsrQueryIntegration({ router, queryClient });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
