// src/app/tools/image-tools/page.tsx
"use client";

import { useState } from "react";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { CompressTab } from "./_components/compress-tab";
import { ConvertTab } from "./_components/convert-tab";
import { PdfTab } from "./_components/pdf-tab";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "compress", label: "Kompres" },
  { id: "convert", label: "Ubah Format" },
  { id: "pdf", label: "Ke PDF" },
] as const;

type Tab = (typeof TABS)[number]["id"];

export default function ImageToolsPage() {
  const [tab, setTab] = useState<Tab>("compress");

  return (
    <Container className="py-16 sm:py-24">
      <div className="max-w-2xl animate-fade-in-up">
        <Badge>Tools</Badge>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
          Image Tools
        </h1>
        <p className="mt-3 text-muted-foreground">
          Kompres, ubah format, atau konversi gambar ke PDF. Semua diproses di
          browser kamu — gambar tidak dikirim ke server.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-2 animate-fade-in-up delay-100">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              tab === t.id
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8 animate-fade-in-up delay-200">
        {tab === "compress" && <CompressTab />}
        {tab === "convert" && <ConvertTab />}
        {tab === "pdf" && <PdfTab />}
      </div>
    </Container>
  );
}