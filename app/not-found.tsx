import { ArrowLeft02Icon } from "hugeicons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <h1 className="font-black text-9xl text-primary">404</h1>
      <h2 className="mt-4 font-bold text-2xl text-foreground tracking-tight sm:text-4xl">
        Page not found
      </h2>
      <p className="mt-4 text-muted-foreground">
        The page you are looking for doesn&apos;t exist. Return home to
        continue.
      </p>
      <Button asChild className="mt-8 px-8">
        <Link href="/">
          <ArrowLeft02Icon className="mr-2 h-4 w-4" />
          Back to home
        </Link>
      </Button>
    </div>
  );
}
