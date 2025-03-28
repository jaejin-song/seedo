"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/ui/components/chart";
import { CalculatorResult } from "@/types/calculator";

const chartConfig = {
  portfolio: {
    label: "Portfolio",
    color: "var(--chart-1)",
  },
  voo: {
    label: "VOO",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

interface ProfitChartProps {
  result: CalculatorResult;
}

export function ProfitChart({ result }: ProfitChartProps) {
  const chartData = result.investmentHistory.map((el) => ({
    date: el.date,
    portfolio: el.returnPercent,
    voo: el.baseReturnPercent,
  }));

  const wrapperStyle = {
    width: "150px",
  };

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis dataKey="date" tickLine={true} tickMargin={10} axisLine={true} />
        <YAxis tickFormatter={(value) => `${value}%`} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent />}
          wrapperStyle={wrapperStyle}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <defs>
          <linearGradient id="fillPortfolio" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-portfolio)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-portfolio)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillVOO" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-voo)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--color-voo)" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <Area
          dataKey="voo"
          type="natural"
          fill="url(#fillVOO)"
          fillOpacity={0.4}
          stroke="var(--color-voo)"
          stackId="a"
        />
        <Area
          dataKey="portfolio"
          type="natural"
          fill="url(#fillPortfolio)"
          fillOpacity={0.4}
          stroke="var(--color-portfolio)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
}
