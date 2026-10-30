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
  cvUrl: "/cv-adryan.pdf",
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
    detail: {
      problem:
        "Perusahaan membutuhkan kehadiran digital profesional untuk memperkenalkan layanan ke calon klien dan mitra bisnis.",
      role: "Full Stack Developer & UI Designer — bertanggung jawab penuh dari desain hingga deployment.",
      challenge:
        "Merancang UI yang elegan tanpa framework frontend modern, dengan tetap menjaga performa di hosting shared.",
      outcome:
        "Website live dan aktif digunakan sebagai wajah digital perusahaan, meningkatkan kepercayaan calon klien.",
    },
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
    detail: {
      problem:
        "Klien memerlukan website company profile yang menonjolkan kredibilitas dan portofolio layanan.",
      role: "Full Stack Developer — development, styling, dan deployment.",
      challenge:
        "Menyusun struktur konten yang informatif tanpa membuat halaman terasa berat.",
      outcome:
        "Website aktif dan menjadi referensi utama klien saat mempresentasikan layanan.",
    },
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
    detail: {
      problem:
        "Proses PPDB manual memakan waktu dan rawan kesalahan input data calon siswa.",
      role: "Full Stack Developer — merancang alur pendaftaran, database, dan panel admin.",
      challenge:
        "Menyederhanakan alur multi-step pendaftaran agar mudah dipakai oleh orang tua dan siswa baru.",
      outcome:
        "Proses pendaftaran menjadi digital, data terpusat, dan panitia bisa memverifikasi lebih cepat.",
    },
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
    detail: {
      problem:
        "Akses bahan bacaan di daerah terbatas, dan minat baca siswa perlu didorong lewat media yang lebih menarik.",
      role: "Full Stack Developer — membangun platform, sistem katalog, dan antarmuka baca.",
      challenge:
        "Merancang pengalaman membaca yang nyaman di layar kecil dan tetap ringan di koneksi lambat.",
      outcome:
        "Platform aktif digunakan, menyediakan koleksi bacaan digital yang mudah diakses siswa.",
    },
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
    detail: {
      problem:
        "Pengelolaan kas, jadwal, dan pengumuman masjid masih manual dan tersebar di banyak tempat.",
      role: "Full Stack Developer — merancang modul keuangan, jadwal, dan manajemen konten.",
      challenge:
        "Menyatukan banyak modul (kas, zakat, qurban, jadwal) dalam satu dashboard yang tetap sederhana bagi pengurus masjid.",
      outcome:
        "Prototype lengkap yang siap dikembangkan lebih lanjut untuk kebutuhan masjid lokal.",
    },
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
    detail: {
      problem:
        "Guru butuh cara cepat membuat dan menilai kuis tanpa harus mengoreksi manual satu per satu.",
      role: "Full Stack Developer — membangun sistem kuis, penilaian otomatis, dan panel guru.",
      challenge:
        "Merancang builder kuis yang fleksibel (pilihan ganda, esai) namun tetap mudah dipakai guru non-teknis.",
      outcome:
        "Prototype berjalan dengan penilaian otomatis dan rekap hasil per siswa.",
    },
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
    detail: {
      problem:
        "Pembayaran biaya pendaftaran manual merepotkan calon siswa dan admin, serta rawan salah rekonsiliasi.",
      role: "Full Stack Developer — integrasi payment gateway, webhook, dan notifikasi WhatsApp.",
      challenge:
        "Menangani callback Midtrans yang tidak berurutan dan memastikan status pembayaran selalu sinkron.",
      outcome:
        "Pembayaran otomatis terverifikasi, admin tidak perlu cek mutasi manual, notifikasi WA terkirim otomatis.",
    },
  },
] as const;

export const PROJECT_CATEGORIES = [
  "All",
  "Full Stack",
  "Frontend",
  "Backend",
] as const;

// ============================================================
// ABOUT PAGE
// ============================================================
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
    label: "Design",
    items: ["Figma", "Design System", "Prototyping"],
  },
  {
    label: "Tools",
    items: ["Git", "VS Code", "Vercel", "Midtrans"],
  },
] as const;

export const ABOUT_TIMELINE = [
  {
    year: "2023",
    title: "Mulai belajar web development",
    desc: "HTML, CSS, JS dasar, dan PHP.",
  },
  {
    year: "2024",
    title: "Full stack Laravel",
    desc: "Membangun PPDB sekolah & platform literasi.",
  },
  {
    year: "2025",
    title: "Ekspansi ke Next.js",
    desc: "Fokus ke React ecosystem, TypeScript, dan UI/UX.",
  },
  {
    year: "2026",
    title: "Freelance & kolaborasi",
    desc: "Mengerjakan project company profile & sistem internal.",
  },
] as const;

// ============================================================
// TYPES
// ============================================================
export type NavLink = (typeof NAV_LINKS)[number];
export type Social = (typeof SOCIALS)[number];
export type Skill = (typeof SKILLS)[number];
export type Stat = (typeof STATS)[number];
export type Project = (typeof PROJECTS)[number];
export type ProjectDetail = Project["detail"];
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];