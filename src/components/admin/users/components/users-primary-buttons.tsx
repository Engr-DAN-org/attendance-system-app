import { IconMailPlus, IconUserPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useUserQueryContext } from "../context/users-context";

export function UsersPrimaryButtons() {
  const { setDialogOpen } = useUserQueryContext();
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        className="space-x-1"
        onClick={() => setDialogOpen("add-teacher")}
      >
        <span>Invite Teacher</span> <IconMailPlus size={18} />
      </Button>
      <Button
        className="space-x-1"
        onClick={() => setDialogOpen("add-student")}
      >
        <span>Invite Student</span> <IconUserPlus size={18} />
      </Button>
    </div>
  );
}
