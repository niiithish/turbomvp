"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

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

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
  <div className="bg-card/50 backdrop-blur-sm border border-border/50 p-6 rounded-[var(--radius)] space-y-4 mb-4 break-inside-avoid transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
    <p className="text-muted-foreground leading-relaxed">
      &quot;{testimonial.text}&quot;
    </p>
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full overflow-hidden bg-muted relative">
        <img 
            src={testimonial.avatar} 
            alt={testimonial.name} 
            className="h-full w-full object-cover"
        />
      </div>
      <div>
        <h4 className="font-medium text-foreground text-sm">{testimonial.name}</h4>
        <p className="text-xs text-muted-foreground">{testimonial.handle}</p>
      </div>
    </div>
  </div>
);

const TestimonialSection = () => {
  return (
    <section className="py-24 px-8 max-w-6xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div className="space-y-8 max-w-xl text-center lg:text-left mx-auto lg:mx-0">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
            What people are <br />
            saying about Brightly
          </h2>
          <p className="text-muted-foreground text-lg max-w-md">
            Hear from real users who have transformed their workflows with the power of Ticksy
          </p>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20 rounded-[var(--radius)] px-8 h-12 text-base">
            Get started
          </Button>
        </div>

        {/* Right Content - Marquee */}
        <div className="relative h-[600px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
                {/* Column 1 - Up */}
                <div 
                    className="space-y-4"
                    style={{ animation: "marquee-up 40s linear infinite" }}
                >
                    {testimonials.concat(testimonials).map((t, i) => (
                        <TestimonialCard key={`col1-${i}`} testimonial={t} />
                    ))}
                </div>
                 {/* Column 2 - Down */}
                <div 
                    className="space-y-4 hidden sm:block"
                    style={{ animation: "marquee-down 40s linear infinite" }}
                >
                    {testimonials.concat(testimonials).map((t, i) => (
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
