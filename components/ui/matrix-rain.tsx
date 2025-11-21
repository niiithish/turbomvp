"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface MatrixRainProps {
  className?: string;
}

export function MatrixRain({ className }: MatrixRainProps) {
  const [columns, setColumns] = useState<number>(0);

  useEffect(() => {
    const calculateColumns = () => {
      if (typeof window !== "undefined") {
        // Calculate columns based on window width and font size (roughly 15px per char)
        setColumns(Math.floor(window.innerWidth / 20));
      }
    };

    calculateColumns();
    window.addEventListener("resize", calculateColumns);
    return () => window.removeEventListener("resize", calculateColumns);
  }, []);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden opacity-[0.03] dark:opacity-[0.07]",
        className
      )}
    >
      <div className="flex h-full w-full justify-between">
        {Array.from({ length: columns }).map((_, i) => (
          <MatrixColumn
            delay={Math.random() * 5}
            duration={10 + Math.random() * 20}
            key={i}
          />
        ))}
      </div>
    </div>
  );
}

function MatrixColumn({
  delay,
  duration,
}: {
  delay: number;
  duration: number;
}) {
  // Generate random characters (numbers 0-9 and some letters)
  const chars = "0123456789ABCDEF";
  const length = 20 + Math.floor(Math.random() * 30);
  const stream = Array.from({ length }).map(
    () => chars[Math.floor(Math.random() * chars.length)]
  );

  return (
    <motion.div
      animate={{ y: "100vh" }}
      className="flex flex-col whitespace-nowrap font-mono text-[10px] text-primary leading-none md:text-xs"
      initial={{ y: -1000 }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
        delay,
      }}
    >
      {stream.map((char, i) => (
        <span key={i} style={{ opacity: 1 - i / length }}>
          {char}
        </span>
      ))}
    </motion.div>
  );
}
