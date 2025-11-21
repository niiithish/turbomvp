import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";
import * as schema from "@/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      // Map our table exports to the keys that BetterAuth expects
      user: schema.users,
      session: schema.session,
      account: schema.account,
    },
  }),

  emailAndPassword: {
    enabled: true,
  },
});

// Re-export for easier imports
export { auth as betterAuth };

