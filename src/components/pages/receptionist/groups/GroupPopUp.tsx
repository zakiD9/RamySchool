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
import { useGroupStore } from "@/stores/groupStore";

interface Teacher {
  id: number;
  name: string;
}

interface Student {
  id: number;
  name: string;
}

interface GroupDialogProps {
  mode: "add" | "edit";
  defaultValues?: {
    id: number;
    groupName: string;
    teacherId: number;
    teacherName: string;
    students?: { id: number; name: string }[];
  };
  allTeachers?: Teacher[];
  allStudents?: Student[];
}

export default function GroupDialog({
  mode,
  defaultValues,
  allTeachers = [],
  allStudents = [],
}: GroupDialogProps) {
  const [open, setOpen] = useState(false);
  const [teacherPickerOpen, setTeacherPickerOpen] = useState(false);
  const [studentPickerOpen, setStudentPickerOpen] = useState(false);

  const { createGroup, editGroup } = useGroupStore();

  const [form, setForm] = useState({
    groupName: "",
    teacherId: 0,
    students: [] as number[],
  });

  useEffect(() => {
    if (defaultValues) {
      setForm({
        groupName: defaultValues.groupName || "",
        teacherId: defaultValues.teacherId || 0,
        students: defaultValues.students?.map((s) => s.id) || [],
      });
    } else {
      setForm({ groupName: "", teacherId: 0, students: [] });
    }
  }, [defaultValues, open]);

  const toggleStudent = (id: number) => {
    setForm((prev) => ({
      ...prev,
      students: prev.students.includes(id)
        ? prev.students.filter((s) => s !== id)
        : [...prev.students, id],
    }));
  };

  const handleSubmit = async () => {
    if (!form.groupName || !form.teacherId) return;

    if (mode === "add") {
      await createGroup(form.groupName, form.teacherId);
    } else if (mode === "edit" && defaultValues) {
      await editGroup(defaultValues.id, form.groupName, form.teacherId);
    }

    setOpen(false);
  };

  const selectedTeacherName =
    allTeachers.find((t) => t.id === form.teacherId)?.name || "Select teacher";

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
            <Label>Teacher</Label>
            <Popover open={teacherPickerOpen} onOpenChange={setTeacherPickerOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" className="justify-between">
                  {selectedTeacherName}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0">
                <Command>
                  <CommandInput placeholder="Search teacher..." />
                  <CommandEmpty>No teachers found.</CommandEmpty>
                  <CommandGroup>
                    {allTeachers.map((teacher) => (
                      <CommandItem
                        key={teacher.id}
                        onSelect={() =>
                          setForm({ ...form, teacherId: teacher.id })
                        }
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            form.teacherId === teacher.id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {teacher.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {mode === "add" && (
            <div className="flex flex-col gap-2">
              <Label>Students</Label>
              <Popover
                open={studentPickerOpen}
                onOpenChange={setStudentPickerOpen}
              >
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-between">
                    Select Students
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
                          key={student.id}
                          onSelect={() => toggleStudent(student.id)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              form.students.includes(student.id)
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

              {form.students.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {form.students.map((id) => {
                    const student = allStudents.find((s) => s.id === id);
                    return (
                      <span
                        key={id}
                        className="px-2 py-1 bg-gray-100 text-sm rounded-md border"
                      >
                        {student?.name}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          )}
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
