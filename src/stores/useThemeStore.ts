import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeMode = "light" | "dark" | "system";

interface ThemeState {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  applyThemeToDom: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "dark",
      setTheme: (theme) => {
        set({ theme });
        get().applyThemeToDom();
      },
      applyThemeToDom: () => {
        const { theme } = get();
        const root = document.documentElement;
        root.classList.remove("light", "dark");

        if (theme === "system") {
          const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
          root.classList.add(systemTheme);
        } else {
          root.classList.add(theme);
        }
      },
    }),
    {
      name: "vitalpulse-theme",
    }
  )
);
