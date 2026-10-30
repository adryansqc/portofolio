// src/app/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PROJECTS } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Not found" };
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <Container className="py-16 sm:py-24">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to projects
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="rounded-md border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {project.category}
        </span>
        <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
          {project.year}
        </span>
        <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
          {project.status}
        </span>
      </div>

      <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
        {project.title}
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        {project.description}
      </p>

      {project.demo && (
        <div className="mt-6">
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            <ExternalLink className="h-4 w-4" />
            View Live
          </a>
        </div>
      )}

      <div className="mt-10 aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-muted">
        <Image
          src={project.image}
          alt={project.title}
          width={1200}
          height={750}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4 text-muted-foreground leading-relaxed">
          <h2 className="text-lg font-semibold text-foreground">Overview</h2>
          <p>{project.description}</p>
          <p>
            <em className="text-muted-foreground/70">
              (Tambahkan detail project: problem, role, tantangan, dan hasil di sini.)
            </em>
          </p>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-border p-5">
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </Container>
  );
}