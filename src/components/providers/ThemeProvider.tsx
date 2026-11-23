"use client";

import { useEffect, useMemo } from "react";
import { useUI } from "@/store/ui";
import { useAdmin } from "@/store/admin";
import { resolveThemeForDate } from "@/lib/themes/seasonal";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const highContrast = useUI((s) => s.highContrast);
  const themeSettings = useAdmin((s) => s.settings.theme);

  const activeTheme = useMemo(() => {
    return resolveThemeForDate(
      new Date(),
      themeSettings.schedule,
      themeSettings.mode,
      themeSettings.themeId
    );
  }, [themeSettings]);

  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }
    root.classList.remove("dark");
    root.setAttribute("data-theme", activeTheme);
  }, [highContrast, activeTheme]);

  return <>{children}</>;
}
