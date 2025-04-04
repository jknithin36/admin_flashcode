"use client";

import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RowActionsProps<T> {
  row: T;
  onDelete?: (row: T) => void;
  onBlock?: (row: T) => void;
  onNotify?: (row: T) => void;
}

export function RowActions<T>({
  row,
  onDelete,
  onBlock,
  onNotify,
}: RowActionsProps<T>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {onDelete && (
          <DropdownMenuItem onClick={() => onDelete(row)}>
            🗑️ Delete
          </DropdownMenuItem>
        )}
        {onBlock && (
          <DropdownMenuItem onClick={() => onBlock(row)}>
            🚫 Block
          </DropdownMenuItem>
        )}
        {onNotify && (
          <DropdownMenuItem onClick={() => onNotify(row)}>
            🔔 Notify
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
