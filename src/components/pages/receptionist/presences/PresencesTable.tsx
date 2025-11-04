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
import { Status } from "@/components/ui/status";
import PresenceDialog from "./PresencePopUp";

interface Presence {
  id: number; // session ID
  studentName: string;
  groupName: string;
  sessionDate: string;
  present: boolean;
}

interface PresencesTableProps {
  data: Presence[];
}

export default function PresencesTable({ data }: PresencesTableProps) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Session ID</TableHead>
            <TableHead>Student Name</TableHead>
            <TableHead>Group Name</TableHead>
            <TableHead>Session Date</TableHead>
            <TableHead className="text-center">Presence</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((presence) => (
            <TableRow key={presence.id + presence.studentName}>
              <TableCell>{presence.id}</TableCell>
              <TableCell className="font-medium">{presence.studentName}</TableCell>
              <TableCell>{presence.groupName}</TableCell>
              <TableCell>{presence.sessionDate}</TableCell>
              <TableCell className="text-center">
                <Status
                  value={presence.present ? "active" : "inactive"}
                  label={presence.present ? "Present" : "Absent"}
                />
              </TableCell>
              <TableCell className="flex gap-1 justify-end">
                <PresenceDialog mode="edit"  />
                <DeleteButton />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
