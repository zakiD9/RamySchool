import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import EditButton from "@/components/ui/editButton";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePresenceStore } from "@/stores/presencesStore";
import api from "@/lib/api";

interface Student {
  id: number;
  name: string;
}

interface Session {
  id: number;
  date: string;
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
  const [students, setStudents] = useState<Student[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
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

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add New Presence" : "Edit Presence"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
          {mode === "add" ? (
            <>
              
              <div className="flex flex-col gap-1">
                <Label>Student</Label>
                <Select
                  value={form.studentId ? String(form.studentId) : ""}
                  onValueChange={(value) =>
                    setForm({ ...form, studentId: Number(value) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem key={student.id} value={String(student.id)}>
                        {student.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              
              <div className="flex flex-col gap-1">
                <Label>Session</Label>
                <Select
                  value={form.sessionId ? String(form.sessionId) : ""}
                  onValueChange={(value) =>
                    setForm({ ...form, sessionId: Number(value) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a session" />
                  </SelectTrigger>
                  <SelectContent>
                    {sessions.map((session) => (
                      <SelectItem key={session.id} value={String(session.id)}>
                        {session.date}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              
              <div className="flex items-center space-x-2">
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
