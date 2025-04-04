"use client";

import { ImportantDateForm } from "@/components/ImportantDateForm";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

interface ImportantDate {
  id: string;
  event: string;
  date: string;
  semester: string;
}

interface ImportantDateRaw {
  _id?: string;
  id?: string;
  event: string;
  date: string;
  semester: string;
}

export default function Page() {
  const [springDates, setSpringDates] = useState<ImportantDate[]>([]);
  const [summerDates, setSummerDates] = useState<ImportantDate[]>([]);
  const [fallDates, setFallDates] = useState<ImportantDate[]>([]);
  const [activeTab, setActiveTab] = useState("Spring");

  useEffect(() => {
    fetchDates();
  }, []);

  const fetchDates = async () => {
    try {
      const res = await fetch(
        "https://serverflash.onrender.com/api/important-dates/semester-wise"
      );
      const data: {
        spring: ImportantDateRaw[];
        summer: ImportantDateRaw[];
        fall: ImportantDateRaw[];
      } = await res.json();

      if (data && data.spring && data.summer && data.fall) {
        const mapData = (arr: ImportantDateRaw[]): ImportantDate[] =>
          arr.map((d) => ({
            id: d._id || d.id || "",
            event: d.event,
            date: d.date,
            semester: d.semester,
          }));

        setSpringDates(mapData(data.spring));
        setSummerDates(mapData(data.summer));
        setFallDates(mapData(data.fall));
      } else {
        console.error("Invalid response format for important dates", data);
      }
    } catch (error) {
      console.error("Failed to fetch important dates:", error);
    }
  };

  const deleteDate = async (id: string) => {
    try {
      const res = await fetch(
        `https://serverflash.onrender.com/api/important-dates/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        fetchDates(); // Refetch after deletion
      } else {
        console.error("Delete failed", await res.json());
      }
    } catch (error) {
      console.error("Failed to delete date:", error);
    }
  };

  const renderTable = (dates: ImportantDate[]) => (
    <div className="border border-neutral-700 rounded-lg overflow-hidden w-full">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-neutral-900 text-white">
          <tr>
            <th className="px-4 py-2 border-r border-neutral-700">
              Event Name
            </th>
            <th className="px-4 py-2 border-r border-neutral-700">
              Event Date
            </th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800 text-white">
          {dates
            .sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            )
            .map((date) => (
              <tr key={date.id} className="hover:bg-neutral-800">
                <td className="px-4 py-2 border-r border-neutral-700">
                  {date.event}
                </td>
                <td className="px-4 py-2 border-r border-neutral-700">
                  {new Date(date.date).toDateString()}
                </td>
                <td className="px-4 py-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    className="cursor-pointer"
                    onClick={() => deleteDate(date.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row w-full h-full p-10 gap-8">
      {/* ✅ Left Side - Tabs and Dates Table */}
      <div className="w-full lg:w-1/2 flex flex-col items-start">
        <h2 className="text-3xl font-bold text-white mb-4">
          Manage Important Dates
        </h2>
        <p className="text-lg text-white mb-6">
          Keep track of academic calendar
        </p>

        <div className="flex gap-4 mb-4">
          {["Spring", "Summer", "Fall"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium border border-neutral-700 transition-colors duration-200 ${
                activeTab === tab
                  ? "bg-white text-black"
                  : "bg-neutral-900 text-white hover:bg-neutral-800"
              }`}
            >
              {tab} 2025
            </button>
          ))}
        </div>

        {activeTab === "Spring" && renderTable(springDates)}
        {activeTab === "Summer" && renderTable(summerDates)}
        {activeTab === "Fall" && renderTable(fallDates)}
      </div>

      {/* ✅ Right Side - ImportantDateForm Component */}
      <div className="w-full lg:w-1/2 flex flex-col justify-start items-start gap-6 mt-38">
        <div className="w-full max-w-md">
          <ImportantDateForm onDateAdded={fetchDates} />
        </div>

        <div className="w-full max-w-md">
          <div className="bg-black border border-gray-700 text-white rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Semester Summary </h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex justify-between">
                <span> Spring 2025</span>
                <span className="font-medium text-white">
                  {springDates.length} Events
                </span>
              </div>
              <div className="flex justify-between">
                <span> Summer 2025</span>
                <span className="font-medium text-white">
                  {summerDates.length} Events
                </span>
              </div>
              <div className="flex justify-between">
                <span>Fall 2025</span>
                <span className="font-medium text-white">
                  {fallDates.length} Events
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
