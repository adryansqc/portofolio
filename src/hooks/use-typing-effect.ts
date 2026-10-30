// src/hooks/use-typing-effect.ts
"use client";

import { useEffect, useState } from "react";

export function useTypingEffect(
  texts: readonly string[],
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseMs = 1600
) {
  const [display, setDisplay] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && display === current) {
      timeout = setTimeout(() => setDeleting(true), pauseMs);
    } else if (deleting && display === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % texts.length);
      return;
    } else {
      timeout = setTimeout(
        () => {
          setDisplay(
            deleting
              ? current.substring(0, display.length - 1)
              : current.substring(0, display.length + 1)
          );
        },
        deleting ? deletingSpeed : typingSpeed
      );
    }

    return () => clearTimeout(timeout);
  }, [display, deleting, index, texts, typingSpeed, deletingSpeed, pauseMs]);

  return display;
}