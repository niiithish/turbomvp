import { ArrowDown01Icon, ArrowUp01Icon } from "hugeicons-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MetricCardProps {
    title: string
    value: string
    change: number
    trend: "up" | "down"
    period: string
}

function MetricCard({ title, value, change, trend, period }: MetricCardProps) {
    return (
        <Card className="bg-card/50 backdrop-blur-sm gap-2 py-3">
            <CardHeader className="pb-0 px-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="px-3">
                <div className="text-2xl font-bold">{value}</div>
                <div className="flex items-center text-xs mt-1">
                    <span
                        className={`flex items-center font-medium ${trend === "up" ? "text-green-500" : "text-red-500"
                            }`}
                    >
                        {trend === "up" ? (
                            <ArrowUp01Icon className="w-3 h-3 mr-1" />
                        ) : (
                            <ArrowDown01Icon className="w-3 h-3 mr-1" />
                        )}
                        {change}%
                    </span>
                    <span className="text-muted-foreground ml-1">{period}</span>
                </div>
            </CardContent>
        </Card>
    )
}

export function DashboardMetrics() {
    const metrics = [
        {
            title: "Total API Calls",
            value: "2.4M",
            change: 12.5,
            trend: "up" as const,
            period: "Last 30 days",
        },
        {
            title: "Active Users",
            value: "8,549",
            change: 8.2,
            trend: "up" as const,
            period: "Last 30 days",
        },
        {
            title: "Avg. Latency",
            value: "142ms",
            change: 4.1,
            trend: "down" as const,
            period: "Last 30 days",
        },
        {
            title: "Revenue",
            value: "$42.5k",
            change: 18.2,
            trend: "up" as const,
            period: "Last 30 days",
        },
    ]

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
                <MetricCard key={metric.title} {...metric} />
            ))}
        </div>
    )
}
