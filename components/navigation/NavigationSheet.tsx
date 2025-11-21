"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NavigationSheet = () => {
  const navItems = [
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="rounded-full" size="icon" variant="ghost">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="mt-8 flex flex-col gap-4">
          {navItems.map((item) => (
            <a
              className="font-medium text-lg transition-colors hover:text-primary"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
          <div className="mt-4 flex flex-col gap-3 border-t pt-4">
            <Button asChild className="w-full rounded-full" variant="outline">
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button asChild className="w-full rounded-full">
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default NavigationSheet;
