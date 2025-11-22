"use client";

import { Menu01Icon } from "hugeicons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signOut, useSession } from "@/auth/auth-client";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NavigationSheet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const navItems = [
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger asChild>
        <Button className="rounded-full" size="icon" variant="ghost">
          <Menu01Icon className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle className="text-left">
            <Link href="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-6 px-4">
          {navItems.map((item) => (
            <Link
              className="font-medium text-lg transition-colors hover:text-primary"
              href={item.href}
              key={item.href}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <SheetFooter>
          <div className="flex w-full justify-start">
            <ThemeToggle />
          </div>
          {session ? (
            <>
              <Button
                className="w-full rounded-full"
                onClick={async () => {
                  await signOut();
                  setIsOpen(false);
                  router.push("/");
                }}
                variant="outline"
              >
                Logout
              </Button>
              <Button asChild className="w-full rounded-full">
                <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                  Dashboard
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button asChild className="w-full rounded-full" variant="outline">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  Sign In
                </Link>
              </Button>
              <Button asChild className="w-full rounded-full">
                <Link href="/signup" onClick={() => setIsOpen(false)}>
                  Sign Up
                </Link>
              </Button>
            </>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default NavigationSheet;
