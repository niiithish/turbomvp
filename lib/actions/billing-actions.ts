"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/auth/auth";
import { pricingPlans } from "@/config/pricing";
import { users } from "@/db/schema";
import { db } from "@/lib/db";

/**
 * Get the Pro plan configuration (internal helper)
 */
function getProPlan() {
  return pricingPlans.find((p) => p.id === "pro");
}

/**
 * Check if Dodo Payments is configured (internal helper)
 */
function isDodoPaymentsConfigured() {
  const proPlan = getProPlan();
  return !!(
    process.env.DODO_PAYMENTS_API_KEY &&
    proPlan?.dodoProductId &&
    proPlan.dodoProductId !== "pdt_xxxxxxxxxxxxxxxxxxxxx"
  );
}

/**
 * Get the current user's billing information
 */
export async function getCurrentUserBilling() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return null;
  }

  const [user] = await db
    .select({
      plan: users.plan,
      subscriptionStatus: users.subscriptionStatus,
      subscriptionId: users.subscriptionId,
      dodoCustomerId: users.dodoCustomerId,
    })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);

  return user ?? null;
}

/**
 * Check if the current user has a Pro subscription
 */
export async function isProUser() {
  const billing = await getCurrentUserBilling();
  return billing?.plan === "pro" && billing?.subscriptionStatus === "active";
}

/**
 * Redirect to checkout for Pro plan upgrade
 * This is a server action that can be called from client components
 */
export async function redirectToCheckout() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login?redirect=/dashboard/billing");
  }

  const isConfigured = await isDodoPaymentsConfigured();
  if (!isConfigured) {
    throw new Error(
      "Dodo Payments is not configured. Please set up your API key and product ID."
    );
  }

  // The actual checkout is handled client-side via authClient.dodopayments.checkout()
  // This action is mainly for server-side validation
  return { success: true };
}
