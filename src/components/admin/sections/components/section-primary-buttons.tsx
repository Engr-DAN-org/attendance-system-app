import { IconPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

export function SectionPrimaryButtons() {
  const navigate = useNavigate();
  return (
    <div className="flex gap-2">
      <Button
        variant="default"
        className="space-x-1"
        onClick={() => navigate({ to: "/admin/sections/create" })}
      >
        <span>Create</span> <IconPlus size={18} />
      </Button>
    </div>
  );
}
