// src/components/layout/navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Download,
  Camera,
  FileText,
  Image as ImageIcon,
  Code,
  QrCode,
  Lock,
  Calculator,
} from "lucide-react";
import { useState } from "react";
import { NAV_LINKS, SITE, TOOLS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { localePath, stripLocaleFromPath } from "@/i18n/locale-path";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { LocaleToggle } from "@/components/shared/locale-toggle";
import { useDict, useLocale } from "@/components/shared/locale-provider";
import { ToolsDropdown } from "./tools-dropdown";

const TOOL_ICONS = {
  camera: Camera,
  fileText: FileText,
  image: ImageIcon,
  code: Code,
  qr: QrCode,
  lock: Lock,
  calculator: Calculator,
} as const;

export function Navbar() {
  const pathname = usePathname();
  const currentPath = stripLocaleFromPath(pathname);
  const [open, setOpen] = useState(false);
  const dict = useDict();
  const { locale } = useLocale();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href={localePath(locale, "/")}
          className="text-sm font-semibold tracking-tight hover:opacity-80 transition-opacity"
        >
          {SITE.domain}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? currentPath === "/"
                : currentPath.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={localePath(locale, link.href)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm transition-colors",
                  active
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {dict.nav[link.labelKey]}
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
            aria-label={dict.aria.toggleMenu}
            aria-expanded={open}
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
                href={localePath(locale, link.href)}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                {dict.nav[link.labelKey]}
              </Link>
            ))}

            {/* Tools group — mobile */}
            <div className="mt-2 border-t border-border/60 pt-3">
              <p className="px-1 pb-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {dict.nav.tools}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {TOOLS.map((tool) => {
                  const Icon =
                    TOOL_ICONS[tool.icon as keyof typeof TOOL_ICONS] ??
                    ImageIcon;
                  const active = currentPath === tool.href;
                  const item = dict.tools.items[tool.key];
                  return (
                    <Link
                      key={tool.href}
                      href={localePath(locale, tool.href)}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex min-h-16 items-center gap-2 rounded-xl border p-2 transition-colors",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
                        active
                          ? "border-foreground/40 bg-muted"
                          : "border-border bg-muted/20 hover:bg-muted"
                      )}
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background text-foreground">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 text-xs font-medium leading-tight text-foreground">
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
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
