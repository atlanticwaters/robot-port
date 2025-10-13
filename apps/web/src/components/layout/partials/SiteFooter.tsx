import type {
  NavigationDocument,
  SettingsDocument,
} from "@/lib/prismic-schemas";
import { resolveLinkURL, pickLabel } from "@/utils/prismic";

interface SiteFooterProps {
  navigation?: NavigationDocument | null;
  settings?: SettingsDocument | null;
}

export function SiteFooter({ navigation, settings }: SiteFooterProps) {
  const year = new Date().getFullYear();

  const footerGroups = (navigation?.data.footer_navigation ?? []).reduce(
    (acc, item) => {
      const section = item.section_label ?? "Explore";
      const link = resolveLinkURL(item.link as any);
      if (!link) return acc;
      if (!acc.has(section))
        acc.set(section, [] as Array<{ label: string; href: string }>);
      acc.get(section)?.push({ label: pickLabel(item.label, "Link"), href: link });
      return acc;
    },
    new Map<string, Array<{ label: string; href: string }>>()
  );

  const socialLinks = (
    navigation?.data.social_links ??
    settings?.data.social_links ??
    []
  ).map((item: any) => ({
    label: pickLabel(item.label, "Social"),
    href: resolveLinkURL((item.link ?? item.url) as any) ?? "#",
  }));

  const siteTagline =
    settings?.data.tagline ??
    "Partnering with teams to build expressive, performant digital experiences across product and brand.";
  const siteName = settings?.data.site_title ?? "Alex Waters";

  return (
    <footer className="border-t border-border/60 bg-background/70">
      <div className="container grid gap-10 py-12 md:grid-cols-[1.3fr,1fr] md:items-end">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.25em] text-muted/80">
            {siteName}
          </p>
          <p className="max-w-xl text-sm text-muted">{siteTagline}</p>
        </div>
        <div className="flex flex-col gap-6 md:items-end">
          <div className="grid gap-6 text-sm md:grid-cols-2 md:text-right">
            {Array.from(footerGroups.entries()).map(([section, links]) => (
              <div key={section}>
                <p className="text-xs uppercase tracking-[0.25em] text-muted/80">
                  {section}
                </p>
                <ul className="mt-3 space-y-2">
                  {links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <ul className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.35em] text-muted">
            {socialLinks.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted/80">
            © {year} {siteName}. Crafted with Next.js &amp; Prismic.
          </p>
        </div>
      </div>
    </footer>
  );
}
