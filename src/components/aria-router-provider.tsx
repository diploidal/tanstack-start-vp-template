import { useRouter } from "@tanstack/react-router";
import type { NavigateOptions, ToOptions } from "@tanstack/react-router";
import { RouterProvider } from "react-aria-components";

declare module "react-aria-components" {
  interface RouterConfig {
    href: ToOptions["to"];
    routerOptions: Omit<NavigateOptions, keyof ToOptions>;
  }
}

// Makes React Aria links (e.g. LinkButton) navigate client-side through TanStack Router
export function AriaRouterProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <RouterProvider
      navigate={(to, options) => router.navigate({ ...options, to })}
      useHref={(to) => router.buildLocation({ to }).href}
    >
      {children}
    </RouterProvider>
  );
}
