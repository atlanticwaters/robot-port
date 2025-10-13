import ThemeToggle from "@/components/ui/ThemeToggle";
import { NavMenu } from "@/components/navigation/NavMenu";
import type { NavigationDocument, SettingsDocument } from "@/lib/prismic-schemas";
import { resolveLinkURL, pickLabel } from "@/utils/prismic";
import Link from "next/link";

interface SiteHeaderProps {
  navigation?: NavigationDocument | null;
  settings?: SettingsDocument | null;
}

export function SiteHeader({ navigation, settings }: SiteHeaderProps) {
  const navLinks = (navigation?.data.primary_navigation ?? []).map((item) => ({
    label: pickLabel(item.label, "Page"),
    href: resolveLinkURL(item.link as any) ?? "#",
  }));

  const studioName = settings?.data.site_title ?? "Alex Waters";
  const primaryCta = navigation?.data.secondary_navigation?.[0];
  const primaryCtaHref = resolveLinkURL(primaryCta?.link as any);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted transition-colors hover:text-foreground"
        >
          {studioName}
        </Link>
        <div className="flex items-center gap-3">
          <NavMenu
            links={
              navLinks.length
                ? navLinks
                : [
                    { label: "Work", href: "/projects" },
                    { label: "About", href: "/about" },
                    { label: "Case Studies", href: "/case-study" },
                    { label: "Writing", href: "/blog" },
                  ]
            }
          />
          {primaryCtaHref ? (
            <a
              href={primaryCtaHref}
              className="hidden rounded-full border border-border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-muted transition hover:border-foreground hover:text-foreground md:inline-flex"
            >
              {pickLabel(primaryCta?.label, "Connect")}
            </a>
          ) : null}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
