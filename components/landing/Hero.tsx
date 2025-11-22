"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function Hero() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center gap-16 overflow-hidden px-6 py-12 md:px-8 md:py-16">
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="mt-6 text-center">
          <h1 className="font-semibold text-4xl leading-[1.15] tracking-tighter md:text-5xl">
            Organize your day, master <br /> your productivity flow
          </h1>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-muted-foreground text-xl">
          Manage projects effortlessly with smart tools, stay on track, meet
          deadlines, and keep your team productive.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Button asChild className="text-base" size="lg">
            <Link href="https://github.com">Get started</Link>
          </Button>
        </div>
      </div>

      {/* Image Container with Glow and Matrix Aura */}
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="-inset-4 md:-inset-12 -z-10 absolute rounded-[inherit]">
          {/* Soft Aura Layers */}
          <div className="absolute inset-0 rounded-[inherit] bg-primary/20 blur-[60px]" />
          <div className="absolute inset-0 rounded-[inherit] bg-primary/10 blur-[100px]" />
        </div>

        <div className="relative aspect-20/9 overflow-hidden rounded-2xl border border-primary/20 bg-accent shadow-[0_0_50px_-12px_var(--primary)]">
          <Image
            alt="Screenshot"
            className="mx-auto object-cover"
            height={540}
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
            width={1200}
          />
          {/* Inner Edge Glow */}
          <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_20px_rgba(var(--primary),0.5)]" />
        </div>
      </div>

      {/* Gradient overlay at the bottom */}
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-20 h-100 bg-linear-to-t from-background to-transparent" />
    </div>
  );
}
