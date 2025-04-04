"use client";

import { useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { RowActions } from "@/components/row-actions";
import { Skeleton } from "@/components/ui/skeleton";

const BASE_URL = "https://serverflash.onrender.com";

interface Question {
  id: string;
  sNo: string;
  question: string;
  answers: number;
  createdBy: string;
  upvotes: number;
  downvotes: number;
}

export default function QuestionsPage() {
  const [data, setData] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${BASE_URL}/questions/all`);
        const result: Question[] = await response.json();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const columns: ColumnDef<Question>[] = useMemo(
    () => [
      { accessorKey: "sNo", header: "S.No" },
      {
        accessorKey: "question",
        header: "Question",
        cell: ({ row }) => (
          <div className="max-w-[400px] whitespace-normal break-words line-clamp-2">
            {row.getValue("question")}
          </div>
        ),
      },
      { accessorKey: "answers", header: "# of Answers" },
      { accessorKey: "createdBy", header: "Created By" },
      { accessorKey: "upvotes", header: "Upvotes" },
      { accessorKey: "downvotes", header: "Downvotes" },
      {
        id: "actions",
        header: "Modify",
        cell: ({ row }) => (
          <RowActions
            row={row.original}
            onDelete={(q) => alert(`Deleting question: ${q.question}`)}
            onNotify={(q) => alert(`Notifying about: ${q.question}`)}
          />
        ),
      },
    ],
    []
  );

  return (
    <div className="p-10 w-full">
      <h1 className="text-3xl font-bold text-white mb-1">Question Insights</h1>
      <p className="text-gray-400 mb-6">
        Browse, analyze, and manage all questions posted on Flashcode. Monitor
        engagement with upvotes, answers, and actions.
      </p>

      {loading ? (
        <Skeleton className="h-[400px] w-full rounded-xl bg-neutral-800" />
      ) : (
        <DataTable
          data={data}
          columns={columns}
          csvFilename="questions.csv"
          searchPlaceholder="Search questions..."
        />
      )}
    </div>
  );
}
