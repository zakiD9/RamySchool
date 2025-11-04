import { Filter } from "@/components/ui/filter";
import { SearchInput } from "@/components/ui/search";
import { useState } from "react";
import GroupsTable from "./GroupsTable";
import GroupDialog from "./GroupPopUp";

const teacherRevenueFilters = [
    { label: "All", value: "all" },
    { label: "This Month", value: "month" },
    { label: "This Week", value: "week" },
    { label: "Today", value: "today" },
  ];

const groups = [
  { id: 1, groupName: "Group A", teacherName: "Mr. Ali", students: ["Ahmed", "Sara"] },
];





export default function GroupsSection(){
    const [filter, setFilter] = useState("all");


    return(
        <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-semibold">Groups</h2>
                    <div className="flex justify-between items-center">
                    <GroupDialog
                      mode="add"
                      allStudents={["Ahmed B.", "Youssef M.", "Sara K.", "Nadia R."]}
                      onSubmit={(group) => console.log("Added:", group)}
                    />
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
                    <GroupsTable data={groups} />
                </div>
    )
}