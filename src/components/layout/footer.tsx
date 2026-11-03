// src/components/layout/footer.tsx
"use client";

import { Container } from "./container";
import { SocialLinks } from "@/components/shared/social-links";
import { SITE } from "@/lib/constants";
import { useDict } from "@/components/shared/locale-provider";

export function Footer() {
  const dict = useDict();

  return (
    <footer className="border-t border-border/60 mt-24">
      <Container className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {SITE.name}. {dict.footer.builtWith}
          </p>
          <a
            href={SITE.cvUrl}
            download="CV-Adryan.pdf"
            className="mt-1 inline-block text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline transition-colors"
          >
            {dict.footer.downloadCvPdf}
          </a>
        </div>
        <SocialLinks />
      </Container>
    </footer>
  );
}
