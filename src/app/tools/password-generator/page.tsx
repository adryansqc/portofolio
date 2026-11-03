// src/app/tools/password-generator/page.tsx
"use client";

import { useCallback, useEffect, useState } from "react";
import { Copy, Check, RefreshCw, Lock } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CHARSETS = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
} as const;

type CharKey = keyof typeof CHARSETS;

interface Options {
  length: number;
  lowercase: boolean;
  uppercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

const DEFAULT_OPTIONS: Options = {
  length: 16,
  lowercase: true,
  uppercase: true,
  numbers: true,
  symbols: true,
};

export default function PasswordGeneratorPage() {
  const [options, setOptions] = useState<Options>(DEFAULT_OPTIONS);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    const pools: string[] = [];
    if (options.lowercase) pools.push(CHARSETS.lowercase);
    if (options.uppercase) pools.push(CHARSETS.uppercase);
    if (options.numbers) pools.push(CHARSETS.numbers);
    if (options.symbols) pools.push(CHARSETS.symbols);

    if (pools.length === 0) {
      setPassword("");
      return;
    }

    const all = pools.join("");
    const result: string[] = [];

    // Pastikan setiap kategori terpilih muncul minimal 1x
    for (const pool of pools) {
      const idx = crypto.getRandomValues(new Uint32Array(1))[0] % pool.length;
      result.push(pool[idx]);
    }

    // Sisanya acak dari gabungan
    for (let i = result.length; i < options.length; i++) {
      const idx = crypto.getRandomValues(new Uint32Array(1))[0] % all.length;
      result.push(all[idx]);
    }

    // Shuffle (Fisher-Yates)
    for (let i = result.length - 1; i > 0; i--) {
      const j = crypto.getRandomValues(new Uint32Array(1))[0] % (i + 1);
      [result[i], result[j]] = [result[j], result[i]];
    }

    setPassword(result.join(""));
    setCopied(false);
  }, [options]);

  // Generate saat pertama load & setiap opsi berubah
  useEffect(() => {
    generate();
  }, [generate]);

  async function handleCopy() {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function toggle(key: CharKey) {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  // Hitung strength
  const poolSize =
    (options.lowercase ? CHARSETS.lowercase.length : 0) +
    (options.uppercase ? CHARSETS.uppercase.length : 0) +
    (options.numbers ? CHARSETS.numbers.length : 0) +
    (options.symbols ? CHARSETS.symbols.length : 0);

  const entropy = password ? Math.log2(poolSize) * options.length : 0;
  const strength =
    entropy > 80 ? "Sangat kuat" : entropy > 60 ? "Kuat" : entropy > 40 ? "Sedang" : "Lemah";
  const strengthColor =
    entropy > 80
      ? "bg-emerald-500"
      : entropy > 60
      ? "bg-blue-500"
      : entropy > 40
      ? "bg-amber-500"
      : "bg-red-500";

  return (
    <Container className="py-16 sm:py-24">
      <div className="max-w-2xl animate-fade-in-up">
        <Badge>
          <Lock className="h-3 w-3" />
          Tools
        </Badge>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
          Password Generator
        </h1>
        <p className="mt-3 text-muted-foreground">
          Buat password acak yang kuat. Semua diproses di browser — password
          tidak dikirim ke server.
        </p>
      </div>

      <div className="mt-10 space-y-6 animate-fade-in-up delay-100">
        {/* Hasil password */}
        <div className="rounded-2xl border border-border bg-muted/30 p-4">
          <div className="flex items-center gap-3">
            <code className="flex-1 break-all font-mono text-lg">
              {password || "—"}
            </code>
            <button
              onClick={handleCopy}
              disabled={!password}
              aria-label="Copy password"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background transition-colors hover:bg-muted disabled:opacity-40"
            >
              {copied ? (
                <Check className="h-4 w-4 text-emerald-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
            <Button onClick={generate} size="md">
              <RefreshCw className="h-4 w-4" />
              Generate
            </Button>
          </div>

          {/* Strength bar */}
          {password && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Kekuatan</span>
                <span className="font-medium">{strength}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className={cn("h-full rounded-full transition-all", strengthColor)}
                  style={{ width: `${Math.min(100, (entropy / 100) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Pengaturan */}
        <div className="rounded-2xl border border-border p-6 space-y-6">
          <div>
            <div className="flex justify-between text-sm font-medium">
              <label>Panjang Password</label>
              <span className="font-mono">{options.length}</span>
            </div>
            <input
              type="range"
              min="8"
              max="64"
              value={options.length}
              onChange={(e) =>
                setOptions((prev) => ({ ...prev, length: Number(e.target.value) }))
              }
              className="mt-3 w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {(
              [
                ["lowercase", "Huruf kecil (a-z)"],
                ["uppercase", "Huruf besar (A-Z)"],
                ["numbers", "Angka (0-9)"],
                ["symbols", "Simbol (!@#$...)"],
              ] as const
            ).map(([key, label]) => (
              <label
                key={key}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm transition-colors hover:bg-muted"
              >
                <input
                  type="checkbox"
                  checked={options[key]}
                  onChange={() => toggle(key)}
                  className="h-4 w-4 accent-foreground"
                />
                {label}
              </label>
            ))}
          </div>

          {poolSize === 0 && (
            <p className="text-sm text-red-500">
              Pilih minimal satu jenis karakter.
            </p>
          )}
        </div>
      </div>
    </Container>
  );
}