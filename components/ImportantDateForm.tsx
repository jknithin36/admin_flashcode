// "use client";

// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { addImportantDate } from "@/server/api";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Calendar } from "@/components/ui/calendar";
// import { format } from "date-fns";

// export function ImportantDateForm() {
//   const [event, setEvent] = useState("");
//   const [date, setDate] = useState<Date | undefined>();
//   const [semester, setSemester] = useState(
//     `Spring ${new Date().getFullYear()}`
//   );
//   const [message, setMessage] = useState("");

//   const currentYear = new Date().getFullYear();
//   const nextYear = currentYear + 1;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!date) {
//       setMessage("Please select a date.");
//       return;
//     }

//     const formattedDate = date.toDateString();

//     const result = await addImportantDate({
//       event,
//       date: formattedDate,
//       semester,
//     });

//     if (result) {
//       setMessage("✅ Date added successfully!");
//       setEvent("");
//       setDate(undefined);
//     } else {
//       setMessage("❌ Failed to add important date.");
//     }
//   };

//   return (
//     <Card className="p-6 bg-black border border-gray-700 text-white shadow-xl rounded-2xl w-full max-w-md">
//       <CardHeader>
//         <CardTitle className="text-xl font-semibold">
//           Add Important Date
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <Input
//             placeholder="Event Name (e.g., Spring Classes Begin)"
//             value={event}
//             onChange={(e) => setEvent(e.target.value)}
//             required
//           />

//           <Popover>
//             <PopoverTrigger asChild>
//               <Button
//                 variant="outline"
//                 className="w-full justify-start text-left font-normal"
//               >
//                 {date ? format(date, "PP") : <span>Select a date</span>}
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent
//               className="w-auto p-0 bg-white text-black"
//               align="start"
//             >
//               <Calendar
//                 mode="single"
//                 selected={date}
//                 onSelect={setDate}
//                 initialFocus
//               />
//             </PopoverContent>
//           </Popover>

//           <select
//             value={semester}
//             onChange={(e) => setSemester(e.target.value)}
//             className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value={`Spring ${currentYear}`}>
//               Spring {currentYear}
//             </option>
//             <option value={`Summer ${currentYear}`}>
//               Summer {currentYear}
//             </option>
//             <option value={`Fall ${currentYear}`}>Fall {currentYear}</option>
//             <option value={`Spring ${nextYear}`}>Spring {nextYear}</option>
//             <option value={`Summer ${nextYear}`}>Summer {nextYear}</option>
//             <option value={`Fall ${nextYear}`}>Fall {nextYear}</option>
//           </select>

//           <Button
//             type="submit"
//             className="w-full bg-white text-black font-semibold"
//           >
//             Add Important Date
//           </Button>

//           {message && (
//             <p className="text-center text-sm text-gray-400">{message}</p>
//           )}
//         </form>
//       </CardContent>
//     </Card>
//   );
// }
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addImportantDate } from "@/server/api";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface ImportantDateFormProps {
  onDateAdded: () => void; // ✅ callback prop
}

export function ImportantDateForm({ onDateAdded }: ImportantDateFormProps) {
  const [event, setEvent] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [semester, setSemester] = useState(
    `Spring ${new Date().getFullYear()}`
  );
  const [message, setMessage] = useState("");

  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

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
      setMessage("✅ Date added successfully!");
      setEvent("");
      setDate(undefined);
      onDateAdded(); // ✅ refetch dates in parent
    } else {
      setMessage("❌ Failed to add important date.");
    }
  };

  return (
    <Card className="p-6 bg-black border border-gray-700 text-white shadow-xl rounded-2xl w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Add Important Date
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            placeholder="Event Name (e.g., Spring Classes Begin)"
            value={event}
            onChange={(e) => setEvent(e.target.value)}
            required
          />

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                {date ? format(date, "PP") : <span>Select a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 bg-white text-black"
              align="start"
            >
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          <Button
            type="submit"
            className="w-full bg-white text-black font-semibold"
          >
            Add Important Date
          </Button>

          {message && (
            <p className="text-center text-sm text-gray-400">{message}</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
