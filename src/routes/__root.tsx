import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { ClientThemeProvider } from "@wrksz/themes/client";
import { ThemeScript } from "@wrksz/themes/script";

import { AriaRouterProvider } from "@/components/aria-router-provider";
import { ErrorBoundary } from "@/components/error-boundary";
import { Footer } from "@/components/footer";
import { Main } from "@/components/main";
import { Nav } from "@/components/nav";
import { NotFound } from "@/components/not-found";
import { themeConfig } from "@/lib/theme";
import appCss from "../globals.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Vite+ Starter",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/favicon-light.svg",
        media: "(prefers-color-scheme: light)",
      },
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/favicon-dark.svg",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  }),
  notFoundComponent: NotFound,
  errorComponent: ErrorBoundary,
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Must be in <head> so the theme applies before first paint */}
        <ThemeScript {...themeConfig} />
        <HeadContent />
      </head>
      <body>
        <ClientThemeProvider {...themeConfig}>
          <AriaRouterProvider>
            <Nav />
            <Main>{children}</Main>
            <Footer />
          </AriaRouterProvider>
        </ClientThemeProvider>
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
