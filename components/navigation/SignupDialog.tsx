"use client";

import { Loading03Icon, ViewIcon, ViewOffSlashIcon } from "hugeicons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { authClient } from "@/auth/auth-client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Check if OAuth providers are enabled
const isGoogleEnabled = process.env.NEXT_PUBLIC_GOOGLE_ENABLED === "true";
const isGithubEnabled = process.env.NEXT_PUBLIC_GITHUB_ENABLED === "true";
const showOAuthDivider = isGoogleEnabled || isGithubEnabled;

type SignupDialogProps = {
  children: React.ReactNode;
};

export function SignupDialog({ children }: SignupDialogProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSocialSignUp = async (provider: "github" | "google") => {
    // Check if provider is enabled
    if (provider === "google" && !isGoogleEnabled) {
      toast.error("Google sign-in is not configured. Please contact support.");
      return;
    }
    if (provider === "github" && !isGithubEnabled) {
      toast.error("GitHub sign-in is not configured. Please contact support.");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const data = await authClient.signIn.social({
        provider,
        callbackURL: "/dashboard",
      });

      if (data?.error) {
        setError(data.error.message || "An error occurred");
        setIsLoading(false);
      }
    } catch (_err) {
      setError("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedEmail = email.trim();

    if (!trimmedFirstName || !trimmedLastName || !trimmedEmail) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      const result = await authClient.signUp.email({
        email: trimmedEmail,
        password,
        name: `${trimmedFirstName} ${trimmedLastName}`,
        firstName: trimmedFirstName,
        lastName: trimmedLastName,
        // biome-ignore lint/suspicious/noExplicitAny: Extending default signup type
      } as any);

      if (result.error) {
        setError(result.error.message || "Signup failed");
      } else {
        setIsRedirecting(true);
        toast.success("Account created successfully!");
        router.push("/dashboard");
      }
    } catch (_err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        {isRedirecting ? (
          <div className="flex flex-col items-center justify-center gap-4 py-12">
            <Loading03Icon className="h-8 w-8 animate-spin text-primary" />
            <p className="font-medium text-muted-foreground">Redirecting to dashboard...</p>
          </div>
        ) : (
        <div className="space-y-6">
          <div className="flex flex-col items-center text-center">
            <DialogTitle className="font-semibold text-2xl tracking-tight">
              Create an account
            </DialogTitle>
            <DialogDescription className="mt-1 text-muted-foreground text-sm">
              Enter your details to create your account
            </DialogDescription>
          </div>

          {showOAuthDivider && (
            <>
              <div
                className={
                  isGoogleEnabled && isGithubEnabled
                    ? "grid grid-cols-2 gap-4"
                    : "grid grid-cols-1 gap-4"
                }
              >
                {isGoogleEnabled && (
                  <Button
                    className="h-11"
                    disabled={isLoading}
                    onClick={() => handleSocialSignUp("google")}
                    type="button"
                    variant="outline"
                  >
                    <FcGoogle className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                )}
                {isGithubEnabled && (
                  <Button
                    className="h-11"
                    disabled={isLoading}
                    onClick={() => handleSocialSignUp("github")}
                    type="button"
                    variant="outline"
                  >
                    <FaGithub className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                )}
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    OR
                  </span>
                </div>
              </div>
            </>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dialog-firstName">First Name</Label>
                <Input
                  className="h-11 border-0 bg-muted/50"
                  id="dialog-firstName"
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  required
                  type="text"
                  value={firstName}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dialog-lastName">Last Name</Label>
                <Input
                  className="h-11 border-0 bg-muted/50"
                  id="dialog-lastName"
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  required
                  type="text"
                  value={lastName}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dialog-signup-email">Email</Label>
              <Input
                className="h-11 border-0 bg-muted/50"
                id="dialog-signup-email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                type="email"
                value={email}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dialog-signup-password">Password</Label>
              <div className="relative">
                <Input
                  className="h-11 border-0 bg-muted/50 pr-10"
                  id="dialog-signup-password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
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

            {error && (
              <div className="text-center text-destructive text-sm">
                {error}
              </div>
            )}

            <Button
              className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? "Creating account..." : "Sign up"}
            </Button>
          </form>

          <div className="text-center text-muted-foreground text-sm">
            Already have an account?{" "}
            <Link
              className="font-medium text-primary hover:underline"
              href="/login"
              onClick={() => setOpen(false)}
            >
              Sign in
            </Link>
          </div>
        </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
