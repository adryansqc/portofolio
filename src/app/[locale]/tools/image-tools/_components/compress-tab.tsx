// src/app/[locale]/tools/image-tools/_components/compress-tab.tsx
"use client";

import { useState } from "react";
import { sinter } from "sinter-js";
import { Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDict } from "@/components/shared/locale-provider";

export function CompressTab() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<{ url: string; size: number; original: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dict = useDict();
  const copy = dict.tools.imageTools.compress;

  async function handleCompress() {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const blob = await sinter()
        .keepFormat()
        .maxQuality(80)
        .maxDimensions({ width: 1920 })
        .compress(file);

      setResult({
        url: URL.createObjectURL(blob),
        size: blob.size,
        original: file.size,
      });
    } catch (err) {
      console.error("[compress-tab]", err);
      setError(copy.error);
    } finally {
      setLoading(false);
    }
  }

  const savedPercent = result
    ? (((result.original - result.size) / result.original) * 100).toFixed(1)
    : null;

  return (
    <div className="rounded-2xl border border-border p-6">
      <h2 className="text-lg font-semibold">{copy.title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{copy.description}</p>

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
            {loading ? copy.processing : copy.action}
          </Button>
          <span className="text-xs text-muted-foreground">
            {dict.common.original} {(file.size / 1024).toFixed(1)} KB
          </span>
        </div>
      )}

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

      {result && savedPercent && (
        <div className="mt-6 rounded-xl border border-border bg-muted/30 p-4">
          <p className="text-sm">
            {dict.common.result} <strong>{(result.size / 1024).toFixed(1)} KB</strong>{" "}
            <span className="text-muted-foreground">
              ({dict.common.from} {(result.original / 1024).toFixed(1)} KB,{" "}
              {dict.common.savedPercent.replace("{percent}", savedPercent)})
            </span>
          </p>
          <a
            href={result.url}
            download={`compressed-${file?.name ?? "image"}`}
            className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-foreground underline underline-offset-4 hover:opacity-70"
          >
            <Download className="h-4 w-4" />
            {copy.download}
          </a>
        </div>
      )}
    </div>
  );
}
