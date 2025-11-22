"use client";

import { Loader2 } from "lucide-react";
import { authClient } from "@/auth/auth-client";
import { PersonalDetails } from "@/components/profile/PersonalDetails";
import { SecuritySettings } from "@/components/profile/SecuritySettings";
import { SocialAccountsCard } from "@/components/profile/SocialAccountsCard";

export function ProfileContent() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="text-center text-muted-foreground">
        Please log in to view your profile.
      </div>
    );
  }

  const { user } = session;

  return (
    <div className="space-y-8">
      <PersonalDetails user={user} />

      {/* @ts-ignore - Component needs update to accept props */}
      <SecuritySettings user={user} />

      <div className="pt-4">
        <SocialAccountsCard />
      </div>
    </div>
  );
}
