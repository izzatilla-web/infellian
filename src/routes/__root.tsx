import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import "../styles.css";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>

        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Page not found
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.error(error);

  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back
          home.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>

          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
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
        title: "Infellian — Creative Digital Agency",
      },
      {
        name: "description",
        content:
          "Infellian is a creative digital agency building brands, websites and digital products.",
      },
      {
        name: "author",
        content: "Infellian",
      },
      {
        name: "robots",
        content: "index, follow",
      },

      // Open Graph
      {
        property: "og:title",
        content: "Infellian — Creative Digital Agency",
      },
      {
        property: "og:description",
        content:
          "Infellian is a creative digital agency building brands, websites and digital products.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:url",
        content: "https://infellian.com/",
      },
      {
        property: "og:site_name",
        content: "Infellian",
      },
      {
        property: "og:image",
        content: "https://infellian.com/logo.png",
      },
      {
        property: "og:image:alt",
        content: "Infellian logo",
      },
      {
        property: "og:locale",
        content: "en_US",
      },

      // Twitter / X
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: "Infellian — Creative Digital Agency",
      },
      {
        name: "twitter:description",
        content:
          "Infellian is a creative digital agency building brands, websites and digital products.",
      },
      {
        name: "twitter:image",
        content: "https://infellian.com/logo.png",
      },
      {
        name: "twitter:image:alt",
        content: "Infellian logo",
      },
      {
        name: "twitter:site",
        content: "@infellian",
      },

      // Theme
      {
        name: "theme-color",
        content: "#ffffff",
      },
    ],

    links: [
      {
        rel: "canonical",
        href: "https://infellian.com/",
      },

      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },

      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },

      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Anton&family=Poppins:wght@300;400;500;600&family=Oswald:wght@400;500;600&family=Manrope:wght@300;400;500;600&display=swap",
      },

      {
        rel: "icon",
        href: "/favicon.ico",
        type: "image/x-icon",
      },

      {
        rel: "apple-touch-icon",
        href: "/logo.png",
      },
    ],

    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://infellian.com/#organization",

              name: "Infellian",

              url: "https://infellian.com/",

              description:
                "Infellian is a creative digital agency building brands, websites and digital products.",

              logo: {
                "@type": "ImageObject",
                "@id": "https://infellian.com/#logo",
                url: "https://infellian.com/logo.png",
                contentUrl: "https://infellian.com/logo.png",
              },

              foundingDate: "2023",

              founder: {
                "@id": "https://infellian.com/#founder",
              },

              telephone: "+998974249484",

              email: "infellian@gmail.com",

              address: {
                "@type": "PostalAddress",
                addressLocality: "Tashkent",
                addressCountry: "UZ",
              },

              sameAs: [
                "https://www.instagram.com/infellian",
                "https://t.me/infellian",
              ],

              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                telephone: "+998974249484",
                email: "infellian@gmail.com",
                availableLanguage: ["English", "Uzbek", "Russian"],
              },
            },

            {
              "@type": "Person",
              "@id": "https://infellian.com/#founder",

              name: "Izzatilla Fayzullayev",

              jobTitle: "Founder",

              worksFor: {
                "@id": "https://infellian.com/#organization",
              },
            },

            {
              "@type": "WebSite",
              "@id": "https://infellian.com/#website",

              name: "Infellian",

              url: "https://infellian.com/",

              description:
                "Infellian is a creative digital agency building brands, websites and digital products.",

              publisher: {
                "@id": "https://infellian.com/#organization",
              },

              inLanguage: "en",
            },

            {
              "@type": "WebPage",
              "@id": "https://infellian.com/#webpage",

              url: "https://infellian.com/",

              name: "Infellian — Creative Digital Agency",

              description:
                "Infellian is a creative digital agency building brands, websites and digital products.",

              isPartOf: {
                "@id": "https://infellian.com/#website",
              },

              about: {
                "@id": "https://infellian.com/#organization",
              },

              publisher: {
                "@id": "https://infellian.com/#organization",
              },

              mainEntity: {
                "@id": "https://infellian.com/#organization",
              },

              inLanguage: "en",
            },
          ],
        }),
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>

      <body suppressHydrationWarning>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster />
    </QueryClientProvider>
  );
}