"use client";

import { CreditCard, LinkForward, Sparkles01 } from "hugeicons-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type SubscriptionCardProps = {
  subscriptionStatus?: string;
  subscriptionEndsAt?: string | null;
};

export function SubscriptionCard({
  subscriptionStatus = "free",
  subscriptionEndsAt,
}: SubscriptionCardProps) {
  const [loading, setLoading] = useState(false);

  const isPremium = ["active", "trialing"].includes(subscriptionStatus);
  const isCanceled = subscriptionStatus === "canceled";
  const hasGracePeriod =
    isCanceled &&
    subscriptionEndsAt &&
    new Date(subscriptionEndsAt) > new Date();

  // biome-ignore lint/suspicious/useAwait: Async function required for consistency
  const handleManageSubscription = async () => {
    try {
      setLoading(true);

      // Redirect to Dodo customer portal
      window.location.href = "/api/customer-portal";
    } catch (error) {
      console.error("Portal error:", error);
      toast.error("Failed to open subscription portal. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = () => {
    if (isPremium) {
      return (
        <Badge className="bg-linear-to-r from-purple-500 to-pink-500">
          Premium
        </Badge>
      );
    }
    if (hasGracePeriod) {
      return (
        <Badge className="border-orange-500 text-orange-500" variant="outline">
          Canceled
        </Badge>
      );
    }
    return <Badge variant="secondary">Free</Badge>;
  };

  const getStatusDescription = () => {
    if (hasGracePeriod && subscriptionEndsAt) {
      const endDate = new Date(subscriptionEndsAt).toLocaleDateString();
      return `Your premium access will end on ${endDate}`;
    }
    if (isPremium) {
      return "You have access to all premium features";
    }
    return "Upgrade to unlock premium features";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            <CardTitle>Subscription</CardTitle>
          </div>
          {getStatusBadge()}
        </div>
        <CardDescription>{getStatusDescription()}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Plan Info */}
        <div className="space-y-3 rounded-sm border p-4">
          <div className="flex items-center justify-between">
            <span className="font-medium text-sm">Current Plan</span>
            <span className="font-bold text-lg">
              {isPremium || hasGracePeriod ? "Premium" : "Free"}
            </span>
          </div>

          {isPremium && (
            <div className="space-y-2 text-muted-foreground text-sm">
              <div className="flex items-center gap-2">
                <Sparkles01 className="h-4 w-4 text-primary" />
                <span>Unlimited projects</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles01 className="h-4 w-4 text-primary" />
                <span>Priority support</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles01 className="h-4 w-4 text-primary" />
                <span>Advanced analytics</span>
              </div>
            </div>
          )}

          {hasGracePeriod && subscriptionEndsAt && (
            <div className="text-orange-600 text-sm dark:text-orange-400">
              Your subscription has been canceled but you still have access
              until {new Date(subscriptionEndsAt).toLocaleDateString()}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          {isPremium || hasGracePeriod ? (
            <Button
              className="w-full"
              disabled={loading}
              onClick={handleManageSubscription}
              variant="outline"
            >
              <LinkForward className="mr-2 h-4 w-4" />
              {loading ? "Loading..." : "Manage Subscription"}
            </Button>
          ) : (
            <Button asChild className="w-full">
              <Link href="/pricing">
                <Sparkles01 className="mr-2 h-4 w-4" />
                Upgrade to Premium
              </Link>
            </Button>
          )}
        </div>

        {!(isPremium || hasGracePeriod) && (
          <p className="text-center text-muted-foreground text-xs">
            Get access to all premium features for $29/month
          </p>
        )}
      </CardContent>
    </Card>
  );
}
