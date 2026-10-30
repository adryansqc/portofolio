// src/app/projects/page.tsx
"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import {
  PROJECTS,
  PROJECT_CATEGORIES,
  type ProjectCategory,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function ProjectsPage() {
  const [filter, setFilter] = useState<ProjectCategory>("All");

  const filtered = useMemo(
    () =>
      filter === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === filter),
    [filter]
  );

  return (
    <Container className="py-16 sm:py-24">
      {/* Header */}
      <div className="max-w-2xl animate-fade-in-up">
        <Badge>
          <Sparkles className="h-3 w-3" />
          Portfolio Showcase
        </Badge>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          Selected projects
        </h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Kumpulan project yang saya bangun dari nol — mulai dari riset,
          desain, sampai implementasi. Setiap project punya cerita dan
          tantangannya sendiri.
        </p>
      </div>

      {/* Filter */}
      <div className="mt-10 flex flex-wrap gap-2 animate-fade-in-up delay-100">
        {PROJECT_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              filter === cat
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, i) => (
          <article
            key={project.slug}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-background transition-all hover:border-foreground/20 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/40 animate-fade-in-up"
            style={{ animationDelay: `${Math.min(i * 80, 400)}ms` }}
          >
            {/* Image */}
            <div className="relative aspect-[16/10] overflow-hidden bg-muted">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />

              {/* Status */}
              <div className="absolute top-3 left-3">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur-md",
                    project.status === "Live"
                      ? "bg-emerald-500/20 text-emerald-300"
                      : "bg-amber-500/20 text-amber-300"
                  )}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      project.status === "Live"
                        ? "bg-emerald-400"
                        : "bg-amber-400"
                    )}
                  />
                  {project.status}
                </span>
              </div>

              {/* Year */}
              <div className="absolute top-3 right-3">
                <span className="rounded-full bg-black/40 px-2.5 py-1 font-mono text-xs text-white backdrop-blur-md">
                  {project.year}
                </span>
              </div>

              {/* Hover action */}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title}`}
                  className="absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-900 opacity-0 backdrop-blur-md transition-all group-hover:opacity-100 hover:scale-105"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-base font-semibold tracking-tight">
                  {project.title}
                </h2>
                <span className="shrink-0 rounded-md border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {project.category}
                </span>
              </div>

              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                {project.demo ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-foreground/70"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    View Live
                  </a>
                ) : (
                  <span className="text-xs text-muted-foreground">
                    Local project
                  </span>
                )}
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Details →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="mt-16 rounded-2xl border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">
            Belum ada project di kategori ini.
          </p>
        </div>
      )}

      {/* CTA */}
      <div className="mt-20 rounded-3xl border border-border bg-gradient-to-b from-muted/40 to-background p-8 text-center sm:p-12">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Lihat lebih banyak di GitHub
        </h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Masih banyak eksperimen & project lain yang saya simpan di GitHub.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href="https://github.com/adryansqc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            <ExternalLink className="h-4 w-4" />
            Buka GitHub
          </a>
          <Link
            href="/"
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-border px-6 text-sm font-medium transition-colors hover:bg-muted"
          >
            ← Kembali ke Home
          </Link>
        </div>
      </div>
    </Container>
  );
}