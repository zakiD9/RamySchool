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

interface TeachersDialogProps {
  mode: "add" | "edit";
  onSubmit: (teacher: {
    teacherName: string;
    salary: number;
    percentage: number;
    groups: string[];
  }) => void;
  defaultValues?: {
    teacherName: string;
    salary: number;
    percentage: number;
    groups: string[];
  };
}

export default function TeachersDialog({
  mode,
  onSubmit,
  defaultValues,
}: TeachersDialogProps) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    teacherName: "",
    salary: "",
    percentage: "",
    groups: [] as string[],
  });

  useEffect(() => {
    if (defaultValues) {
      setForm({
        teacherName: defaultValues.teacherName || "",
        salary: defaultValues.salary?.toString() || "",
        percentage: defaultValues.percentage?.toString() || "",
        groups: defaultValues.groups || [],
      });
    } else {
      setForm({
        teacherName: "",
        salary: "",
        percentage: "",
        groups: [],
      });
    }
  }, [defaultValues, open]);

  const handleSubmit = () => {
    if (!form.teacherName || !form.salary || !form.percentage) return;

    const teacherData = {
      teacherName: form.teacherName,
      salary: parseFloat(form.salary),
      percentage: parseFloat(form.percentage),
      groups: form.groups,
    };

    onSubmit(teacherData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === "add" ? (
          <Button className="rounded-full" variant="secondary">
            Add New Teacher <PlusIcon className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <EditButton />
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add New Teacher" : "Edit Teacher"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 py-2">
          <div>
            <Label>Teacher Name</Label>
            <Input
              value={form.teacherName}
              onChange={(e) => setForm({ ...form, teacherName: e.target.value })}
              placeholder="e.g. Mr. Ali"
            />
          </div>

          <div>
            <Label>Salary (DZD)</Label>
            <Input
              type="number"
              value={form.salary}
              onChange={(e) => setForm({ ...form, salary: e.target.value })}
              placeholder="e.g. 85000"
            />
          </div>

          <div>
            <Label>Percentage (%)</Label>
            <Input
              type="number"
              value={form.percentage}
              onChange={(e) => setForm({ ...form, percentage: e.target.value })}
              placeholder="e.g. 40"
            />
          </div>

          <div>
            <Label>Groups</Label>
            <Input
              value={form.groups.join(", ")}
              disabled
              placeholder="Groups are assigned automatically"
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>
            {mode === "add" ? "Add Teacher" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
