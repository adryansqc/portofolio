// src/app/tools/image-tools/_components/compress-tab.tsx
"use client";

import { useState } from "react";
import { sinter } from "sinter-js";
import { Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CompressTab() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<{ url: string; size: number; original: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCompress() {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const blob = await sinter()
        .keepFormat()
        .maxQuality(80)
        .maxDimensions({ width: 1920 }) // Catatan: nama method berubah jadi maxDimensions
        .compress(file);

      setResult({
        url: URL.createObjectURL(blob),
        size: blob.size,
        original: file.size,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal kompres gambar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-border p-6">
      <h2 className="text-lg font-semibold">Kompres Gambar</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Kecilkan ukuran file dengan mengurangi kualitas dan/atau resolusi.
      </p>

      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        onChange={(e) => {
          setFile(e.target.files?.[0] ?? null);
          setResult(null);
        }}
        className="mt-6 block w-full text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-foreground file:px-4 file:py-2 file:text-background"
      />

      {file && (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button onClick={handleCompress} disabled={loading}>
            <Upload className="h-4 w-4" />
            {loading ? "Memproses..." : "Kompres"}
          </Button>
          <span className="text-xs text-muted-foreground">
            Original: {(file.size / 1024).toFixed(1)} KB
          </span>
        </div>
      )}

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

      {result && (
        <div className="mt-6 rounded-xl border border-border bg-muted/30 p-4">
          <p className="text-sm">
            Hasil: <strong>{(result.size / 1024).toFixed(1)} KB</strong>{" "}
            <span className="text-muted-foreground">
              (dari {(result.original / 1024).toFixed(1)} KB, hemat{" "}
              {(((result.original - result.size) / result.original) * 100).toFixed(1)}%)
            </span>
          </p>
          <a
            href={result.url}
            download={`compressed-${file?.name ?? "image"}`}
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