// src/app/[locale]/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Container } from "@/components/layout/container";
import { DEFAULT_LOCALE, isLocale, LOCALES } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProject, getProjectSlugs } from "@/lib/constants";
import { localePath } from "@/i18n/locale-path";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

const DETAIL_KEYS = ["problem", "role", "challenge", "outcome"] as const;
type DetailKey = (typeof DETAIL_KEYS)[number];

const CATEGORY_KEYS = {
  "Full Stack": "fullStack",
  Frontend: "frontend",
  Backend: "backend",
  Mobile: "mobile",
} as const;

async function getParams(params: Props["params"]) {
  const raw = await params;
  const locale = isLocale(raw.locale) ? raw.locale : DEFAULT_LOCALE;
  return { locale, slug: raw.slug };
}

function categoryLabel(dict: ReturnType<typeof getDictionary>, category: string) {
  const key = CATEGORY_KEYS[category as keyof typeof CATEGORY_KEYS];
  return key ? dict.common.categories[key] : category;
}

function statusLabel(dict: ReturnType<typeof getDictionary>, status: "Live" | "Local") {
  return status === "Live" ? dict.common.status.live : dict.common.status.local;
}

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    getProjectSlugs().map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await getParams(params);
  const dict = getDictionary(locale);
  const project = getProject(locale, slug);

  if (!project) {
    return {
      title: dict.metadata.notFoundTitle,
      description: dict.metadata.notFoundDescription,
    };
  }

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: localePath(locale, `/projects/${project.slug}`),
      languages: {
        id: `/id/projects/${project.slug}`,
        en: `/en/projects/${project.slug}`,
        "x-default": `/id/projects/${project.slug}`,
      },
    },
    openGraph: {
      title: project.title,
      description: project.description,
      images: [{ url: project.image, alt: project.title }],
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await getParams(params);
  const dict = getDictionary(locale);
  const project = getProject(locale, slug);
  if (!project) notFound();

  return (
    <Container className="py-16 sm:py-24">
      <Link
        href={localePath(locale, "/projects")}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {dict.common.backToProjects}
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="rounded-md border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {categoryLabel(dict, project.category)}
        </span>
        <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
          {project.year}
        </span>
        <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
          {statusLabel(dict, project.status)}
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
            {dict.common.viewLive}
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

      <div className="mt-10 grid gap-10 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6 text-muted-foreground leading-relaxed">
          {DETAIL_KEYS.map((key) => (
            <div key={key}>
              <h2 className="mb-1.5 text-sm font-mono uppercase tracking-wider text-foreground">
                {dict.projects[key as DetailKey]}
              </h2>
              <p>{project.detail[key]}</p>
            </div>
          ))}
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-border p-5">
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {dict.common.techStack}
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
