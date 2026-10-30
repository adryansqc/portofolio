// src/components/sections/skills.tsx
import { Layout, Server, Palette } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SKILLS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ICONS = { layout: Layout, server: Server, palette: Palette } as const;

const ACCENT: Record<string, string> = {
  blue: "text-blue-500 bg-blue-500/10",
  emerald: "text-emerald-500 bg-emerald-500/10",
  violet: "text-violet-500 bg-violet-500/10",
};

export function Skills() {
  return (
    <section id="skills">
      <Container className="py-16 sm:py-20">
        <SectionHeading eyebrow="Capabilities" title="Keahlian Utama" />

        <div className="grid gap-4 md:grid-cols-3">
          {SKILLS.map((skill) => {
            const Icon = ICONS[skill.icon];
            return (
              <div
                key={skill.title}
                className="group rounded-2xl border border-border bg-background p-6 transition-colors hover:border-foreground/20"
              >
                <div
                  className={cn(
                    "mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg transition-transform group-hover:scale-105",
                    ACCENT[skill.accent]
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="text-base font-semibold">{skill.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {skill.description}
                </p>

                <div className="mt-5 space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Proficiency</span>
                    <span className="font-mono text-foreground">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-foreground/80"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}