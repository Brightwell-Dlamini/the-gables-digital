"use client";

import { Contrast, Moon, Sun } from "lucide-react";
import { useUI } from "@/store/ui";
import { cn } from "@/lib/utils";

export function ThemeToggles() {
  const {
    highContrast,
    toggleHighContrast,
    darkMode,
    toggleDarkMode,
  } = useUI();

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={toggleDarkMode}
        className={cn(
          "inline-flex items-center justify-center rounded-full p-2 text-sm font-medium transition-colors",
          darkMode
            ? "bg-forest text-white dark:bg-sand dark:text-forest"
            : "text-forest/70 hover:bg-forest/5 hover:text-forest dark:text-sand/80 dark:hover:bg-white/10 dark:hover:text-sand"
        )}
        aria-pressed={darkMode}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        title={darkMode ? "Light mode" : "Dark mode"}
      >
        {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>

      <button
        type="button"
        onClick={toggleHighContrast}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium transition-colors",
          highContrast
            ? "bg-forest text-white dark:bg-sand dark:text-forest"
            : "text-forest/70 hover:bg-forest/5 hover:text-forest dark:text-sand/80 dark:hover:bg-white/10"
        )}
        aria-pressed={highContrast}
        aria-label={
          highContrast
            ? "Disable high contrast mode"
            : "Enable high contrast mode"
        }
        title="High contrast"
      >
        <Contrast className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Contrast</span>
      </button>
    </div>
  );
}
