import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { PlusIcon } from "lucide-react";
import EditButton from "@/components/ui/editButton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Status } from "@/components/ui/status";

interface StudentsDialogProps {
  mode: "add" | "edit";
  onSubmit: (student: {
    studentName: string;
    phoneNumber: string;
    groupName: string;
    teacherName: string;
    presences: number;
  }) => void;
  defaultValues?: {
    studentName: string;
    phoneNumber: string;
    groupName: string;
    teacherName: string;
    presences: boolean[];
  };
}

export default function StudentsDialog({
  mode,
  onSubmit,
  defaultValues,
}: StudentsDialogProps) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    studentName: "",
    phoneNumber: "",
    groupName: "",
    teacherName: "",
    presences: 0,
  });

  useEffect(() => {
    if (defaultValues) {
      setForm({
        studentName: defaultValues.studentName || "",
        phoneNumber: defaultValues.phoneNumber || "",
        groupName: defaultValues.groupName || "",
        teacherName: defaultValues.teacherName || "",
        presences: defaultValues.presences || 0,
      });
    } else {
      setForm({
        studentName: "",
        phoneNumber: "",
        groupName: "",
        teacherName: "",
        presences: 0,
      });
    }
  }, [defaultValues, open]);

  const handleSubmit = () => {
    if (!form.studentName || !form.phoneNumber || !form.groupName || !form.teacherName) return;

    const studentData = {
      studentName: form.studentName,
      phoneNumber: form.phoneNumber,
      groupName: form.groupName,
      teacherName: form.teacherName,
      presences: form.presences,
    };

    onSubmit(studentData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === "add" ? (
          <Button className="rounded-full" variant="secondary">
            Add New Student <PlusIcon className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <EditButton />
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add New Student" : "Edit Student"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 py-2">
          <div>
            <Label>Student Name</Label>
            <Input
              value={form.studentName}
              onChange={(e) => setForm({ ...form, studentName: e.target.value })}
              placeholder="e.g. Ahmed B."
            />
          </div>

          <div>
            <Label>Phone Number</Label>
            <Input
              value={form.phoneNumber}
              onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
              placeholder="e.g. 0551-123-456"
            />
          </div>

          <div>
            <Label>Group Name</Label>
            <Input
              value={form.groupName}
              onChange={(e) => setForm({ ...form, groupName: e.target.value })}
              placeholder="e.g. Group A"
            />
          </div>

          <div>
            <Label>Teacher Name</Label>
            <Input
              value={form.teacherName}
              onChange={(e) => setForm({ ...form, teacherName: e.target.value })}
              placeholder="e.g. Mr. Ali"
            />
          </div>

          <div>
            <Label>Presences</Label>
<div className="flex gap-1">
  {defaultValues?.presences?.map((p, i) => (
  <TooltipProvider>

    <Tooltip key={i}>
      <TooltipTrigger asChild>
        <Status value={p ? "success" : "error"} size="sm" label="" />
      </TooltipTrigger>
      <TooltipContent>{p ? "Present" : "Absent"}</TooltipContent>
    </Tooltip>
  </TooltipProvider>

  ))}
</div>

          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>
            {mode === "add" ? "Add Student" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
