"use client";

import {
  Alert02Icon,
  CancelCircleIcon,
  CheckmarkCircle01Icon,
  InformationCircleIcon,
  Loading03Icon,
} from "hugeicons-react";
import { useTheme } from "next-themes";
import type React from "react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      className="toaster group"
      icons={{
        success: <CheckmarkCircle01Icon className="size-4 text-green-500" />,
        info: <InformationCircleIcon className="size-4 text-blue-500" />,
        warning: <Alert02Icon className="size-4 text-amber-500" />,
        error: <CancelCircleIcon className="size-4 text-red-500" />,
        loading: <Loading03Icon className="size-4 animate-spin text-muted-foreground" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      theme={theme as ToasterProps["theme"]}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:w-fit group-[.toaster]:max-w-[500px] group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:data-[type=error]:border-red-500/30 group-[.toaster]:data-[type=success]:border-green-500/30 group-[.toaster]:data-[type=warning]:border-amber-500/30 group-[.toaster]:data-[type=info]:border-blue-500/30",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
