"use client";

import { ViewIcon, ViewOffSlashIcon } from "hugeicons-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { authClient } from "@/auth/auth-client";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Check if OAuth providers are enabled
const isGoogleEnabled = process.env.NEXT_PUBLIC_GOOGLE_ENABLED === "true";
const isGithubEnabled = process.env.NEXT_PUBLIC_GITHUB_ENABLED === "true";
const showOAuthDivider = isGoogleEnabled || isGithubEnabled;

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const msg = searchParams.get("message");
    if (msg) {
      setMessage(msg);
    }
  }, [searchParams]);

  const handleSocialSignIn = async (provider: "github" | "google") => {
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
    setMessage("");

    try {
      const result = await authClient.signIn.email({
        email,
        password,
      });

      if (result.error) {
        setError(result.error.message || "Login failed");
      } else {
        router.push("/dashboard");
      }
    } catch (_err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md space-y-6 rounded-xl border bg-background p-8 shadow-lg">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6">
            <Logo />
          </div>
          <h1 className="font-semibold text-2xl tracking-tight">
            Welcome back
          </h1>
          <p className="mt-1 text-muted-foreground text-sm">
            Please enter your details to login.
          </p>
        </div>

        {message && (
          <div className="rounded-md bg-green-50 p-3 text-center text-green-600 text-sm">
            {message}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-4">
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
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  className="h-11 border-0 bg-muted/50 pr-10"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                />
                <button
                  className="-translate-y-1/2 absolute top-1/2 right-3 text-muted-foreground transition-colors hover:text-foreground"
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
              <div className="flex justify-end">
                <Link
                  className="text-muted-foreground text-sm hover:text-primary"
                  href="/forgot-password"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
          </div>

          {error && (
            <div className="text-center text-destructive text-sm">{error}</div>
          )}

          <Button
            className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? "Signing in..." : "Login"}
          </Button>
        </form>

        {showOAuthDivider && (
          <>
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

            <div
              className={`grid gap-4 ${isGoogleEnabled && isGithubEnabled ? "grid-cols-2" : "grid-cols-1"}`}
            >
              {isGoogleEnabled && (
                <Button
                  className="h-11"
                  disabled={isLoading}
                  onClick={() => handleSocialSignIn("google")}
                  type="button"
                  variant="outline"
                >
                  <FcGoogle className="mr-2 h-4 w-4" />
                  With Google
                </Button>
              )}
              {isGithubEnabled && (
                <Button
                  className="h-11"
                  disabled={isLoading}
                  onClick={() => handleSocialSignIn("github")}
                  type="button"
                  variant="outline"
                >
                  <FaGithub className="mr-2 h-4 w-4" />
                  With GitHub
                </Button>
              )}
            </div>
          </>
        )}

        <div className="text-center text-muted-foreground text-sm">
          Don't have an account?{" "}
          <Link
            className="font-medium text-primary hover:underline"
            href="/signup"
          >
            Register now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
