"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CtaSection() {
  return (
    <section className="w-full px-6 md:px-8 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <div
          className="rounded-2xl p-12 text-center shadow-2xl sm:p-16"
          style={{ backgroundColor: "#171717" }}
        >
          <h2 className="mb-4 font-bold text-3xl text-white sm:text-4xl lg:text-5xl">
            Ready to Launch Your AI SaaS?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base text-gray-300 sm:text-lg">
            Start building your AI SaaS today with production-ready
            integrations, modern tech stack, and beautiful UI. Ship your product
            in days, not months.
          </p>
          <Button asChild className="text-base" size="lg">
            <Link href="https://github.com">
              Get Started Now <ArrowUpRight className="h-5! w-5!" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
