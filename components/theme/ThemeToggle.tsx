"use client";

import { motion } from "framer-motion";

import { Moon02Icon, Sun01Icon } from "hugeicons-react";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const { isDark, setTheme, mounted } = useTheme();

  if (!mounted) {
    return <div className={cn("h-8 w-16 rounded-full bg-muted", className)} />; // Skeleton
  }

  return (
    <button
      aria-checked={isDark}
      className={cn(
        "flex h-8 w-16 cursor-pointer items-center rounded-full border bg-muted/50 p-1 transition-colors duration-200 ease-in-out",
        className
      )}
      onClick={() => {
        const root = document.documentElement;
        root.classList.add("transitioning");
        setTheme(isDark ? "light" : "dark");
        setTimeout(() => {
          root.classList.remove("transitioning");
        }, 300);
      }}
      role="switch"
      type="button"
    >
      <div className="relative flex w-full items-center">
        <div
          className={cn(
            "absolute inset-0 flex items-center",
            isDark ? "justify-end" : "justify-start"
          )}
        >
          <motion.div
            className="h-6 w-6 rounded-full bg-sidebar-accent shadow-sm"
            layout
            transition={{
              type: "spring",
              visualDuration: 0.3,
              bounce: 0.2,
            }}
          />
        </div>
        <div className="z-10 flex w-full items-center justify-between">
          <div className="flex h-6 w-6 items-center justify-center rounded-full">
            <Sun01Icon
              className={cn(
                "h-4 w-4 transition-colors",
                isDark ? "text-muted-foreground" : "text-foreground"
              )}
            />
          </div>
          <div className="flex h-6 w-6 items-center justify-center rounded-full">
            <Moon02Icon
              className={cn(
                "h-4 w-4 transition-colors",
                isDark ? "text-foreground" : "text-muted-foreground"
              )}
            />
          </div>
        </div>
      </div>
    </button>
  );
}
