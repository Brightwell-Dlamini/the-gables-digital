"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  highContrast: boolean;
  toggleHighContrast: () => void;
  setHighContrast: (value: boolean) => void;
}

export const useUI = create<UIState>()(
  persist(
    (set) => ({
      highContrast: false,
      toggleHighContrast: () =>
        set((s) => ({ highContrast: !s.highContrast })),
      setHighContrast: (value) => set({ highContrast: value }),
    }),
    { name: "gables-ui" }
  )
);
