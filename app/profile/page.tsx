import { Metadata } from "next";
import Link from "next/link";
import { PersonalDetails } from "@/components/profile/PersonalDetails";
import { SecuritySettings } from "@/components/profile/SecuritySettings";
import { Preferences } from "@/components/profile/Preferences";
import { SocialAccountsCard } from "@/components/profile/SocialAccountsCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft01Icon } from "hugeicons-react";

export const metadata: Metadata = {
  title: "Profile Settings",
  description: "Manage your account settings and preferences.",
};

export default function ProfilePage() {
  return (
    <div className="container mx-auto max-w-3xl py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="space-y-6">
        <Button variant="ghost" size="sm" asChild className="-ml-3 text-muted-foreground">
          <Link href="/dashboard">
            <ArrowLeft01Icon className="size-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
        
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">
            Manage your information, preferences, and connected data.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <PersonalDetails />
        
        <SecuritySettings />
        
        <div className="pt-4">
          <Preferences />
        </div>

        <div className="pt-4">
          <SocialAccountsCard />
        </div>
      </div>
    </div>
  );
}
