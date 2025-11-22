"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Sarah Chen",
    handle: "@sarahcodes",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    text: "This starter kit saved me weeks of development time. The authentication and database setup is flawless.",
  },
  {
    name: "Alex Rivera",
    handle: "@arivera",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    text: "Finally a Next.js starter that doesn't feel bloated. Clean code, great structure, and easy to customize.",
  },
  {
    name: "Mike Johnson",
    handle: "@mikej",
    avatar: "https://randomuser.me/api/portraits/men/86.jpg",
    text: "I launched my SaaS in a weekend using this kit. The pre-built components are a lifesaver.",
  },
  {
    name: "Emily Zhang",
    handle: "@emilyz",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "The documentation is excellent. I was able to integrate my own AI features without breaking anything.",
  },
  {
    name: "David Kim",
    handle: "@dkim",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    text: "Best open source starter I've found. The tech stack is modern and the performance is top notch.",
  },
  {
    name: "Lisa Patel",
    handle: "@lpatel",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    text: "Highly recommend this for anyone looking to build a SaaS. It handles all the boring stuff so you can focus on your product.",
  },
];

const TestimonialCard = ({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0];
}) => (
  <div className="mb-4 break-inside-avoid space-y-4 rounded-(--radius) border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-primary/5 hover:shadow-xl">
    <p className="text-muted-foreground leading-relaxed">
      &quot;{testimonial.text}&quot;
    </p>
    <div className="flex items-center gap-3">
      <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
        <Image
          alt={testimonial.name}
          className="h-full w-full object-cover"
          height={40}
          src={testimonial.avatar}
          width={40}
        />
      </div>
      <div>
        <h4 className="font-medium text-foreground text-sm">
          {testimonial.name}
        </h4>
        <p className="text-muted-foreground text-xs">{testimonial.handle}</p>
      </div>
    </div>
  </div>
);

const TestimonialSection = () => {
  return (
    <section className="mx-auto max-w-6xl overflow-hidden px-8 py-24">
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* Left Content */}
        <div className="mx-auto max-w-xl space-y-8 text-center lg:mx-0 lg:text-left">
          <h2 className="mb-4 font-bold text-4xl text-foreground tracking-tight md:text-5xl">
            What developers are <br />
            saying about this kit
          </h2>
          <p className="max-w-md text-lg text-muted-foreground">
            Join thousands of developers building faster with this starter kit.
          </p>
          <Button
            className="h-12 rounded-(--radius) bg-primary px-8 text-base text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90"
            size="lg"
          >
            View on GitHub
          </Button>
        </div>

        {/* Right Content - Marquee */}
        <div className="mask-[linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] relative h-[600px] overflow-hidden">
          <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Column 1 - Up */}
            <div
              className="space-y-4"
              style={{ animation: "marquee-up 40s linear infinite" }}
            >
              {testimonials.concat(testimonials).map((t, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: Static list for marquee
                <TestimonialCard key={`col1-${i}`} testimonial={t} />
              ))}
            </div>
            {/* Column 2 - Down */}
            <div
              className="hidden space-y-4 sm:block"
              style={{ animation: "marquee-down 40s linear infinite" }}
            >
              {testimonials.concat(testimonials).map((t, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: Static list for marquee
                <TestimonialCard key={`col2-${i}`} testimonial={t} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
