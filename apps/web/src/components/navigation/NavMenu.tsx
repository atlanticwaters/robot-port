import Link from "next/link";

interface NavLink {
  label: string;
  href: string;
}

interface NavMenuProps {
  links: NavLink[];
}

export function NavMenu({ links }: NavMenuProps) {
  return (
    <nav aria-label="Primary">
      <ul className="flex items-center gap-4 text-sm font-medium text-muted">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="relative inline-flex items-center gap-1 rounded-full px-3 py-1.5 transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
