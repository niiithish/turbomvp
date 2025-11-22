"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Rakibull Hasan",
    handle: "@rakibull",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Aurix delivers AI insights that empower smarter decisions and accelerate sustainable business growth daily. Aurix delivers AI insights that empower sempower",
  },
  {
    name: "Yeasin Arafat",
    handle: "@yeasin",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    text: "Aurix delivers AI insights that empower smarter decisions and accelerate sustainable business growth daily. Aurix delivers AI insights that empower sempower",
  },
  {
    name: "Safayet Ahmed",
    handle: "@asafayet",
    avatar: "https://randomuser.me/api/portraits/men/86.jpg",
    text: "Aurix delivers AI insights that empower smarter decisions and accelerate sustainable business growth daily. Aurix delivers AI insights that empower sempower",
  },
  {
    name: "Miksa Fruzsina",
    handle: "@miksa",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "Aurix delivers AI insights that empower smarter decisions and accelerate sustainable business growth daily. Aurix delivers AI insights that empower sempower",
  },
  {
    name: "Jhon Doe",
    handle: "@jhon",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    text: "Aurix delivers AI insights that empower smarter decisions and accelerate sustainable business growth daily. Aurix delivers AI insights that empower sempower",
  },
  {
    name: "Jane Doe",
    handle: "@jane",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    text: "Aurix delivers AI insights that empower smarter decisions and accelerate sustainable business growth daily. Aurix delivers AI insights that empower sempower",
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
            What people are <br />
            saying about Brightly
          </h2>
          <p className="max-w-md text-lg text-muted-foreground">
            Hear from real users who have transformed their workflows with the
            power of Ticksy
          </p>
          <Button
            className="h-12 rounded-(--radius) bg-primary px-8 text-base text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90"
            size="lg"
          >
            Get started
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
