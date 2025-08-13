// app/api/chat/route.ts
import { generateText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

const gemini = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || '', // Ambil dari .env.local
});

export const runtime = 'edge'; // Biar cepat

export async function POST(req: Request) {
  try {
    const { prompt } = (await req.json()) as { prompt?: string };

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = await generateText({
      model: gemini('gemini-2.0-flash'), // Model Gemini
      prompt,
    });

    return new Response(JSON.stringify({ text: result.text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    let message = 'Unknown error';
    if (err instanceof Error) {
      message = err.message;
    }
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
