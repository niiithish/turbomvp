import { ArrowLeft01Icon } from "hugeicons-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ProfileContent } from "@/components/profile/ProfileContent";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Profile Settings",
  description: "Manage your account settings and preferences.",
};

export default function ProfilePage() {
  return (
    <div className="container mx-auto max-w-3xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <Button
          asChild
          className="-ml-3 text-muted-foreground"
          size="sm"
          variant="ghost"
        >
          <Link href="/dashboard">
            <ArrowLeft01Icon className="mr-2 size-4" />
            Back to Dashboard
          </Link>
        </Button>

        <div className="space-y-1">
          <h1 className="font-bold text-2xl tracking-tight">Profile</h1>
          <p className="text-muted-foreground">
            Manage your information, preferences, and connected data.
          </p>
        </div>
      </div>

      <ProfileContent />
    </div>
  );
}
