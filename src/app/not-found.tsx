// src/app/not-found.tsx
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-mono text-sm text-muted-foreground">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">
        Halaman tidak ditemukan
      </h1>
      <p className="mt-2 max-w-sm text-muted-foreground">
        Sepertinya halaman yang kamu cari sudah pindah atau tidak pernah ada.
      </p>
      <div className="mt-8">
        <Button href="/">Kembali ke home</Button>
      </div>
    </Container>
  );
}