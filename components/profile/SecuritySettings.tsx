"use client";

import { useState } from "react";
import { toast } from "sonner";
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

export function SecuritySettings() {
  const [email, setEmail] = useState("niiithish@example.com");
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleUpdateEmail = () => {
    toast.success("Email update verification sent");
  };

  const handleUpdatePassword = () => {
    if (passwords.new !== passwords.confirm) {
      toast.error("Passwords don't match");
      return;
    }
    toast.success("Password updated successfully");
    setPasswords({ current: "", new: "", confirm: "" });
    setIsSheetOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="flex items-center gap-4">
          <Input
            className="flex-1"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            value={email}
          />
          <Button onClick={handleUpdateEmail} variant="outline">
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
                <Button onClick={handleUpdatePassword}>Update Password</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
