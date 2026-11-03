// src/components/layout/tools-dropdown.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Image as ImageIcon, Code, QrCode, Lock, FileText, Camera } from "lucide-react";
import { TOOLS } from "@/lib/constants";
import { useDict, useLocale } from "@/components/shared/locale-provider";
import { localePath, stripLocaleFromPath } from "@/i18n/locale-path";
import { cn } from "@/lib/utils";

const ICONS = {
  camera: Camera,
  fileText: FileText,
  image: ImageIcon,
  code: Code,
  qr: QrCode,
  lock: Lock,
} as const;

export function ToolsDropdown() {
  const pathname = usePathname();
  const currentPath = stripLocaleFromPath(pathname);
  const dict = useDict();
  const { locale } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActive = currentPath.startsWith("/tools");

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function handleMouseEnter() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }

  function handleMouseLeave() {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={cn(
          "inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm transition-colors",
          isActive
            ? "text-foreground font-medium"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        {dict.nav.tools}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="glass absolute left-0 top-full mt-1 w-72 overflow-hidden rounded-xl animate-fade-in"
        >
          <div className="p-1.5">
            {TOOLS.map((tool) => {
              const Icon = ICONS[tool.icon] ?? ImageIcon;
              const active = currentPath === tool.href;
              const copy = dict.tools.items[tool.key];
              return (
                <Link
                  key={tool.href}
                  href={localePath(locale, tool.href)}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors",
                    active ? "bg-muted" : "hover:bg-muted"
                  )}
                >
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground group-hover:bg-background">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{copy.label}</p>
                    <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                      {copy.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
