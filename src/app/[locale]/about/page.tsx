// src/app/about/page.tsx
"use client";

import { ArrowUpRight, Download } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/components/shared/social-links";
import { useDict, useLocale } from "@/components/shared/locale-provider";
import { localePath } from "@/i18n/locale-path";
import { ABOUT_STACK, SITE } from "@/lib/constants";

export default function AboutPage() {
  const dict = useDict();
  const { locale } = useLocale();

  return (
    <Container className="py-16 sm:py-24">
      <Badge>{dict.about.badge}</Badge>

      <h1 className="mt-6 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl animate-fade-in-up">
        {dict.about.heading}
      </h1>

      <div className="mt-10 grid gap-12 md:grid-cols-3">
        <div className="md:col-span-2 space-y-5 text-muted-foreground leading-relaxed animate-fade-in-up delay-100">
          <p>{dict.about.p1}</p>
          <p>{dict.about.p2}</p>
          <p>{dict.about.p3}</p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button href={localePath(locale, "/projects")} variant="outline">
              {dict.about.seeProjects}
              <ArrowUpRight className="h-4 w-4" />
            </Button>

            <a
              href={SITE.cvUrl}
              download="CV-Adryan.pdf"
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-4 text-sm font-medium transition-colors hover:bg-muted"
            >
              <Download className="h-4 w-4" />
              {dict.about.downloadCv}
            </a>
          </div>
        </div>

        <aside className="space-y-6 animate-fade-in-up delay-200">
          <div className="rounded-2xl border border-border p-5">
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {dict.about.focusTitle}
            </p>
            <ul className="space-y-2 text-sm">
              <li>• {dict.about.focus1}</li>
              <li>• {dict.about.focus2}</li>
              <li>• {dict.about.focus3}</li>
              <li>• {dict.about.focus4}</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-border p-5">
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {dict.about.connectTitle}
            </p>
            <SocialLinks className="-ml-1" />
          </div>
        </aside>
      </div>

      <section className="mt-20 animate-fade-in-up delay-300">
        <h2 className="text-2xl font-semibold tracking-tight">
          {dict.about.techStackTitle}
        </h2>
        <p className="mt-2 text-muted-foreground">
          {dict.about.techStackDesc}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT_STACK.map((group) => (
            <div
              key={group.label}
              className="rounded-2xl border border-border p-5 transition-colors hover:border-foreground/20"
            >
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {group.label}
              </p>
              <ul className="mt-3 space-y-1.5 text-sm">
                {group.items.map((item) => (
                  <li key={item} className="text-foreground/90">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 animate-fade-in-up delay-500">
        <h2 className="text-2xl font-semibold tracking-tight">
          {dict.about.journeyTitle}
        </h2>
        <p className="mt-2 text-muted-foreground">
          {dict.about.journeyDesc}
        </p>

        <ol className="mt-8 space-y-6 border-l border-border pl-6">
          {dict.about.timeline.map((item) => (
            <li key={item.year} className="relative">
              <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-background bg-foreground" />
              <p className="font-mono text-xs text-muted-foreground">
                {item.year}
              </p>
              <p className="mt-1 font-medium">{item.title}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {item.desc}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </Container>
  );
}