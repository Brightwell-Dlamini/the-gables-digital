"use client";

import { Moon, Sun } from "lucide-react";
import { useUI } from "@/store/ui";
import { cn } from "@/lib/utils";

/**
 * Dark mode toggle — strong contrast light/dark switch.
 */
export function ThemeToggles() {
  const { darkMode, toggleDarkMode } = useUI();

  return (
    <button
      type="button"
      onClick={toggleDarkMode}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors",
        darkMode
          ? "bg-sand/15 text-sand hover:bg-sand/25"
          : "text-forest/70 hover:bg-forest/5 hover:text-forest"
      )}
      aria-pressed={darkMode}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      title={darkMode ? "Light mode" : "Dark mode"}
    >
      {darkMode ? (
        <Sun className="h-4 w-4" strokeWidth={2.25} />
      ) : (
        <Moon className="h-4 w-4" strokeWidth={2.25} />
      )}
    </button>
  );
}
