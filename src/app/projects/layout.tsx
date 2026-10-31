// src/app/projects/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Kumpulan project Adryan — Full Stack Developer. Web, mobile, dan sistem internal.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}