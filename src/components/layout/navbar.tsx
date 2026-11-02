// src/components/layout/navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Download } from "lucide-react";
import { useState } from "react";
import { NAV_LINKS, SITE, TOOLS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { LocaleToggle } from "@/components/shared/locale-toggle";
import { useDict } from "@/components/shared/locale-provider";
import { ToolsDropdown } from "./tools-dropdown";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dict = useDict();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight hover:opacity-80 transition-opacity"
        >
          {SITE.domain}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm transition-colors",
                  active
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {dict.nav[link.label.toLowerCase() as keyof typeof dict.nav] ??
                  link.label}
              </Link>
            );
          })}

          {/* Dropdown Tools — desktop */}
          <ToolsDropdown />
        </nav>

        <div className="flex items-center gap-1">
          <LocaleToggle />

          <a
            href={SITE.cvUrl}
            download="CV-Adryan.pdf"
            className="hidden items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted md:inline-flex"
          >
            <Download className="h-3.5 w-3.5" />
            {dict.nav.cv}
          </a>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border/60 md:hidden animate-fade-in">
          <nav className="mx-auto flex max-w-5xl flex-col gap-1 px-6 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                {dict.nav[link.label.toLowerCase() as keyof typeof dict.nav] ??
                  link.label}
              </Link>
            ))}

            {/* Tools group — mobile */}
            <div className="mt-2 border-t border-border/60 pt-2">
              <p className="px-3 pb-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {dict.nav.tools}
              </p>
              {TOOLS.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  {tool.label}
                </Link>
              ))}
            </div>

            <a
              href={SITE.cvUrl}
              download="CV-Adryan.pdf"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              {dict.common.downloadCv}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}