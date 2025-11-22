"use client";

import { ViewIcon, ViewOffSlashIcon } from "hugeicons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/auth/auth-client";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSocialSignUp = async (provider: "github" | "google") => {
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

    try {
      const result = await authClient.signUp.email({
        email,
        password,
        firstName,
        lastName,
        // biome-ignore lint/suspicious/noExplicitAny: Extending default signup type
      } as any);

      if (result.error) {
        setError(result.error.message || "Signup failed");
      } else {
        router.push("/login?message=Account created successfully");
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
            Create an account
          </h1>
          <p className="mt-1 text-muted-foreground text-sm">
            Enter your details to create your account
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                className="h-11 border-0 bg-muted/50"
                id="firstName"
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
                required
                type="text"
                value={firstName}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                className="h-11 border-0 bg-muted/50"
                id="lastName"
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
                required
                type="text"
                value={lastName}
              />
            </div>
          </div>
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
            <div className="text-center text-destructive text-sm">{error}</div>
          )}

          <Button
            className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? "Creating account..." : "Sign up"}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">OR</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            className="h-11"
            disabled={isLoading}
            onClick={() => handleSocialSignUp("google")}
            type="button"
            variant="outline"
          >
            <FcGoogle className="mr-2 h-4 w-4" />
            With Google
          </Button>
          <Button
            className="h-11"
            disabled={isLoading}
            onClick={() => handleSocialSignUp("github")}
            type="button"
            variant="outline"
          >
            <FaGithub className="mr-2 h-4 w-4" />
            With GitHub
          </Button>
        </div>

        <div className="text-center text-muted-foreground text-sm">
          Already have an account?{" "}
          <Link
            className="font-medium text-primary hover:underline"
            href="/login"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
