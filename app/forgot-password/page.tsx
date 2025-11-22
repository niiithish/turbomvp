"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement password reset logic
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md space-y-6 rounded-xl border bg-background p-8 shadow-lg">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6">
            <Logo />
          </div>
          <h1 className="font-semibold text-2xl tracking-tight">
            Reset your password
          </h1>
          <p className="mt-1 text-muted-foreground text-sm">
            Enter your email address and we will send you instructions to reset
            your password.
          </p>
        </div>

        {isSubmitted ? (
          <div className="rounded-md bg-green-50 p-4 text-center text-green-600 text-sm">
            <p>
              If an account exists with that email, we have sent a password
              reset link.
            </p>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                className="h-11 border-0 bg-muted/50"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                type="email"
                value={email}
              />
            </div>
            <Button
              className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? "Sending Link..." : "Send Reset Link"}
            </Button>
          </form>
        )}

        <div className="text-center text-muted-foreground text-sm">
          <Link
            className="font-medium text-primary hover:underline"
            href="/login"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
