import { cn } from "@/lib/utils";

interface StaticMatrixProps {
    className?: string;
    rows?: number;
    columns?: number;
}

export function StaticMatrix({ className, rows = 10, columns = 10 }: StaticMatrixProps) {
    // Generate a static grid of characters
    const grid = Array.from({ length: rows }).map(() =>
        Array.from({ length: columns }).map(() =>
            Math.random() > 0.5 ? "1" : "0"
        )
    );

    return (
        <div className={cn("font-mono text-xs leading-none select-none", className)}>
            {grid.map((row, i) => (
                <div key={i} className="flex">
                    {row.map((char, j) => (
                        <span
                            key={j}
                            className={cn(
                                "w-4 h-4 flex items-center justify-center text-primary/60",
                                Math.random() > 0.8 && "text-primary font-bold" // Randomly highlight some characters
                            )}
                        >
                            {char}
                        </span>
                    ))}
                </div>
            ))}
        </div>
    );
}
