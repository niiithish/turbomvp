"use server";

import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { auth } from "@/auth/auth";
import { account, users } from "@/db/schema";
import { db } from "@/lib/db";

export async function getLinkedAccounts() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return [];
  }

  const accounts = await db
    .select()
    .from(account)
    .where(eq(account.userId, session.user.id));

  return accounts.map((acc) => acc.providerId);
}

export async function unlinkAccount(providerId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  await db
    .delete(account)
    .where(
      and(
        eq(account.userId, session.user.id),
        eq(account.providerId, providerId)
      )
    );

  return { success: true };
}

export async function deleteAccount(email: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  if (session.user.email !== email) {
    throw new Error("Email does not match");
  }

  await db
    .update(users)
    .set({ deletedAt: new Date() })
    .where(eq(users.id, session.user.id));

  return { success: true };
}
