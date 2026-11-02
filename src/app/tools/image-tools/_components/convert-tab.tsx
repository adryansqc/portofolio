// src/app/tools/image-tools/_components/convert-tab.tsx
"use client";

import { useState } from "react";
import { sinter } from "sinter-js";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FORMATS = [
  { value: "webp", label: "WebP", mime: "image/webp" },
  { value: "avif", label: "AVIF", mime: "image/avif" },
  { value: "jpeg", label: "JPEG", mime: "image/jpeg" },
  { value: "png", label: "PNG", mime: "image/png" },
] as const;

type TargetFormat = (typeof FORMATS)[number]["value"];

export function ConvertTab() {
  const [file, setFile] = useState<File | null>(null);
  const [target, setTarget] = useState<TargetFormat>("webp");
  const [result, setResult] = useState<{ url: string; size: number; ext: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleConvert() {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const format = FORMATS.find((f) => f.value === target)!;
      const blob = await sinter()
        .toFormat(target)
        .maxQuality(85)
        .compress(file);

      setResult({
        url: URL.createObjectURL(blob),
        size: blob.size,
        ext: format.mime.split("/")[1],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal konversi gambar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-border p-6">
      <h2 className="text-lg font-semibold">Ubah Format Gambar</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Konversi gambar ke format modern seperti WebP atau AVIF.
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          setFile(e.target.files?.[0] ?? null);
          setResult(null);
        }}
        className="mt-6 block w-full text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-foreground file:px-4 file:py-2 file:text-background"
      />

      {file && (
        <>
          <div className="mt-4 flex flex-wrap gap-2">
            {FORMATS.map((f) => (
              <button
                key={f.value}
                onClick={() => setTarget(f.value)}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
                  target === f.value
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-foreground/30"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button onClick={handleConvert} disabled={loading}>
              {loading ? "Memproses..." : `Konversi ke ${target.toUpperCase()}`}
            </Button>
            <span className="text-xs text-muted-foreground">
              Original: {(file.size / 1024).toFixed(1)} KB
            </span>
          </div>
        </>
      )}

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

      {result && (
        <div className="mt-6 rounded-xl border border-border bg-muted/30 p-4">
          <p className="text-sm">
            Hasil: <strong>{(result.size / 1024).toFixed(1)} KB</strong>
            <span className="text-muted-foreground"> (.{result.ext})</span>
          </p>
          <a
            href={result.url}
            download={`converted.${result.ext}`}
            className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-foreground underline underline-offset-4 hover:opacity-70"
          >
            <Download className="h-4 w-4" />
            Download Hasil
          </a>
        </div>
      )}
    </div>
  );
}