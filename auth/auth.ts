import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth/minimal";
import { PasswordResetEmail } from "@/components/emails/PasswordResetEmail";
import { VerificationEmail } from "@/components/emails/VerificationEmail";
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

// Validate required environment variables
if (!process.env.BETTER_AUTH_SECRET) {
  throw new Error(
    "BETTER_AUTH_SECRET is not set. Please add it to your .env file."
  );
}

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
  // Only include social providers if they're properly configured
  ...(Object.keys(socialProviders).length > 0 && { socialProviders }),
});
