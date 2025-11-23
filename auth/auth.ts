import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth/minimal";
import {
  account,
  accountRelations,
  session,
  sessionRelations,
  users,
  usersRelations,
} from "@/db/schema";
import { db } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { VerificationEmail } from "@/components/emails/VerificationEmail";
import { PasswordResetEmail } from "@/components/emails/PasswordResetEmail";

// Build social providers config conditionally
const socialProviders: Record<
  string,
  { clientId: string; clientSecret: string }
> = {};

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  socialProviders.google = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  };
}

if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  socialProviders.github = {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  };
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: users,
      account,
      session,
      usersRelations,
      accountRelations,
      sessionRelations,
    },
  }),
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
