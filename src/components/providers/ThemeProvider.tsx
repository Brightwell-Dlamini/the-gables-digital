"use client";

import { useEffect } from "react";
import { useUI } from "@/store/ui";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const highContrast = useUI((s) => s.highContrast);

  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }
  }, [highContrast]);

  return <>{children}</>;
}
