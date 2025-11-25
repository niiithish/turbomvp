"use client";
import NumberFlow from "@number-flow/react";
import { motion } from "framer-motion";
import { ArrowRight01Icon, Loading03Icon, Tick02Icon } from "hugeicons-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/auth/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { pricingPlans } from "@/config/pricing";
import { getCurrentUserBilling } from "@/lib/actions/billing-actions";
import { cn } from "@/lib/utils/cn";
import type { PricingFrequency, PricingPlan } from "@/types";

function PricingButton({
  plan,
  isLoading,
  onCheckout,
  userPlan,
}: {
  plan: PricingPlan;
  isLoading: boolean;
  onCheckout: (plan: PricingPlan) => void;
  userPlan: string | null;
}) {
  const { data: session } = authClient.useSession();

  // Check if this is the user's current plan
  const isCurrentPlan =
    (plan.id === "free" && (!userPlan || userPlan === "free")) ||
    (plan.id === "pro" && userPlan === "pro");

  // Current plan button (disabled)
  if (session?.user && isCurrentPlan) {
    return (
      <Button
        className={cn(
          "h-11 w-full rounded-sm font-medium text-base transition-all",
          "cursor-default border border-primary/50 bg-primary/10 text-primary"
        )}
        disabled
      >
        Current Plan
      </Button>
    );
  }

  // Enterprise plan - always show contact link
  if (plan.id === "enterprise") {
    return (
      <Button
        asChild
        className={cn(
          "h-11 w-full rounded-sm font-medium text-base transition-all",
          "border border-border bg-secondary/50 text-secondary-foreground hover:bg-secondary/70"
        )}
      >
        <a href="mailto:contact@turbomvp.com">
          {plan.cta} <ArrowRight01Icon className="ml-2 h-4 w-4" />
        </a>
      </Button>
    );
  }

  // Free plan - show signup link for unauthenticated users
  if (plan.id === "free") {
    return (
      <Button
        asChild
        className={cn(
          "h-11 w-full rounded-sm font-medium text-base transition-all",
          "border border-border bg-secondary/50 text-secondary-foreground hover:bg-secondary/70"
        )}
      >
        <Link href="/signup">
          {plan.cta} <ArrowRight01Icon className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    );
  }

  // Pro plan - checkout for authenticated users, signup for others
  if (session?.user && plan.slug) {
    return (
      <Button
        className={cn(
          "h-11 w-full rounded-sm font-medium text-base transition-all",
          "bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90"
        )}
        disabled={isLoading}
        onClick={() => onCheckout(plan)}
      >
        {isLoading ? (
          <>
            <Loading03Icon className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            {plan.cta} <ArrowRight01Icon className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    );
  }

  // Not authenticated - show signup link
  return (
    <Button
      asChild
      className={cn(
        "h-11 w-full rounded-sm font-medium text-base transition-all",
        plan.popular
          ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90"
          : "border border-border bg-secondary/50 text-secondary-foreground hover:bg-secondary/70"
      )}
    >
      <Link href="/signup">
        {plan.cta} <ArrowRight01Icon className="ml-2 h-4 w-4" />
      </Link>
    </Button>
  );
}

const PricingSection = () => {
  const { data: session } = authClient.useSession();
  const [frequency, setFrequency] = useState<PricingFrequency>("monthly");
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [userPlan, setUserPlan] = useState<string | null>(null);

  // Fetch user's current plan from billing server action
  // biome-ignore lint/correctness/useExhaustiveDependencies: only fetch when session changes
  useEffect(() => {
    async function fetchUserPlan() {
      if (session?.user) {
        try {
          const billing = await getCurrentUserBilling();
          setUserPlan(billing?.plan || "free");
        } catch {
          setUserPlan("free");
        }
      } else {
        setUserPlan(null);
      }
    }
    fetchUserPlan();
  }, [session?.user?.id]);

  const handleCheckout = async (plan: PricingPlan) => {
    if (!plan.slug) {
      return;
    }

    setLoadingPlan(plan.id);
    try {
      // Get current session for user info
      const sessionData = await authClient.getSession();
      const user = sessionData?.data?.user;

      const { data: checkout, error } = await authClient.dodopayments.checkout({
        slug: plan.slug,
        customer: {
          email: user?.email || "",
          name: user?.name || "Customer",
        },
        // Billing address is required by Dodo Payments
        billing: {
          city: "",
          country: "US",
          state: "",
          street: "",
          zipcode: "",
        },
      });

      if (error) {
        toast.error("Checkout failed", {
          description: error.message || "Please try again later.",
        });
        return;
      }

      if (checkout?.url) {
        window.location.href = checkout.url;
      }
    } catch {
      toast.error("Checkout failed", {
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-8 py-24" id="pricing">
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
                {plan.id === "enterprise" ? (
                  <span className="font-bold text-4xl">Custom</span>
                ) : (
                  <>
                    <span className="font-bold text-4xl">
                      <NumberFlow
                        format={{
                          style: "currency",
                          currency: "USD",
                          maximumFractionDigits: 0,
                        }}
                        value={
                          plan.price[
                            frequency as keyof typeof plan.price
                          ] as number
                        }
                      />
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {plan.period}
                    </span>
                  </>
                )}
              </div>

              <PricingButton
                isLoading={loadingPlan === plan.id}
                onCheckout={handleCheckout}
                plan={plan}
                userPlan={userPlan}
              />

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
