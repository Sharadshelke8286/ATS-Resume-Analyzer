import { create } from "zustand";
import { persist } from "zustand/middleware";
 
const useThemeStore = create(
  persist(
    (set, get) => ({
      dark: true, // default: dark mode on
 
      toggle: () => {
        const next = !get().dark;
        set({ dark: next });
 
        // ── THIS LINE IS CRITICAL ──────────────────────────────────────────
        // Adds or removes "dark" class on <html> so Tailwind dark: classes work.
        if (next) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        // ──────────────────────────────────────────────────────────────────
      },
 
      // Call this once on app load (e.g. in main.jsx or App.jsx useEffect)
      // to restore the saved theme preference:
      init: () => {
        const { dark } = get();
        if (dark) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      },
    }),
    { name: "theme-storage" }
  )
);
 
export default useThemeStore;