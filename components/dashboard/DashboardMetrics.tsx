import { ArrowDown01Icon, ArrowUp01Icon } from "hugeicons-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MetricCardProps } from "@/types";

function MetricCard({ title, value, change, trend, period }: MetricCardProps) {
  return (
    <Card className="gap-2 bg-card/50 py-3 backdrop-blur-sm">
      <CardHeader className="px-3 pb-0">
        <CardTitle className="font-medium text-muted-foreground text-sm">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3">
        <div className="font-bold text-2xl">{value}</div>
        <div className="mt-1 flex items-center text-xs">
          <span
            className={`flex items-center font-medium ${
              trend === "up" ? "text-green-500" : "text-red-500"
            }`}
          >
            {trend === "up" ? (
              <ArrowUp01Icon className="mr-1 h-3 w-3" />
            ) : (
              <ArrowDown01Icon className="mr-1 h-3 w-3" />
            )}
            {change}%
          </span>
          <span className="ml-1 text-muted-foreground">{period}</span>
        </div>
      </CardContent>
    </Card>
  );
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
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.title} {...metric} />
      ))}
    </div>
  );
}
