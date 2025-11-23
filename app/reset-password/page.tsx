"use client";

import { ViewIcon, ViewOffSlashIcon } from "hugeicons-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/auth/auth-client";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const tokenError = searchParams.get("error");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (tokenError === "INVALID_TOKEN") {
      setError("This reset link is invalid or has expired. Please request a new one.");
    } else if (!token) {
      setError("Invalid reset link. Please request a new password reset email.");
    }
  }, [token, tokenError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setError("Invalid or missing reset token. Please request a new link.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const { error: resetError } = await authClient.resetPassword({
        newPassword: password,
        token,
      });

      if (resetError) {
        setError(resetError.message || "Failed to reset password.");
        return;
      }

      router.push(
        "/login?message=" +
          encodeURIComponent("Your password has been reset. You can now log in."),
      );
    } catch (_error) {
      setError("An unexpected error occurred while resetting your password.");
    } finally {
      setIsLoading(false);
    }
  };

  const isTokenInvalid = Boolean(error) && (!token || tokenError === "INVALID_TOKEN");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md space-y-6 rounded-xl border bg-background p-8 shadow-lg">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6">
            <Logo />
          </div>
          <h1 className="font-semibold text-2xl tracking-tight">Set a new password</h1>
          <p className="mt-1 text-muted-foreground text-sm">
            {isTokenInvalid
              ? "We couldn't validate this reset link. Please request a new password reset email."
              : "Enter a new password for your account."}
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-3 text-center text-destructive text-sm">
            {error}
          </div>
        )}

        {!isTokenInvalid && (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="password">New password</Label>
              <div className="relative">
                <Input
                  className="h-11 border-0 bg-muted/50 pr-10"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter a new password"
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                />
                <button
                  className="-translate-y-1/2 absolute top-1/2 right-3 cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  {showPassword ? (
                    <ViewOffSlashIcon size={20} />
                  ) : (
                    <ViewIcon size={20} />
                  )}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <div className="relative">
                <Input
                  className="h-11 border-0 bg-muted/50 pr-10"
                  id="confirmPassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your new password"
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                />
                <button
                  className="-translate-y-1/2 absolute top-1/2 right-3 cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  type="button"
                >
                  {showConfirmPassword ? (
                    <ViewOffSlashIcon size={20} />
                  ) : (
                    <ViewIcon size={20} />
                  )}
                </button>
              </div>
            </div>
            <Button
              className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? "Updating password..." : "Update password"}
            </Button>
          </form>
        )}

        <div className="text-center text-muted-foreground text-sm">
          <Link
            className="font-medium text-primary hover:underline"
            href={isTokenInvalid ? "/forgot-password" : "/login"}
          >
            {isTokenInvalid ? "Back to forgot password" : "Back to login"}
          </Link>
        </div>
      </div>
    </div>
  );
}
