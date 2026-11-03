# Adryan — Portfolio

Personal portfolio website for Adryan, a Full Stack Developer. Built with Next.js App Router, TypeScript, Tailwind CSS v4, and localized in Indonesian (`id`, default) and English (`en`).

## Tech Stack

- Next.js 15 (App Router, Turbopack in dev)
- React 19, TypeScript (strict)
- Tailwind CSS v4
- `next/font` (Geist Sans / Geist Mono)
- AI SDK + Google Gemini for the chat assistant (`/api/chat`)
- Browser-only tools: ID photo maker, PDF merge, image compression/conversion, image-to-PDF, QR generator, password generator, Base64 encoder/decoder

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000 (middleware redirects to `/id` or `/en`).

## Environment Variables

Create `.env.local` (ignored by git):

```bash
GEMINI_API_KEY=your_google_ai_key
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

- `GEMINI_API_KEY` — required for the AI chat route. Without it, the site still builds/runs; `/api/chat` returns a localized error.
- `NEXT_PUBLIC_SITE_URL` — optional; used for canonical URLs, OpenGraph, sitemap, and robots. Defaults to `https://portofolio-adryan.vercel.app`.

## Scripts

- `npm run dev` — start dev server with Turbopack
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — lint with ESLint

## Routes

All public pages are localized under `/[locale]`:

- `/{locale}` — home
- `/{locale}/about` — about
- `/{locale}/projects` — projects grid
- `/{locale}/projects/{slug}` — project detail (statically generated)
- `/{locale}/tools/id-photo` — ID photo maker with crop/resize and optional background removal
- `/{locale}/tools/pdf-merge` — merge multiple PDFs in the browser
- `/{locale}/tools/image-tools` — compress/convert/PDF tools
- `/{locale}/tools/qr-generator`
- `/{locale}/tools/password-generator`
- `/{locale}/tools/base64`
- `/api/chat` — AI chat endpoint (POST, edge runtime)

`robots.txt` and `sitemap.xml` are generated from `src/app/robots.ts` and `src/app/sitemap.ts`.

## Project Structure

- `src/app/[locale]` — localized routes and layouts
- `src/app/api/chat` — Gemini-backed chat API
- `src/components` — layout, sections, shared providers, UI primitives, chat widget
- `src/i18n` — locale config, dictionaries, project content
- `src/lib` — site constants, project metadata, utilities, fonts
- `public` — local images and CV

## Deployment

Deploy on Vercel. Set `GEMINI_API_KEY` and `NEXT_PUBLIC_SITE_URL` in the project environment variables. All tools run client-side; no uploaded files leave the browser.
