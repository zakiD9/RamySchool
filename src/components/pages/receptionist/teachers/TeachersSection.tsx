import { Filter } from "@/components/ui/filter";
import { SearchInput } from "@/components/ui/search";
import { useState } from "react";
import TeachersTable from "./TeachersTable";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import TeachersDialog from "./TeacherPopUp";

const teacherRevenueFilters = [
    { label: "All", value: "all" },
    { label: "This Month", value: "month" },
    { label: "This Week", value: "week" },
    { label: "Today", value: "today" },
  ];

  const teachersData = [
  { id: 1, teacherName: "Ahmed B.", salary: 85000, percentage: 40,groups:["1,2,3,4"] },
  { id: 2, teacherName: "Lina M.", salary: 72000, percentage: 35,groups:["1,2,3,4"] },
  { id: 3, teacherName: "Ramy K.", salary: 91000, percentage: 45,groups:["1,2,3,4"] },
  { id: 4, teacherName: "Zaki D.", salary: 78000, percentage: 38,groups:["1,2,3,4"] },
]



export default function ReceptionistTeachersSection(){
    const [filter, setFilter] = useState("all");

    return(
        <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-semibold">Teachers</h2>
                    <div className="flex justify-between items-center">
                        <TeachersDialog mode="add" />
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
                    <TeachersTable data={teachersData} />
                </div>
    )
}