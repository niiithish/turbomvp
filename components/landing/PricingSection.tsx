"use client";
import NumberFlow from "@number-flow/react";
import { Tick02Icon } from "hugeicons-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

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
    <div className="py-24 px-8 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div className="max-w-2xl text-center md:text-left mx-auto md:mx-0">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Pick the perfect plan
          </h1>
          <p className="text-muted-foreground text-lg">
            Stay organized, hit your goals, and scale your productivity—on your
            terms.
          </p>
        </div>
        <div className="flex items-center p-1 bg-border/20 rounded-sm relative mx-auto md:mx-0">
          {(["monthly", "yearly"] as const).map((value) => (
            <button
              key={value}
              onClick={() => setFrequency(value)}
              className={cn(
                "cursor-pointer relative rounded-sm px-6 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                frequency === value
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {value.charAt(0).toUpperCase() + value.slice(1)}
              {frequency === value && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-primary rounded-sm -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={cn(
              "rounded-sm relative flex flex-col border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5",
              plan.popular ? "ring-1 ring-primary/30 shadow-2xl shadow-primary/20 dark:shadow-primary/30 scale-105 md:scale-105" : ""
            )}
          >
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold mb-3">{plan.name}</CardTitle>
              <CardDescription className="text-muted-foreground text-sm leading-relaxed">
                {plan.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-5">
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-bold">
                  <NumberFlow
                    value={
                      plan.price[frequency as keyof typeof plan.price] as number
                    }
                    format={{
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    }}
                  />
                </span>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </div>

              <Button
                className={cn(
                  "w-full h-11 rounded-sm text-base font-medium transition-all",
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20"
                    : "bg-secondary/50 text-secondary-foreground hover:bg-secondary/70 border border-border"
                )}
              >
                {plan.cta} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <div className="space-y-3">
                {plan.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Tick02Icon className="h-4 w-4 text-primary/70 shrink-0 mt-0.5" />
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
