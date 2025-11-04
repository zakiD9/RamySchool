import { Filter } from "@/components/ui/filter";
import { SearchInput } from "@/components/ui/search";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import SessionsTable from "./SessionsTable";
import SessionsDialog from "./SessionPopUp";

const teacherRevenueFilters = [
    { label: "All", value: "all" },
    { label: "This Month", value: "month" },
    { label: "This Week", value: "week" },
    { label: "Today", value: "today" },
  ];

const sessions = [
  {
    id: 1,
    date: "2025-11-01",
    price: 1500,
    groupName: "Group A",
    teacherName: "Mr. Ali",
  },
  {
    id: 2,
    date: "2025-11-03",
    price: 1200,
    groupName: "Group B",
    teacherName: "Ms. Laila",
  },
  {
    id: 3,
    date: "2025-11-05",
    price: 1800,
    groupName: "Group A",
    teacherName: "Mr. Ali",
  },
  {
    id: 4,
    date: "2025-11-07",
    price: 1600,
    groupName: "Group C",
    teacherName: "Mr. Karim",
  },
];





export default function SessionsSection(){
    const [filter, setFilter] = useState("all");

    return(
        <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-semibold">Sessions</h2>
                    <div className="flex justify-between items-center">
<SessionsDialog
  mode="add"
/>                        <div className="gap-2 flex items-center">
                        <SearchInput  placeholder="type...." />
                        <Filter
                        label="Period"
                        options={teacherRevenueFilters}
                        value={filter}
                        onChange={setFilter}
                    />
                        </div>
                    </div>
                    <SessionsTable data={sessions} />
                </div>
    )
}