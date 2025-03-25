import { ImportantDateForm } from "@/components/ImportantDateForm";
import React from "react";

export default function Page() {
  return (
    <div className="flex flex-col lg:flex-row w-full h-full p-10 gap-8">
      <div className="w-full lg:w-1/2 flex flex-col  items-start">
        <h2 className="text-3xl font-bold text-white mb-4">
          Manage Important Dates
        </h2>
        <p className="text-lg text-white">Keep track of academic calender</p>
      </div>

      {/* ✅ Right Side - ImportantDateForm Component */}
      <div className="w-full lg:w-1/2 flex justify-end">
        <ImportantDateForm />
      </div>
    </div>
  );
}
