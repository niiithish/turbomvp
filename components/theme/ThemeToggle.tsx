"use client"

import * as React from "react"
import { Moon02Icon, Sun01Icon } from "hugeicons-react"
import { useTheme } from "@/hooks/use-theme"

export function ThemeToggle() {
  const { isDark, setTheme, mounted } = useTheme()

  if (!mounted) {
    return <div className="h-8 w-[62px] rounded-full bg-card border border-border" /> // Skeleton/placeholder
  }

  return (
    <div
      className="relative flex h-8 w-[62px] cursor-pointer items-center rounded-full bg-card p-1 border border-border gap-[2px]"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle theme"
    >
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200 ${
          !isDark ? "bg-sidebar-accent" : ""
        }`}
      >
        <Sun01Icon
          className={`h-4 w-4 transition-colors duration-200 ${
            !isDark ? "text-foreground" : "text-muted-foreground"
          }`}
        />
      </div>
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200 ${
          isDark ? "bg-sidebar-active-bg" : ""
        }`}
      >
        <Moon02Icon
          className={`h-4 w-4 transition-colors duration-200 ${
            isDark ? "text-foreground" : "text-muted-foreground"
          }`}
        />
      </div>
    </div>
  )
}
