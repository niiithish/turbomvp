"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import NavigationSheet from "@/components/navigation/NavigationSheet";
import NavMenu from "@/components/navigation/NavMenu";
import { Logo } from "@/components/shared/Logo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 border-b bg-background transition-all duration-300 ${isScrolled ? "h-12" : "h-16"}`}
    >
      <div className="mx-auto flex h-full max-w-(--container-max-w) items-center justify-between px-(--container-padding-x)">
        <div
          className={`transition-all duration-300 ${isScrolled ? "scale-90" : "scale-100"}`}
        >
          <Logo />
        </div>

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div
          className={`flex items-center gap-3 transition-all duration-300 ${isScrolled ? "scale-90" : "scale-100"}`}
        >
          <ThemeToggle />
          <Button asChild className="hidden sm:inline-flex" variant="outline">
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <NavigationSheet />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
