"use client";

import { useEffect } from "react";
import { useUI } from "@/store/ui";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const highContrast = useUI((s) => s.highContrast);
  const darkMode = useUI((s) => s.darkMode);

  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [highContrast, darkMode]);

  return <>{children}</>;
}
