// src/lib/constants.ts
import type { Locale } from "@/i18n/config";
import { PROJECT_CONTENT } from "@/i18n/content/projects";

export const SITE = {
  name: "Adryan",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://adryan.dev",
  domain: "Adryan",
  role: "Full Stack Developer",
  available: true,
  cvUrl: "/cv-adryan.pdf",
} as const;

export const NAV_LINKS = [
  { href: "/", labelKey: "home" },
  { href: "/about", labelKey: "about" },
  { href: "/projects", labelKey: "work" },
] as const;

export const TOOLS = [
  {
    href: "/tools/image-tools",
    key: "imageTools",
    icon: "image" as const,
  },
  {
    href: "/tools/qr-generator",
    key: "qrGenerator",
    icon: "qr" as const,
  },
  {
    href: "/tools/password-generator",
    key: "passwordGenerator",
    icon: "lock" as const,
  },
  {
    href: "/tools/base64",
    key: "base64",
    icon: "code" as const,
  },
] as const;

export const SOCIALS = [
  { href: "https://github.com/adryansqc", label: "GitHub", icon: "github" },
  {
    href: "https://www.linkedin.com/in/ad-ryan-4aab25308",
    label: "LinkedIn",
    icon: "linkedin",
  },
  { href: "mailto:adryandaywalker15@gmail.com", label: "Email", icon: "mail" },
] as const;

export const SKILLS = [
  {
    title: "Frontend Development",
    description: "Next.js, React, Tailwind CSS, Bootstrap",
    level: 90,
    accent: "blue",
    icon: "layout" as const,
  },
  {
    title: "Backend Development",
    description: "Laravel, PHP, MySQL, PostgreSQL, SQLite",
    level: 85,
    accent: "emerald",
    icon: "server" as const,
  },
  {
    title: "UI/UX Design",
    description: "Figma, Design System, Prototyping",
    level: 80,
    accent: "violet",
    icon: "palette" as const,
  },
] as const;

export const STATS = [
  { value: 50, suffix: "+", key: "statProjects" },
  { value: 2, suffix: "+", key: "statExperience" },
  { value: 25, suffix: "+", key: "statClients" },
  { value: 100, suffix: "%", key: "statDedication" },
] as const;

const PROJECT_META = [
  {
    slug: "psp-jambi",
    title: "PSP Jambi",
    image: "/psp.png",
    demo: "https://pspjambi.com",
    tech: ["Laravel", "Bootstrap", "Tailwind CSS", "MySQL"],
    category: "Full Stack",
    featured: false,
    year: "2026",
    status: "Live" as const,
  },
  {
    slug: "jbc-jambi",
    title: "JBC Jambi",
    image: "/pkpjbc.png",
    demo: "https://pkpjbc.com",
    tech: ["Laravel", "Bootstrap", "Tailwind CSS", "MySQL"],
    category: "Full Stack",
    featured: false,
    year: "2025",
    status: "Live" as const,
  },
  {
    slug: "ppdb-sma-tri-sukses",
    title: "PPDB SMA Tri Sukses BS Jambi",
    image: "/ppdb.png",
    demo: "https://smappdb.smatrisuksesbsjambi.sch.id/",
    tech: ["Laravel", "Bootstrap", "MySQL"],
    category: "Full Stack",
    featured: false,
    year: "2024",
    status: "Live" as const,
  },
  {
    slug: "literasi-kunangan",
    title: "Literasi Kunangan",
    image: "/kunangan.png",
    demo: "https://literasikunangan.web.id",
    tech: ["Laravel", "Bootstrap", "MySQL"],
    category: "Full Stack",
    featured: false,
    year: "2023",
    status: "Live" as const,
  },
  {
    slug: "e-masjid",
    title: "E-Masjid",
    image: "/masjid.png",
    demo: null,
    tech: ["Laravel", "Bootstrap", "MySQL"],
    category: "Full Stack",
    featured: false,
    year: "2025",
    status: "Local" as const,
  },
  {
    slug: "media-belajar-online",
    title: "Media Belajar Online",
    image: "/mediapembelajaran.png",
    demo: null,
    tech: ["Laravel", "Bootstrap", "MySQL"],
    category: "Full Stack",
    featured: false,
    year: "2025",
    status: "Local" as const,
  },
  {
    slug: "ppdb-midtrans",
    title: "PPDB Midtrans",
    image: "/ppdb_mitrans.png",
    demo: null,
    tech: ["Laravel", "Bootstrap", "MySQL", "Midtrans"],
    category: "Full Stack",
    featured: false,
    year: "2025",
    status: "Local" as const,
  },
  {
    slug: "seraso-mobile",
    title: "SERASO — Sistem Elektronik Rujukan Sosial Online",
    image: "/seraso-mobile.jpeg",
    demo: null,
    tech: ["Flutter", "Dart", "Laravel", "MySQL"],
    category: "Mobile",
    featured: false,
    year: "2026",
    status: "Local" as const,
  },
  {
    slug: "jdih-mobile",
    title: "JDIH DPRD Sarolangun",
    image: "/jdih-mobile.jpeg",
    demo: null,
    tech: ["Flutter", "Dart", "Laravel", "MySQL"],
    category: "Mobile",
    featured: false,
    year: "2026",
    status: "Local" as const,
  },
] as const;

export type ProjectMeta = (typeof PROJECT_META)[number];

export type Project = ProjectMeta & {
  description: string;
  detail: {
    problem: string;
    role: string;
    challenge: string;
    outcome: string;
  };
};

export function getProjects(locale: Locale): Project[] {
  return PROJECT_META.map((project) => ({
    ...project,
    ...PROJECT_CONTENT[locale][project.slug],
  }));
}

export function getProject(
  locale: Locale,
  slug: string
): Project | undefined {
  const meta = PROJECT_META.find((p) => p.slug === slug);
  if (!meta) return undefined;
  return { ...meta, ...PROJECT_CONTENT[locale][slug] };
}

export function getProjectSlugs(): string[] {
  return PROJECT_META.map((p) => p.slug);
}

export const PROJECT_CATEGORIES = [
  "All",
  "Full Stack",
  "Frontend",
  "Backend",
  "Mobile",
] as const;

export const ABOUT_STACK = [
  {
    label: "Frontend",
    items: ["Next.js", "React", "Tailwind CSS", "Bootstrap"],
  },
  {
    label: "Backend",
    items: ["Laravel", "PHP", "MySQL", "PostgreSQL"],
  },
  {
    label: "Mobile",
    items: ["Flutter", "Dart", "Firebase"],
  },
  {
    label: "Design",
    items: ["Figma", "Design System", "Prototyping"],
  },
  {
    label: "Tools",
    items: ["Git", "VS Code", "Vercel", "Midtrans"],
  },
] as const;

export type NavLink = (typeof NAV_LINKS)[number];
export type Social = (typeof SOCIALS)[number];
export type Skill = (typeof SKILLS)[number];
export type Stat = (typeof STATS)[number];
export type Tool = (typeof TOOLS)[number];
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
