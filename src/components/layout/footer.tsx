// src/components/layout/footer.tsx
import { Container } from "./container";
import { SocialLinks } from "@/components/shared/social-links";
import { SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border/60 mt-24">
      <Container className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {SITE.name}. Built with Next.js.
        </p>
        <SocialLinks />
      </Container>
    </footer>
  );
}