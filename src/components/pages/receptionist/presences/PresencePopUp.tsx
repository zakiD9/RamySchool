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
import { Checkbox } from "@/components/ui/checkbox";

interface PresenceDialogProps {
  mode: "add" | "edit";
  onSubmit: (presence: {
    studentName: string;
    groupName: string;
    sessionDate: string;
    present: boolean;
  }) => void;
  defaultValues?: {
    studentName: string;
    groupName: string;
    sessionDate: string;
    present: boolean;
  };
}

export default function PresenceDialog({
  mode,
  onSubmit,
  defaultValues,
}: PresenceDialogProps) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    studentName: "",
    groupName: "",
    sessionDate: "",
    present: false,
  });

  useEffect(() => {
    if (defaultValues) {
      setForm(defaultValues);
    } else {
      setForm({
        studentName: "",
        groupName: "",
        sessionDate: "",
        present: false,
      });
    }
  }, [defaultValues, open]);

  const handleSubmit = () => {
    if (!form.studentName || !form.groupName || !form.sessionDate) return;
    onSubmit(form);
    setOpen(false);
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

        <div className="flex flex-col gap-3 py-2">
          {mode === "add" ? (
            <>
              <div>
                <Label>Student Name</Label>
                <Input
                  value={form.studentName}
                  onChange={(e) =>
                    setForm({ ...form, studentName: e.target.value })
                  }
                  placeholder="e.g. Ahmed B."
                />
              </div>

              <div>
                <Label>Group Name</Label>
                <Input
                  value={form.groupName}
                  onChange={(e) =>
                    setForm({ ...form, groupName: e.target.value })
                  }
                  placeholder="e.g. Group A"
                />
              </div>

              <div>
                <Label>Session Date</Label>
                <Input
                  type="date"
                  value={form.sessionDate}
                  onChange={(e) =>
                    setForm({ ...form, sessionDate: e.target.value })
                  }
                />
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox
                id="presence"
                checked={form.present}
                onCheckedChange={(checked) =>
                  setForm({ ...form, present: !!checked })
                }
              />
              <Label htmlFor="presence">Present</Label>
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
