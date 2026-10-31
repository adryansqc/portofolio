// src/app/api/chat/route.ts
import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { PROJECTS, SITE, SOCIALS } from "@/lib/constants";
import { LOCALES, type Locale } from "@/i18n/config";

const gemini = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

export const runtime = "edge";

const projectContext = PROJECTS.map((p) => {
  const lines: string[] = [
    `### ${p.title} (${p.year})`,
    `- Kategori: ${p.category} • Status: ${p.status}`,
    `- Deskripsi: ${p.description}`,
    `- Tech: ${p.tech.join(", ")}`,
    `- Problem: ${p.detail.problem}`,
    `- Role: ${p.detail.role}`,
    `- Challenge: ${p.detail.challenge}`,
    `- Outcome: ${p.detail.outcome}`,
  ];
  if (p.demo) lines.push(`- Demo: ${p.demo}`);
  return lines.join("\n");
}).join("\n\n");

const contactContext = SOCIALS.map((s) => `- ${s.label}: ${s.href}`).join(
  "\n"
);

const systemPrompt = (locale: Locale) => `Kamu adalah AI assistant pribadi milik ${SITE.name}, seorang ${SITE.role}.

## Bahasa
${
  locale === "en"
    ? "Selalu jawab dalam bahasa Inggris, karena pengunjung memilih English."
    : "Selalu jawab dalam bahasa Indonesia, karena pengunjung memilih bahasa Indonesia."
}
Namun jika user mengirim pesan dalam bahasa lain, ikuti bahasa user.

## Tugas
- Menjawab pertanyaan pengunjung tentang ${SITE.name}, skill, project, dan pengalaman.
- Ramah, ringkas, dan helpful.
- Jangan pernah mengarang informasi yang tidak ada di data di bawah.
- Jika user bertanya hal di luar konteks portofolio (politik, medis, dsb), arahkan kembali dengan sopan.
- Jika user ingin kontak/hire, arahkan ke email atau LinkedIn.

## Data ${SITE.name}
- Role: ${SITE.role}
- Tagline: ${SITE.tagline}
- Deskripsi: ${SITE.description}
- Status: ${SITE.available ? "Available for freelance" : "Not available"}

## Daftar Project
${projectContext}

## Kontak
${contactContext}

## Gaya Jawaban
- Ringkas. Maksimal 3-4 kalimat kecuali user minta detail.
- Pakai markdown kalau perlu (bullet list, **bold**).
- Jangan pakai emoji berlebihan.
- Kalau mereferensikan project, sebut nama & tahunnya.`;

const MAX_PROMPT_LENGTH = 2000;

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as {
      prompt?: unknown;
      locale?: unknown;
    } | null;

    const prompt = body?.prompt;
    const localeRaw = body?.locale;
    const locale: Locale = (LOCALES as readonly string[]).includes(
      String(localeRaw)
    )
      ? (localeRaw as Locale)
      : "id";

    if (!prompt || typeof prompt !== "string") {
      return Response.json({ error: "Prompt is required" }, { status: 400 });
    }

    if (prompt.trim().length === 0) {
      return Response.json(
        { error: "Prompt tidak boleh kosong." },
        { status: 400 }
      );
    }

    if (prompt.length > MAX_PROMPT_LENGTH) {
      return Response.json(
        {
          error: `Prompt terlalu panjang (maks ${MAX_PROMPT_LENGTH} karakter).`,
        },
        { status: 400 }
      );
    }

    const result = await generateText({
      model: gemini("gemini-2.5-flash"),
      system: systemPrompt(locale),
      prompt: prompt.trim(),
      temperature: 0.6,
    });

    return Response.json({ text: result.text });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Terjadi kesalahan pada server.";
    console.error("[/api/chat]", message);
    return Response.json({ error: message }, { status: 500 });
  }
}