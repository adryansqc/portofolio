// src/app/api/chat/route.ts
import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { SITE, SOCIALS, getProjects } from "@/lib/constants";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const gemini = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

export const runtime = "edge";

const contactContext = SOCIALS.map((s) => `- ${s.label}: ${s.href}`).join("\n");

function projectContext(locale: Locale) {
  return getProjects(locale)
    .map((p) => {
      const lines =
        locale === "en"
          ? [
              `### ${p.title} (${p.year})`,
              `- Category: ${p.category} • Status: ${dictStatus(p.status, locale)}`,
              `- Description: ${p.description}`,
              `- Tech: ${p.tech.join(", ")}`,
              `- Problem: ${p.detail.problem}`,
              `- Role: ${p.detail.role}`,
              `- Challenge: ${p.detail.challenge}`,
              `- Outcome: ${p.detail.outcome}`,
            ]
          : [
              `### ${p.title} (${p.year})`,
              `- Kategori: ${p.category} • Status: ${dictStatus(p.status, locale)}`,
              `- Deskripsi: ${p.description}`,
              `- Tech: ${p.tech.join(", ")}`,
              `- Masalah: ${p.detail.problem}`,
              `- Peran: ${p.detail.role}`,
              `- Tantangan: ${p.detail.challenge}`,
              `- Hasil: ${p.detail.outcome}`,
            ];
      if (p.demo) lines.push(locale === "en" ? `- Demo: ${p.demo}` : `- Demo: ${p.demo}`);
      return lines.join("\n");
    })
    .join("\n\n");
}

function dictStatus(status: "Live" | "Local", locale: Locale) {
  if (locale === "en") return status;
  return status === "Live" ? "Live" : "Lokal";
}

function systemPrompt(locale: Locale) {
  const dict = getDictionary(locale);
  const projects = projectContext(locale);
  const available = SITE.available
    ? locale === "en"
      ? "Available for freelance"
      : "Tersedia untuk freelance"
    : locale === "en"
      ? "Not available for freelance"
      : "Tidak tersedia untuk freelance";

  if (locale === "en") {
    return `You are ${SITE.name}'s personal AI assistant, a ${SITE.role}.

## Language
Always answer in English because the visitor selected English.
If the user writes in another language, follow the user's language.

## Task
- Answer visitors' questions about ${SITE.name}, skills, projects, and experience.
- Be friendly, concise, and helpful.
- Never invent information that is not in the data below.
- If the user asks about things outside the portfolio (politics, medical advice, etc.), politely steer back to the portfolio.
- If the user wants to contact/hire ${SITE.name}, direct them to email or LinkedIn.

## About ${SITE.name}
- Role: ${SITE.role}
- Description: ${dict.hero.description}
- Status: ${available}

## Projects
${projects}

## Contact
${contactContext}

## Answer Style
- Concise. Maximum 3-4 sentences unless the user asks for detail.
- Use markdown if helpful (bullet list, **bold**).
- Avoid excessive emoji.
- When referring to a project, mention its name and year.`;
  }

  return `Kamu adalah AI assistant pribadi milik ${SITE.name}, seorang ${SITE.role}.

## Bahasa
Selalu jawab dalam bahasa Indonesia, karena pengunjung memilih bahasa Indonesia.
Jika user menulis dalam bahasa lain, ikuti bahasa user.

## Tugas
- Menjawab pertanyaan pengunjung tentang ${SITE.name}, skill, proyek, dan pengalaman.
- Ramah, ringkas, dan helpful.
- Jangan pernah mengarang informasi yang tidak ada di data di bawah.
- Jika user bertanya hal di luar konteks portofolio (politik, medis, dsb), arahkan kembali dengan sopan.
- Jika user ingin kontak/hire, arahkan ke email atau LinkedIn.

## Data ${SITE.name}
- Role: ${SITE.role}
- Deskripsi: ${dict.hero.description}
- Status: ${available}

## Daftar Proyek
${projects}

## Kontak
${contactContext}

## Gaya Jawaban
- Ringkas. Maksimal 3-4 kalimat kecuali user minta detail.
- Pakai markdown kalau perlu (bullet list, **bold**).
- Jangan pakai emoji berlebihan.
- Kalau mereferensikan proyek, sebut nama & tahunnya.`;
}

const MAX_PROMPT_LENGTH = 2000;

export async function POST(req: Request) {
  let locale: Locale = DEFAULT_LOCALE;

  try {
    const body = (await req.json().catch(() => null)) as {
      prompt?: unknown;
      locale?: unknown;
    } | null;

    const prompt = body?.prompt;
    const localeRaw = body?.locale;
    locale = isLocale(String(localeRaw))
      ? (String(localeRaw) as Locale)
      : DEFAULT_LOCALE;
    const dict = getDictionary(locale);

    if (!prompt || typeof prompt !== "string") {
      return Response.json({ error: dict.chat.promptRequired }, { status: 400 });
    }

    if (prompt.trim().length === 0) {
      return Response.json({ error: dict.chat.promptEmpty }, { status: 400 });
    }

    if (prompt.length > MAX_PROMPT_LENGTH) {
      return Response.json(
        {
          error: dict.chat.promptTooLong.replace("{max}", String(MAX_PROMPT_LENGTH)),
        },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error("[/api/chat] GEMINI_API_KEY is not set");
      return Response.json({ error: dict.chat.unknownError }, { status: 500 });
    }

    const result = await generateText({
      model: gemini("gemini-2.5-flash"),
      system: systemPrompt(locale),
      prompt: prompt.trim(),
      temperature: 0.6,
    });

    return Response.json({ text: result.text });
  } catch (err: unknown) {
    const dict = getDictionary(locale);
    console.error("[/api/chat]", err);
    return Response.json({ error: dict.chat.unknownError }, { status: 500 });
  }
}
