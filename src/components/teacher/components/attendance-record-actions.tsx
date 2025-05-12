import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AttendanceRecord } from "@/interfaces/types/attendanceRecord";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Row } from "@tanstack/react-table";
import { useClassSessionContext } from "../context/class-session-context";

interface DataTableRowActionsProps {
  row: Row<AttendanceRecord>;
}

const AttendanceRecordActions = ({ row }: DataTableRowActionsProps) => {
  const { setAttendanceRecord, setDialogState } = useClassSessionContext();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          onClick={() => {
            setAttendanceRecord(row.original);
            setDialogState("override");
          }}
        >
          Override
          <DropdownMenuShortcut>
            <IconEdit size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        {/* <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            // const section = row.original;
            // setTargetDeletion(section);
          }}
          className="!text-red-500"
        >
          Delete
          <DropdownMenuShortcut>
            <IconTrash size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AttendanceRecordActions;
