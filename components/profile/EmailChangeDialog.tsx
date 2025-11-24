"use client";

import { Loading03Icon } from "hugeicons-react";
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

type EmailChangeDialogProps = {
  userEmail: string;
};

export function EmailChangeDialog({ userEmail }: EmailChangeDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"otp" | "change">("otp");
  const [otp, setOtp] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [_isOtpVerified, setIsOtpVerified] = useState(false);

  const resetDialog = () => {
    setStep("otp");
    setOtp("");
    setNewEmail("");
    setOtpSent(false);
    setIsOtpVerified(false);
  };

  const handleSendOTP = async () => {
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

      setOtpSent(true);
      toast.success("OTP sent to your email");
    } catch (_e) {
      toast.error("An error occurred while sending OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await authClient.emailOtp.verifyEmail({
        email: userEmail,
        otp,
      });

      if (error) {
        toast.error(error.message || "Invalid OTP");
        return;
      }

      setIsOtpVerified(true);
      setStep("change");
      toast.success("OTP verified successfully");
    } catch (_e) {
      toast.error("An error occurred while verifying OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = async () => {
    if (!newEmail || newEmail === userEmail) {
      toast.error("Please enter a different email address");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await authClient.changeEmail({
        newEmail,
        callbackURL: "/settings",
      });

      if (error) {
        toast.error(error.message || "Failed to update email");
        return;
      }

      toast.success(
        "Email update initiated. Please check your inbox for verification."
      );
      setIsOpen(false);
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
        <Button variant="outline">Change Email</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        {step === "otp" ? (
          <>
            <DialogHeader>
              <DialogTitle>Verify Your Identity</DialogTitle>
              <DialogDescription>
                We'll send a verification code to your current email address to
                confirm it's you.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Current Email</Label>
                <Input disabled type="email" value={userEmail} />
              </div>

              {otpSent && (
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter 6-digit Code</Label>
                  <Input
                    id="otp"
                    maxLength={6}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="000000"
                    type="text"
                    value={otp}
                  />
                </div>
              )}
            </div>

            <DialogFooter>
              {otpSent ? (
                <div className="flex w-full gap-2">
                  <Button
                    disabled={isLoading}
                    onClick={handleSendOTP}
                    variant="outline"
                  >
                    Resend Code
                  </Button>
                  <Button
                    className="flex-1"
                    disabled={isLoading || otp.length !== 6}
                    onClick={handleVerifyOTP}
                  >
                    {isLoading && (
                      <Loading03Icon className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Verify Code
                  </Button>
                </div>
              ) : (
                <Button disabled={isLoading} onClick={handleSendOTP}>
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
              <DialogTitle>Change Email Address</DialogTitle>
              <DialogDescription>
                Enter your new email address. You'll need to verify it before
                the change takes effect.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="new-email">New Email Address</Label>
                <Input
                  id="new-email"
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="new@example.com"
                  type="email"
                  value={newEmail}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                disabled={isLoading || !newEmail}
                onClick={handleEmailChange}
              >
                {isLoading && (
                  <Loading03Icon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Update Email
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
