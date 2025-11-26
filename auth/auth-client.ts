import type { dodopayments } from "@dodopayments/better-auth";

const dodopaymentsClient = () => ({
  id: "dodopayments-client" as const,
  $InferServerPlugin: {} as ReturnType<typeof dodopayments>,
});

import { emailOTPClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  plugins: [emailOTPClient(), dodopaymentsClient()],
});

export const { signIn, signUp, signOut, useSession } = authClient;
