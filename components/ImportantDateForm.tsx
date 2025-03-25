"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { addImportantDate } from "@/server/api";

export function ImportantDateForm() {
  const [event, setEvent] = useState("");
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  const [semester, setSemester] = useState(`Spring ${currentYear}`);
  const [message, setMessage] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedDate = localStorage.getItem("selectedDate");
      if (savedDate) {
        setDate(new Date(savedDate));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && date) {
      localStorage.setItem("selectedDate", date.toISOString());
    }
  }, [date]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date) {
      setMessage("Please select a date.");
      return;
    }

    const formattedDate = date.toDateString();

    const result = await addImportantDate({
      event,
      date: formattedDate,
      semester,
    });

    if (result) {
      setMessage("Important date added successfully!");
      setEvent("");
      setDate(undefined);
      localStorage.removeItem("selectedDate");
    } else {
      setMessage("Failed to add important date.");
    }
  };

  return (
    <Card className="p-5 bg-black border border-gray-700 text-white shadow-lg rounded-2xl w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-100">
          Add Important Date
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Event Name (e.g., Spring Classes Begin)"
            value={event}
            onChange={(e) => setEvent(e.target.value)}
            className="w-full p-3 bg-gray-900 text-white rounded-lg placeholder-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <div className="rounded-lg border border-gray-600 p-3 bg-gray-900">
            <DayPicker
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-lg bg-gray-900 text-white shadow-md"
              modifiersClassNames={{
                selected: "bg-blue-500 text-white rounded-full shadow-md",
                today: "border border-blue-400 text-white",
                disabled: "text-gray-600 opacity-50",
              }}
              styles={{
                caption: {
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "#ffffff",
                },
                head: {
                  fontSize: "0.85rem",
                  color: "#cbd5e1",
                  borderBottom: "1px solid #374151",
                },
                table: {
                  width: "100%",
                  textAlign: "center",
                  borderSpacing: "0.5rem",
                },
                day: {
                  padding: "0.5rem",
                  borderRadius: "8px",
                  color: "#ffffff",
                  transition: "background 0.2s ease",
                },
                nav_button: {
                  backgroundColor: "#1f2937",
                  color: "#cbd5e1",
                  borderRadius: "6px",
                  padding: "6px",
                  cursor: "pointer",
                  transition: "background 0.2s ease",
                },
              }}
            />
          </div>

          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="p-3 bg-gray-900 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={`Spring ${currentYear}`}>
              Spring {currentYear}
            </option>
            <option value={`Summer ${currentYear}`}>
              Summer {currentYear}
            </option>
            <option value={`Fall ${currentYear}`}>Fall {currentYear}</option>
            <option value={`Spring ${nextYear}`}>Spring {nextYear}</option>
            <option value={`Summer ${nextYear}`}>Summer {nextYear}</option>
            <option value={`Fall ${nextYear}`}>Fall {nextYear}</option>
          </select>

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
          >
            Add Important Date
          </button>

          {message && (
            <p className="text-center text-sm text-gray-300 mt-2">{message}</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
