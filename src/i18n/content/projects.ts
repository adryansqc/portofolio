// src/i18n/content/projects.ts
import type { Locale } from "@/i18n/config";

export interface ProjectContent {
  description: string;
  detail: {
    problem: string;
    role: string;
    challenge: string;
    outcome: string;
  };
}

export const PROJECT_CONTENT: Record<Locale, Record<string, ProjectContent>> = {
  id: {
    "psp-jambi": {
      description:
        "Website profil perusahaan profesional dengan tampilan yang elegan dan modern.",
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
    "jbc-jambi": {
      description:
        "Website profil perusahaan profesional dengan tampilan yang elegan dan modern.",
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
    "ppdb-sma-tri-sukses": {
      description:
        "Sistem penerimaan siswa online yang komprehensif untuk SMA Tri Sukses Boarding School Jambi.",
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
    "literasi-kunangan": {
      description:
        "Platform perpustakaan digital interaktif yang dirancang untuk meningkatkan literasi membaca.",
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
    "e-masjid": {
      description:
        "Website e-Masjid dengan fitur pengumuman, jadwal kajian & jumatan, kas masjid otomatis, zakat, qurban, dll.",
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
    "media-belajar-online": {
      description:
        "Website kuis dan pembelajaran untuk sekolah dengan fitur akses materi, pengerjaan kuis dengan hasil otomatis.",
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
    "ppdb-midtrans": {
      description:
        "Sistem penerimaan siswa baru berbasis web dengan fitur pembayaran online via Midtrans dan notifikasi WA otomatis.",
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
    "seraso-mobile": {
      description:
        "Aplikasi mobile Sistem Elektronik Rujukan Sosial Online (SERASO) Kabupaten Sarolangun untuk pendataan dan rujukan layanan sosial secara digital.",
      detail: {
        problem:
          "Proses rujukan dan pendataan layanan sosial di Kabupaten Sarolangun masih dilakukan manual, sehingga data lambat terpusat dan rawan duplikasi antar instansi.",
        role: "Mobile & Full Stack Developer — membangun aplikasi Flutter dan backend API untuk pendataan rujukan sosial.",
        challenge:
          "Merancang alur rujukan multi-instansi yang sederhana di mobile, dengan sinkronisasi data dan status rujukan yang konsisten.",
        outcome:
          "Aplikasi mobile SERASO memudahkan petugas lapangan mendata dan merujuk penerima layanan sosial secara real-time, dengan data terpusat di Kabupaten Sarolangun.",
      },
    },
    "jdih-mobile": {
      description:
        "Aplikasi mobile Jaringan Dokumentasi dan Informasi Hukum (JDIH) DPRD Kabupaten Sarolangun untuk akses produk hukum daerah secara cepat dan rapi.",
      detail: {
        problem:
          "Masyarakat dan anggota dewan kesulitan mengakses produk hukum daerah DPRD Sarolangun karena dokumen tersebar dan tidak terindeks dengan baik.",
        role: "Mobile & Full Stack Developer — membangun aplikasi Flutter dan API untuk pengelolaan produk hukum daerah.",
        challenge:
          "Menyusun katalog produk hukum (Perda, Perbup, dll.) dengan pencarian cepat dan tampilan PDF yang nyaman di layar kecil.",
        outcome:
          "Aplikasi JDIH memudahkan pengguna mencari, membaca, dan menyimpan produk hukum DPRD Sarolangun langsung dari ponsel.",
      },
    },
  },
  en: {
    "psp-jambi": {
      description:
        "Professional company profile website with an elegant, modern look.",
      detail: {
        problem:
          "The company needed a professional digital presence to introduce its services to prospective clients and business partners.",
        role: "Full Stack Developer & UI Designer — responsible from design to deployment.",
        challenge:
          "Designing an elegant UI without a modern frontend framework while maintaining performance on shared hosting.",
        outcome:
          "The website is live and actively used as the company's digital face, improving trust among prospective clients.",
      },
    },
    "jbc-jambi": {
      description:
        "Professional company profile website with an elegant, modern look.",
      detail: {
        problem:
          "The client needed a company profile website that highlighted credibility and the service portfolio.",
        role: "Full Stack Developer — development, styling, and deployment.",
        challenge:
          "Structuring informative content without making the page feel heavy.",
        outcome:
          "The website is active and serves as the client's main reference when presenting services.",
      },
    },
    "ppdb-sma-tri-sukses": {
      description:
        "A comprehensive online school admissions system for SMA Tri Sukses Boarding School Jambi.",
      detail: {
        problem:
          "Manual admissions consumed time and were prone to data-entry errors for prospective students.",
        role: "Full Stack Developer — designed the registration flow, database, and admin panel.",
        challenge:
          "Simplifying the multi-step registration flow so parents and new students can use it easily.",
        outcome:
          "Registration became digital and centralized, and the committee can verify applicants faster.",
      },
    },
    "literasi-kunangan": {
      description:
        "An interactive digital library platform designed to improve reading literacy.",
      detail: {
        problem:
          "Access to reading materials in the region is limited, and students' reading interest needs to be encouraged through more engaging media.",
        role: "Full Stack Developer — built the platform, catalog system, and reading interface.",
        challenge:
          "Designing a comfortable reading experience on small screens while keeping it lightweight on slow connections.",
        outcome:
          "The platform is actively used and provides a digital reading collection that is easy for students to access.",
      },
    },
    "e-masjid": {
      description:
        "e-Masjid website with announcements, study & Friday prayer schedules, automatic mosque finances, zakat, qurban, and more.",
      detail: {
        problem:
          "Managing mosque finances, schedules, and announcements was manual and scattered across many places.",
        role: "Full Stack Developer — designed financial, scheduling, and content-management modules.",
        challenge:
          "Unifying many modules (finance, zakat, qurban, schedules) into one dashboard that remains simple for mosque administrators.",
        outcome:
          "A complete prototype ready for further development for local mosque needs.",
      },
    },
    "media-belajar-online": {
      description:
        "Quiz and learning website for schools with material access, quiz completion, and automatic results.",
      detail: {
        problem:
          "Teachers needed a fast way to create and grade quizzes without manual correction one by one.",
        role: "Full Stack Developer — built the quiz system, automatic grading, and teacher panel.",
        challenge:
          "Designing a flexible quiz builder (multiple choice, essay) that remains easy for non-technical teachers to use.",
        outcome:
          "A working prototype with automated grading and per-student result summaries.",
      },
    },
    "ppdb-midtrans": {
      description:
        "Web-based new student admissions system with online payments via Midtrans and automatic WhatsApp notifications.",
      detail: {
        problem:
          "Manual registration fee payments were troublesome for prospective students and admins, and prone to reconciliation errors.",
        role: "Full Stack Developer — payment gateway integration, webhooks, and WhatsApp notifications.",
        challenge:
          "Handling out-of-order Midtrans callbacks and ensuring payment status stays in sync.",
        outcome:
          "Payments are automatically verified, admins no longer need to check manual bank statements, and WhatsApp notifications are sent automatically.",
      },
    },
    "seraso-mobile": {
      description:
        "SERASO — Electronic Social Referral System mobile application for Kabupaten Sarolangun to digitize social service data and referrals.",
      detail: {
        problem:
          "Social service referral and data collection in Kabupaten Sarolangun were still manual, so data was slow to centralize and prone to duplication across institutions.",
        role: "Mobile & Full Stack Developer — built the Flutter app and backend API for social referral data collection.",
        challenge:
          "Designing a simple multi-institution referral flow on mobile, with consistent data synchronization and referral status.",
        outcome:
          "The SERASO mobile app helps field officers record and refer social service recipients in real time, with data centralized in Kabupaten Sarolangun.",
      },
    },
    "jdih-mobile": {
      description:
        "JDIH DPRD Sarolangun mobile application — a documentation and legal information network for fast and organized access to regional legal products.",
      detail: {
        problem:
          "The public and council members struggled to access DPRD Sarolangun regional legal products because documents were scattered and not well indexed.",
        role: "Mobile & Full Stack Developer — built the Flutter app and API for regional legal product management.",
        challenge:
          "Organizing legal products (Perda, Perbup, etc.) with fast search and comfortable PDF viewing on small screens.",
        outcome:
          "The JDIH app makes it easy for users to search, read, and save DPRD Sarolangun legal products directly from their phones.",
      },
    },
  },
};
