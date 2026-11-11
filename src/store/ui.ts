"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  highContrast: boolean;
  darkMode: boolean;
  toggleHighContrast: () => void;
  setHighContrast: (value: boolean) => void;
  toggleDarkMode: () => void;
  setDarkMode: (value: boolean) => void;
}

export const useUI = create<UIState>()(
  persist(
    (set) => ({
      highContrast: false,
      darkMode: false,
      toggleHighContrast: () =>
        set((s) => ({ highContrast: !s.highContrast })),
      setHighContrast: (value) => set({ highContrast: value }),
      toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),
      setDarkMode: (value) => set({ darkMode: value }),
    }),
    { name: "gables-ui" }
  )
);
