import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { auth } from "@/auth/auth";
import { users } from "@/db/schema";
import { db } from "@/lib/db";

/** User type from database */
type User = typeof users.$inferSelect;

/**
 * Get the current user from BetterAuth session
 * @returns The BetterAuth user object, or undefined if not authenticated
 */
export async function currentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user;
}

/**
 * Get the currently authenticated user from the database
 * @returns The user object from the database, or null if not authenticated
 */
export async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return null;
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);

  return user ?? null;
}

/**
 * Get the currently authenticated user's ID
 * @returns The user ID, or null if not authenticated
 */
export async function getCurrentUserId() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user?.id ?? null;
}

/**
 * Check if a user has an active Pro subscription
 * @param user - The user object from the database
 * @returns True if the user has an active Pro subscription
 */
export function isPro(user: User | null): boolean {
  if (!user) {
    return false;
  }
  return user.plan === "pro" && user.subscriptionStatus === "active";
}

/**
 * Check if the current authenticated user has an active Pro subscription
 * @returns True if the current user has an active Pro subscription
 */
export async function isCurrentUserPro(): Promise<boolean> {
  const user = await getCurrentUser();
  return isPro(user);
}
