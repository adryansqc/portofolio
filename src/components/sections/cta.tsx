// src/components/sections/cta.tsx
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section>
      <Container className="py-16 sm:py-24">
        <div className="rounded-3xl border border-border bg-gradient-to-b from-muted/50 to-background p-8 sm:p-12 text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Let&apos;s build something together.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Punya proyek menarik atau ingin berkolaborasi? Saya selalu terbuka
            untuk diskusi.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href="mailto:adryandaywalker15@gmail.com" size="lg">
              Get in touch
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/projects" variant="outline" size="lg">
              See projects
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}