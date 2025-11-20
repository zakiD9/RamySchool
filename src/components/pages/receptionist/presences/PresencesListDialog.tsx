import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSessionStore } from "@/stores/sessionsStore";
import { useState, useEffect } from "react";
import { Status } from "@/components/ui/status";
import { Checkbox } from "@/components/ui/checkbox";
import { AttendanceResponse } from "@/services/sessionsService";
import EditButton from "@/components/ui/editButton";
import { Check, X } from "lucide-react";

type PresencesListDialogProps = {
  student: {
    id: number;
    name: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function PresencesListDialog({ student, open, onOpenChange }: PresencesListDialogProps) {
  const { getStudentSessions, updateAttendanceState } = useSessionStore();

  const [sessions, setSessions] = useState<AttendanceResponse[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<boolean>(false);

  useEffect(() => {
    if (open && student) {
      (async () => {
        const data = await getStudentSessions(student.id);
        setSessions(data);
      })();
    }
  }, [open, student]);

  const startEdit = (attendance: AttendanceResponse) => {
    setEditingId(attendance.attendanceId);
    setEditValue(attendance.isPresent);
  };

  const saveEdit = async (attendance: AttendanceResponse) => {
    await updateAttendanceState(attendance.attendanceId, editValue);

    setSessions((prev) =>
      prev.map((s) =>
        s.attendanceId === attendance.attendanceId
          ? { ...s, isPresent: editValue }
          : s
      )
    );

    setEditingId(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Presences of {student.name}</DialogTitle>
        </DialogHeader>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full border rounded-lg">
            <thead>
              <tr className="border-b bg-muted text-left">
                <th className="p-2">Session ID</th>
                <th className="p-2">Type</th>
                <th className="p-2 text-center">Presence</th>
                <th className="p-2 text-end">Actions</th>
              </tr>
            </thead>

            <tbody>
              {sessions.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center p-4 text-muted-foreground">
                    No presences found.
                  </td>
                </tr>
              )}

              {sessions.map((att) => (
                <tr key={att.attendanceId} className="border-b">
                  <td className="p-2">{att.sessionId}</td>

                  <td className="p-2">
                    {att.sessionType === 0 ? "Paid" : "Free"}
                  </td>

                  {/* Presence */}
                  <td className="p-2 flex justify-center">
                    {editingId === att.attendanceId ? (
                      <Checkbox
                        checked={editValue}
                        onCheckedChange={(val) => setEditValue(!!val)}
                      />
                    ) : (
                      <Status
                        value={att.isPresent ? "present" : "absent"}
                        label={att.isPresent ? "Present" : "Absent"}
                      />
                    )}
                  </td>

                  {/* Actions */}
                  <td className="p-2 text-center">
  {editingId === att.attendanceId ? (
    <div className="flex items-center justify-end gap-3">

      {/* Save icon */}
      <button
        onClick={() => saveEdit(att)}
        className="p-1 rounded-full hover:bg-green-100 transition"
      >
        <Check size={20} className="text-green-600" />
      </button>

      {/* Cancel icon */}
      <button
        onClick={() => setEditingId(null)}
        className="p-1 rounded-full hover:bg-red-100 transition"
      >
        <X size={20} className="text-red-600" />
      </button>
    </div>
  ) : (
    <div className="flex justify-end">
      <EditButton onClick={() => startEdit(att)} />
    </div>
  )}
</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
