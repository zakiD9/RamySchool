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
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Check, ChevronDown, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import EditButton from "@/components/ui/editButton";

interface GroupDialogProps {
  mode: "add" | "edit";
  onSubmit?: (group: {
    groupName: string;
    teacherName: string;
    students: string[];
  }) => void;
  defaultValues?: {
    groupName: string;
    teacherName: string;
    students: string[];
  };
  allStudents?: string[]; // pass all available students here
}

export default function GroupDialog({
  mode,
  onSubmit,
  defaultValues,
  allStudents = [],
}: GroupDialogProps) {
  const [open, setOpen] = useState(false);
  const [studentPickerOpen, setStudentPickerOpen] = useState(false);
  const [form, setForm] = useState({
    groupName: "",
    teacherName: "",
    students: [] as string[],
  });

  useEffect(() => {
    if (defaultValues) {
      setForm({
        groupName: defaultValues.groupName || "",
        teacherName: defaultValues.teacherName || "",
        students: defaultValues.students || [],
      });
    } else {
      setForm({ groupName: "", teacherName: "", students: [] });
    }
  }, [defaultValues, open]);

  const toggleStudent = (student: string) => {
    setForm((prev) => ({
      ...prev,
      students: prev.students.includes(student)
        ? prev.students.filter((s) => s !== student)
        : [...prev.students, student],
    }));
  };

  const handleSubmit = () => {
    if (!form.groupName || !form.teacherName) return;
    onSubmit?.({
      groupName: form.groupName,
      teacherName: form.teacherName,
      students: form.students,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === "add" ? (
          <Button className="rounded-full" variant="secondary">
            Add New Group <PlusIcon className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <EditButton />
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add New Group" : "Edit Group"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 py-2">
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
              onChange={(e) =>
                setForm({ ...form, teacherName: e.target.value })
              }
              placeholder="e.g. Mr. Karim"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Students</Label>
            <Popover open={studentPickerOpen} onOpenChange={setStudentPickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="justify-between"
                >
                  {form.students.length > 0
                    ? `${form.students.length} selected`
                    : "Select students"}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0">
                <Command>
                  <CommandInput placeholder="Search student..." />
                  <CommandEmpty>No students found.</CommandEmpty>
                  <CommandGroup>
                    {allStudents.map((student) => (
                      <CommandItem
                        key={student}
                        onSelect={() => toggleStudent(student)}
                        className="cursor-pointer"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            form.students.includes(student)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {student}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>

            {/* Display selected students inline */}
            {form.students.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {form.students.map((student) => (
                  <span
                    key={student}
                    className="px-2 py-1 bg-gray-100 text-sm rounded-md border"
                  >
                    {student}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>
            {mode === "add" ? "Add Group" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
