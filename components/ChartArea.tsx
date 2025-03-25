// "use client";

// import * as React from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   XAxis,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
// import { fetchQuestionsAnswersTrend } from "@/server/api";

// export function FlashcodeChart() {
//   const [timeRange, setTimeRange] = React.useState("month");
//   const [chartData, setChartData] = React.useState<
//     { date: string; questions: number; answers: number }[]
//   >([]);
//   const [loading, setLoading] = React.useState(false);

//   // 📌 Fetch Data When Time Range Changes
//   React.useEffect(() => {
//     async function loadData() {
//       setLoading(true);
//       const data = await fetchQuestionsAnswersTrend(timeRange);
//       setChartData(data);
//       setLoading(false);
//     }
//     loadData();
//   }, [timeRange]); // ✅ Re-fetch when time range changes

//   return (
//     <Card className="bg-[#121212] text-white shadow-lg border border-gray-800 rounded-xl">
//       <CardHeader className="relative">
//         <CardTitle className="text-lg font-semibold">
//           Flashcode - Questions vs Answers
//         </CardTitle>
//         <CardDescription className="text-gray-400">
//           {loading ? "Loading data..." : "Comparison of Questions and Answers"}
//         </CardDescription>

//         {/* Toggle & Select */}
//         <div className="absolute right-4 top-4 flex gap-2">
//           <ToggleGroup
//             type="single"
//             value={timeRange}
//             onValueChange={setTimeRange}
//             variant="outline"
//             className="hidden sm:flex bg-gray-900 rounded-lg p-1"
//           >
//             <ToggleGroupItem
//               value="year"
//               className="h-8 px-3 text-gray-300 hover:bg-gray-700"
//             >
//               Year
//             </ToggleGroupItem>
//             <ToggleGroupItem
//               value="month"
//               className="h-8 px-3 text-gray-300 hover:bg-gray-700"
//             >
//               Month
//             </ToggleGroupItem>
//             <ToggleGroupItem
//               value="week"
//               className="h-8 px-3 text-gray-300 hover:bg-gray-700"
//             >
//               Week
//             </ToggleGroupItem>
//           </ToggleGroup>

//           {/* Mobile Select */}
//           <div className="sm:hidden">
//             <Select value={timeRange} onValueChange={setTimeRange}>
//               <SelectTrigger className="bg-gray-800 text-white border-gray-700">
//                 <SelectValue placeholder="Select Time Range" />
//               </SelectTrigger>
//               <SelectContent className="bg-gray-900 text-white">
//                 <SelectItem value="year">Year</SelectItem>
//                 <SelectItem value="month">Month</SelectItem>
//                 <SelectItem value="week">Week</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//       </CardHeader>

//       <CardContent className="p-4">
//         <ResponsiveContainer width="100%" height={250}>
//           <AreaChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
//             <XAxis
//               dataKey="date"
//               tick={{ fill: "#ffffff" }}
//               tickFormatter={(value) => {
//                 return timeRange === "year"
//                   ? new Date(value + "-01").toLocaleDateString("en-US", {
//                       month: "short",
//                       year: "numeric",
//                     }) // Format year view
//                   : new Date(value).toLocaleDateString("en-US", {
//                       month: "short",
//                       day: "numeric",
//                     });
//               }}
//             />
//             <Tooltip />
//             <Legend
//               verticalAlign="top"
//               height={36}
//               wrapperStyle={{ color: "white" }}
//             />

//             <Area
//               type="monotone"
//               dataKey="questions"
//               stroke="#E74C3C"
//               fillOpacity={0.3}
//               fill="red"
//             />
//             <Area
//               type="monotone"
//               dataKey="answers"
//               stroke="#27AE60"
//               fillOpacity={0.3}
//               fill="green"
//             />
//           </AreaChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   );
// }
"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
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
import { fetchQuestionsAnswersTrend } from "@/server/api";

export function FlashcodeChart() {
  const [timeRange, setTimeRange] = React.useState("month");
  const [chartData, setChartData] = React.useState<
    { date: string; questions: number; answers: number }[]
  >([]);
  const [loading, setLoading] = React.useState(false);

  // 📌 Fetch Data When Time Range Changes
  React.useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await fetchQuestionsAnswersTrend(timeRange);
      setChartData(data);
      setLoading(false);
    }
    loadData();
  }, [timeRange]); // ✅ Re-fetch when time range changes

  return (
    <Card className="bg-[#121212] text-white shadow-lg border border-gray-800 rounded-xl p-4">
      <CardHeader className="relative">
        <CardTitle className="text-lg font-semibold text-center sm:text-left">
          Flashcode - Questions vs Answers
        </CardTitle>
        <CardDescription className="text-gray-400 text-center sm:text-left">
          {loading ? "Loading data..." : "Comparison of Questions and Answers"}
        </CardDescription>

        {/* Toggle & Select */}
        <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center gap-2 mt-4 sm:mt-0">
          {/* Desktop Toggle */}
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
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 20, left: -10, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis
              dataKey="date"
              tick={{ fill: "#ffffff" }}
              tickFormatter={(value) => {
                return timeRange === "year"
                  ? new Date(value + "-01").toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    }) // Format year view
                  : new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e1e1e",
                borderRadius: "8px",
                color: "#fff",
              }}
              itemStyle={{ color: "#fff" }}
            />
            <Legend
              verticalAlign="bottom"
              wrapperStyle={{
                color: "white",
                fontSize: "12px",
                paddingBottom: "10px",
              }}
            />

            <Area
              type="monotone"
              dataKey="questions"
              stroke="#E74C3C"
              strokeWidth={2}
              fillOpacity={0.3}
              fill="red"
            />
            <Area
              type="monotone"
              dataKey="answers"
              stroke="#27AE60"
              strokeWidth={2}
              fillOpacity={0.3}
              fill="green"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
