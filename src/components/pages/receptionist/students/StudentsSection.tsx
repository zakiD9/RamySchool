import { Filter } from "@/components/ui/filter";
import { SearchInput } from "@/components/ui/search";
import { useEffect, useState } from "react";
import StudentsTable from "./StudentTable";
import StudentsDialog from "./StudentPopUp";
import { useStudentsStore } from "@/stores/studentsStore";

const teacherRevenueFilters = [
  { label: "All", value: "all" },
  { label: "This Month", value: "month" },
  { label: "This Week", value: "week" },
  { label: "Today", value: "today" },
];

export default function StudentSection() {
  const [filter, setFilter] = useState("all");
  const { students, fetchStudents, loading } = useStudentsStore();

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">Students</h2>

      <div className="flex justify-between items-center">
        <StudentsDialog mode="add" />

        <div className="gap-2 flex items-center">
          <SearchInput placeholder="type...." />
          <Filter
            label="Period"
            options={teacherRevenueFilters}
            value={filter}
            onChange={setFilter}
          />
        </div>
      </div>

      {loading ? (
        <p className="text-center text-muted-foreground">Loading students...</p>
      ) : (
        <StudentsTable data={students} />
      )}
    </div>
  );
}
