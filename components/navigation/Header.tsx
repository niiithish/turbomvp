"use client";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/Logo";
import NavMenu from "@/components/navigation/NavMenu";
import NavigationSheet from "@/components/navigation/NavigationSheet";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import Link from "next/link";
import { useEffect, useState } from "react";

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
    <nav className={`sticky top-0 z-50 bg-background border-b transition-all duration-300 ${isScrolled ? "h-12" : "h-16"}`}>
      <div className="h-full flex items-center justify-between max-w-(--breakpoint-xl) mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-300 ${isScrolled ? "scale-90" : "scale-100"}`}>
          <Logo />
        </div>

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className={`flex items-center gap-3 transition-all duration-300 ${isScrolled ? "scale-90" : "scale-100"}`}>
          <ThemeToggle />
          <Button asChild variant="outline" className="hidden sm:inline-flex">
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
