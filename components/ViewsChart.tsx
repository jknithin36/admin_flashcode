"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { fetchViewsTrend } from "@/server/api";

export function ViewsChart() {
  const [timeRange, setTimeRange] = React.useState("month");
  const [chartData, setChartData] = React.useState<
    { date: string; views: number }[]
  >([]);
  const [loading, setLoading] = React.useState(false);

  // 📌 Fetch Data When Time Range Changes
  React.useEffect(() => {
    async function loadData() {
      setLoading(true);

      const rawData = await fetchViewsTrend(timeRange);

      // ✅ Convert TrendData[] to { date, views }[]
      const mappedData = rawData.map((item) => ({
        date: item.date,
        views: item.answers, // Or `item.questions` if you prefer
      }));

      setChartData(mappedData);
      setLoading(false);
    }

    loadData();
  }, [timeRange]);

  return (
    <Card className="bg-[#121212] text-white shadow-lg border border-gray-800 rounded-xl">
      <CardHeader className="relative">
        <CardTitle className="text-lg font-semibold">Views Trend</CardTitle>
        <CardDescription className="text-gray-400">
          {loading ? "Loading data..." : "Track the views trend over time"}
        </CardDescription>

        {/* Toggle & Select */}
        <div className="absolute right-4 top-4 flex gap-2">
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden sm:flex bg-gray-900 rounded-lg p-1"
          >
            <ToggleGroupItem
              value="year"
              className="h-8 px-3 text-gray-300 hover:bg-gray-700"
            >
              Year
            </ToggleGroupItem>
            <ToggleGroupItem
              value="month"
              className="h-8 px-3 text-gray-300 hover:bg-gray-700"
            >
              Month
            </ToggleGroupItem>
            <ToggleGroupItem
              value="week"
              className="h-8 px-3 text-gray-300 hover:bg-gray-700"
            >
              Week
            </ToggleGroupItem>
          </ToggleGroup>

          {/* Mobile Select */}
          <div className="sm:hidden">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="bg-gray-800 text-white border-gray-700">
                <SelectValue placeholder="Select Time Range" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 text-white">
                <SelectItem value="year">Year</SelectItem>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="week">Week</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3498DB" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3498DB" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis
              dataKey="date"
              tick={{ fill: "#ffffff" }}
              tickFormatter={(value) =>
                timeRange === "year"
                  ? new Date(value + "-01").toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })
                  : new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
              }
            />
            <YAxis tick={{ fill: "#ffffff" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1a1a1a",
                borderRadius: "8px",
              }}
            />
            <Legend
              verticalAlign="top"
              height={36}
              wrapperStyle={{ color: "white" }}
            />

            <Area
              type="monotone"
              dataKey="views"
              stroke="#3498DB"
              strokeWidth={2}
              fill="url(#viewsGradient)"
              dot={{ fill: "#3498DB", strokeWidth: 2, r: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
