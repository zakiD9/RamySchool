import { Filter } from "@/components/ui/filter";
import { SearchInput } from "@/components/ui/search";
import { useState } from "react";
import StudentsTable from "./StudentTable";
import StudentsDialog from "./StudentPopUp";

const teacherRevenueFilters = [
    { label: "All", value: "all" },
    { label: "This Month", value: "month" },
    { label: "This Week", value: "week" },
    { label: "Today", value: "today" },
  ];

const students = [
  {
    id: 1,
    studentName: "Ahmed B.",
    phoneNumber: "0551-123-456",
    groupName: "Group A",
    teacherName: "Mr. Ali",
    presences: [true, true, false, true, true],
  },
  {
    id: 2,
    studentName: "Sara K.",
    phoneNumber: "0552-234-567",
    groupName: "Group B",
    teacherName: "Ms. Laila",
    presences: [true, true, true, true, false],
  },
  {
    id: 3,
    studentName: "Youssef M.",
    phoneNumber: "0553-345-678",
    groupName: "Group A",
    teacherName: "Mr. Ali",
    presences: [false, true, true, true, true],
  },
  {
    id: 4,
    studentName: "Nadia R.",
    phoneNumber: "0554-456-789",
    groupName: "Group C",
    teacherName: "Mr. Karim",
    presences: [true, true, true, true, true],
  },
  {
    id: 5,
    studentName: "Mohamed S.",
    phoneNumber: "0555-567-890",
    groupName: "Group B",
    teacherName: "Ms. Laila",
    presences: [true, false, true, true, false],
  },
];





export default function StudentSection(){
    const [filter, setFilter] = useState("all");

    return(
        <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-semibold">Students</h2>
                    <div className="flex justify-between items-center">
                        <StudentsDialog mode="add" />
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
                    <StudentsTable data={students} />
                </div>
    )
}