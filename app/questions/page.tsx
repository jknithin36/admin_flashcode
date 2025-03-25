import { SearchBar } from "@/components/SearchBar";
import React from "react";

export default function DashboardQuestionCard() {
  return (
    <>
      <h2 className="text-md text-white mb-4">Search Questions</h2>

      <SearchBar />
      <div className="mt-9 relative card-wrapper rounded-[10px] p-9 sm:px-11 overflow-hidden e bg-black-900 border border-white">
        {/* Title and Timestamp */}
        <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row relative z-10">
          <div>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              How does data binding work in React?
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}
