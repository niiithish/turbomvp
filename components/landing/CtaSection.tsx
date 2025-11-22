"use client";

import { SparklesIcon } from "hugeicons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CtaSection() {
  return (
    <section className="relative w-full overflow-hidden bg-background py-24 md:py-32">
      {/* Background Gradient Effects */}
      <div className="-z-10 -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-[500px] w-[500px] opacity-30">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/40 to-purple-500/40 mix-blend-screen blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="flex w-full flex-col items-center gap-12 lg:flex-row lg:gap-20">
          {/* Icon/Graphic Side (Left) */}
          <div className="relative order-first flex flex-1 justify-center lg:justify-start">
            <div className="relative flex h-64 w-64 items-center justify-center rounded-full border border-white/10 bg-gradient-to-b from-white/10 to-white/5 shadow-2xl backdrop-blur-sm sm:h-80 sm:w-80">
              {/* Inner Glow */}
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl" />

              {/* Icon */}
              <SparklesIcon className="h-32 w-32 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] sm:h-40 sm:w-40" />
            </div>
          </div>

          {/* Text Content (Right) */}
          <div className="max-w-xl flex-1 text-center lg:text-left">
            <h2 className="font-bold text-3xl text-white tracking-tight sm:text-4xl lg:text-5xl">
              Time to transform your{" "}
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                productivity game.
              </span>
            </h2>
            <p className="mt-6 text-gray-400 text-lg leading-8">
              Join thousands of forward-thinking companies already using
              Brightly to dominate their industries.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <Button
                asChild
                className="h-12 rounded-lg bg-primary px-8 font-medium text-base text-primary-foreground shadow-[0_0_20px_-5px_var(--color-primary)] hover:bg-primary/90"
                size="lg"
              >
                <Link href="/signup">Get started</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
