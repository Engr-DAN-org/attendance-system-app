import { Button } from "@/components/ui/button";
import { IconCheck } from "@tabler/icons-react";
import { PenIcon } from "lucide-react";
import { useSectionContext } from "../context/section-context";
import { AddScheduleDialog } from "./add-schedule-dialog";

const SectionsPrimaryButtons = () => {
  const { isEdit, setIsEdit } = useSectionContext();
  return (
    <>
      {isEdit ? (
        <div className="flex gap-2">
          <AddScheduleDialog />

          <Button onClick={() => setIsEdit(false)} variant={"outline"}>
            <IconCheck /> Done
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          className="mr-2"
          onClick={() => setIsEdit(true)}
        >
          <PenIcon /> Edit Schedule
        </Button>
      )}
    </>
  );
};

export default SectionsPrimaryButtons;
