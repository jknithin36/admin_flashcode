import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

interface User {
  rank: number;
  name: string;
  email: string;
  questionsAnswered: number;
  accountAge: number;
  lastActive: string;
}

interface UserTableProps {
  users: User[];
  loading: boolean;
}

const getRelativeTime = (daysAgo: number): string => {
  if (daysAgo < 30) return `${daysAgo} days ago`;
  if (daysAgo < 365) return `${Math.floor(daysAgo / 30)} months ago`;
  return `${Math.floor(daysAgo / 365)} years ago`;
};

const getRankColor = (rank: number) => {
  if (rank === 1) return "text-yellow-400 font-bold";
  if (rank === 2) return "text-gray-300";
  if (rank === 3) return "text-orange-400";
  return "text-white";
};

export default function UserTable({ users, loading }: UserTableProps) {
  return (
    <div className="border border-gray-700 rounded-lg shadow-md overflow-hidden">
      <Table className="w-full border-collapse text-gray-300">
        <TableHeader className="bg-[#1C1C1E] text-gray-400 uppercase text-sm">
          <TableRow>
            <TableHead className="border-r border-gray-600 px-4 py-3">
              Rank
            </TableHead>
            <TableHead className="border-r border-gray-600 px-4 py-3">
              Name
            </TableHead>
            <TableHead className="border-r border-gray-600 px-4 py-3">
              Email
            </TableHead>
            <TableHead className="border-r border-gray-600 px-4 py-3">
              Answers
            </TableHead>
            <TableHead className="border-r border-gray-600 px-4 py-3">
              Account Age
            </TableHead>
            <TableHead className="px-4 py-3">Last Active</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-[#121212] text-gray-200">
          {loading ? (
            Array(5)
              .fill(0)
              .map((_, index) => (
                <TableRow key={index}>
                  <TableCell
                    colSpan={6}
                    className="text-center py-3 animate-pulse"
                  >
                    <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto"></div>
                  </TableCell>
                </TableRow>
              ))
          ) : users.length > 0 ? (
            users.map((user) => (
              <TableRow
                key={user.rank}
                className="border-b border-gray-700 hover:bg-[#2C2C2E] transition"
              >
                <TableCell
                  className={`border-r border-gray-600 px-4 py-3 ${getRankColor(
                    user.rank
                  )}`}
                >
                  {user.rank}
                </TableCell>
                <TableCell className="border-r border-gray-600 px-4 py-3">
                  {user.name}
                </TableCell>
                <TableCell className="border-r border-gray-600 px-4 py-3">
                  {user.email}
                </TableCell>
                <TableCell className="border-r border-gray-600 px-4 py-3">
                  {user.questionsAnswered}
                </TableCell>
                <TableCell className="border-r border-gray-600 px-4 py-3">
                  {getRelativeTime(user.accountAge)}
                </TableCell>
                <TableCell className="px-4 py-3">{user.lastActive}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center px-4 py-3 text-gray-400"
              >
                No data available for this period
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
