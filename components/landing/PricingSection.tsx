"use client";
import NumberFlow from "@number-flow/react";
import { motion } from "framer-motion";
import { ArrowRight01Icon, Tick02Icon } from "hugeicons-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { pricingPlans } from "@/config";
import { cn } from "@/lib/utils";
import type { PricingFrequency } from "@/types";

const PricingSection = () => {
  const [frequency, setFrequency] = useState<PricingFrequency>("monthly");

  return (
    <div className="mx-auto max-w-6xl px-8 py-24">
      {/* Header Section */}
      <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="mx-auto max-w-2xl text-center md:mx-0 md:text-left">
          <h1 className="mb-4 font-bold text-4xl tracking-tight md:text-5xl">
            Pick the perfect plan
          </h1>
          <p className="text-lg text-muted-foreground">
            Simple, transparent pricing for your SaaS.
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
        {pricingPlans.map((plan) => (
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
                {plan.cta} <ArrowRight01Icon className="ml-2 h-4 w-4" />
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
