"use client";

import { Loading03Icon } from "hugeicons-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { hasPasswordAuth } from "@/lib/actions/auth-actions";
import { EmailChangeDialog } from "./EmailChangeDialog";
import { PasswordManagementDialog } from "./PasswordManagementDialog";

type SecuritySettingsProps = {
  user: {
    email: string;
  };
};

export function SecuritySettings({ user }: SecuritySettingsProps) {
  const [hasPassword, setHasPassword] = useState<boolean | null>(null);

  // Check if user has password on mount
  useEffect(() => {
    const checkPassword = async () => {
      const result = await hasPasswordAuth();
      setHasPassword(result);
    };
    checkPassword();
  }, []);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="current-email">Email</Label>
        <div className="flex items-center gap-4">
          <Input
            className="flex-1"
            disabled
            id="current-email"
            type="email"
            value={user.email}
          />

          <EmailChangeDialog userEmail={user.email} />

          {hasPassword === null ? (
            // Loading state while checking password status
            <Button disabled variant="outline">
              <Loading03Icon className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </Button>
          ) : (
            <PasswordManagementDialog
              hasPassword={hasPassword}
              onPasswordSet={() => setHasPassword(true)}
              userEmail={user.email}
            />
          )}
        </div>
      </div>
    </div>
  );
}
