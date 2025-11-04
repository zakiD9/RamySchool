import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditButton from "@/components/ui/editButton";
import DeleteButton from "@/components/ui/deleteButton";
import GroupDialog from "./GroupPopUp";

interface Group {
  id: number;
  groupName: string;
  teacherName: string;
  students: string[]; // list of student names
}

interface GroupsTableProps {
  data: Group[];
}

export default function GroupsTable({ data }: GroupsTableProps) {
  const truncateStudents = (students: string[], max = 3) => {
    if (students.length <= max) return students.join(", ");
    return students.slice(0, max).join(", ") + "…";
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Group ID</TableHead>
            <TableHead>Group Name</TableHead>
            <TableHead>Group Teacher</TableHead>
            <TableHead>Students</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((group) => (
            <TableRow key={group.id}>
              <TableCell>{group.id}</TableCell>
              <TableCell className="font-medium">{group.groupName}</TableCell>
              <TableCell>{group.teacherName}</TableCell>
              <TableCell>{truncateStudents(group.students)}</TableCell>
              <TableCell className="flex gap-1 justify-end">
              <GroupDialog
                mode="edit"
                defaultValues={{
                  groupName: "Group A",
                  teacherName: "Mr. Ali",
                  students: ["Ahmed B.", "Sara K."],
               }}
               allStudents={["Ahmed B.", "Youssef M.", "Sara K.", "Nadia R."]}
                onSubmit={(updated) => console.log("Updated:", updated)}
              />
              <DeleteButton />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
