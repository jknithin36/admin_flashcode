// app/components/FlashcodeCalendar.tsx
"use client";

import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { EventClickArg } from "@fullcalendar/core";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Users, MapPin, ClipboardList, Flag } from "lucide-react";

interface Event {
  title: string;
  date: string;
  description?: string;
  priority: "High" | "Medium" | "Low";
  assignedTo?: string;
}

const dummyAdmins = [
  "Vennela Kundeti",
  "Sai Priya",
  "Kiran Patel",
  "Shravan Rao",
  "Anjali Mehta",
  "Rohit Verma",
  "Neha Sharma",
  "Aman Gupta",
  "Divya Iyer",
  "Tanmay Deshmukh",
];

export default function FlashcodeCalendar() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventPriority, setEventPriority] = useState<"High" | "Medium" | "Low">(
    "Low"
  );
  const [eventAssignedTo, setEventAssignedTo] = useState<string>("");
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  const [eventDialog, setEventDialog] = useState<{
    isOpen: boolean;
    event: Event | null;
  }>({ isOpen: false, event: null });

  useEffect(() => {
    setEvents([
      {
        title: "Meeting with Team",
        date: "2025-04-10",
        description: "Discuss project requirements.",
        priority: "High",
        assignedTo: "Admin A",
      },
      {
        title: "Project Deadline",
        date: "2025-04-15",
        description: "Submit all materials.",
        priority: "Medium",
        assignedTo: "Admin B",
      },
      {
        title: "Client Review",
        date: "2025-04-20",
        description: "Feedback session.",
        priority: "Low",
        assignedTo: "Admin C",
      },
    ]);
  }, []);

  const handleDateClick = (info: DateClickArg) => {
    setSelectedDate(info.dateStr);
    setOpen(true);
  };

  const handleEventClick = (info: EventClickArg) => {
    const clickedEvent = events.find(
      (e) => e.title === info.event.title && e.date === info.event.startStr
    );
    if (clickedEvent) {
      setEventDialog({ isOpen: true, event: clickedEvent });
    }
  };

  const handleEventSubmit = () => {
    if (selectedDate && eventTitle) {
      setEvents([
        ...events,
        {
          title: eventTitle,
          date: selectedDate,
          description: eventDescription,
          priority: eventPriority,
          assignedTo: eventAssignedTo,
        },
      ]);
      setEventTitle("");
      setEventDescription("");
      setEventAssignedTo("");
      setSearchText("");
      setEventPriority("Low");
      setOpen(false);

      const toast = document.createElement("div");
      toast.textContent = "✅ Event saved successfully!";
      toast.className =
        "fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded-md shadow-md animate-fade-in z-[9999]";
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2500);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "#EF4444";
      case "Medium":
        return "#FACC15";
      case "Low":
        return "#22C55E";
      default:
        return "#FFFFFF";
    }
  };

  const filteredAdmins =
    searchText.length > 0
      ? dummyAdmins.filter((admin) =>
          admin.toLowerCase().includes(searchText.toLowerCase())
        )
      : [];

  return (
    <>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        input, textarea, select {
          border-radius: 0 !important;
          border: none !important;
          border-bottom: 1px solid white !important;
          background-color: transparent !important;
          color: white !important;
          font-weight: 500 !important;
        }
      `}</style>

      <div className="bg-black p-6 shadow-lg border border-white">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events.map((event) => ({
            ...event,
            backgroundColor: getPriorityColor(event.priority),
            borderColor: getPriorityColor(event.priority),
            textColor: "#000000",
          }))}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          height="auto"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,dayGridWeek,dayGridDay",
          }}
          dayHeaderClassNames="text-white bg-black border-white"
          dayCellClassNames="border border-white bg-black hover:bg-black"
          titleFormat={{ year: "numeric", month: "long" }}
          buttonText={{ today: "Today" }}
        />

        {/* View Event Dialog */}
        <Dialog
          open={eventDialog.isOpen}
          onOpenChange={() => setEventDialog({ isOpen: false, event: null })}
        >
          <DialogContent className="bg-black text-white border border-white rounded-xl px-6 py-5">
            {eventDialog.event && (
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <DialogTitle className="text-xl font-semibold flex items-center gap-2">
                    <ClipboardList size={20} />
                    {eventDialog.event.title}
                  </DialogTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setEventDialog({ isOpen: false, event: null })
                    }
                  ></Button>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400" />
                    <span>{eventDialog.event.date}</span>
                  </div>

                  {eventDialog.event.description && (
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-gray-400" />
                      <span>{eventDialog.event.description}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-gray-400" />
                    <span>{eventDialog.event.assignedTo || "Unassigned"}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Flag size={16} className="text-gray-400" />
                    <span
                      className="font-semibold"
                      style={{
                        color: getPriorityColor(eventDialog.event.priority),
                      }}
                    >
                      {eventDialog.event.priority}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Add Event Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="bg-black text-white border border-white rounded-xl px-6 py-5">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                Add Event on {selectedDate}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ClipboardList size={18} />
                <Input
                  placeholder="Event Title"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <Textarea
                  placeholder="Event Description"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <Users size={18} />
                <Input
                  placeholder="Assign to Admin..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>

              {searchText && filteredAdmins.length > 0 && (
                <div className="border border-white p-2 rounded-sm">
                  {filteredAdmins.map((admin) => (
                    <div
                      key={admin}
                      onClick={() => {
                        setEventAssignedTo(admin);
                        setSearchText("");
                      }}
                      className="cursor-pointer hover:bg-white hover:text-black px-2 py-1 rounded"
                    >
                      {admin}
                    </div>
                  ))}
                </div>
              )}

              {eventAssignedTo && (
                <div className="text-sm text-gray-300 mt-2">
                  Assigned to:{" "}
                  <span className="text-white">{eventAssignedTo}</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Flag size={18} />
                <select
                  value={eventPriority}
                  onChange={(e) =>
                    setEventPriority(
                      e.target.value as "High" | "Medium" | "Low"
                    )
                  }
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <DialogFooter>
              <Button
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleEventSubmit}
              >
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
