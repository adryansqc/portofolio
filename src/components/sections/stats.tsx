// src/components/sections/stats.tsx
"use client";

import { Container } from "@/components/layout/container";
import { STATS } from "@/lib/constants";
import { useCountUp } from "@/hooks/use-count-up";
import { useDict } from "@/components/shared/locale-provider";

function StatItem({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const { value: animated, ref } = useCountUp(value);

  return (
    <div className="text-center">
      <div className="text-3xl font-semibold tracking-tight sm:text-4xl">
        <span ref={ref}>{animated}</span>
        {suffix}
      </div>
      <p className="mt-1 text-xs font-mono uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

export function Stats() {
  const dict = useDict();
  const labels = [
    dict.sections.statProjects,
    dict.sections.statExperience,
    dict.sections.statClients,
    dict.sections.statDedication,
  ];

  return (
    <section>
      <Container>
        <div className="rounded-2xl border border-border bg-muted/30 px-6 py-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {STATS.map((s, i) => (
              <StatItem
                key={s.label}
                value={s.value}
                suffix={s.suffix}
                label={labels[i] ?? s.label}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}