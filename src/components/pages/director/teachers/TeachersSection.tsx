import { useEffect, useState } from "react";
import { Filter } from "@/components/ui/filter";
import { SearchInput } from "@/components/ui/search";
import TeachersTable from "./TeachersTable";
import { useTeacherStore } from "@/stores/teachersStore";

const teacherRevenueFilters = [
  { label: "All", value: "all" },
  { label: "This Month", value: "month" },
  { label: "This Week", value: "week" },
  { label: "Today", value: "today" },
];

export default function DirectorTeachersSection() {
  const [filter, setFilter] = useState("all");
  const { teachers, fetchTeachers, loading, error } = useTeacherStore();

  // ✅ Fetch teachers when component mounts
  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  // ✅ Optional: you can filter here based on period
  const filteredTeachers = teachers; // (implement filter logic if needed)

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">Teachers</h2>

      <div className="flex justify-end gap-2 items-center">
        <SearchInput placeholder="type...." />
        <Filter
          label="Period"
          options={teacherRevenueFilters}
          value={filter}
          onChange={setFilter}
        />
      </div>

      {loading ? (
        <p className="text-center py-4 text-gray-500">Loading teachers...</p>
      ) : error ? (
        <p className="text-center py-4 text-red-500">{error}</p>
      ) : (
        <TeachersTable data={filteredTeachers} />
      )}
    </div>
  );
}
