"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const title = "API Usage & Tokens";

const chartData = [
  { date: "2024-01", requests: 12_500, tokens: 45_000 },
  { date: "2024-02", requests: 18_000, tokens: 62_000 },
  { date: "2024-03", requests: 15_000, tokens: 58_000 },
  { date: "2024-04", requests: 22_000, tokens: 85_000 },
  { date: "2024-05", requests: 28_000, tokens: 110_000 },
  { date: "2024-06", requests: 35_000, tokens: 145_000 },
];

const chartConfig = {
  requests: {
    label: "API Requests",
    color: "var(--chart-2)",
  },
  tokens: {
    label: "Tokens Generated",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

const ChartAreaAxes = () => (
  <div className="w-full rounded-md border bg-background p-4">
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          axisLine={false}
          dataKey="date"
          tickFormatter={(value) => value.slice(5)}
          tickLine={false}
          tickMargin={8}
        />
        <YAxis axisLine={false} tickCount={3} tickLine={false} tickMargin={8} />
        <ChartTooltip
          content={<ChartTooltipContent className="min-w-[200px]" />}
          cursor={false}
        />
        <Area
          dataKey="requests"
          fill="var(--color-requests)"
          fillOpacity={0.4}
          stackId="a"
          stroke="var(--color-requests)"
          type="natural"
        />
        <Area
          dataKey="tokens"
          fill="var(--color-tokens)"
          fillOpacity={0.4}
          stackId="a"
          stroke="var(--color-tokens)"
          type="natural"
        />
      </AreaChart>
    </ChartContainer>
  </div>
);

export default ChartAreaAxes;
