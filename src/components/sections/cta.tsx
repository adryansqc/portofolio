// src/components/sections/cta.tsx
"use client";

import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { useDict, useLocale } from "@/components/shared/locale-provider";
import { localePath } from "@/i18n/locale-path";

export function CTA() {
  const dict = useDict();
  const { locale } = useLocale();

  return (
    <section>
      <Container className="py-16 sm:py-24">
        <div className="surface-card rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {dict.sections.ctaTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            {dict.sections.ctaDesc}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href="mailto:adryandaywalker15@gmail.com" size="lg">
              {dict.sections.getInTouch}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href={localePath(locale, "/projects")} variant="outline" size="lg">
              {dict.sections.seeProjects}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}