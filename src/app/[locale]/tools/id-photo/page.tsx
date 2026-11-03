// src/app/[locale]/tools/id-photo/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Image as ImageIcon, Pipette, Trash2, Upload, X } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDict } from "@/components/shared/locale-provider";
import { cn } from "@/lib/utils";

const PRESETS = [
  { id: "2x3", wCm: 2, hCm: 3, wPx: 236, hPx: 354 },
  { id: "3x4", wCm: 3, hCm: 4, wPx: 354, hPx: 472 },
  { id: "4x6", wCm: 4, hCm: 6, wPx: 472, hPx: 709 },
] as const;

const BACKGROUNDS = [
  { id: "white", hex: "#ffffff" },
  { id: "red", hex: "#ff0000" },
  { id: "blue", hex: "#0000ff" },
  { id: "transparent", hex: null },
] as const;

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_SOURCE_DIMENSION = 1400;

type PresetId = (typeof PRESETS)[number]["id"];
type BackgroundId = (typeof BACKGROUNDS)[number]["id"];
type Crop = { x: number; y: number; width: number; height: number };
type SourceImage = {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  name: string;
};

function getBaseCrop(width: number, height: number, aspect: number): Crop {
  let cropW = width;
  let cropH = cropW / aspect;

  if (cropH > height) {
    cropH = height;
    cropW = cropH * aspect;
  }

  return {
    x: (width - cropW) / 2,
    y: (height - cropH) / 2,
    width: cropW,
    height: cropH,
  };
}

function clampCrop(crop: Crop, width: number, height: number): Crop {
  return {
    ...crop,
    x: Math.min(Math.max(0, crop.x), width - crop.width),
    y: Math.min(Math.max(0, crop.y), height - crop.height),
  };
}

type Rgb = { r: number; g: number; b: number };

function cornerAverage(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  originX: number,
  originY: number
): Rgb | null {
  const size = Math.max(4, Math.floor(Math.min(width, height) * 0.02));
  let r = 0;
  let g = 0;
  let b = 0;
  let count = 0;

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const px = originX + x;
      const py = originY + y;
      const i = (py * width + px) * 4;
      if (data[i + 3] < 10) continue;
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
      count += 1;
    }
  }

  return count > 0 ? { r: r / count, g: g / count, b: b / count } : null;
}

function getAutoSeeds(data: Uint8ClampedArray, width: number, height: number): Rgb[] {
  const seeds = [
    cornerAverage(data, width, height, 0, 0),
    cornerAverage(data, width, height, width - Math.max(4, Math.floor(Math.min(width, height) * 0.02)), 0),
    cornerAverage(data, width, height, 0, height - Math.max(4, Math.floor(Math.min(width, height) * 0.02))),
    cornerAverage(
      data,
      width,
      height,
      width - Math.max(4, Math.floor(Math.min(width, height) * 0.02)),
      height - Math.max(4, Math.floor(Math.min(width, height) * 0.02))
    ),
  ].filter((seed): seed is Rgb => seed !== null);

  const clusters: Rgb[] = [];
  for (const seed of seeds) {
    const match = clusters.find((cluster) => colorDistance(seed.r, seed.g, seed.b, cluster) < 70);
    if (!match) clusters.push(seed);
  }

  return clusters.length > 0 ? clusters : seeds.slice(0, 1);
}

function colorDistance(
  r: number,
  g: number,
  b: number,
  bg: { r: number; g: number; b: number }
) {
  const dr = r - bg.r;
  const dg = g - bg.g;
  const db = b - bg.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

function colorDistanceDirect(
  aR: number,
  aG: number,
  aB: number,
  bR: number,
  bG: number,
  bB: number
) {
  const dr = aR - bR;
  const dg = aG - bG;
  const db = aB - bB;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

function removeBackground(
  source: HTMLCanvasElement,
  threshold: number,
  picked: Rgb | null
) {
  const canvas = document.createElement("canvas");
  canvas.width = source.width;
  canvas.height = source.height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return canvas;

  ctx.drawImage(source, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const width = canvas.width;
  const height = canvas.height;
  const seeds = picked ? [picked] : getAutoSeeds(data, width, height);
  if (seeds.length === 0) return canvas;

  const accepted = new Uint8Array(width * height);
  const queue = new Int32Array(width * height);
  let head = 0;
  let tail = 0;
  const edgeTolerance = Math.max(28, threshold * 0.55);

  const isNearSeed = (index: number) => {
    const offset = index * 4;
    return seeds.some(
      (seed) => colorDistance(data[offset], data[offset + 1], data[offset + 2], seed) <= threshold
    );
  };

  const enqueueIfNeeded = (index: number) => {
    if (accepted[index]) return;
    if (!isNearSeed(index)) return;
    accepted[index] = 1;
    queue[tail] = index;
    tail += 1;
  };

  for (let x = 0; x < width; x += 1) {
    enqueueIfNeeded(x);
    enqueueIfNeeded((height - 1) * width + x);
  }
  for (let y = 0; y < height; y += 1) {
    enqueueIfNeeded(y * width);
    enqueueIfNeeded(y * width + width - 1);
  }

  const tryNeighbor = (from: number, neighbor: number) => {
    if (accepted[neighbor]) return;
    const fromOffset = from * 4;
    const neighborOffset = neighbor * 4;
    if (data[neighborOffset + 3] < 10) {
      accepted[neighbor] = 1;
      queue[tail] = neighbor;
      tail += 1;
      return;
    }
    const distance = colorDistanceDirect(
      data[fromOffset],
      data[fromOffset + 1],
      data[fromOffset + 2],
      data[neighborOffset],
      data[neighborOffset + 1],
      data[neighborOffset + 2]
    );
    if (distance <= edgeTolerance || isNearSeed(neighbor)) {
      accepted[neighbor] = 1;
      queue[tail] = neighbor;
      tail += 1;
    }
  };

  while (head < tail) {
    const index = queue[head];
    head += 1;
    const x = index % width;
    const y = Math.floor(index / width);

    if (x > 0) tryNeighbor(index, index - 1);
    if (x < width - 1) tryNeighbor(index, index + 1);
    if (y > 0) tryNeighbor(index, index - width);
    if (y < height - 1) tryNeighbor(index, index + width);
  }

  for (let index = 0; index < accepted.length; index += 1) {
    if (accepted[index]) data[index * 4 + 3] = 0;
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

export default function IdPhotoPage() {
  const [source, setSource] = useState<SourceImage | null>(null);
  const [presetId, setPresetId] = useState<PresetId>("3x4");
  const [crop, setCrop] = useState<Crop | null>(null);
  const [zoom, setZoom] = useState(1);
  const [background, setBackground] = useState<BackgroundId>("white");
  const [removeBg, setRemoveBg] = useState(false);
  const [threshold, setThreshold] = useState(65);
  const [picking, setPicking] = useState(false);
  const [picked, setPicked] = useState<Rgb | null>(null);
  const [preview, setPreview] = useState<HTMLCanvasElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<{ url: string; size: number; filename: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    cropX: number;
    cropY: number;
  } | null>(null);
  const dict = useDict();
  const copy = dict.tools.idPhoto;
  const preset = PRESETS.find((item) => item.id === presetId) ?? PRESETS[1];
  const aspect = preset.wCm / preset.hCm;

  useEffect(() => {
    if (!source) {
      setCrop(null);
      return;
    }
    setCrop(getBaseCrop(source.width, source.height, aspect));
    setZoom(1);
    setResult(null);
  }, [source, aspect]);

  useEffect(() => {
    if (!source) {
      setPreview(null);
      setPreviewUrl(null);
      return;
    }
    const next = removeBg
      ? removeBackground(source.canvas, threshold, picked)
      : source.canvas;
    setPreview(next);
    setPreviewUrl(next.toDataURL("image/png"));
  }, [source, removeBg, threshold, picked]);

  useEffect(
    () => () => {
      if (result?.url) URL.revokeObjectURL(result.url);
    },
    [result?.url]
  );

  async function loadFile(file: File) {
    setError(null);
    setResult(null);

    if (!file.type.startsWith("image/")) {
      setError(copy.imageOnly);
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError(copy.tooLarge);
      return;
    }

    try {
      const bitmap = await createImageBitmap(file);
      const scale = Math.min(
        1,
        MAX_SOURCE_DIMENSION / Math.max(bitmap.width, bitmap.height)
      );
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(bitmap.width * scale));
      canvas.height = Math.max(1, Math.round(bitmap.height * scale));
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("canvas unavailable");
      ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      bitmap.close();

      setSource({
        canvas,
        width: canvas.width,
        height: canvas.height,
        name: file.name,
      });
      setBackground("white");
      setRemoveBg(false);
      setThreshold(65);
      setPicked(null);
      setPicking(false);
    } catch (err) {
      console.error("[id-photo]", err);
      setError(copy.errorImage);
    }
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) void loadFile(file);
  }

  function handleDrop(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    const file = Array.from(e.dataTransfer.files ?? []).find((item) =>
      item.type.startsWith("image/")
    );
    if (file) void loadFile(file);
    else if (e.dataTransfer.files.length > 0) setError(copy.imageOnly);
  }

  function handleDragOver(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
  }

  function handleZoom(value: number) {
    setZoom(value);
    setResult(null);
    if (!source || !crop) return;

    const base = getBaseCrop(source.width, source.height, aspect);
    const width = base.width / value;
    const height = base.height / value;
    const centerX = crop.x + crop.width / 2;
    const centerY = crop.y + crop.height / 2;

    setCrop(
      clampCrop(
        {
          x: centerX - width / 2,
          y: centerY - height / 2,
          width,
          height,
        },
        source.width,
        source.height
      )
    );
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (!crop) return;

    if (picking && source) {
      const rect = e.currentTarget.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width;
      const relY = (e.clientY - rect.top) / rect.height;
      const sourceX = Math.min(
        source.width - 1,
        Math.max(0, Math.floor(crop.x + relX * crop.width))
      );
      const sourceY = Math.min(
        source.height - 1,
        Math.max(0, Math.floor(crop.y + relY * crop.height))
      );
      const ctx = source.canvas.getContext("2d", { willReadFrequently: true });
      if (ctx) {
        const pixel = ctx.getImageData(sourceX, sourceY, 1, 1).data;
        setPicked({ r: pixel[0], g: pixel[1], b: pixel[2] });
        setRemoveBg(true);
        setPicking(false);
        setResult(null);
      }
      return;
    }

    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      cropX: crop.x,
      cropY: crop.y,
    };
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId || !source || !crop) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const scale = crop.width / rect.width;
    const dx = (e.clientX - drag.startX) * scale;
    const dy = (e.clientY - drag.startY) * scale;

    setResult(null);
    setCrop(
      clampCrop(
        { ...crop, x: drag.cropX - dx, y: drag.cropY - dy },
        source.width,
        source.height
      )
    );
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (dragRef.current?.pointerId === e.pointerId) {
      dragRef.current = null;
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  }

  function handleDownload() {
    if (!preview || !crop) return;

    const canvas = document.createElement("canvas");
    canvas.width = preset.wPx;
    canvas.height = preset.hPx;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const selectedBg = BACKGROUNDS.find((item) => item.id === background);
    if (selectedBg?.hex) {
      ctx.fillStyle = selectedBg.hex;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    ctx.drawImage(
      preview,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const isTransparent = background === "transparent";
    const mime = isTransparent ? "image/png" : "image/jpeg";

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          setError(copy.errorImage);
          return;
        }
        if (result?.url) URL.revokeObjectURL(result.url);
        setResult({
          url: URL.createObjectURL(blob),
          size: blob.size,
          filename: `pas-foto-${preset.id}.${isTransparent ? "png" : "jpg"}`,
        });
      },
      mime,
      0.92
    );
  }

  function clearAll() {
    if (result?.url) URL.revokeObjectURL(result.url);
    setResult(null);
    setError(null);
    setSource(null);
    setPreview(null);
    setPreviewUrl(null);
    setCrop(null);
    setZoom(1);
    setPicked(null);
    setPicking(false);
  }

  const frameWidth = 240;
  const frameHeight = (frameWidth * preset.hCm) / preset.wCm;
  const selectedBg = BACKGROUNDS.find((item) => item.id === background);
  const previewScale = crop ? frameWidth / crop.width : 1;
  const imageStyle =
    source && crop
      ? {
          position: "absolute" as const,
          left: `${-crop.x * previewScale}px`,
          top: `${-crop.y * previewScale}px`,
          width: `${source.width * previewScale}px`,
          height: `${source.height * previewScale}px`,
          maxWidth: "none" as const,
        }
      : undefined;

  const frameStyle = selectedBg?.hex
    ? { backgroundColor: selectedBg.hex }
    : {
        backgroundColor: "#ffffff",
        backgroundImage:
          "repeating-conic-gradient(#e5e5e5 0 25%, #ffffff 0 50%)",
        backgroundSize: "16px 16px",
      };

  return (
    <Container className="py-16 sm:py-24">
      <div className="max-w-2xl animate-fade-in-up">
        <Badge>{dict.tools.badge}</Badge>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
          {copy.title}
        </h1>
        <p className="mt-3 text-muted-foreground">{copy.description}</p>
      </div>

      <div className="mt-10 grid gap-6 animate-fade-in-up delay-100 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-2xl border border-border p-6">
          {!source ? (
            <label
              htmlFor="id-photo-input"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-16 text-center transition-colors hover:border-foreground/30 hover:bg-muted/40"
            >
              <ImageIcon className="h-9 w-9 text-muted-foreground" />
              <span className="mt-3 text-sm font-medium">{copy.upload}</span>
              <span className="mt-1 max-w-xs text-xs text-muted-foreground">
                {copy.uploadHint}
              </span>
            </label>
          ) : (
            <div className="flex flex-col items-center">
              <div className="mb-4 flex w-full flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{source.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {source.width} × {source.height}px
                  </p>
                </div>
                <button
                  type="button"
                  onClick={clearAll}
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  {dict.common.clear}
                </button>
              </div>

              <div
                role="img"
                aria-label={copy.title}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                className="relative touch-none select-none overflow-hidden rounded-xl border border-border shadow-sm"
                style={{
                  width: `${frameWidth}px`,
                  height: `${frameHeight}px`,
                  ...frameStyle,
                  cursor: picking || crop ? (picking ? "crosshair" : "grab") : "default",
                }}
              >
                {previewUrl && imageStyle && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previewUrl}
                    alt={copy.title}
                    draggable={false}
                    style={imageStyle}
                  />
                )}
              </div>

              <p className="mt-4 max-w-xs text-center text-xs text-muted-foreground">
                {copy.dragHint}
              </p>
            </div>
          )}

          <input
            id="id-photo-input"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleInput}
            className="sr-only"
          />
        </div>

        <div className="rounded-2xl border border-border p-6">
          <div>
            <p className="text-sm font-medium">{copy.presetLabel}</p>
            <div className="mt-3 grid gap-2">
              {PRESETS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setPresetId(item.id);
                    setResult(null);
                  }}
                  className={cn(
                    "flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                    presetId === item.id
                      ? "border-foreground bg-muted/60"
                      : "border-border hover:border-foreground/30 hover:bg-muted/40"
                  )}
                >
                  <span className="font-medium">
                    {item.wCm} × {item.hCm} cm
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.wPx} × {item.hPx}px
                  </span>
                </button>
              ))}
            </div>
          </div>

          {source && (
            <>
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <label htmlFor="zoom" className="text-sm font-medium">
                    {copy.zoomLabel}
                  </label>
                  <span className="font-mono text-xs text-muted-foreground">
                    {zoom.toFixed(1)}×
                  </span>
                </div>
                <input
                  id="zoom"
                  type="range"
                  min="1"
                  max="3"
                  step="0.01"
                  value={zoom}
                  onChange={(e) => handleZoom(Number(e.target.value))}
                  className="mt-3 w-full accent-foreground"
                />
              </div>

              <div className="mt-6">
                <p className="text-sm font-medium">{copy.backgroundLabel}</p>
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {BACKGROUNDS.map((item) => {
                    const active = background === item.id;
                    const label = copy[item.id];
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setBackground(item.id);
                          setResult(null);
                        }}
                        aria-pressed={active}
                        className={cn(
                          "rounded-xl border p-2 text-center text-xs transition-colors",
                          active
                            ? "border-foreground bg-muted/60"
                            : "border-border hover:border-foreground/30"
                        )}
                      >
                        <span
                          className="mx-auto block h-8 w-full rounded-md border border-border"
                          style={
                            item.hex
                              ? { backgroundColor: item.hex }
                              : {
                                  backgroundColor: "#ffffff",
                                  backgroundImage:
                                    "repeating-conic-gradient(#e5e5e5 0 25%, #ffffff 0 50%)",
                                  backgroundSize: "12px 12px",
                                }
                          }
                        />
                        <span className="mt-2 block truncate">{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-border p-4">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={removeBg}
                    onChange={(e) => {
                      setRemoveBg(e.target.checked);
                      setResult(null);
                    }}
                    className="mt-0.5 h-4 w-4 accent-foreground"
                  />
                  <span>
                    <span className="text-sm font-medium">{copy.removeBg}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {copy.removeBgHint}
                    </span>
                  </span>
                </label>

                {removeBg && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <label htmlFor="threshold" className="text-xs font-medium">
                        {copy.thresholdLabel}
                      </label>
                      <span className="font-mono text-xs text-muted-foreground">
                        {threshold}
                      </span>
                    </div>
                    <input
                      id="threshold"
                      type="range"
                      min="30"
                      max="110"
                      step="1"
                      value={threshold}
                      onChange={(e) => {
                        setThreshold(Number(e.target.value));
                        setResult(null);
                      }}
                      className="mt-2 w-full accent-foreground"
                    />

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setPicking((value) => !value)}
                        aria-pressed={picking}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-colors",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
                          picking
                            ? "border-foreground bg-foreground text-background"
                            : "border-border hover:bg-muted"
                        )}
                      >
                        <Pipette className="h-3.5 w-3.5" />
                        {picking ? copy.picking : copy.pickColor}
                      </button>

                      {picked && (
                        <>
                          <span className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2 py-2 text-xs text-muted-foreground">
                            <span
                              className="h-4 w-4 rounded-sm border border-border"
                              style={{
                                backgroundColor: `rgb(${picked.r}, ${picked.g}, ${picked.b})`,
                              }}
                            />
                            {copy.picked}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setPicked(null);
                              setResult(null);
                            }}
                            aria-label={copy.clearPicked}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {copy.pickColorHint}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <Button onClick={handleDownload} className="w-full justify-center">
                  <Download className="h-4 w-4" />
                  {copy.download}
                </Button>
              </div>
            </>
          )}

          {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

          {result && (
            <div className="mt-6 rounded-xl border border-border bg-muted/30 p-4">
              <p className="text-sm">
                {dict.common.result}{" "}
                <strong>{(result.size / 1024).toFixed(1)} KB</strong> (
                {result.filename.endsWith(".png") ? ".png" : ".jpg"})
              </p>
              <a
                href={result.url}
                download={result.filename}
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-foreground underline underline-offset-4 hover:opacity-70"
              >
                <Download className="h-4 w-4" />
                {dict.common.downloadResult}
              </a>
            </div>
          )}

          {!source && (
            <div className="mt-6 rounded-xl border border-border bg-muted/30 p-4 text-xs text-muted-foreground">
              <Upload className="mb-2 h-4 w-4" />
              {copy.outputHint}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
