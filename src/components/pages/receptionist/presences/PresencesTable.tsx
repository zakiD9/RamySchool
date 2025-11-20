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
import { useTeacherStore } from "@/stores/teachersStore";
import EditButton from "@/components/ui/editButton";
import PresencesListDialog from "./PresencesListDialog";
import { StudentResponse } from "@/services/studentsService";

type PresencesTableProps = {
  data: StudentResponse[];
};


export default function PresencesTable({ data }:PresencesTableProps) {
  const { fetchStudentSessionsForTeacher, studentSessions } = useTeacherStore();

  const [selectedStudent, setSelectedStudent] = useState<{
    id: number;
    name: string;
  } | null>(null);

  useEffect(() => {
    data.forEach((student:StudentResponse) => {
      fetchStudentSessionsForTeacher(student.id);
    });
  }, [data]);

  return (
    <>
      <div className="bg-white rounded-xl border shadow-sm p-4 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Group</TableHead>
              <TableHead className="text-center">Presences</TableHead>
              <TableHead className="text-end">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((student:StudentResponse) => {
              const sessions = studentSessions[student.id] || [];

              return (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.groupName}</TableCell>

                  <TableCell className="flex items-center justify-center">
                    <div className="flex gap-1">
                      {sessions.slice(-5).map((session) => (
                        <Status
                          key={session.sessionId}
                          value={session.isPresent ? "present" : "absent"}
                          label={session.isPresent ? "Present" : "Absent"}
                        />
                      ))}
                    </div>
                  </TableCell>

                  <TableCell>
                    <EditButton
                      onClick={() =>
                        setSelectedStudent({
                          id: student.id,
                          name: student.name,
                        })
                      }
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {selectedStudent && (
        <PresencesListDialog
          student={selectedStudent}
          open={!!selectedStudent}
          onOpenChange={() => setSelectedStudent(null)}
        />
      )}
    </>
  );
}
