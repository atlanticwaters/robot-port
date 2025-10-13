import type { Metadata } from "next";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/lib/prismic";
import { loadSettings, loadNavigation } from "@/lib/api";
import { SiteHeader } from "@/components/layout/partials/SiteHeader";
import { SiteFooter } from "@/components/layout/partials/SiteFooter";
import "@/styles/globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await loadSettings();

  return {
    title: {
      template: `%s | ${settings?.data.site_title ?? "Robot Portfolio"}`,
      default: settings?.data.site_title ?? "Robot Portfolio",
    },
    description:
      settings?.data.site_description ??
      "A portfolio showcasing projects, case studies, and writings",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, navigation] = await Promise.all([
    loadSettings(),
    loadNavigation(),
  ]);

  const themeVars = settings
    ? {
        "--color-primary": settings.data.primary_color ?? "#0b1120",
        "--color-secondary": settings.data.secondary_color ?? "#1f2937",
        "--color-accent": settings.data.accent_color ?? "#f97316",
        "--font-primary":
          settings.data.typeface_primary ?? "Space Grotesk, Inter, sans-serif",
        "--font-secondary":
          settings.data.typeface_secondary ?? "Fraunces, Georgia, serif",
      }
    : {};

  return (
    <html lang="en" className="min-h-full bg-background text-foreground antialiased">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <link rel="icon" href="/favicon/favicon.svg" type="image/svg+xml" />
      </head>
      <body
        className="flex min-h-screen flex-col"
        style={themeVars as React.CSSProperties}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
        >
          Skip to content
        </a>
        <SiteHeader navigation={navigation} settings={settings} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter navigation={navigation} settings={settings} />
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
