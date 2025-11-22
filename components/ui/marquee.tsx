"use client";

import type React from "react";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Optional CSS class name to apply custom styles
   */
  className?: string;
  /**
   * Whether to reverse the animation direction
   * @default false
   */
  reverse?: boolean;
  /**
   * Whether to pause the animation on hover
   * @default false
   */
  pauseOnHover?: boolean;
  /**
   * Content to be displayed in the marquee
   */
  children: React.ReactNode;
  /**
   * Whether to animate vertically instead of horizontally
   * @default false
   */
  vertical?: boolean;
  /**
   * Number of times to repeat the content
   * @default 4
   */
  repeat?: number;
  /**
   * Animation duration in seconds
   * @default 40
   */
  duration?: number;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  duration = 40,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--gap:1rem]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
      style={
        {
          "--duration": `${duration}s`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn("flex shrink-0 animate-marquee [gap:var(--gap)]", {
          "flex-row": !vertical,
          "flex-col": vertical,
          "animate-marquee-vertical": vertical,
          "animate-marquee-reverse": reverse && !vertical,
          "animate-marquee-vertical-reverse": reverse && vertical,
          "group-hover:[animation-play-state:paused]": pauseOnHover,
        })}
      >
        {new Array(repeat).fill(0).map((_, i) => (
          <div
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "flex-row": !vertical,
              "flex-col": vertical,
            })}
            key={`marquee-1-${
              // biome-ignore lint/suspicious/noArrayIndexKey: Static array with fixed length
              i
            }`}
          >
            {children}
          </div>
        ))}
      </div>
      {/* Duplicate for seamless loop */}
      <div
        aria-hidden="true"
        className={cn("flex shrink-0 animate-marquee [gap:var(--gap)]", {
          "flex-row": !vertical,
          "flex-col": vertical,
          "animate-marquee-vertical": vertical,
          "animate-marquee-reverse": reverse && !vertical,
          "animate-marquee-vertical-reverse": reverse && vertical,
          "group-hover:[animation-play-state:paused]": pauseOnHover,
        })}
      >
        {new Array(repeat).fill(0).map((_, i) => (
          <div
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "flex-row": !vertical,
              "flex-col": vertical,
            })}
            key={`marquee-2-${
              // biome-ignore lint/suspicious/noArrayIndexKey: Static array with fixed length
              i
            }`}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
