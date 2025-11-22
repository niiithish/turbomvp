"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut, useSession } from "@/auth/auth-client";
import NavigationSheet from "@/components/navigation/NavigationSheet";
import NavMenu from "@/components/navigation/NavMenu";
import { Logo } from "@/components/shared/Logo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 h-16 border-b bg-background md:transition-all md:duration-300 ${isScrolled ? "md:h-12" : ""}`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div
          className={`md:transition-all md:duration-300 ${isScrolled ? "md:scale-90" : ""}`}
        >
          <Logo />
        </div>

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div
          className={`flex items-center gap-3 md:transition-all md:duration-300 ${isScrolled ? "md:scale-90" : ""}`}
        >
          <ThemeToggle className="hidden md:flex" />
          {session ? (
            <>
              <Button
                className="hidden sm:inline-flex"
                onClick={async () => {
                  await signOut();
                  router.push("/");
                }}
                variant="outline"
              >
                Logout
              </Button>
              <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </>
          ) : (
            <>
              <Button
                asChild
                className="hidden sm:inline-flex"
                variant="outline"
              >
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
