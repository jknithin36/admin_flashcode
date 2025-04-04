"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  LinkIcon,
  FileTextIcon,
  Trash2Icon,
} from "lucide-react";
import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";

const eventSchema = z.object({
  title: z.string().min(3, "Title is required"),
  date: z.string().regex(/\d{4}-\d{2}-\d{2}/, "Invalid format (YYYY-MM-DD)"),
  time: z
    .string()
    .regex(
      /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/,
      "Invalid format (HH:MM AM/PM)"
    ),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(3, "Location is required"),
  link: z.string().url("Invalid URL"),
});

type EventFormData = z.infer<typeof eventSchema>;

interface Event extends EventFormData {
  _id: string;
}

export default function EventForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EventFormData>({ resolver: zodResolver(eventSchema) });

  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  const fetchEvents = async () => {
    try {
      const res = await fetch("https://serverflash.onrender.com/events");
      const data = await res.json();
      setEvents(data);
    } catch {
      toast.error("❌ Failed to fetch events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const onSubmit = async (data: EventFormData) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://serverflash.onrender.com/events/post",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) throw new Error("Failed to add event");

      toast.success("🎉 Event added successfully!");
      reset();
      fetchEvents();
    } catch (error) {
      toast.error("❌ Could not add event");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    toast.custom((t) => (
      <div className="bg-white p-4 rounded-xl shadow-md text-sm text-black w-[300px] space-y-3">
        <p className="font-medium">
          Are you sure you want to delete this event?
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.dismiss(t)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={async () => {
              toast.dismiss(t);
              toast.promise(
                fetch(`https://serverflash.onrender.com/events/delete/${id}`, {
                  method: "DELETE",
                }).then((res) => {
                  if (!res.ok) throw new Error("Failed to delete");
                  fetchEvents();
                }),
                {
                  loading: "Deleting...",
                  success: "🗑️ Event deleted successfully!",
                  error: "❌ Could not delete event",
                }
              );
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    ));
  };

  const columns: ColumnDef<Event>[] = [
    {
      accessorKey: "title",
      header: "Event Name",
    },
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "link",
      header: "Event Link",
      cell: ({ row }) => (
        <a
          href={row.original.link}
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          View
        </a>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Button
          variant="destructive"
          size="icon"
          onClick={() => handleDelete(row.original._id)}
        >
          <Trash2Icon size={16} />
        </Button>
      ),
    },
  ];

  return (
    <div className="p-1 w-full">
      <Toaster />
      <h1 className="text-3xl font-bold text-white mb-1">Manage Events</h1>
      <p className="text-gray-400 mb-6">
        Add and manage upcoming Flashcode events
      </p>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Form */}
        <div className="w-full lg:w-1/2 bg-[#0f0f0f] border border-neutral-800 rounded-xl p-8 space-y-6">
          <h2 className="text-xl font-semibold text-white">Add New Event</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-2">
            {/* Title */}
            <div className="space-y-2 pt-2">
              <Label className="text-white flex items-center gap-2">
                <FileTextIcon size={16} className="text-blue-400" /> Title
              </Label>
              <Input {...register("title")} placeholder="Hackathon 2025" />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-2">
                <Label className="text-white flex items-center gap-2">
                  <CalendarIcon size={16} className="text-green-400" /> Date
                </Label>
                <Input type="date" {...register("date")} />
                {errors.date && (
                  <p className="text-red-500 text-sm">{errors.date.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-white flex items-center gap-2">
                  <ClockIcon size={16} className="text-purple-400" /> Time
                </Label>
                <Input {...register("time")} placeholder="07:00 PM" />
                {errors.time && (
                  <p className="text-red-500 text-sm">{errors.time.message}</p>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2 pt-2">
              <Label className="text-white flex items-center gap-2">
                <MapPinIcon size={16} className="text-red-400" /> Location
              </Label>
              <Input
                {...register("location")}
                placeholder="Student Union Hall"
              />
              {errors.location && (
                <p className="text-red-500 text-sm">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2 pt-2">
              <Label className="text-white flex items-center gap-2">
                <FileTextIcon size={16} className="text-yellow-400" />{" "}
                Description
              </Label>
              <Input
                {...register("description")}
                placeholder="Tech fest full of innovation"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Link */}
            <div className="space-y-2 pt-2">
              <Label className="text-white flex items-center gap-2">
                <LinkIcon size={16} className="text-indigo-400" /> Link
              </Label>
              <Input
                {...register("link")}
                placeholder="https://eventsite.com"
              />
              {errors.link && (
                <p className="text-red-500 text-sm">{errors.link.message}</p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-semibold hover:bg-neutral-200 transition mt-4"
            >
              {loading ? "Submitting..." : "Add Event"}
            </Button>
          </form>
        </div>

        {/* Table */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl font-bold text-white mb-4">All Events</h2>
          <DataTable
            columns={columns}
            data={events}
            searchPlaceholder="Search events..."
            csvFilename="events.csv"
          />
        </div>
      </div>
    </div>
  );
}
