"use client"

import * as React from "react"
import { Moon02Icon, Sun01Icon } from "hugeicons-react"
import { useTheme } from "@/hooks/use-theme"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { isDark, setTheme, mounted } = useTheme()

  if (!mounted) {
    return null
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? (
        <Moon02Icon className="h-5 w-5" />
      ) : (
        <Sun01Icon className="h-5 w-5" />
      )}
    </Button>
  )
}
