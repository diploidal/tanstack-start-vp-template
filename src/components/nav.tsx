import { Link } from "@tanstack/react-router";

import { ThemeSelector } from "@/components/theme-selector";

export function Nav() {
  return (
    <header className="flex items-center justify-between border-b px-6 py-4">
      <nav className="flex items-center gap-4">
        <Link to="/" activeProps={{ className: "font-semibold" }}>
          Home
        </Link>
      </nav>
      <ThemeSelector />
    </header>
  );
}
