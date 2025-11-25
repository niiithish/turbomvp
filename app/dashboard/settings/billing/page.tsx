"use client";

import {
  CreditCardIcon,
  Loading03Icon,
  Rocket01Icon,
  Settings02Icon,
} from "hugeicons-react";
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
import { Separator } from "@/components/ui/separator";
import { getCurrentUserBilling } from "@/lib/actions/billing-actions";

type BillingInfo = {
  plan: string | null;
  subscriptionStatus: string | null;
  subscriptionId: string | null;
  dodoCustomerId: string | null;
};

function PlanStatusBadge({ isPro }: { isPro: boolean }) {
  const className = isPro
    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
    : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";

  return (
    <div className={`rounded-full px-3 py-1 font-medium text-sm ${className}`}>
      {isPro ? "Active" : "Free"}
    </div>
  );
}

function ManageButton({
  isLoading,
  onClick,
}: {
  isLoading: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      className="w-full sm:w-auto"
      disabled={isLoading}
      onClick={onClick}
      variant="outline"
    >
      {isLoading ? (
        <>
          <Loading03Icon className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        <>
          <Settings02Icon className="mr-2 h-4 w-4" />
          Manage Subscription
        </>
      )}
    </Button>
  );
}

function UpgradeButton({
  isLoading,
  onClick,
}: {
  isLoading: boolean;
  onClick: () => void;
}) {
  return (
    <Button className="w-full sm:w-auto" disabled={isLoading} onClick={onClick}>
      {isLoading ? (
        <>
          <Loading03Icon className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <Rocket01Icon className="mr-2 h-4 w-4" />
          Upgrade to Pro
        </>
      )}
    </Button>
  );
}

function useBilling() {
  const [billing, setBilling] = useState<BillingInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUserBilling()
      .then(setBilling)
      .catch((err) => console.error("Failed to fetch billing info:", err))
      .finally(() => setIsLoading(false));
  }, []);

  const isPro =
    billing?.plan === "pro" && billing?.subscriptionStatus === "active";

  return { billing, isLoading, isPro };
}

export default function BillingSettingsPage() {
  const { isLoading: isLoadingBilling, isPro } = useBilling();
  const [isLoadingPortal, setIsLoadingPortal] = useState(false);
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);

  const handleManageSubscription = async () => {
    setIsLoadingPortal(true);
    try {
      const { data: portal, error } =
        await authClient.dodopayments.customer.portal();

      if (error) {
        toast.error("Failed to open portal", {
          description: error.message || "Please try again later.",
        });
        return;
      }

      if (portal?.redirect && portal?.url) {
        window.location.href = portal.url;
      }
    } catch {
      toast.error("Failed to open portal", {
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoadingPortal(false);
    }
  };

  const handleUpgrade = async () => {
    setIsLoadingCheckout(true);
    try {
      // Get current session for user info
      const sessionData = await authClient.getSession();
      const user = sessionData?.data?.user;

      const { data: checkout, error } = await authClient.dodopayments.checkout({
        slug: "pro-plan",
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
      setIsLoadingCheckout(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-semibold text-2xl tracking-tight">Billing</h2>
        <p className="text-muted-foreground">
          Manage your subscription and billing information.
        </p>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCardIcon className="h-5 w-5" />
            Current Plan
          </CardTitle>
          <CardDescription>
            Your current subscription plan and status.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoadingBilling ? (
            <div className="flex items-center justify-center py-8">
              <Loading03Icon className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-1">
                  <p className="font-medium text-lg">
                    {isPro ? "Pro Plan" : "Free Plan"}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {isPro
                      ? "You have access to all premium features."
                      : "Upgrade to Pro for advanced features."}
                  </p>
                </div>
                <PlanStatusBadge isPro={isPro} />
              </div>

              {isPro ? (
                <ManageButton
                  isLoading={isLoadingPortal}
                  onClick={handleManageSubscription}
                />
              ) : (
                <UpgradeButton
                  isLoading={isLoadingCheckout}
                  onClick={handleUpgrade}
                />
              )}
            </>
          )}
        </CardContent>
      </Card>

      {isPro && (
        <Card>
          <CardHeader>
            <CardTitle>Billing Portal</CardTitle>
            <CardDescription>
              Access your billing portal to manage payment methods, view
              invoices, and update billing information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              The billing portal is provided by Dodo Payments. You can update
              your payment method, download invoices, and cancel your
              subscription from there.
            </p>
          </CardContent>
        </Card>
      )}

      {!isPro && (
        <Card>
          <CardHeader>
            <CardTitle>Compare Plans</CardTitle>
            <CardDescription>
              See what&apos;s included in each plan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline">
              <Link href="/#pricing">View Pricing</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
