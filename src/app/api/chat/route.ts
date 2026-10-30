// src/app/api/chat/route.ts
import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { PROJECTS, SITE, SOCIALS } from "@/lib/constants";

const gemini = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

export const runtime = "edge";

const SYSTEM_PROMPT = `Kamu adalah AI assistant pribadi milik ${SITE.name}, seorang ${SITE.role}.

Tugasmu:
- Menjawab pertanyaan pengunjung tentang ${SITE.name}, skill, project, dan pengalaman.
- Ramah, ringkas, dan helpful. Bahasa default: Indonesia. Jika user pakai bahasa Inggris, jawab dalam bahasa Inggris.
- Jangan pernah mengarang informasi yang tidak ada di data di bawah.
- Jika user bertanya hal di luar konteks portofolio (misalnya politik, medis, dsb), arahkan kembali dengan sopan.
- Jika user ingin kontak/hire, arahkan ke email atau LinkedIn.

Data ${SITE.name}:
- Role: ${SITE.role}
- Tagline: ${SITE.tagline}
- Deskripsi: ${SITE.description}
- Status: ${SITE.available ? "Available for freelance" : "Not available"}

Project:
${PROJECTS.map(
  (p) =>
    `- ${p.title} (${p.year}, ${p.category}, ${p.status}): ${p.description} [Tech: ${p.tech.join(", ")}]${p.demo ? ` [Demo: ${p.demo}]` : ""}`
).join("\n")}

Kontak:
${SOCIALS.map((s) => `- ${s.label}: ${s.href}`).join("\n")}

Gaya jawaban:
- Ringkas. Maksimal 3-4 kalimat kecuali diminta detail.
- Pakai markdown kalau perlu (bullet list, bold).
- Jangan pakai emoji berlebihan.`;

export async function POST(req: Request) {
  try {
    const { prompt } = (await req.json()) as { prompt?: string };

    if (!prompt || typeof prompt !== "string") {
      return Response.json({ error: "Prompt is required" }, { status: 400 });
    }

    if (prompt.length > 2000) {
      return Response.json(
        { error: "Prompt terlalu panjang (maks 2000 karakter)." },
        { status: 400 }
      );
    }

    const result = await generateText({
      model: gemini("gemini-2.5-flash"),
      system: SYSTEM_PROMPT,
      prompt,
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