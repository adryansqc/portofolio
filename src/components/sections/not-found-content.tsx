// src/components/sections/not-found-content.tsx
"use client";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { useDict } from "@/components/shared/locale-provider";

export function NotFoundContent() {
  const dict = useDict();

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-mono text-sm text-muted-foreground">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">
        {dict.common.notFoundTitle}
      </h1>
      <p className="mt-2 max-w-sm text-muted-foreground">
        {dict.common.notFoundDesc}
      </p>
      <div className="mt-8">
        <Button href="/">{dict.common.backHome}</Button>
      </div>
    </Container>
  );
}