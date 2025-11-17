import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Status } from "@/components/ui/status";
import PresenceDialog from "./PresencePopUp";
import { StudentResponse } from "@/services/studentsService";
import { useTeacherStore } from "@/stores/teachersStore";
import { useSessionStore } from "@/stores/sessionsStore";
import type { AttendanceResponse } from "@/services/sessionsService";

interface PresencesTableProps {
  data: StudentResponse[];
}

export default function PresencesTable({ data }: PresencesTableProps) {
  const { fetchStudentSessionsForTeacher, studentSessions } = useTeacherStore();
  const { getStudentSessions } = useSessionStore();

  const [selectedAttendance, setSelectedAttendance] = useState<{
    studentId: number;
    studentName: string;
    attendance: AttendanceResponse;
  } | null>(null);

  const [openDialog, setOpenDialog] = useState(false);

  // Fetch sessions for all students
  useEffect(() => {
    data.forEach((student) => {
      fetchStudentSessionsForTeacher(student.id);
    });
  }, [data]);

  const handleStatusClick = async (
    studentId: number,
    studentName: string,
    sessionId: number
  ) => {
    // Get attendance for this student & session
    const attendances = await getStudentSessions(studentId);
    const attendance = attendances.find((a) => a.sessionId === sessionId);

    if (!attendance) {
      console.error("Attendance not found");
      return;
    }

    setSelectedAttendance({ studentId, studentName, attendance });
    setOpenDialog(true);
  };

  return (
    <>
      <div className="bg-white rounded-xl border shadow-sm p-4 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Group</TableHead>
              <TableHead className="text-center">Presences</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((student) => {
              const sessions = studentSessions[student.id] || [];

              return (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.groupName}</TableCell>
                  <TableCell className="flex items-center justify-center gap-1">
                    <td className="flex items-center justify-center gap-1">
  {sessions.slice(-5).map((session) => (
    <div
      key={session.sessionId}
      onClick={() =>
        handleStatusClick(student.id, student.name, session.sessionId)
      }
      className="cursor-pointer"
    >
      <Status
        value={session.isPresent ? "present" : "absent"}
        label={session.isPresent ? "Present" : "Absent"}
      />
    </div>
  ))}
</td>

                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {selectedAttendance && (
        <PresenceDialog
          open={openDialog}
          onOpenChange={setOpenDialog}
          mode="edit"
          defaultValues={{
            studentId: selectedAttendance.studentId,
            studentName: selectedAttendance.studentName,
            attendance: selectedAttendance.attendance,
          }}
          onConfirm={() => {
            // optional: trigger re-render / local state update
            setOpenDialog(false);
          }}
        />
      )}
    </>
  );
}
