"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <div className="relative w-full max-w-md">
      {/* Search Icon */}
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        size={20}
      />

      {/* Input Field */}
      <Input
        type="text"
        placeholder="Search..."
        className="pl-10 pr-4 py-2 bg-white text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
      />
    </div>
  );
}
