"use client";

import { Loading03Icon } from "hugeicons-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/auth/auth-client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setUserPassword } from "@/lib/actions/auth-actions";

type PasswordManagementDialogProps = {
  userEmail: string;
  hasPassword: boolean;
  onPasswordSet: () => void;
};

export function PasswordManagementDialog({
  userEmail,
  hasPassword,
  onPasswordSet,
}: PasswordManagementDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // Password set states (for social login users)
  const [passwordStep, setPasswordStep] = useState<"otp" | "set">("otp");
  const [passwordOtp, setPasswordOtp] = useState("");
  const [passwordOtpSent, setPasswordOtpSent] = useState(false);

  const resetDialog = () => {
    setPasswordStep("otp");
    setPasswordOtp("");
    setPasswordOtpSent(false);
    setPasswords({ current: "", new: "", confirm: "" });
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
      setIsOpen(false);
      onPasswordSet();
    } catch (_e) {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendPasswordOTP = async () => {
    setIsLoading(true);
    try {
      const { error } = await authClient.emailOtp.sendVerificationOtp({
        email: userEmail,
        type: "email-verification",
      });

      if (error) {
        toast.error(error.message || "Failed to send OTP");
        return;
      }

      setPasswordOtpSent(true);
      toast.success("OTP sent to your email");
    } catch (_e) {
      toast.error("An error occurred while sending OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyPasswordOTP = async () => {
    if (!passwordOtp || passwordOtp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await authClient.emailOtp.verifyEmail({
        email: userEmail,
        otp: passwordOtp,
      });

      if (error) {
        toast.error(error.message || "Invalid OTP");
        return;
      }

      setPasswordStep("set");
      toast.success("OTP verified successfully");
    } catch (_e) {
      toast.error("An error occurred while verifying OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetPassword = async () => {
    if (passwords.new !== passwords.confirm) {
      toast.error("Passwords don't match");
      return;
    }

    if (passwords.new.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);
    try {
      await setUserPassword(passwords.new);

      toast.success(
        "Password set successfully! You can now sign in with email and password."
      );
      setPasswords({ current: "", new: "", confirm: "" });
      setIsOpen(false);
      onPasswordSet();
      resetDialog();
    } catch (_e) {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          resetDialog();
        }
      }}
      open={isOpen}
    >
      <DialogTrigger asChild>
        <Button variant="outline">
          {hasPassword ? "Change Password" : "Set Password"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        {hasPassword && (
          // Change Password Flow (for users with existing password)
          <>
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
              <DialogDescription>
                Ensure your account is using a long, random password to stay
                secure.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  onChange={(e) =>
                    setPasswords({
                      ...passwords,
                      current: e.target.value,
                    })
                  }
                  type="password"
                  value={passwords.current}
                />
                <Link
                  className="text-primary text-sm hover:underline"
                  href="/forgot-password"
                >
                  Forgot password?
                </Link>
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
                    setPasswords({
                      ...passwords,
                      confirm: e.target.value,
                    })
                  }
                  type="password"
                  value={passwords.confirm}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                disabled={
                  isLoading ||
                  !passwords.current ||
                  !passwords.new ||
                  !passwords.confirm
                }
                onClick={handleUpdatePassword}
              >
                {isLoading && (
                  <Loading03Icon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Update Password
              </Button>
            </DialogFooter>
          </>
        )}
        {!hasPassword &&
          // Set Password Flow (for social login users)
          (passwordStep === "otp" ? (
            <>
              <DialogHeader>
                <DialogTitle>Set Password</DialogTitle>
                <DialogDescription>
                  Add password authentication as a backup sign-in method. We'll
                  verify your identity first.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Current Email</Label>
                  <Input disabled type="email" value={userEmail} />
                </div>

                {passwordOtpSent && (
                  <div className="space-y-2">
                    <Label htmlFor="password-otp">Enter 6-digit Code</Label>
                    <Input
                      id="password-otp"
                      maxLength={6}
                      onChange={(e) => setPasswordOtp(e.target.value)}
                      placeholder="000000"
                      type="text"
                      value={passwordOtp}
                    />
                  </div>
                )}
              </div>

              <DialogFooter>
                {passwordOtpSent ? (
                  <div className="flex w-full gap-2">
                    <Button
                      disabled={isLoading}
                      onClick={handleSendPasswordOTP}
                      variant="outline"
                    >
                      Resend Code
                    </Button>
                    <Button
                      className="flex-1"
                      disabled={isLoading || passwordOtp.length !== 6}
                      onClick={handleVerifyPasswordOTP}
                    >
                      {isLoading && (
                        <Loading03Icon className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Verify Code
                    </Button>
                  </div>
                ) : (
                  <Button disabled={isLoading} onClick={handleSendPasswordOTP}>
                    {isLoading && (
                      <Loading03Icon className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Send Verification Code
                  </Button>
                )}
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Set Your Password</DialogTitle>
                <DialogDescription>
                  Create a password to enable email and password sign-in.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password-set">New Password</Label>
                  <Input
                    id="new-password-set"
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        new: e.target.value,
                      })
                    }
                    placeholder="Minimum 8 characters"
                    type="password"
                    value={passwords.new}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password-set">Confirm Password</Label>
                  <Input
                    id="confirm-password-set"
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        confirm: e.target.value,
                      })
                    }
                    type="password"
                    value={passwords.confirm}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  disabled={isLoading || !passwords.new || !passwords.confirm}
                  onClick={handleSetPassword}
                >
                  {isLoading && (
                    <Loading03Icon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Set Password
                </Button>
              </DialogFooter>
            </>
          ))}
      </DialogContent>
    </Dialog>
  );
}
