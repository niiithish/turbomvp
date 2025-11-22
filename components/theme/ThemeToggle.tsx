"use client";

import { Moon02Icon, Sun01Icon } from "hugeicons-react";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { isDark, setTheme, mounted } = useTheme();

  if (!mounted) {
    return <div className={cn("h-8 w-16 rounded-full bg-muted", className)} />; // Skeleton
  }

  return (
    <button
      aria-checked={isDark}
      className={cn(
        "flex h-8 cursor-pointer items-center gap-1 rounded-full bg-muted p-1 transition-colors duration-200 ease-in-out",
        className
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      role="switch"
      type="button"
    >
      <div
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200",
          isDark
            ? "text-muted-foreground"
            : "bg-background text-foreground shadow-sm"
        )}
      >
        <Sun01Icon className="h-4 w-4" />
      </div>
      <div
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200",
          isDark
            ? "bg-background text-foreground shadow-sm dark:bg-secondary"
            : "text-muted-foreground"
        )}
      >
        <Moon02Icon className="h-4 w-4" />
      </div>
    </button>
  );
}
