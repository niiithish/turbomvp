import { auth } from "@/auth/auth";
import { headers } from "next/headers";

export async function currentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user;
}
