// src/types/statsCardDataSets.ts
import { MetricData } from "@/types/statsCardDataTypes";

// Dummy data for StatsCard
export const defaultMetrics: MetricData[] = [
  {
    title: "Total customers",
    value: "2,420",
    trend: "up",
    trendValue: "40",
    trendColor: "text-green-600",
    sparklinePoints: [15, 18, 16, 22, 25, 23, 28, 32, 30, 35, 38, 42],
  },
  {
    title: "Members",
    value: "1,210",
    trend: "down",
    trendValue: "10",
    trendColor: "text-red-500",
    sparklinePoints: [35, 32, 34, 30, 28, 25, 23, 20, 18, 22, 19, 16],
  },
  {
    title: "Active now",
    value: "316",
    trend: "up",
    trendValue: "20",
    trendColor: "text-green-600",
    sparklinePoints: [8, 12, 15, 18, 16, 20, 24, 27, 25, 30, 28, 32],
  },
];
