"use client";
import NumberFlow from "@number-flow/react";
import { motion } from "framer-motion";
import { Tick02Icon } from "hugeicons-react";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: "free",
    name: "Free",
    price: {
      monthly: 0,
      yearly: 0,
    },
    period: "/Forever",
    description: "Ideal solution for small teams and fast-moving startups.",
    features: [
      "Collaborate with up to 3 teammates",
      "Core task management features",
      "Unlimited projects and tasks",
      "Board and list views",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: {
      monthly: 16,
      yearly: 12, // Assuming a discount
    },
    period: "/month",
    description:
      "Advanced tools built to empower fast-growing and collaborative modern teams.",
    features: [
      "Collaborate with up to 10 teammates",
      "Custom workflows and templates",
      "Advanced tracking & reports",
      "Role-based access control",
      "Automated task reminders",
      "Priority integrations",
      "Email support",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    id: "team",
    name: "Team",
    price: {
      monthly: 42,
      yearly: 35, // Assuming a discount
    },
    period: "/month",
    description: "Powerful collaboration tools built for growing larger teams.",
    features: [
      "Dedicated success manager included",
      "Custom roles and permissions",
      "Unlimited workflows & automations",
      "Up to 25 teammates",
      "Real-time analytics",
      "Premium integrations",
      "Priority support",
    ],
    cta: "Get Started",
    popular: false,
  },
];

const PricingSection = () => {
  const [frequency, setFrequency] = useState<string>("monthly");

  return (
    <div className="mx-auto max-w-6xl px-8 py-24">
      {/* Header Section */}
      <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="mx-auto max-w-2xl text-center md:mx-0 md:text-left">
          <h1 className="mb-4 font-bold text-4xl tracking-tight md:text-5xl">
            Pick the perfect plan
          </h1>
          <p className="text-lg text-muted-foreground">
            Stay organized, hit your goals, and scale your productivity—on your
            terms.
          </p>
        </div>
        <div className="relative mx-auto flex items-center rounded-sm bg-border/20 p-1 md:mx-0">
          {(["monthly", "yearly"] as const).map((value) => (
            <button
              className={cn(
                "relative cursor-pointer rounded-sm px-6 py-2 font-medium text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                frequency === value
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
              key={value}
              onClick={() => setFrequency(value)}
              type="button"
            >
              {value.charAt(0).toUpperCase() + value.slice(1)}
              {frequency === value && (
                <motion.div
                  className="-z-10 absolute inset-0 rounded-sm bg-primary"
                  layoutId="active-pill"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
        {plans.map((plan) => (
          <Card
            className={cn(
              "relative flex flex-col rounded-sm border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-primary/5 hover:shadow-xl",
              plan.popular
                ? "scale-105 shadow-2xl shadow-primary/20 ring-1 ring-primary/30 md:scale-105 dark:shadow-primary/30"
                : ""
            )}
            key={plan.id}
          >
            <CardHeader className="pb-4">
              <CardTitle className="mb-3 font-bold text-xl">
                {plan.name}
              </CardTitle>
              <CardDescription className="text-muted-foreground text-sm leading-relaxed">
                {plan.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-5">
              <div className="mb-1 flex items-baseline gap-1">
                <span className="font-bold text-4xl">
                  <NumberFlow
                    format={{
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    }}
                    value={
                      plan.price[frequency as keyof typeof plan.price] as number
                    }
                  />
                </span>
                <span className="text-muted-foreground text-sm">
                  {plan.period}
                </span>
              </div>

              <Button
                className={cn(
                  "h-11 w-full rounded-sm font-medium text-base transition-all",
                  plan.popular
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90"
                    : "border border-border bg-secondary/50 text-secondary-foreground hover:bg-secondary/70"
                )}
              >
                {plan.cta} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div
                    className="flex items-start gap-2.5 text-muted-foreground text-sm"
                    key={feature}
                  >
                    <Tick02Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PricingSection;
