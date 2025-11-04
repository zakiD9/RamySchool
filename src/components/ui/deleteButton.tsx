import * as React from "react";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

export default function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <Button 
      variant="destructive"
      size="icon" 
      onClick={onClick} 
      className="flex items-center rounded-full gap-1"
    >
      <TrashIcon className="w-5 h-5" />
    </Button>
  );
}
