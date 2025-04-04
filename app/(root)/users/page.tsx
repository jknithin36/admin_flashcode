"use client";

import { useEffect, useMemo, useState } from "react";
import { DataTable } from "@/components/data-table";
import { RowActions } from "@/components/row-actions";
import { ColumnDef } from "@tanstack/react-table";
import { Skeleton } from "@/components/ui/skeleton";

const BASE_URL = "https://serverflash.onrender.com";

interface RawUser {
  id: string;
  name: string;
  email: string;
  username: string;
  totalQuestions: number;
  createdDate: string;
  numberOfAnswers: number;
}

interface User extends RawUser {
  sNo: number;
}

export default function UsersPage() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users/all`);
        const users: RawUser[] = await response.json();
        const formatted: User[] = users.map((user, index) => ({
          ...user,
          sNo: index + 1,
        }));
        setData(formatted);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      { accessorKey: "sNo", header: "S.No" },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "username", header: "Username" },
      { accessorKey: "totalQuestions", header: "Total Questions" },
      { accessorKey: "createdDate", header: "Created Date" },
      { accessorKey: "numberOfAnswers", header: "# of Answers" },
      {
        id: "actions",
        header: "Modify",
        cell: ({ row }) => (
          <RowActions
            row={row.original}
            onDelete={(user) => alert(`Deleting ${user.name}`)}
            onBlock={(user) => alert(`Blocking ${user.name}`)}
            onNotify={(user) => alert(`Notifying ${user.name}`)} // Dummy for now
          />
        ),
      },
    ],
    []
  );

  return (
    <div className="p-10 w-full">
      <h1 className="text-3xl font-bold text-white mb-1">User Management</h1>
      <p className="text-gray-400 mb-6">
        Manage registered Flashcode users, monitor engagement, and perform
        actions.
      </p>

      {loading ? (
        <Skeleton className="h-[400px] w-full rounded-xl bg-neutral-800" />
      ) : (
        <DataTable
          data={data}
          columns={columns}
          csvFilename="users.csv"
          searchPlaceholder="Search users..."
        />
      )}
    </div>
  );
}
