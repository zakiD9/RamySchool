import { useEffect, useState } from "react";
import { Filter } from "@/components/ui/filter";
import { SearchInput } from "@/components/ui/search";
import PresenceDialog from "./PresencePopUp";
import PresencesTable from "./PresencesTable";
import { usePresenceStore } from "@/stores/presencesStore";

const teacherRevenueFilters = [
  { label: "All", value: "all" },
  { label: "This Month", value: "month" },
  { label: "This Week", value: "week" },
  { label: "Today", value: "today" },
];

export default function PresencesSection() {
  const [filter, setFilter] = useState("all");

  const { presences, fetchPresences, loading, error } = usePresenceStore();

  useEffect(() => {
    fetchPresences();
  }, [fetchPresences]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">Presences</h2>

      <div className="flex justify-between items-center">
        <PresenceDialog mode="add" />

        <div className="gap-2 flex items-center">
          <SearchInput placeholder="Search..." />
          <Filter
            label="Period"
            options={teacherRevenueFilters}
            value={filter}
            onChange={setFilter}
          />
        </div>
      </div>

      {loading && <p className="text-gray-500">Loading presences...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && presences.length > 0 && (
        <PresencesTable data={presences} />
      )}

      {!loading && !error && presences.length === 0 && (
        <p className="text-gray-500">No presences found.</p>
      )}
    </div>
  );
}
