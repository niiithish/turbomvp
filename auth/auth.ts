import {
  checkout,
  dodopayments,
  portal,
  webhooks,
} from "@dodopayments/better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth/minimal";
import { emailOTP } from "better-auth/plugins";
import DodoPayments from "dodopayments";
import { eq } from "drizzle-orm";
import { ChangeEmailOTP } from "@/components/emails/ChangeEmailOTP";
import { PasswordResetEmail } from "@/components/emails/PasswordResetEmail";
import { VerificationEmail } from "@/components/emails/VerificationEmail";
import { pricingPlans } from "@/config/pricing";
import {
  account,
  accountRelations,
  session,
  sessionRelations,
  users,
  usersRelations,
  verification,
} from "@/db/schema";
import { db } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { tempMailBlocker } from "./plugins/temp-mail-blocker";

// Validate required environment variables (skip during build)
if (!process.env.BETTER_AUTH_SECRET && process.env.NODE_ENV !== "production") {
  throw new Error(
    "BETTER_AUTH_SECRET is not set. Please add it to your .env file."
  );
}

// Initialize Dodo Payments client (only if API key is configured)
const dodoPaymentsClient = process.env.DODO_PAYMENTS_API_KEY
  ? new DodoPayments({
      bearerToken: process.env.DODO_PAYMENTS_API_KEY,
      environment:
        process.env.NODE_ENV === "production" ? "live_mode" : "test_mode",
    })
  : null;

// Get Pro plan product configuration
const proPlan = pricingPlans.find((p) => p.id === "pro");

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      account,
      accountRelations,
      session,
      sessionRelations,
      user: users,
      usersRelations,
      verification,
    },
  }),
  // Disabled experimental joins to avoid schema relation issues
  // The fallback query works perfectly fine for most use cases
  // experimental: {
  //   joins: true,
  // },
  user: {
    changeEmail: {
      enabled: true,
    },
    additionalFields: {
      firstName: {
        type: "string",
        required: false,
      },
      lastName: {
        type: "string",
        required: false,
      },
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        react: VerificationEmail({
          verificationUrl: url,
          userEmail: user.email,
          userName: user.name,
        }),
      });
    },
  },
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        react: PasswordResetEmail({
          resetUrl: url,
          userEmail: user.email,
          userName: user.name,
        }),
      });
    },
  },
  // Social providers configuration
  socialProviders: {
    ...(process.env.GOOGLE_CLIENT_ID &&
      process.env.GOOGLE_CLIENT_SECRET && {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
      }),
    ...(process.env.GITHUB_CLIENT_ID &&
      process.env.GITHUB_CLIENT_SECRET && {
        github: {
          clientId: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
        },
      }),
  },
  plugins: [
    tempMailBlocker(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "email-verification") {
          await sendEmail({
            to: email,
            subject: "Verify your email change",
            react: ChangeEmailOTP({
              otp,
              userEmail: email,
            }),
          });
        }
      },
    }),
    // Dodo Payments plugin (only enabled if API key is configured)
    ...(dodoPaymentsClient && proPlan?.dodoProductId
      ? [
          dodopayments({
            client: dodoPaymentsClient,
            createCustomerOnSignUp: false, // Lazy customer creation at checkout
            use: [
              checkout({
                products: [
                  {
                    productId: proPlan.dodoProductId,
                    slug: proPlan.slug ?? "pro-plan",
                  },
                ],
                successUrl: "/dashboard/billing/success",
                authenticatedUsersOnly: true,
              }),
              portal(),
              webhooks({
                webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_SECRET ?? "",
                // Subscription activated - upgrade user to Pro
                onSubscriptionActive: async (payload) => {
                  const data = payload.data as Record<string, unknown>;
                  const customer = data?.customer as
                    | { email?: string; customer_id?: string }
                    | undefined;
                  const customerEmail = customer?.email;

                  if (!customerEmail) {
                    console.warn(
                      "[Dodo Payments] No customer email in subscription.active"
                    );
                    return;
                  }

                  const [user] = await db
                    .select()
                    .from(users)
                    .where(eq(users.email, customerEmail))
                    .limit(1);

                  if (!user) {
                    console.warn(
                      "[Dodo Payments] User not found:",
                      customerEmail
                    );
                    return;
                  }

                  const subscriptionId = data?.subscription_id as
                    | string
                    | undefined;
                  await db
                    .update(users)
                    .set({
                      plan: "pro",
                      subscriptionStatus: "active",
                      subscriptionId,
                      dodoCustomerId: customer?.customer_id,
                    })
                    .where(eq(users.id, user.id));
                },
                // Subscription cancelled
                onSubscriptionCancelled: async (payload) => {
                  const data = payload.data as Record<string, unknown>;
                  const customer = data?.customer as
                    | { email?: string }
                    | undefined;
                  const customerEmail = customer?.email;

                  if (!customerEmail) {
                    return;
                  }

                  const [user] = await db
                    .select()
                    .from(users)
                    .where(eq(users.email, customerEmail))
                    .limit(1);

                  if (user) {
                    await db
                      .update(users)
                      .set({ subscriptionStatus: "cancelled" })
                      .where(eq(users.id, user.id));
                  }
                },
                // Subscription on hold (failed renewal)
                onSubscriptionOnHold: async (payload) => {
                  const data = payload.data as Record<string, unknown>;
                  const customer = data?.customer as
                    | { email?: string }
                    | undefined;
                  const customerEmail = customer?.email;

                  if (!customerEmail) {
                    return;
                  }

                  const [user] = await db
                    .select()
                    .from(users)
                    .where(eq(users.email, customerEmail))
                    .limit(1);

                  if (user) {
                    await db
                      .update(users)
                      .set({ subscriptionStatus: "on_hold" })
                      .where(eq(users.id, user.id));
                  }
                },
                // Payment succeeded - also update user for subscription payments
                onPaymentSucceeded: async (payload) => {
                  const data = payload.data as Record<string, unknown>;

                  const customer = data?.customer as
                    | { email?: string; customer_id?: string }
                    | undefined;
                  const customerEmail = customer?.email;

                  if (!customerEmail) {
                    return;
                  }

                  const [user] = await db
                    .select()
                    .from(users)
                    .where(eq(users.email, customerEmail))
                    .limit(1);

                  if (user) {
                    // Check for subscription_id in various locations
                    const subscriptionId = (data?.subscription_id ||
                      data?.subscriptionId ||
                      (data?.subscription as { id?: string })?.id) as
                      | string
                      | undefined;

                    // Check if this is a subscription payment by looking at payment_type or product info
                    const isSubscription = !!(
                      subscriptionId ||
                      data?.payment_type === "subscription" ||
                      data?.type === "subscription"
                    );

                    if (isSubscription) {
                      // This is a subscription payment
                      await db
                        .update(users)
                        .set({
                          plan: "pro",
                          subscriptionStatus: "active",
                          subscriptionId: subscriptionId || "pending",
                          dodoCustomerId: customer?.customer_id,
                        })
                        .where(eq(users.id, user.id));
                    } else {
                      // One-time payment - just store customer ID
                      await db
                        .update(users)
                        .set({
                          dodoCustomerId: customer?.customer_id,
                        })
                        .where(eq(users.id, user.id));
                    }
                  }
                },
              }),
            ],
          }),
        ]
      : []),
  ],
});
