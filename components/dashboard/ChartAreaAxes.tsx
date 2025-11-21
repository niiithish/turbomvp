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
    { date: "2024-01", requests: 12500, tokens: 45000 },
    { date: "2024-02", requests: 18000, tokens: 62000 },
    { date: "2024-03", requests: 15000, tokens: 58000 },
    { date: "2024-04", requests: 22000, tokens: 85000 },
    { date: "2024-05", requests: 28000, tokens: 110000 },
    { date: "2024-06", requests: 35000, tokens: 145000 },
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
        <ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full min-w-0">
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