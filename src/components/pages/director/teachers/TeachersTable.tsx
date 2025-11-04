import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import ViewButton from "@/components/ui/viewButton"
import TeacherViewDialog from "./TeacherPopUp"

interface Teacher {
  id: number
  teacherName: string
  salary: number
  percentage: number
}

interface TeachersTableProps {
  data: Teacher[]
}

export default function TeachersTable({ data }: TeachersTableProps) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>Teacher Name</TableHead>
            <TableHead className="text-right">Salary (DZD)</TableHead>
            <TableHead className="text-right">Percentage (%)</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((teacher) => (
            <TableRow key={teacher.id}>
              <TableCell>{teacher.id}</TableCell>
              <TableCell className="font-medium">
                {teacher.teacherName}
              </TableCell>
              <TableCell className="text-right">
                {teacher.salary.toLocaleString("en-DZ")}
              </TableCell>
              <TableCell className="text-right">{teacher.percentage}%</TableCell>
              <TableCell className="flex gap-1 justify-end"><TeacherViewDialog teacher={teacher}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
