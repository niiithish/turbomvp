"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const title = "Model Usage Distribution";

const chartData = [
  { model: "gemini-3-pro", usage: 1850, fill: "var(--chart-1)" },
  { model: "gpt-5.1", usage: 4200, fill: "var(--chart-2)" },
  { model: "claude-sonnet-4.5", usage: 2900, fill: "var(--chart-3)" },
  { model: "grok-4.1", usage: 1500, fill: "var(--chart-4)" },
  { model: "glm-4.6", usage: 950, fill: "var(--chart-5)" },
];

const chartConfig = {
  usage: {
    label: "Usage",
  },
  "gemini-3-pro": {
    label: "Gemini 3 Pro",
    color: "var(--chart-1)",
  },
  "gpt-5.1": {
    label: "GPT-5.1",
    color: "var(--chart-2)",
  },
  "claude-sonnet-4.5": {
    label: "Sonnet 4.5",
    color: "var(--chart-3)",
  },
  "grok-4.1": {
    label: "Grok 4.1",
    color: "var(--chart-4)",
  },
  "glm-4.6": {
    label: "GLM 4.6",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

const ChartBarActive = () => {
  const [_activeIndex, setActiveIndex] = useState(2);

  return (
    <div className="h-full w-full rounded-md border bg-background p-4">
      <ChartContainer
        className="aspect-auto h-full w-full"
        config={chartConfig}
      >
        <BarChart
          accessibilityLayer
          data={chartData}
          onMouseLeave={() => {
            setActiveIndex(2);
          }}
          onMouseMove={(state) => {
            if (state.isTooltipActive) {
              setActiveIndex(Number(state.activeTooltipIndex) ?? 2);
            }
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            axisLine={false}
            dataKey="model"
            tickFormatter={(value) =>
              chartConfig[value as keyof typeof chartConfig]?.label
            }
            tickLine={false}
            tickMargin={10}
          />
          <ChartTooltip
            content={<ChartTooltipContent hideLabel />}
            cursor={false}
          />
          <Bar
            activeBar={({ ...props }) => (
              <Rectangle
                {...props}
                fillOpacity={0.8}
                stroke={props.payload.fill}
                strokeDasharray={4}
                strokeDashoffset={4}
              />
            )}
            dataKey="usage"
            radius={8}
            strokeWidth={2}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default ChartBarActive;
