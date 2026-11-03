// src/app/[locale]/tools/qr-generator/page.tsx
"use client";

import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download, QrCode } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";
import { useDict } from "@/components/shared/locale-provider";

export default function QrGeneratorPage() {
  const [value, setValue] = useState(SITE.url);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [size, setSize] = useState(256);
  const qrRef = useRef<HTMLDivElement>(null);
  const dict = useDict();
  const copy = dict.tools.qrGenerator;

  function handleDownload() {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = "qr-code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <Container className="py-16 sm:py-24">
      <div className="max-w-2xl animate-fade-in-up">
        <Badge>
          <QrCode className="h-3 w-3" />
          {dict.tools.badge}
        </Badge>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
          {copy.title}
        </h1>
        <p className="mt-3 text-muted-foreground">
          {copy.description}
        </p>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2 animate-fade-in-up delay-100">
        {/* Input panel */}
        <div className="space-y-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              {copy.contentLabel}
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={copy.placeholder}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-foreground/30"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                {copy.qrColorLabel}
              </label>
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="h-10 w-full cursor-pointer rounded-lg border border-border"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                {copy.backgroundColorLabel}
              </label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="h-10 w-full cursor-pointer rounded-lg border border-border"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">
              {copy.sizeLabel.replace("{size}", String(size))}
            </label>
            <input
              type="range"
              min="128"
              max="512"
              step="32"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-muted/30 p-4 sm:p-8">
          <div
            className="flex w-full max-w-[320px] items-center justify-center overflow-hidden rounded-xl bg-white p-3 shadow-sm sm:max-w-[400px] sm:p-4"
            style={{ backgroundColor: bgColor }}
          >
            <div
              ref={qrRef}
              className="w-full"
              style={{ aspectRatio: "1 / 1" }}
            >
              <QRCodeCanvas
                value={value || " "}
                size={size}
                fgColor={fgColor}
                bgColor={bgColor}
                level="M"
                marginSize={2}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>

          <Button
            onClick={handleDownload}
            className="mt-6 w-full max-w-[320px] sm:max-w-[400px]"
          >
            <Download className="h-4 w-4" />
            {copy.download}
          </Button>
        </div>
      </div>
    </Container>
  );
}
