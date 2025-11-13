import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import api from "@/lib/api";
import type { SessionResponse } from "@/types/SessionResponse";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { ConfirmDialog } from "@/components/ui/confirmationDialog";

interface PresenceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
  defaultValues: {
    studentId: number;
    studentName?: string;
    groupId?: number;
    sessionId?: number;
    isPresent?: boolean;
  };
  onConfirm: (data: any) => Promise<void>;
}

export default function PresenceDialog({
  open,
  onOpenChange,
  mode,
  defaultValues,
  onConfirm,
}: PresenceDialogProps) {
  const [sessions, setSessions] = useState<SessionResponse[]>([]);
  const [sessionPickerOpen, setSessionPickerOpen] = useState(false);


  const [form, setForm] = useState({
    studentId: defaultValues.studentId,
    sessionId: defaultValues.sessionId || 0,
    isPresent: defaultValues.isPresent || false,
  });

  useEffect(() => {
    if (open) {
      fetchSessions();
      setForm({
        studentId: defaultValues.studentId,
        sessionId: defaultValues.sessionId || 0,
        isPresent: defaultValues.isPresent || false,
      });
    }
  }, [open, defaultValues]);

  const fetchSessions = async () => {
    try {
      const res = await api.get("/Sessions");
      setSessions(res.data);
    } catch (err) {
      console.error("Failed to fetch sessions", err);
    }
  };

  const selectedSessionLabel =
    sessions.find((s) => s.id === form.sessionId)
      ? `${sessions.find((s) => s.id === form.sessionId)?.dateSession} — ${
          sessions.find((s) => s.id === form.sessionId)?.groupName
        } (${sessions.find((s) => s.id === form.sessionId)?.teacherName})`
      : "Select session";

  const handleSubmit = async () => {
    await onConfirm(form);
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
          {/* Student display only (preselected) */}
          <div>
            <Label>Student</Label>
            <p className="border rounded-md p-2 bg-muted text-sm">
              {defaultValues.studentName || `ID: ${defaultValues.studentId}`}
            </p>
          </div>

          {/* Session Picker */}
          <div>
            <Label>Session</Label>
            <Popover
              open={sessionPickerOpen}
              onOpenChange={setSessionPickerOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="justify-between w-full"
                >
                  {selectedSessionLabel}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[350px] p-0">
                <Command>
                  <CommandInput placeholder="Search session (group, teacher, date)..." />
                  <CommandEmpty>No sessions found.</CommandEmpty>
                  <CommandGroup>
                    {sessions.map((session) => (
                      <CommandItem
                        key={session.id}
                        onSelect={() =>
                          setForm({ ...form, sessionId: session.id })
                        }
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            form.sessionId === session.id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {`${session.dateSession} — ${session.groupName} (${session.teacherName})`}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Presence Checkbox */}
          <div className="flex items-center space-x-2 mt-2">
            <Checkbox
              id="isPresent"
              checked={form.isPresent}
              onCheckedChange={(checked) =>
                setForm({ ...form, isPresent: !!checked })
              }
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
