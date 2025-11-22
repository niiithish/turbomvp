"use client";

import { Moon02Icon, Sun01Icon } from "hugeicons-react";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { isDark, setTheme, mounted } = useTheme();

  if (!mounted) {
    return <div />; // Skeleton/placeholder
  }

  return (
    <button
      aria-checked={isDark}
      className={cn(
        "relative h-7 w-12 cursor-pointer rounded-full bg-secondary transition-colors duration-200 ease-in-out hover:bg-secondary/80",
        className
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      role="switch"
      type="button"
    >
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200 ${
          isDark ? "" : "bg-sidebar-accent"
        }`}
      >
        <Sun01Icon
          className={`h-4 w-4 transition-colors duration-200 ${
            isDark ? "text-muted-foreground" : "text-foreground"
          }`}
        />
      </div>
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200 ${
          isDark ? "bg-sidebar-accent" : ""
        }`}
      >
        <Moon02Icon
          className={`h-4 w-4 transition-colors duration-200 ${
            isDark ? "text-foreground" : "text-muted-foreground"
          }`}
        />
      </div>
    </button>
  );
}
