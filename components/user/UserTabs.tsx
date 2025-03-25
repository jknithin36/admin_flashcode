"use client";

import { useState, useCallback } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface UserTabsProps {
  onTabChange: (range: string) => void;
}

export default function UserTabs({ onTabChange }: UserTabsProps) {
  const [selectedTab, setSelectedTab] = useState("today");

  const handleTabChange = useCallback(
    (value: string, event: React.MouseEvent) => {
      event.preventDefault();
      setSelectedTab(value);
      onTabChange(value);
    },
    [onTabChange]
  );

  return (
    <Tabs value={selectedTab} className="w-full">
      <TabsList className="flex justify-start gap-2">
        {["today", "30days", "pastyear", "alltime"].map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            onClick={(e) => handleTabChange(tab, e)}
          >
            {tab === "30days"
              ? "Past 30 Days"
              : tab === "pastyear"
              ? "Past Year"
              : tab === "alltime"
              ? "All Time"
              : "Today"}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
