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
    description: "Generate reports effortlessly and stay informed with ease.",
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
    <section className="bg-background py-24 text-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 font-bold text-3xl text-foreground md:text-4xl">
            Why peoples choose Brightly
          </h2>
          <p className="text-lg text-muted-foreground">
            Unlock the full potential of your business with unparalleled
            efficiency and productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-8 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
              key={feature.title}
            >
              {/* Gradient background effect on hover */}
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-6 rounded-xl bg-primary/10 p-3 text-primary transition-transform duration-300 group-hover:scale-110">
                  <feature.icon className="h-6 w-6" />
                </div>

                <h3 className="mb-3 font-semibold text-foreground text-xl">
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
