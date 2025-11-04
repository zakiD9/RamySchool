import * as React from "react";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";

export default function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={onClick} 
      className="flex items-center rounded-full gap-1"
    >
      <EditIcon className="w-5 h-5" />
    </Button>
  );
}
