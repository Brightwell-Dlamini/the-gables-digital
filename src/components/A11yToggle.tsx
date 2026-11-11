"use client";

import { Contrast } from "lucide-react";
import { useUI } from "@/store/ui";
import { cn } from "@/lib/utils";

export function A11yToggle() {
  const { highContrast, toggleHighContrast } = useUI();

  return (
    <button
      type="button"
      onClick={toggleHighContrast}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium transition-colors",
        highContrast
          ? "bg-forest text-white"
          : "text-forest/70 hover:bg-forest/5 hover:text-forest"
      )}
      aria-pressed={highContrast}
      aria-label={
        highContrast ? "Disable high contrast mode" : "Enable high contrast mode"
      }
      title="High contrast"
    >
      <Contrast className="h-3.5 w-3.5" />
      <span className="hidden sm:inline">Contrast</span>
    </button>
  );
}
