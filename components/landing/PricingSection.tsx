"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Cancel01Icon,
  InformationCircleIcon,
  Tick02Icon,
} from "hugeicons-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: "free",
    name: "Free",
    price: {
      monthly: "$0",
      yearly: "$0",
    },
    usage: "$5 free monthly usage",
    features: [
      { name: "10 concurrent runs", included: true },
      { name: "Unlimited tasks", included: true },
      { name: "5 team members", included: true },
      { name: "Dev and Prod environments", included: true },
      { name: "Preview branches", included: false },
      { name: "10 schedules", included: true },
      { name: "1 day log retention", included: true },
      { name: "Community support", included: true },
      { name: "1 alert destination", included: true },
      { name: "10 concurrent Realtime connections", included: true },
    ],
    cta: "Get started",
    highlight: false,
  },
  {
    id: "hobby",
    name: "Hobby",
    price: {
      monthly: "$10",
      yearly: "$100",
    },
    usage: "$10 monthly usage included",
    features: [
      { name: "25 concurrent runs", included: true },
      { name: "Unlimited tasks", included: true },
      { name: "5 team members", included: true },
      { name: "Dev, Staging and Prod environments", included: true },
      { name: "5 preview branches", included: true },
      { name: "100 schedules", included: true },
      { name: "7 day log retention", included: true },
      { name: "Community support", included: true },
      { name: "3 alert destinations", included: true },
      { name: "50 concurrent Realtime connections", included: true },
    ],
    cta: "Get started",
    highlight: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: {
      monthly: "$50",
      yearly: "$500",
    },
    usage: "$50 monthly usage included",
    features: [
      {
        name: "100+ concurrent runs",
        included: true,
        subtext: "Then $50/month per 50",
      },
      { name: "Unlimited tasks", included: true },
      {
        name: "25+ team members",
        included: true,
        subtext: "Then $20/month per seat",
      },
      { name: "Dev, Staging and Prod environments", included: true },
      {
        name: "20+ preview branches",
        included: true,
        subtext: "Then $10/month per branch",
      },
      {
        name: "1000+ schedules",
        included: true,
        subtext: "Then $10/month per 1,000",
      },
      { name: "30 day log retention", included: true },
      { name: "Dedicated Slack support", included: true },
      { name: "100+ alert destinations", included: true },
      {
        name: "500+ concurrent Realtime connections",
        included: true,
        subtext: "Then $10/month per 100",
      },
    ],
    cta: "Get started",
    highlight: false,
  },
];

const PricingSection = () => {
  const [frequency, setFrequency] = useState<"monthly" | "yearly">("monthly");

  return (
    <section className="bg-background py-24 md:py-32 text-foreground">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Header Section */}
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="mb-3 font-semibold text-4xl">
              Pick the perfect plan
            </h2>
            <p className="text-base text-muted-foreground">
              Stay organized, hit your goals, and scale your productivity—on
              your terms.
            </p>
          </div>

          {/* Toggle Switch */}
          <div className="flex shrink-0 items-center justify-start gap-3">
            <div className="relative inline-flex items-center rounded-md border border-border bg-card p-1">
              <motion.div
                animate={{
                  x: frequency === "monthly" ? 2 : "100%",
                  width:
                    frequency === "monthly"
                      ? "calc(50% - 4px)"
                      : "calc(50% - 4px)",
                }}
                className="absolute inset-y-1 rounded-sm bg-primary"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              />
              <button
                className={cn(
                  "relative z-10 rounded-sm px-6 py-2 font-medium text-sm transition-colors duration-200",
                  frequency === "monthly"
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => setFrequency("monthly")}
              >
                Monthly
              </button>
              <button
                className={cn(
                  "relative z-10 rounded-sm px-6 py-2 font-medium text-sm transition-colors duration-200",
                  frequency === "yearly"
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => setFrequency("yearly")}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              className={cn(
                "flex flex-col rounded-sm border p-6 transition-all duration-200",
                plan.highlight
                  ? "border-[#ccff00] bg-card/50"
                  : "border-border bg-card/20"
              )}
              key={plan.id}
            >
              <div className="mb-6">
                <h3 className="mb-2 font-medium text-lg text-muted-foreground">
                  {plan.name}
                </h3>
                <div className="mb-4 flex items-baseline gap-1">
                  <AnimatePresence mode="wait">
                    <motion.span
                      animate={{ y: 0, opacity: 1 }}
                      className="font-medium text-5xl tracking-tight"
                      exit={{ y: -20, opacity: 0 }}
                      initial={{ y: 20, opacity: 0 }}
                      key={frequency}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      {plan.price[frequency]}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-muted-foreground text-sm">/month</span>
                </div>

                <div className="flex w-fit cursor-help items-center gap-1 text-muted-foreground text-sm underline decoration-dotted underline-offset-4 hover:text-foreground">
                  {plan.usage}
                  {plan.highlight || plan.id === "pro" ? (
                    <InformationCircleIcon className="h-3 w-3" />
                  ) : null}
                </div>
              </div>

              <Button
                className={cn(
                  "mb-8 w-full rounded-md py-6 font-medium text-base transition-colors",
                  plan.highlight
                    ? "bg-[#ccff00] text-black hover:bg-[#b3e600]"
                    : "border border-border/50 bg-secondary/50 text-secondary-foreground hover:bg-secondary"
                )}
              >
                {plan.cta}
              </Button>

              <div className="flex-1">
                <ul className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li
                      className={cn(
                        "flex items-start gap-3 text-sm",
                        !feature.included && "opacity-50"
                      )}
                      key={idx}
                    >
                      {feature.included ? (
                        <Tick02Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#ccff00]" />
                      ) : (
                        <Cancel01Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                      )}
                      <div className="flex flex-col">
                        <span
                          className={cn(
                            feature.included
                              ? "text-foreground"
                              : "text-muted-foreground line-through"
                          )}
                        >
                          {feature.name}
                        </span>
                        {feature.subtext && (
                          <span className="mt-0.5 text-muted-foreground text-xs">
                            {feature.subtext}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
