// src/app/[locale]/tools/image-tools/_components/pdf-tab.tsx
"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDict } from "@/components/shared/locale-provider";

export function PdfTab() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<{ url: string; size: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dict = useDict();
  const copy = dict.tools.imageTools.pdf;

  async function handleConvert() {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const bytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.create();

      let image;
      if (file.type === "image/png") {
        image = await pdfDoc.embedPng(bytes);
      } else if (file.type === "image/jpeg" || file.type === "image/jpg") {
        image = await pdfDoc.embedJpg(bytes);
      } else {
        const pngBlob = await convertToPng(file);
        const pngBytes = await pngBlob.arrayBuffer();
        image = await pdfDoc.embedPng(pngBytes);
      }

      const page = pdfDoc.addPage([image.width, image.height]);
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });

      setResult({
        url: URL.createObjectURL(blob),
        size: blob.size,
      });
    } catch (err) {
      console.error("[pdf-tab]", err);
      setError(copy.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-border p-6">
      <h2 className="text-lg font-semibold">{copy.title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{copy.description}</p>

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
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button onClick={handleConvert} disabled={loading}>
            {loading ? copy.processing : copy.action}
          </Button>
          <span className="text-xs text-muted-foreground">
            {dict.common.original} {(file.size / 1024).toFixed(1)} KB
          </span>
        </div>
      )}

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

      {result && (
        <div className="mt-6 rounded-xl border border-border bg-muted/30 p-4">
          <p className="text-sm">
            {dict.common.result} <strong>{(result.size / 1024).toFixed(1)} KB</strong> (.pdf)
          </p>
          <a
            href={result.url}
            download="converted.pdf"
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

async function convertToPng(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(bitmap, 0, 0);
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("convert failed"))), "image/png");
  });
}
