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

interface SessionsDialogProps {
  mode: "add" | "edit";
  onSubmit: (session: {
    date: string;
    price: number;
    groupName: string;
    teacherName: string;
  }) => void;
  defaultValues?: {
    date: string;
    price: number;
    groupName: string;
    teacherName: string;
  };
}

export default function SessionsDialog({
  mode,
  onSubmit,
  defaultValues,
}: SessionsDialogProps) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    date: "",
    price: "",
    groupName: "",
    teacherName: "",
  });

  useEffect(() => {
    if (defaultValues) {
      setForm({
        date: defaultValues.date || "",
        price: defaultValues.price.toString() || "",
        groupName: defaultValues.groupName || "",
        teacherName: defaultValues.teacherName || "",
      });
    } else {
      setForm({
        date: "",
        price: "",
        groupName: "",
        teacherName: "",
      });
    }
  }, [defaultValues, open]);

  const handleSubmit = () => {
    if (!form.date || !form.price || !form.groupName || !form.teacherName)
      return;

    const sessionData = {
      date: form.date,
      price: parseFloat(form.price),
      groupName: form.groupName,
      teacherName: form.teacherName,
    };

    onSubmit(sessionData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === "add" ? (
          <Button className="rounded-full" variant="secondary">
            Add New Session <PlusIcon className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <EditButton />
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add New Session" : "Edit Session"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 py-2">
          <div>
            <Label>Session Date</Label>
            <Input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>

          <div>
            <Label>Price (DZD)</Label>
            <Input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="e.g. 1500"
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
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>
            {mode === "add" ? "Add Session" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
