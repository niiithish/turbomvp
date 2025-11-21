"use client";

import {
  Analytics01Icon,
  DashboardSpeed01Icon,
  HeadsetIcon,
  Layout01Icon,
  Link02Icon,
  Shield01Icon,
} from "hugeicons-react";

const features = [
  {
    title: "Automated reports",
    description:
      "Generate reports effortlessly and stay informed with ease.",
    icon: Analytics01Icon,
  },
  {
    title: "Seamless integration",
    description:
      "Effortlessly connect Aurix with your existing tools for a unified workflow.",
    icon: Link02Icon,
  },
  {
    title: "Boost productivity",
    description:
      "Automate routine tasks to save time and enhance your team's efficiency.",
    icon: DashboardSpeed01Icon,
  },
  {
    title: "24/7 AI support",
    description:
      "Get round-the-clock assistance with Aurix's AI, always ready to help.",
    icon: HeadsetIcon,
  },
  {
    title: "Data security & compliance",
    description:
      "Protect your business with advanced encryption and compliance standards.",
    icon: Shield01Icon,
  },
  {
    title: "Intuitive user experience",
    description:
      "Start using Aurix quickly with a user-friendly, straightforward interface.",
    icon: Layout01Icon,
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-background text-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Why peoples choose Brightly
          </h2>
          <p className="text-muted-foreground text-lg">
            Unlock the full potential of your business with unparalleled efficiency and productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 overflow-hidden"
            >
              {/* Gradient background effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-6 p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6" />
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
