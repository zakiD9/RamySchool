import React, { useState } from "react";
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
import { usePresenceStore } from "@/stores/presencesStore";
import { Checkbox } from "@/components/ui/checkbox";
import { StudentResponse } from "@/services/studentsService";

interface PresencesTableProps {
  data: StudentResponse[];
}

export default function PresencesTable({ data }: PresencesTableProps) {
  
  const { addPresence,removePresence } = usePresenceStore();
  const [selectedStudent, setSelectedStudent] = useState<StudentResponse | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDelete = async (id: number) => {
    await removePresence(id);
  };


  const handleCheckboxClick = (student: StudentResponse) => {
    setSelectedStudent(student);
    setOpenDialog(true);
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm p-4 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Group</TableHead>
            <TableHead className="text-center">Presences</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">{student.name}</TableCell>
              <TableCell>{student.groupName}</TableCell>

              <TableCell className="flex items-center justify-center gap-1">
                {[0, 1, 2, 3].map((index) => {
                  const presence = student.presences[index];
                  if (presence) {
                    return (
                      <Status
                        key={index}
                        value={presence.isPresent ? "present" : "absent"}
                        label={presence.isPresent ? "Present" : "Absent"}
                      />
                    );
                  } else {
                    return (
                      <Checkbox
                        key={index}
                        onCheckedChange={() => handleCheckboxClick(student)}
                      />
                    );
                  }
                })}
              </TableCell>

              <TableCell className="flex justify-end gap-1">
                {selectedStudent && (
  <PresenceDialog
    open={openDialog}
    onOpenChange={setOpenDialog}
    mode="add"
    defaultValues={{
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
    }}
    onConfirm={async (formData) => {
      // call the addPresence function from the store
      try {
        await addPresence(formData); // this should send POST request
        setOpenDialog(false); // close dialog after success
      } catch (err) {
        console.error("Failed to add presence", err);
      }
    }}
  />
)}

                <DeleteButton onConfirm={() => handleDelete(student.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
