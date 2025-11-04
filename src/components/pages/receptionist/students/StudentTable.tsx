import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteButton from "@/components/ui/deleteButton";
import StudentsDialog from "./StudentPopUp";
import { Status } from "@/components/ui/status";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Student {
  id: number;
  studentName: string;
  phoneNumber: string;
  groupName: string;
  teacherName: string;
  presences: boolean[];
}

interface StudentsTableProps {
  data: Student[];
}

export default function StudentsTable({ data }: StudentsTableProps) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>Student Name</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Group Name</TableHead>
            <TableHead>Teacher Name</TableHead>
            <TableHead className="text-right">Presences</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.id}</TableCell>
              <TableCell className="font-medium">{student.studentName}</TableCell>
              <TableCell>{student.phoneNumber}</TableCell>
              <TableCell>{student.groupName}</TableCell>
              <TableCell>{student.teacherName}</TableCell>
<TableCell className="text-right">
  <TooltipProvider>
    <div className="flex justify-end gap-1">
      {student.presences.slice(-5).map((presence: boolean, i: number) => (
        <Tooltip key={i}>
          <TooltipTrigger asChild>
            <Status
              value={presence ? "success" : "error"}
              size="sm"
              label=""
              className="cursor-default"
            />
          </TooltipTrigger>
          <TooltipContent>{presence ? "Present" : "Absent"}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  </TooltipProvider>
</TableCell>
              <TableCell className="flex gap-1 justify-end">
                <StudentsDialog defaultValues={student} mode="edit" />
                <DeleteButton />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
