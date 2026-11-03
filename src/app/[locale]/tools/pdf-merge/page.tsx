// src/app/[locale]/tools/pdf-merge/page.tsx
"use client";

import { useEffect, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { ArrowDown, ArrowUp, Download, FileText, Trash2 } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDict } from "@/components/shared/locale-provider";

const MAX_FILES = 10;
const MAX_TOTAL_BYTES = 50 * 1024 * 1024;

function formatBytes(bytes: number) {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

export default function PdfMergePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [result, setResult] = useState<{ url: string; size: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dict = useDict();
  const copy = dict.tools.pdfMerge;

  useEffect(
    () => () => {
      if (result?.url) URL.revokeObjectURL(result.url);
    },
    [result?.url]
  );

  function addFiles(selected: File[]) {
    if (selected.length === 0) return;
    setError(null);
    setResult(null);

    const pdfFiles = selected.filter(
      (file) =>
        file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")
    );

    const accepted = [...files, ...pdfFiles].slice(0, MAX_FILES);
    const total = accepted.reduce((sum, file) => sum + file.size, 0);

    if (total > MAX_TOTAL_BYTES) {
      setError(copy.totalTooLarge);
    } else if (files.length + pdfFiles.length > MAX_FILES) {
      setError(copy.tooManyFiles);
    } else if (pdfFiles.length !== selected.length) {
      setError(copy.pdfOnly);
    }

    setFiles(accepted);
  }

  function handleAdd(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? []);
    e.target.value = "";
    addFiles(selected);
  }

  function handleDrop(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    addFiles(Array.from(e.dataTransfer.files ?? []));
  }

  function handleDragOver(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
  }

  function moveFile(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= files.length) return;
    setResult(null);
    setFiles((current) => {
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function removeFile(index: number) {
    setResult(null);
    setFiles((current) => current.filter((_, i) => i !== index));
  }

  function clearAll() {
    setResult(null);
    setError(null);
    setFiles([]);
  }

  async function handleMerge() {
    if (files.length < 2) {
      setError(copy.needMore);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const merged = await PDFDocument.create();

      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const source = await PDFDocument.load(bytes, { ignoreEncryption: true });
        const copiedPages = await merged.copyPages(
          source,
          source.getPageIndices()
        );
        copiedPages.forEach((page) => merged.addPage(page));
      }

      const pdfBytes = await merged.save();
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], {
        type: "application/pdf",
      });

      setResult({ url: URL.createObjectURL(blob), size: blob.size });
    } catch (err) {
      console.error("[pdf-merge]", err);
      setError(copy.error);
    } finally {
      setLoading(false);
    }
  }

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);

  return (
    <Container className="py-16 sm:py-24">
      <div className="max-w-2xl animate-fade-in-up">
        <Badge>{dict.tools.badge}</Badge>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
          {copy.title}
        </h1>
        <p className="mt-3 text-muted-foreground">{copy.description}</p>
      </div>

      <div className="mt-10 rounded-2xl border border-border p-6 animate-fade-in-up delay-100">
        <label
          htmlFor="pdf-merge-input"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-10 text-center transition-colors hover:border-foreground/30 hover:bg-muted/40"
        >
          <FileText className="h-8 w-8 text-muted-foreground" />
          <span className="mt-3 text-sm font-medium">{copy.addFiles}</span>
          <span className="mt-1 text-xs text-muted-foreground">
            {copy.addFilesHint}
          </span>
        </label>
        <input
          id="pdf-merge-input"
          type="file"
          accept="application/pdf,.pdf"
          multiple
          onChange={handleAdd}
          className="sr-only"
        />

        {files.length > 0 && (
          <div className="mt-6 overflow-hidden rounded-2xl border border-border">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/20 px-4 py-3">
              <p className="text-sm font-medium">
                {copy.selectedFiles.replace("{count}", String(files.length))}
                <span className="ml-2 font-normal text-muted-foreground">
                  ({formatBytes(totalSize)})
                </span>
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {dict.common.clear}
              </button>
            </div>
            <ul className="divide-y divide-border">
              {files.map((file, index) => (
                <li
                  key={`${file.name}-${file.size}-${file.lastModified}-${index}`}
                  className="flex items-center gap-3 px-4 py-3"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatBytes(file.size)}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveFile(index, -1)}
                      disabled={index === 0}
                      aria-label={dict.aria.moveFileUp}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveFile(index, 1)}
                      disabled={index === files.length - 1}
                      aria-label={dict.aria.moveFileDown}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      aria-label={dict.aria.removeFile}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {files.length === 1 && !error && (
          <p className="mt-4 text-xs text-muted-foreground">{copy.needMore}</p>
        )}

        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

        <div className="mt-6">
          <Button
            onClick={handleMerge}
            disabled={loading || files.length < 2 || totalSize > MAX_TOTAL_BYTES}
          >
            {loading ? copy.merging : copy.merge}
          </Button>
        </div>

        {result && (
          <div className="mt-6 rounded-xl border border-border bg-muted/30 p-4">
            <p className="text-sm">
              {dict.common.result}{" "}
              <strong>{formatBytes(result.size)}</strong> (.pdf)
            </p>
            <a
              href={result.url}
              download="merged.pdf"
              className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-foreground underline underline-offset-4 hover:opacity-70"
            >
              <Download className="h-4 w-4" />
              {dict.common.downloadPdf}
            </a>
          </div>
        )}
      </div>
    </Container>
  );
}
