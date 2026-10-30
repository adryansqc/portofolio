// src/lib/constants.ts

// ============================================================
// SITE
// ============================================================
export const SITE = {
  name: "Adryan",
  domain: "adryan.dev",
  role: "Full Stack Developer",
  tagline: "building thoughtful digital products.",
  description:
    "Saya Adryan, membangun web app yang cepat, accessible, dan enak dipakai.",
  available: true,
} as const;

// ============================================================
// NAVIGATION
// ============================================================
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Work" },
] as const;

// ============================================================
// SOCIALS
// ============================================================
export const SOCIALS = [
  { href: "https://github.com/adryansqc", label: "GitHub", icon: "github" },
  {
    href: "https://www.linkedin.com/in/ad-ryan-4aab25308",
    label: "LinkedIn",
    icon: "linkedin",
  },
  { href: "mailto:hello@adryan.dev", label: "Email", icon: "mail" },
] as const;

// ============================================================
// HERO
// ============================================================
export const TYPING_TEXTS = [
  "Full Stack Developer",
  "Frontend Specialist",
  "UI/UX Enthusiast",
] as const;

// ============================================================
// SKILLS
// ============================================================
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

// ============================================================
// STATS
// ============================================================
export const STATS = [
  { value: 50, suffix: "+", label: "Projects Completed" },
  { value: 2, suffix: "+", label: "Years Experience" },
  { value: 25, suffix: "+", label: "Happy Clients" },
  { value: 100, suffix: "%", label: "Dedication" },
] as const;

// ============================================================
// PROJECTS
// ============================================================
export const PROJECTS = [
  {
    slug: "psp-jambi",
    title: "PSP Jambi",
    description:
      "Website profil perusahaan profesional dengan tampilan yang elegan dan modern.",
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
    description:
      "Website profil perusahaan profesional dengan tampilan yang elegan dan modern.",
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
    description:
      "Sistem penerimaan siswa online yang komprehensif untuk SMA Tri Sukses Boarding School Jambi.",
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
    description:
      "Platform perpustakaan digital interaktif yang dirancang untuk meningkatkan literasi membaca.",
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
    description:
      "Website e-Masjid dengan fitur pengumuman, jadwal kajian & jumatan, kas masjid otomatis, zakat, qurban, dll.",
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
    description:
      "Website kuis dan pembelajaran untuk sekolah dengan fitur akses materi, pengerjaan kuis dengan hasil otomatis.",
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
    description:
      "Sistem penerimaan siswa baru berbasis web dengan fitur pembayaran online via Midtrans dan notifikasi WA otomatis.",
    image: "/ppdb_mitrans.png",
    demo: null,
    tech: ["Laravel", "Bootstrap", "MySQL", "Midtrans"],
    category: "Full Stack",
    featured: false,
    year: "2025",
    status: "Local" as const,
  },
] as const;

export const PROJECT_CATEGORIES = [
  "All",
  "Full Stack",
  "Frontend",
  "Backend",
] as const;

// ============================================================
// TYPES
// ============================================================
export type NavLink = (typeof NAV_LINKS)[number];
export type Social = (typeof SOCIALS)[number];
export type Skill = (typeof SKILLS)[number];
export type Stat = (typeof STATS)[number];
export type Project = (typeof PROJECTS)[number];
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];