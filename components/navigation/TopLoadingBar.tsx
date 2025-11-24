"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function TopLoadingBar() {
  const _pathname = usePathname();
  const _searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Start loading
    setIsLoading(true);
    setProgress(0);

    // Simulate progress
    const timer1 = setTimeout(() => setProgress(30), 100);
    const timer2 = setTimeout(() => setProgress(60), 300);
    const timer3 = setTimeout(() => setProgress(80), 500);

    // Complete loading after a short delay
    const completeTimer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 200);
    }, 700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(completeTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoading && progress === 0) {
    return null;
  }

  return (
    <div
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={progress}
      className="pointer-events-none fixed top-0 right-0 left-0 z-[9999] h-[3px]"
      role="progressbar"
    >
      <div
        className="h-full bg-primary shadow-lg shadow-primary/50 transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
        }}
      >
        {/* Glow effect */}
        <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-r from-transparent to-primary/30 blur-sm" />
      </div>
    </div>
  );
}
