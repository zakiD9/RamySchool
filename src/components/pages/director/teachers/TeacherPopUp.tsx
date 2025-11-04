import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import ViewButton from "@/components/ui/viewButton";

interface TeacherViewDialogProps {
  teacher: {
    id: number;
    teacherName: string;
    salary: number;
    percentage: number;
  };
}

export default function TeacherViewDialog({ teacher }: TeacherViewDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ViewButton onClick={() => setOpen(true)} />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Teacher Details</DialogTitle>
          <DialogDescription>
            Here you can view information about this teacher.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 text-sm py-2">
          <div className="flex justify-between">
            <span className="font-semibold">ID:</span>
            <span>{teacher.id}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Name:</span>
            <span>{teacher.teacherName}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Salary:</span>
            <span>{teacher.salary.toLocaleString("en-DZ")} DZD</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Percentage:</span>
            <span>{teacher.percentage}%</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
