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
import { useGroupStore } from "@/stores/groupStore";
import { useSessionStore } from "@/stores/sessionsStore";

interface SessionsDialogProps {
  mode: "add" | "edit";
  defaultValues?: {
    id?: number;
    type: number;
    dateSession: string;
    price: number;
    groupId: number;
  };
}

export default function SessionsDialog({ mode, defaultValues }: SessionsDialogProps) {
  const [open, setOpen] = useState(false);
  const { groups, fetchGroups } = useGroupStore();
  const { addSession, updateSession } = useSessionStore();

  const [form, setForm] = useState({
    type: 0,
    dateSession: "",
    price: "",
    groupId: "",
  });

  useEffect(() => {
    if (open && groups.length === 0) fetchGroups();
  }, [open, fetchGroups, groups.length]);

  useEffect(() => {
    if (defaultValues) {
      setForm({
        type: defaultValues.type,
        dateSession: defaultValues.dateSession.split("T")[0],
        price: defaultValues.price.toString(),
        groupId: defaultValues.groupId.toString(),
      });
    } else {
      setForm({
        type: 0,
        dateSession: "",
        price: "",
        groupId: "",
      });
    }
  }, [defaultValues, open]);

  const handleSubmit = async () => {
    if (!form.dateSession || !form.price || !form.groupId) return;

    const sessionData = {
      type: form.type,
      dateSession: new Date(form.dateSession).toISOString(),
      price: parseFloat(form.price),
      groupId: parseInt(form.groupId),
    };

    if (mode === "add") {
      await addSession(sessionData);
    } else if (defaultValues?.id) {
      await updateSession(defaultValues.id, sessionData);
    }

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
            <Label>Session Type</Label>
            <select
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: parseInt(e.target.value) })
              }
              className="border rounded-md w-full px-2 py-1 text-sm"
            >
              <option value={0}>Paid Session</option>
              <option value={1}>Free Session</option>
            </select>
          </div>

          <div>
            <Label>Session Date</Label>
            <Input
              type="date"
              value={form.dateSession}
              onChange={(e) =>
                setForm({ ...form, dateSession: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Price (DZD)</Label>
            <Input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="e.g. 1500"
              disabled={form.type === 1} // disable for free sessions
            />
          </div>

          <div>
            <Label>Group</Label>
            <select
              value={form.groupId}
              onChange={(e) => setForm({ ...form, groupId: e.target.value })}
              className="border rounded-md w-full px-2 py-1 text-sm"
            >
              <option value="">Select group</option>
              {groups.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
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
