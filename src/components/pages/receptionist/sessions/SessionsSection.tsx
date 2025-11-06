import { useEffect, useState } from "react";
import { Filter } from "@/components/ui/filter";
import { SearchInput } from "@/components/ui/search";
import SessionsTable from "./SessionsTable";
import SessionsDialog from "./SessionPopUp";
import { useSessionStore } from "@/stores/sessionsStore";

const teacherRevenueFilters = [
  { label: "All", value: "all" },
  { label: "This Month", value: "month" },
  { label: "This Week", value: "week" },
  { label: "Today", value: "today" },
];

export default function SessionsSection() {
  const [filter, setFilter] = useState("all");
  const { sessions, fetchSessions, loading, error } = useSessionStore();

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">Sessions</h2>

      <div className="flex justify-between items-center">
        <SessionsDialog mode="add" />
        <div className="gap-2 flex items-center">
          <SearchInput placeholder="type..." />
          <Filter
            label="Period"
            options={teacherRevenueFilters}
            value={filter}
            onChange={setFilter}
          />
        </div>
      </div>

      {loading && <p className="text-sm text-gray-500">Loading sessions...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {!loading && !error && <SessionsTable data={sessions} />}
    </div>
  );
}
