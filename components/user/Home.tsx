"use client";

import { useState, useEffect, useRef } from "react";
import UserTabs from "@/components/user/UserTabs";
import UserTable from "@/components/user/UserTable";
import { fetchLeaderboard, LeaderboardUser } from "@/server/api";

export default function UserData() {
  const [timeRange, setTimeRange] = useState("today");
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cachedData = useRef<Record<string, LeaderboardUser[]>>({});
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError("");

    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); // ✅ Cancel previous API request
    }
    abortControllerRef.current = new AbortController();

    if (cachedData.current[timeRange]) {
      setLeaderboardData(cachedData.current[timeRange]);
      setLoading(false);
    } else {
      fetchLeaderboard(timeRange)
        .then((data) => {
          if (isMounted) {
            cachedData.current[timeRange] = data.length > 0 ? data : [];
            setLeaderboardData(data.length > 0 ? data : []);
          }
        })
        .catch((err) => {
          if (isMounted) {
            console.error("Fetch error:", err);
            setError(err.message || "Failed to fetch leaderboard data.");
          }
        })
        .finally(() => {
          if (isMounted) setLoading(false);
        });
    }

    return () => {
      isMounted = false;
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, [timeRange]);

  return (
    <section className="px-6 py-4 mt-5">
      <div className="flex justify-start mb-4">
        <h2 className="text-xl font-semibold text-gray-300">
          Flashcode Leaderboard: Top Contributors & Activity Metrics
        </h2>
      </div>

      <div className="mb-6">
        <UserTabs onTabChange={setTimeRange} />
      </div>

      <div className="mt-8">
        {error ? (
          <p className="text-red-400">{error}</p>
        ) : leaderboardData.length === 0 ? (
          <p className="text-gray-400 text-center">
            No data available for this period.
          </p>
        ) : (
          <UserTable users={leaderboardData} loading={loading} />
        )}
      </div>
    </section>
  );
}
