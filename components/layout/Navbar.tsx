"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/risk-engine", label: "Risk Engine" },
  { href: "/backfill", label: "Backfill" },
  { href: "/compliance", label: "Compliance" },
  { href: "/roadmap", label: "Roadmap" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname?.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-[hsl(var(--border))] bg-white/85 backdrop-blur dark:bg-[#0f131a]/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-[#003087] dark:text-[#7fb6ff]"
          aria-label="ClearSlot home"
        >
          <span aria-hidden className="text-lg">
            🏥
          </span>
          <span>ClearSlot</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm font-semibold text-[hsl(var(--foreground))] hover:text-[#005EB8] dark:hover:text-[#7fb6ff] transition-colors",
                isActive(l.href) && "text-[#005EB8] dark:text-[#7fb6ff] underline underline-offset-8",
              )}
              aria-label={l.label}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-4 w-4 dark:hidden" />
            <Moon className="hidden h-4 w-4 dark:block" />
          </Button> */}
          <a
            href="https://github.com/mshahzaib7/clearslot-nhs"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub repository"
            className="hidden md:inline-flex"
          >
            <Button variant="ghost" size="icon" aria-label="Open GitHub">
              <GitHubIcon className="h-4 w-4" />
            </Button>
          </a>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Open menu"
            onClick={() => setMobileOpen((s) => !s)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="border-t border-[hsl(var(--border))] bg-white dark:bg-[#0f131a] md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-3">
            <div className="flex flex-col gap-2">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-semibold hover:bg-[hsl(var(--muted))]",
                    isActive(l.href) && "bg-[hsl(var(--muted))] text-[#005EB8] dark:text-[#7fb6ff]",
                  )}
                  aria-label={l.label}
                >
                  {l.label}
                </Link>
              ))}
              <a
                href="https://github.com/mshahzaib7/clearslot-nhs"
                target="_blank"
                rel="noreferrer"
                className="rounded-md px-3 py-2 text-sm font-semibold hover:bg-[hsl(var(--muted))]"
                aria-label="GitHub repository"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.48 0-.24-.01-.86-.01-1.69-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.58 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.37-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.38-2.04 1.01-2.76-.1-.26-.44-1.32.1-2.75 0 0 .83-.27 2.72 1.05A9.2 9.2 0 0 1 12 7.07c.85 0 1.71.12 2.51.35 1.88-1.32 2.71-1.05 2.71-1.05.55 1.43.21 2.49.1 2.75.63.72 1.01 1.64 1.01 2.76 0 3.95-2.34 4.82-4.57 5.07.36.32.68.95.68 1.92 0 1.38-.01 2.5-.01 2.84 0 .27.18.59.69.48A10.05 10.05 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

