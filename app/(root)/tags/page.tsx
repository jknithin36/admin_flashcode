"use client";

import { useEffect, useMemo, useState } from "react";
import { Pie, PieChart, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CSVLink } from "react-csv";

const BASE_URL = "https://serverflash.onrender.com";
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f7f", "#d1d5db"];

interface TagData {
  id: string;
  tag: string;
  count: number;
  hasIcon?: boolean;
}

interface ApiTagResponse {
  id: string;
  name: string;
  questions: number;
}

interface TopTag {
  tag: string;
  count: number;
  percentage: number;
  createdAt: string;
}

interface CustomLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

const dummyTagsWithoutIcons: { tag: string; count: number }[] = [
  { tag: "astro", count: 3 },
  { tag: "bubble", count: 5 },
  { tag: "qsharp", count: 2 },
  { tag: "solidjs", count: 4 },
  { tag: "docusaurus", count: 1 },
];

export default function TagsPage() {
  const [tags, setTags] = useState<TagData[]>([]);
  const [topTags, setTopTags] = useState<TopTag[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const pageSize = 10;

  useEffect(() => {
    setIsClient(true);
    fetchTags();
    fetchTopTags();
  }, []);

  const fetchTags = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/tags/`);
      const data: ApiTagResponse[] = await res.json();
      const formatted: TagData[] = data.map((tag) => ({
        id: tag.id,
        tag: tag.name,
        count: tag.questions,
        hasIcon: true,
      }));
      setTags(formatted);
    } catch (err) {
      console.error("Failed to fetch tags:", err);
    }
  };

  const fetchTopTags = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/tags/top`);
      const data = await res.json();
      if (data?.top_tags) setTopTags(data.top_tags);
    } catch (err) {
      console.error("Failed to fetch top tags:", err);
    }
  };

  const filteredData = useMemo(
    () =>
      tags.filter(
        (tag) =>
          tag.tag.toLowerCase().includes(search.toLowerCase()) ||
          tag.id.toLowerCase().includes(search.toLowerCase())
      ),
    [search, tags]
  );

  const paginatedData = useMemo(
    () => filteredData.slice(page * pageSize, page * pageSize + pageSize),
    [filteredData, page]
  );

  const totalTags = tags.length;
  const totalPages = Math.ceil(filteredData.length / pageSize);

  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: CustomLabelProps) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 1.1;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${topTags[index].tag} (${(percent * 100).toFixed(0)}%)`}
      </text>
    );
  };

  return (
    <div className="p-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-1"> Tags Overview</h1>
        <p className="text-gray-400 mb-4">
          Analyze and manage all coding language tags used in Flashcode. View
          usage distribution, search tags, and export tag data.
        </p>
        <p className="text-sm text-gray-300">
          Total Tags in System: <span className="font-medium">{totalTags}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Tag Table */}
        <Card>
          <CardHeader>
            <CardTitle> All Tags List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex justify-between items-center">
              <Input
                placeholder="Search tags..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-[60%]"
              />
              {isClient && (
                <CSVLink data={filteredData} filename="tags.csv">
                  <Button size="sm">Export to CSV</Button>
                </CSVLink>
              )}
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>S.No</TableHead>
                    <TableHead>Tag</TableHead>
                    <TableHead>Questions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((tag, index) => (
                    <TableRow key={tag.tag}>
                      <TableCell>{page * pageSize + index + 1}</TableCell>
                      <TableCell>{tag.tag}</TableCell>
                      <TableCell>{tag.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-between items-center pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(p - 1, 0))}
                disabled={page === 0}
              >
                Previous
              </Button>
              <span className="text-sm">
                Page {page + 1} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
                disabled={page + 1 >= totalPages}
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart & Dummy List */}
        <div className="space-y-6">
          <Card className="min-h-[360px]">
            <CardHeader>
              <CardTitle> Tag Distribution</CardTitle>
              <p className="text-sm text-muted-foreground">
                Breakdown of top-used tags across all questions.
              </p>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topTags}
                    dataKey="percentage"
                    nameKey="tag"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    labelLine={false}
                    label={renderCustomLabel}
                  >
                    {topTags.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle> Tags Missing Icons</CardTitle>
              <p className="text-sm text-muted-foreground">
                The following tags don’t have associated icons.
              </p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>S.No</TableHead>
                      <TableHead>Tag</TableHead>
                      <TableHead>Questions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyTagsWithoutIcons.map((tag, index) => (
                      <TableRow key={tag.tag}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{tag.tag}</TableCell>
                        <TableCell>{tag.count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
