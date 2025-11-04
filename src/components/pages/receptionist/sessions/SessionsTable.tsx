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
import SessionsDialog from "./SessionPopUp";

interface Session {
  id: number;
  date: string; // session date
  price: number; // session price
  groupName: string;
  teacherName: string;
}

interface SessionsTableProps {
  data: Session[];
}

export default function SessionsTable({ data }: SessionsTableProps) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Session ID</TableHead>
            <TableHead>Session Date</TableHead>
            <TableHead className="text-right">Price (DZD)</TableHead>
            <TableHead>Group Name</TableHead>
            <TableHead>Teacher Name</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((session) => (
            <TableRow key={session.id}>
              <TableCell>{session.id}</TableCell>
              <TableCell className="font-medium">{session.date}</TableCell>
              <TableCell className="text-right">{session.price.toLocaleString("en-DZ")}</TableCell>
              <TableCell>{session.groupName}</TableCell>
              <TableCell>{session.teacherName}</TableCell>
              <TableCell className="flex gap-1 justify-end">
<SessionsDialog
  mode="edit"
  defaultValues={session}
/>                <DeleteButton />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
