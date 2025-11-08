import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusIcon, Check, ChevronDown } from "lucide-react";
import EditButton from "@/components/ui/editButton";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import api from "@/lib/api";
import { usePresenceStore } from "@/stores/presencesStore";
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

interface Student {
  id: number;
  name: string;
}

interface PresenceDialogProps {
  mode: "add" | "edit";
  defaultValues?: {
    id: number;
    studentName: string;
    groupName: string;
    sessionDate: string;
    isPresent: boolean;
  };
}

export default function PresenceDialog({ mode, defaultValues }: PresenceDialogProps) {
  const [open, setOpen] = useState(false);
  const [studentPickerOpen, setStudentPickerOpen] = useState(false);
  const [sessionPickerOpen, setSessionPickerOpen] = useState(false);

  const [students, setStudents] = useState<Student[]>([]);
  const [sessions, setSessions] = useState<SessionResponse[]>([]);

  const { addPresence, updatePresence } = usePresenceStore();

  const [form, setForm] = useState({
    studentId: 0,
    sessionId: 0,
    isPresent: false,
  });

  useEffect(() => {
    if (open && mode === "add") {
      fetchStudents();
      fetchSessions();
    }

    if (defaultValues && mode === "edit") {
      setForm({
        studentId: 0,
        sessionId: 0,
        isPresent: defaultValues.isPresent,
      });
    }
  }, [open, mode, defaultValues]);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/Students");
      setStudents(res.data);
    } catch (err) {
      console.error("Failed to fetch students", err);
    }
  };

  const fetchSessions = async () => {
    try {
      const res = await api.get("/Sessions");
      setSessions(res.data);
    } catch (err) {
      console.error("Failed to fetch sessions", err);
    }
  };

  const handleSubmit = async () => {
    try {
      if (mode === "add") {
        if (!form.studentId || !form.sessionId) return;
        await addPresence(form);
      } else if (defaultValues) {
        await updatePresence(defaultValues.id, form);
      }
      setOpen(false);
    } catch (err) {
      console.error("Error saving presence:", err);
    }
  };

  const selectedStudentName =
    students.find((s) => s.id === form.studentId)?.name || "Select student";

  const selectedSessionLabel =
    sessions.find((s) => s.id === form.sessionId)
      ? `${sessions.find((s) => s.id === form.sessionId)?.dateSession} — ${
          sessions.find((s) => s.id === form.sessionId)?.groupName
        } (${sessions.find((s) => s.id === form.sessionId)?.teacherName})`
      : "Select session";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === "add" ? (
          <Button className="rounded-full" variant="secondary">
            Add New Presence <PlusIcon className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <EditButton />
        )}
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add New Presence" : "Edit Presence"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
          {mode === "add" ? (
            <>
              <div>
                <Label>Student</Label>
                <Popover open={studentPickerOpen} onOpenChange={setStudentPickerOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="justify-between w-full"
                    >
                      {selectedStudentName}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
                    <Command>
                      <CommandInput placeholder="Search student..." />
                      <CommandEmpty>No students found.</CommandEmpty>
                      <CommandGroup>
                        {students.map((student) => (
                          <CommandItem
                            key={student.id}
                            onSelect={() =>
                              setForm({ ...form, studentId: student.id })
                            }
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                form.studentId === student.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {student.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label>Session</Label>
                <Popover open={sessionPickerOpen} onOpenChange={setSessionPickerOpen}>
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
            </>
          ) : (
            // Edit mode: only toggle presence
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
          )}
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>
            {mode === "add" ? "Add Presence" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
