"use client";

import { GithubIcon, Linkedin02Icon, Mail01Icon, TwitterIcon } from "hugeicons-react";
import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function FooterSection() {
  const menuLinks = [
    { label: "About Us", href: "/about" },
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ];

  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Logo */}
          <div className="space-y-4">
            <Logo />
            <p className="text-muted-foreground text-sm">
              The ultimate SaaS starter kit for Next.js. Build faster, scale
              better.
            </p>
          </div>

          {/* Column 2: Menu Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Product</h3>
            <ul className="space-y-2">
              {menuLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    className="text-muted-foreground text-sm transition-colors hover:text-foreground"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    className="text-muted-foreground text-sm transition-colors hover:text-foreground"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter Signup */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Stay Updated</h3>
            <p className="text-muted-foreground text-sm">
              Subscribe to our newsletter for the latest updates.
            </p>
            <div className="flex gap-2">
              <Input
                className="flex-1"
                placeholder="Enter your email"
                type="email"
              />
              <Button className="shrink-0" size="icon">
                <Mail01Icon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Separator */}
        <Separator className="my-8" />

        {/* Bottom Section: Copyright and Social Icons */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} BlitzMVP. All rights reserved.
          </p>

          {/* Social Media Icons */}
          <div className="flex items-center gap-2">
            <Button asChild className="h-8 w-8" size="icon" variant="ghost">
              <Link href="https://twitter.com" target="_blank">
                <TwitterIcon className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild className="h-8 w-8" size="icon" variant="ghost">
              <Link href="https://github.com" target="_blank">
                <GithubIcon className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild className="h-8 w-8" size="icon" variant="ghost">
              <Link href="https://linkedin.com" target="_blank">
                <Linkedin02Icon className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
