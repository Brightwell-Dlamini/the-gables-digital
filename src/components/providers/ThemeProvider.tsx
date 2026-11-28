"use client";

import { useEffect, useMemo } from "react";
import { useUI } from "@/store/ui";
import { useAdmin } from "@/store/admin";
import { resolveThemeForDate } from "@/lib/themes/seasonal";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = useUI((s) => s.darkMode);
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

    // Dark mode
    if (darkMode) {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }

    // Clear legacy high-contrast class if present
    root.classList.remove("high-contrast");

    // Seasonal theme via data attribute
    root.setAttribute("data-theme", activeTheme);
  }, [darkMode, activeTheme]);

  return <>{children}</>;
}
