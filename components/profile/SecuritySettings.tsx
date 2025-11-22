"use client";

import { Loading03Icon } from "hugeicons-react";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/auth/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type SecuritySettingsProps = {
  user: {
    email: string;
  };
};

export function SecuritySettings({ user }: SecuritySettingsProps) {
  const [email, setEmail] = useState(user.email);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateEmail = () => {
    // TODO: Implement email change flow (requires verification)
    toast.info("Email update requires verification flow (Not implemented)");
  };

  const handleUpdatePassword = async () => {
    if (passwords.new !== passwords.confirm) {
      toast.error("Passwords don't match");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await authClient.changePassword({
        currentPassword: passwords.current,
        newPassword: passwords.new,
        revokeOtherSessions: true,
      });

      if (error) {
        toast.error(error.message || "Failed to update password");
        return;
      }

      toast.success("Password updated successfully");
      setPasswords({ current: "", new: "", confirm: "" });
      setIsSheetOpen(false);
    } catch (_e) {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="flex items-center gap-4">
          <Input
            className="flex-1"
            disabled
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            value={email} // Disable email edit for now as flow is complex
          />
          <Button disabled onClick={handleUpdateEmail} variant="outline">
            Update Email
          </Button>

          <Sheet onOpenChange={setIsSheetOpen} open={isSheetOpen}>
            <SheetTrigger asChild>
              <Button
                className="whitespace-nowrap text-primary"
                variant="ghost"
              >
                Change Password
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Change Password</SheetTitle>
                <SheetDescription>
                  Ensure your account is using a long, random password to stay
                  secure.
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-4 px-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    onChange={(e) =>
                      setPasswords({ ...passwords, current: e.target.value })
                    }
                    type="password"
                    value={passwords.current}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    onChange={(e) =>
                      setPasswords({ ...passwords, new: e.target.value })
                    }
                    type="password"
                    value={passwords.new}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    onChange={(e) =>
                      setPasswords({ ...passwords, confirm: e.target.value })
                    }
                    type="password"
                    value={passwords.confirm}
                  />
                </div>
              </div>

              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="outline">Cancel</Button>
                </SheetClose>
                <Button disabled={isLoading} onClick={handleUpdatePassword}>
                  {isLoading && (
                    <Loading03Icon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Update Password
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
