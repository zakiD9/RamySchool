import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { ConfirmDialog } from "@/components/ui/confirmationDialog";
import { useSessionStore } from "@/stores/sessionsStore";
import type { AttendanceResponse } from "@/services/sessionsService";

interface PresenceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
  defaultValues: {
    studentId: number;
    studentName?: string;
    attendance?: AttendanceResponse;
  };
  onConfirm: () => void;
}

export default function PresenceDialog({
  open,
  onOpenChange,
  mode,
  defaultValues,
  onConfirm,
}: PresenceDialogProps) {
  const { updateAttendanceState } = useSessionStore();

  const [isPresent, setIsPresent] = useState(
    defaultValues.attendance?.isPresent || false
  );

  useEffect(() => {
    if (open) {
      setIsPresent(defaultValues.attendance?.isPresent || false);
    }
  }, [open, defaultValues]);

  const handleSubmit = async () => {
    if (!defaultValues.attendance) return;

    await updateAttendanceState(
      defaultValues.attendance.attendanceId,
      isPresent
    );
    onConfirm();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add New Presence" : "Edit Presence"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
          {/* Student display */}
          <div>
            <Label>Student</Label>
            <p className="border rounded-md p-2 bg-muted text-sm">
              {defaultValues.studentName || `ID: ${defaultValues.studentId}`}
            </p>
          </div>

          {/* Session display */}
          <div>
            <Label>Session</Label>
            <p className="border rounded-md p-2 bg-muted text-sm">
              {`Session ID: ${defaultValues.attendance?.sessionId}`}
            </p>
          </div>

          {/* Presence Checkbox */}
          <div className="flex items-center space-x-2 mt-2">
            <Checkbox
              id="isPresent"
              checked={isPresent}
              onCheckedChange={(checked) => setIsPresent(!!checked)}
            />
            <Label htmlFor="isPresent">Present</Label>
          </div>
        </div>

        <DialogFooter>
          <ConfirmDialog
            title={mode === "add" ? "Confirm New Presence" : "Confirm Changes"}
            description={
              mode === "add"
                ? "Are you sure you want to add this presence record?"
                : "Are you sure you want to save the changes to this record?"
            }
            confirmText={mode === "add" ? "Add Presence" : "Save Changes"}
            cancelText="Cancel"
            variant="green"
            triggerLabel={mode === "add" ? "Add Presence" : "Save Changes"}
            onConfirm={handleSubmit}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
