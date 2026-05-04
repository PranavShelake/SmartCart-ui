/**
 * ThemeContext.tsx
 * Global dark/light mode state using React Context.
 * Persists preference to localStorage.
 * Toggles the `dark` class on <html> for Tailwind dark mode.
 */
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "dark" | "light";
interface ThemeCtx { theme: Theme; toggle: () => void; }

const ThemeContext = createContext<ThemeCtx>({ theme: "dark", toggle: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("sc-theme") as Theme | null;
    return saved ?? "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark",  theme === "dark");
    root.classList.toggle("light", theme === "light");
    localStorage.setItem("sc-theme", theme);
  }, [theme]);

  const toggle = () => setTheme(t => t === "dark" ? "light" : "dark");

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);