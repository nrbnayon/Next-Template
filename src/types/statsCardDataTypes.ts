// src/types/statsCardDataTypes.ts
export interface MetricCardProps {
  title: string;
  value: string | number;
  trend: "up" | "down";
  trendValue: string | number;
  trendColor: string;
  sparklinePoints: number[];
}

export interface MetricData {
  title: string;
  value: string | number;
  trend: "up" | "down";
  trendValue: string | number;
  trendColor: string;
  sparklinePoints: number[];
}

