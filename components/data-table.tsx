"use client";

import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CSVLink } from "react-csv";

interface DataTableProps<TData extends object> {
  columns: ColumnDef<TData>[];
  data: TData[];
  searchPlaceholder?: string;
  csvFilename?: string;
}

export function DataTable<TData extends object>({
  columns,
  data,
  searchPlaceholder = "Search...",
  csvFilename = "data.csv",
}: DataTableProps<TData>) {
  const [filter, setFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter: filter },
    onGlobalFilterChange: setFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (!data.length)
    return <div className="p-6 text-muted-foreground text-sm">Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder={searchPlaceholder}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-[300px]"
        />
        <CSVLink data={data} filename={csvFilename}>
          <Button>Export to CSV</Button>
        </CSVLink>
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-neutral-900 text-white"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    onClick={
                      header.column.getCanSort()
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                    className={`${
                      header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : ""
                    } text-white`}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{ asc: " \ud83d\udd3c", desc: " \ud83d\udd3d" }[
                      header.column.getIsSorted() as string
                    ] ?? null}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between pt-4">
        <span className="text-sm">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
