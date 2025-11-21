"use client";

import { Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";

const revenueData = [
  { month: "Jan", value: 12_500 },
  { month: "Feb", value: 14_800 },
  { month: "Mar", value: 13_200 },
  { month: "Apr", value: 16_100 },
  { month: "May", value: 14_500 },
  { month: "Jun", value: 17_800 },
  { month: "Jul", value: 15_231 },
];

const chartConfig = {
  value: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function RevenueCard() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle>Total Revenue</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <div className="font-bold text-3xl">$15,231.89</div>
        <p className="text-muted-foreground text-xs">
          <span className="text-primary">+20.1%</span> from last month
        </p>
        <div className="pt-2">
          <ChartContainer className="h-[120px] w-full" config={chartConfig}>
            <LineChart
              data={revenueData}
              margin={{ top: 5, right: 15, left: 15, bottom: 5 }}
            >
              <XAxis
                axisLine={false}
                dataKey="month"
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                tickMargin={8}
              />
              <YAxis axisLine={false} tick={false} tickLine={false} width={0} />
              <Line
                className="stroke-primary"
                dataKey="value"
                dot={{ strokeWidth: 2, r: 5 }}
                strokeWidth={2}
                type="monotone"
              />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
