import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import * as Popover from "@radix-ui/react-popover";
import { useState } from "react";

interface OptionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const OptionsButton: React.FC<OptionsProps> = ({ onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <span className="sr-only">Open options</span>
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </Popover.Trigger>
      <Popover.Content className="w-32 rounded-md border bg-popover p-2 text-popover-foreground shadow-md outline-none focus:shadow-outline">
        <Button
          variant="ghost"
          className="w-full justify-start rounded-md hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
          onClick={() => {
            onEdit();
            setOpen(false);
          }}
        >
          Edit
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start rounded-md hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
          onClick={() => {
            onDelete();
            setOpen(false);
          }}
        >
          Delete
        </Button>
      </Popover.Content>
    </Popover.Root>
  );
};

export default OptionsButton;
