// src/components/shared/social-links.tsx
import { Github, Linkedin, Mail } from "lucide-react";
import { SOCIALS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ICONS = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
} as const;

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {SOCIALS.map((s) => {
        const Icon = ICONS[s.icon as keyof typeof ICONS];
        const isMailto = s.href.startsWith("mailto:");
        return (
          <a
            key={s.label}
            href={s.href}
            target={isMailto ? undefined : "_blank"}
            rel={isMailto ? undefined : "noreferrer"}
            aria-label={s.label}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
}