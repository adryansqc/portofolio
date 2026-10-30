// src/app/about/page.tsx
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/components/shared/social-links";
import { ABOUT_STACK, ABOUT_TIMELINE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "Tentang Adryan — Full Stack Developer & UI/UX Designer yang fokus membangun produk digital yang thoughtful.",
};

export default function AboutPage() {
  return (
    <Container className="py-16 sm:py-24">
      <Badge>About</Badge>

      <h1 className="mt-6 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl animate-fade-in-up">
        Halo, saya Adryan — developer yang peduli pada detail & pengalaman pengguna.
      </h1>

      <div className="mt-10 grid gap-12 md:grid-cols-3">
        <div className="md:col-span-2 space-y-5 text-muted-foreground leading-relaxed animate-fade-in-up delay-100">
          <p>
            Saya seorang{" "}
            <span className="font-medium text-foreground">Full Stack Developer</span>{" "}
            dengan pengalaman membangun aplikasi web end-to-end — mulai dari desain
            UI/UX di Figma, implementasi frontend dengan Next.js & React, sampai
            backend dengan Laravel dan database relasional.
          </p>
          <p>
            Saya percaya produk digital yang baik bukan hanya soal fitur, tetapi juga
            soal{" "}
            <span className="font-medium text-foreground">
              kejelasan, kecepatan, dan aksesibilitas
            </span>
            . Setiap baris kode dan setiap piksel harus punya alasan.
          </p>
          <p>
            Di luar coding, saya suka mengeksplorasi design system, membaca blog
            teknologi, dan bereksperimen dengan animasi web yang halus.
          </p>

          <div className="pt-2">
            <Button href="/projects" variant="outline">
              Lihat project saya
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <aside className="space-y-6 animate-fade-in-up delay-200">
          <div className="rounded-2xl border border-border p-5">
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Fokus
            </p>
            <ul className="space-y-2 text-sm">
              <li>• Frontend Architecture</li>
              <li>• Design Systems</li>
              <li>• Performance & Accessibility</li>
              <li>• Product Thinking</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-border p-5">
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Connect
            </p>
            <SocialLinks className="-ml-1" />
          </div>
        </aside>
      </div>

      <section className="mt-20 animate-fade-in-up delay-300">
        <h2 className="text-2xl font-semibold tracking-tight">Tech Stack</h2>
        <p className="mt-2 text-muted-foreground">
          Tools & teknologi yang saya pakai sehari-hari.
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
        <h2 className="text-2xl font-semibold tracking-tight">Journey</h2>
        <p className="mt-2 text-muted-foreground">
          Perjalanan singkat saya di dunia web development.
        </p>

        <ol className="mt-8 space-y-6 border-l border-border pl-6">
          {ABOUT_TIMELINE.map((item) => (
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