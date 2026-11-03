// src/app/page.tsx
import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";
import { Stats } from "@/components/sections/stats";
import { CTA } from "@/components/sections/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Skills />
      <CTA />
    </>
  );
}