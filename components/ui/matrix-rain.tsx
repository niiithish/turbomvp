"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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
        <div className={cn("absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03] dark:opacity-[0.07]", className)}>
            <div className="flex justify-between w-full h-full">
                {Array.from({ length: columns }).map((_, i) => (
                    <MatrixColumn key={i} delay={Math.random() * 5} duration={10 + Math.random() * 20} />
                ))}
            </div>
        </div>
    );
}

function MatrixColumn({ delay, duration }: { delay: number; duration: number }) {
    // Generate random characters (numbers 0-9 and some letters)
    const chars = "0123456789ABCDEF";
    const length = 20 + Math.floor(Math.random() * 30);
    const stream = Array.from({ length }).map(() => chars[Math.floor(Math.random() * chars.length)]);

    return (
        <motion.div
            initial={{ y: -1000 }}
            animate={{ y: "100vh" }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: "linear",
                delay: delay,
            }}
            className="flex flex-col text-[10px] md:text-xs font-mono leading-none text-primary whitespace-nowrap"
        >
            {stream.map((char, i) => (
                <span key={i} style={{ opacity: 1 - i / length }}>
                    {char}
                </span>
            ))}
        </motion.div>
    );
}
