import { Filter } from "@/components/ui/filter";
import { SearchInput } from "@/components/ui/search";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import PresencesTable from "./PresencesTable";
import PresenceDialog from "./PresencePopUp";

const teacherRevenueFilters = [
    { label: "All", value: "all" },
    { label: "This Month", value: "month" },
    { label: "This Week", value: "week" },
    { label: "Today", value: "today" },
  ];

const presences = [
  { id: 1, studentName: "Ahmed B.", groupName: "Group A", sessionDate: "2025-11-01", present: true },
  { id: 1, studentName: "Sara K.", groupName: "Group B", sessionDate: "2025-11-01", present: false },
  { id: 2, studentName: "Youssef M.", groupName: "Group A", sessionDate: "2025-11-03", present: true },
  { id: 2, studentName: "Nadia R.", groupName: "Group C", sessionDate: "2025-11-03", present: true },
  { id: 3, studentName: "Mohamed S.", groupName: "Group B", sessionDate: "2025-11-05", present: false },
];




export default function PresencesSection(){
    const [filter, setFilter] = useState("all");

    return(
        <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-semibold">Presences</h2>
                    <div className="flex justify-between items-center">
                        <PresenceDialog mode="add" />
                        <div className="gap-2 flex items-center">
                        <SearchInput  placeholder="type...." />
                        <Filter
                        label="Period"
                        options={teacherRevenueFilters}
                        value={filter}
                        onChange={setFilter}
                    />
                        </div>
                    </div>
                    <PresencesTable data={presences} />
                </div>
    )
}