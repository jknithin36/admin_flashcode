import { FlashcodeChart } from "@/components/ChartArea";
import { ViewsChart } from "@/components/ViewsChart";
import React from "react";

export default function page() {
  return (
    <>
      <div className="p-4">
        <FlashcodeChart />
      </div>
      <div className="p-6">
        <ViewsChart />
      </div>
    </>
  );
}
