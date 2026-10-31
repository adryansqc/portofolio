// src/app/about/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Tentang Adryan — Full Stack Developer & UI/UX Designer yang fokus membangun produk digital yang thoughtful.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}