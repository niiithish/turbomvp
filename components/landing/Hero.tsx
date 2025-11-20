"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Hero() {

  return (
    <div className="relative min-h-screen w-full flex flex-col gap-16 items-center justify-center px-6 py-(--section-padding-y-sm) overflow-hidden">

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="mt-6 text-center">
          <h1 className="text-4xl md:text-6xl leading-[1.15] font-semibold tracking-tighter">
            Organize your day, master <br /> your productivity flow
          </h1>
        </div>
        <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
          Manage projects effortlessly with smart tools, stay on track, meet deadlines, and keep your team productive.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Button size="lg" className="text-base" asChild>
            <Link href="https://github.com">Get started</Link>
          </Button>
        </div>
      </div>

      {/* Image Container with Glow and Matrix Aura */}
      <div className="relative w-full max-w-[1200px] mx-auto z-10">
        <div className="absolute -inset-4 md:-inset-12 -z-10 rounded-[inherit]">
          {/* Soft Aura Layers */}
          <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-[inherit]" />
          <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-[inherit]" />
        </div>

        <div className="relative aspect-video bg-accent rounded-(--card-radius-xl) overflow-hidden border border-primary/20 shadow-[0_0_50px_-12px_var(--primary)]">
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
            alt="Screenshot"
            className="mx-auto object-cover"
          />
          {/* Inner Edge Glow */}
          <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(var(--primary),0.5)] rounded-[inherit] pointer-events-none" />
        </div>
      </div>

      {/* Gradient overlay at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-100 bg-linear-to-t from-background to-transparent pointer-events-none z-20" />
    </div>
  );
}
