// src/components/sections/hero.tsx
"use client";

import { ArrowRight, Download } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/components/shared/social-links";
import { useTypingEffect } from "@/hooks/use-typing-effect";
import { SITE, TYPING_TEXTS } from "@/lib/constants";

export function Hero() {
  const typing = useTypingEffect(TYPING_TEXTS);

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.35] dark:opacity-25" />
      <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl animate-blob" />

      <Container className="relative pt-20 pb-24 sm:pt-28 sm:pb-32">
        {SITE.available && (
          <div className="animate-fade-in">
            <Badge>
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              Available for freelance
            </Badge>
          </div>
        )}

        <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl animate-fade-in-up delay-100">
          {SITE.role.toLowerCase()},
          <br />
          <span className="text-muted-foreground">{SITE.tagline}</span>
        </h1>

        <p className="mt-4 font-mono text-sm text-muted-foreground animate-fade-in-up delay-200">
          &gt; {typing}
          <span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 bg-foreground animate-pulse" />
        </p>

        <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground animate-fade-in-up delay-300">
          {SITE.description}
        </p>

        {/* CTA — 2 tombol utama */}
        <div className="mt-10 flex flex-wrap items-center gap-3 animate-fade-in-up delay-500">
          <Button href="/projects" size="lg">
            View Work
            <ArrowRight className="h-4 w-4" />
          </Button>

          <a
            href={SITE.cvUrl}
            download="CV-Adryan.pdf"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border px-6 text-base font-medium transition-colors hover:bg-muted"
          >
            <Download className="h-4 w-4" />
            Download CV
          </a>
        </div>

        <div className="mt-12 flex items-center gap-4 border-t border-border/60 pt-6 animate-fade-in-up delay-500">
          <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Find me
          </p>
          <SocialLinks />
        </div>
      </Container>
    </section>
  );
}