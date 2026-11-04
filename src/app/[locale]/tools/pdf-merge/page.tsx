// src/app/[locale]/tools/pdf-merge/page.tsx
"use client";

import { useEffect, useState } from "react";
import { PDFDocument } from "pdf-lib";
import {
  ArrowDown,
  ArrowUp,
  Download,
  FileText,
  Replace,
  Trash2,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDict } from "@/components/shared/locale-provider";
import { cn } from "@/lib/utils";

const MAX_FILES = 10;
const MAX_TOTAL_BYTES = 50 * 1024 * 1024;

function formatBytes(bytes: number) {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

type Tab = "merge" | "compress";

export default function PdfMergePage() {
  const dict = useDict();
  const copy = dict.tools.pdfMerge;

  /* ---------- Merge state ---------- */
  const [mergeFiles, setMergeFiles] = useState<File[]>([]);
  const [mergeResult, setMergeResult] = useState<{
    url: string;
    size: number;
  } | null>(null);
  const [mergeLoading, setMergeLoading] = useState(false);
  const [mergeError, setMergeError] = useState<string | null>(null);

  /* ---------- Compress state ---------- */
  const [compressFile, setCompressFile] = useState<File | null>(null);
  const [compressLevel, setCompressLevel] = useState<"low" | "medium" | "high">(
    "medium"
  );
  const [compressResult, setCompressResult] = useState<{
    url: string;
    originalSize: number;
    compressedSize: number;
  } | null>(null);
  const [compressLoading, setCompressLoading] = useState(false);
  const [compressError, setCompressError] = useState<string | null>(null);

  /* ---------- Tab state ---------- */
  const [tab, setTab] = useState<Tab>("merge");

  /* ---------- Cleanup ---------- */
  useEffect(
    () => () => {
      if (mergeResult?.url) URL.revokeObjectURL(mergeResult.url);
      if (compressResult?.url) URL.revokeObjectURL(compressResult.url);
    },
    [mergeResult?.url, compressResult?.url]
  );

  /* ---------- Merge handlers ---------- */
  function addFiles(selected: File[]) {
    if (selected.length === 0) return;
    setMergeError(null);
    setMergeResult(null);

    const pdfFiles = selected.filter(
      (file) =>
        file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")
    );

    const accepted = [...mergeFiles, ...pdfFiles].slice(0, MAX_FILES);
    const total = accepted.reduce((sum, file) => sum + file.size, 0);

    if (total > MAX_TOTAL_BYTES) {
      setMergeError(copy.totalTooLarge);
    } else if (mergeFiles.length + pdfFiles.length > MAX_FILES) {
      setMergeError(copy.tooManyFiles);
    } else if (pdfFiles.length !== selected.length) {
      setMergeError(copy.pdfOnly);
    }

    setMergeFiles(accepted);
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
    if (target < 0 || target >= mergeFiles.length) return;
    setMergeResult(null);
    setMergeFiles((current) => {
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function removeFile(index: number) {
    setMergeResult(null);
    setMergeFiles((current) => current.filter((_, i) => i !== index));
  }

  function clearAll() {
    setMergeResult(null);
    setMergeError(null);
    setMergeFiles([]);
  }

  async function handleMerge() {
    if (mergeFiles.length < 2) {
      setMergeError(copy.needMore);
      return;
    }

    setMergeLoading(true);
    setMergeError(null);
    setMergeResult(null);

    try {
      const merged = await PDFDocument.create();

      for (const file of mergeFiles) {
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

      setMergeResult({ url: URL.createObjectURL(blob), size: blob.size });
    } catch (err) {
      console.error("[pdf-merge]", err);
      setMergeError(copy.error);
    } finally {
      setMergeLoading(false);
    }
  }

  const totalSize = mergeFiles.reduce((sum, file) => sum + file.size, 0);

  /* ---------- Compress handlers ---------- */
  function handleCompressFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    e.target.value = "";
    setCompressFile(file);
    setCompressError(null);
    setCompressResult(null);
  }

  function handleCompressDrop(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0] ?? null;
    if (!file) return;

    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      setCompressError(copy.pdfOnly);
      return;
    }

    setCompressFile(file);
    setCompressError(null);
    setCompressResult(null);
  }

  async function handleCompress() {
    if (!compressFile) {
      setCompressError(copy.compress.needFile);
      return;
    }

    setCompressLoading(true);
    setCompressError(null);
    setCompressResult(null);

    try {
      const bytes = await compressFile.arrayBuffer();
      const source = await PDFDocument.load(bytes, {
        ignoreEncryption: true,
      });

      const saveOptions =
        compressLevel === "high"
          ? { useObjectStreams: true, addDefaultPage: false }
          : compressLevel === "medium"
            ? { useObjectStreams: true }
            : {};

      const pdfBytes = await source.save(saveOptions);
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], {
        type: "application/pdf",
      });

      setCompressResult({
        url: URL.createObjectURL(blob),
        originalSize: compressFile.size,
        compressedSize: blob.size,
      });
    } catch (err) {
      console.error("[pdf-compress]", err);
      setCompressError(copy.error);
    } finally {
      setCompressLoading(false);
    }
  }

  const compressionPercent =
    compressResult && compressResult.originalSize > 0
      ? Math.max(
          0,
          Math.min(
            100,
            ((compressResult.originalSize - compressResult.compressedSize) /
              compressResult.originalSize) *
              100
          )
        )
      : 0;

  /* ---------- Render ---------- */
  return (
    <Container className="py-16 sm:py-24">
      <div className="max-w-2xl animate-fade-in-up">
        <Badge>{dict.tools.badge}</Badge>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
          {tab === "merge" ? copy.title : copy.compress.title}
        </h1>
        <p className="mt-3 text-muted-foreground">
          {tab === "merge" ? copy.description : copy.compress.description}
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-2 animate-fade-in-up delay-100">
        {[
          { id: "merge" as const, label: copy.tabMerge },
          { id: "compress" as const, label: copy.tabCompress },
        ].map((t) => (
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
        {tab === "merge" ? (
          /* ============ Merge Panel ============ */
          <div className="rounded-2xl border border-border p-6">
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

            {mergeFiles.length > 0 && (
              <div className="mt-6 overflow-hidden rounded-2xl border border-border">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/20 px-4 py-3">
                  <p className="text-sm font-medium">
                    {copy.selectedFiles.replace(
                      "{count}",
                      String(mergeFiles.length)
                    )}
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
                  {mergeFiles.map((file, index) => (
                    <li
                      key={`${file.name}-${file.size}-${file.lastModified}-${index}`}
                      className="flex items-center gap-3 px-4 py-3"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          {file.name}
                        </p>
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
                          disabled={index === mergeFiles.length - 1}
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

            {mergeFiles.length === 1 && !mergeError && (
              <p className="mt-4 text-xs text-muted-foreground">
                {copy.needMore}
              </p>
            )}

            {mergeError && (
              <p className="mt-4 text-sm text-red-500">{mergeError}</p>
            )}

            <div className="mt-6">
              <Button
                onClick={handleMerge}
                disabled={
                  mergeLoading ||
                  mergeFiles.length < 2 ||
                  totalSize > MAX_TOTAL_BYTES
                }
              >
                {mergeLoading ? copy.merging : copy.merge}
              </Button>
            </div>

            {mergeResult && (
              <div className="mt-6 rounded-xl border border-border bg-muted/30 p-4">
                <p className="text-sm">
                  {dict.common.result}{" "}
                  <strong>{formatBytes(mergeResult.size)}</strong> (.pdf)
                </p>
                <a
                  href={mergeResult.url}
                  download="merged.pdf"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-foreground underline underline-offset-4 hover:opacity-70"
                >
                  <Download className="h-4 w-4" />
                  {dict.common.downloadPdf}
                </a>
              </div>
            )}
          </div>
        ) : (
          /* ============ Compress Panel ============ */
          <div className="rounded-2xl border border-border p-6 sm:p-8">
            <div className="space-y-6">
              {/* File picker */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  {copy.compress.fileLabel}
                </label>

                <label
                  htmlFor="pdf-compress-input"
                  onDrop={handleCompressDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-8 text-center transition-colors hover:border-foreground/30 hover:bg-muted/40"
                >
                  <FileText className="h-8 w-8 text-muted-foreground" />
                  <span className="mt-3 text-sm font-medium">
                    {compressFile ? compressFile.name : copy.compress.fileHint}
                  </span>
                  {compressFile && (
                    <span className="mt-1 text-xs text-muted-foreground">
                      {formatBytes(compressFile.size)} ·{" "}
                      {copy.compress.fileHint}
                    </span>
                  )}
                </label>
                <input
                  id="pdf-compress-input"
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={handleCompressFile}
                  className="sr-only"
                />

                {compressFile && (
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <p className="text-xs text-muted-foreground">
                      {compressFile.name} · {formatBytes(compressFile.size)}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setCompressFile(null);
                        setCompressResult(null);
                        setCompressError(null);
                      }}
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                    >
                      <Replace className="h-3 w-3" />
                      {dict.common.clear}
                    </button>
                  </div>
                )}
              </div>

              {/* Compression level */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  {copy.compress.levelLabel}
                </label>
                <div className="flex gap-2">
                  {(["low", "medium", "high"] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setCompressLevel(level)}
                      className={cn(
                        "flex-1 rounded-lg border px-3 py-2 text-sm transition-colors",
                        compressLevel === level
                          ? "border-accent bg-accent text-accent-foreground"
                          : "border-border hover:bg-muted"
                      )}
                    >
                      {copy.compress[level]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <Button
                onClick={handleCompress}
                disabled={compressLoading || !compressFile}
              >
                {compressLoading
                  ? copy.compress.compressing
                  : copy.compress.compress}
              </Button>

              {compressError && (
                <p className="text-sm text-red-500">{compressError}</p>
              )}
            </div>

            {compressResult && (
              <div className="mt-6 rounded-xl border border-border bg-muted/30 p-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {copy.compress.originalSize}
                    </span>
                    <span className="font-mono">
                      {formatBytes(compressResult.originalSize)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {copy.compress.compressedSize}
                    </span>
                    <span className="font-mono text-foreground">
                      {formatBytes(compressResult.compressedSize)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {copy.compress.saved}
                    </span>
                    <span className="font-semibold text-emerald-600">
                      {compressionPercent.toFixed(0)}%
                    </span>
                  </div>
                  <a
                    href={compressResult.url}
                    download="compressed.pdf"
                    className="inline-flex items-center gap-2 text-sm font-medium text-foreground underline underline-offset-4 hover:opacity-70"
                  >
                    <Download className="h-4 w-4" />
                    {copy.compress.download}
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Container>
  );
}