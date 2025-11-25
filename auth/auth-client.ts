import { dodopaymentsClient } from "@dodopayments/better-auth";
import { emailOTPClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  plugins: [emailOTPClient(), dodopaymentsClient()],
});

export const { signIn, signUp, signOut, useSession } = authClient;
