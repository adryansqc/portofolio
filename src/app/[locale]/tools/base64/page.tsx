// src/app/[locale]/tools/base64/page.tsx
"use client";

import { useMemo, useState } from "react";
import { Copy, Check, ArrowLeftRight, Trash2 } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDict } from "@/components/shared/locale-provider";
import { cn } from "@/lib/utils";

type Mode = "encode" | "decode";

export default function Base64Page() {
  const [mode, setMode] = useState<Mode>("encode");
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const dict = useDict();
  const copy = dict.tools.base64;

  const output = useMemo(() => {
    if (!input) return "";
    try {
      if (mode === "encode") {
        return btoa(
          encodeURIComponent(input).replace(
            /%([0-9A-F]{2})/g,
            (_, p1) => String.fromCharCode(parseInt(p1, 16))
          )
        );
      } else {
        return decodeURIComponent(
          Array.from(atob(input.trim()))
            .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
            .join("")
        );
      }
    } catch {
      return "";
    }
  }, [input, mode]);

  const error = input && !output ? copy.invalidInput : null;

  async function handleCopy() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function swap() {
    if (!output) return;
    setInput(output);
    setMode(mode === "encode" ? "decode" : "encode");
    setCopied(false);
  }

  function clear() {
    setInput("");
    setCopied(false);
  }

  return (
    <Container className="py-16 sm:py-24">
      <div className="max-w-2xl animate-fade-in-up">
        <Badge>{dict.tools.badge}</Badge>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
          {copy.title}
        </h1>
        <p className="mt-3 text-muted-foreground">
          {copy.description}
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-2 animate-fade-in-up delay-100">
        {(["encode", "decode"] as const).map((m) => (
          <button
            key={m}
            onClick={() => {
              setMode(m);
              setCopied(false);
            }}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              mode === m
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            )}
          >
            {m === "encode" ? copy.encode : copy.decode}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 animate-fade-in-up delay-200">
        {/* Input */}
        <div>
          <label className="mb-1.5 block text-sm font-medium">
            {mode === "encode" ? copy.textLabel : copy.encodedLabel}
          </label>
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setCopied(false);
            }}
            placeholder={mode === "encode" ? copy.placeholderText : copy.placeholderEncoded}
            rows={12}
            className="w-full resize-none rounded-xl border border-border bg-background p-3 font-mono text-sm outline-none focus:border-foreground/30"
          />
          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
            <span>
              {input.length} {dict.common.characters}
            </span>
            <button
              onClick={clear}
              disabled={!input}
              className="ml-auto inline-flex items-center gap-1 hover:text-foreground disabled:opacity-40"
            >
              <Trash2 className="h-3 w-3" />
              {dict.common.clear}
            </button>
          </div>
        </div>

        {/* Output */}
        <div>
          <label className="mb-1.5 block text-sm font-medium">
            {mode === "encode" ? copy.encodedLabel : copy.textLabel}
          </label>
          <textarea
            value={output}
            readOnly
            rows={12}
            className="w-full resize-none rounded-xl border border-border bg-muted/30 p-3 font-mono text-sm outline-none"
          />
          <div className="mt-2 flex items-center gap-2">
            <button
              onClick={handleCopy}
              disabled={!output}
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-xs font-medium transition-colors hover:bg-muted disabled:opacity-40"
            >
              {copied ? (
                <Check className="h-3 w-3 text-emerald-500" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
              {copied ? dict.common.copied : dict.common.copy}
            </button>
            <Button onClick={swap} size="sm" variant="outline">
              <ArrowLeftRight className="h-3.5 w-3.5" />
              {dict.common.swapDirection}
            </Button>
            {output && (
              <span className="ml-auto text-xs text-muted-foreground">
                {output.length} {dict.common.characters}
              </span>
            )}
          </div>
        </div>
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-500">{error}</p>
      )}
    </Container>
  );
}
