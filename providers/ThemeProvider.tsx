// app/components/Theme.tsx
"use client";

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { useEffect, useState, ReactNode } from "react";

// ✅ Provider + Switcher merged
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      themes={["light", "dark", "neon"]}
    >
      {children}
    </NextThemesProvider>
  );
}

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const cycleTheme = () => {
    const next =
      theme === "light" ? "dark" : theme === "dark" ? "neon" : "light";
    setTheme(next);
  };

  return (
    <button
      onClick={cycleTheme}
      className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700"
    >
      Switch Theme ({theme})
    </button>
  );
}
