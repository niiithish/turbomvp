"use client";

import { SparklesIcon } from "hugeicons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CtaSection() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-background overflow-hidden">
      {/* Background Gradient Effects */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-purple-500/40 blur-[100px] rounded-full mix-blend-screen" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center w-full gap-12 lg:gap-20">
          {/* Icon/Graphic Side (Left) */}
          <div className="flex-1 flex justify-center lg:justify-start relative order-first">
            <div className="relative flex h-64 w-64 sm:h-80 sm:w-80 items-center justify-center rounded-full bg-gradient-to-b from-white/10 to-white/5 border border-white/10 backdrop-blur-sm shadow-2xl">
              {/* Inner Glow */}
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />

              {/* Icon */}
              <SparklesIcon
                className="h-32 w-32 sm:h-40 sm:w-40 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                variant="solid"
              />
            </div>
          </div>

          {/* Text Content (Right) */}
          <div className="flex-1 text-center lg:text-left max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Time to transform your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                productivity game.
              </span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-400">
              Join thousands of forward-thinking companies already using Brightly
              to dominate their industries.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-8 h-12 text-base font-medium shadow-[0_0_20px_-5px_var(--color-primary)]"
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
