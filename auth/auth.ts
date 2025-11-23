import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth/minimal";
import { account, session, users } from "@/db/schema";
import { db } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { VerificationEmail } from "@/components/emails/VerificationEmail";
import { PasswordResetEmail } from "@/components/emails/PasswordResetEmail";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      // Map our table exports to the keys that BetterAuth expects
      user: users,
      session,
      account,
    },
  }),
  experimental: {
    joins: true,
  },
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
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});
