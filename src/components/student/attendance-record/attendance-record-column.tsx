import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { DataTableColumnHeader } from "@/components/admin/users/components/data-table-column-header";
import { formatDate, formatUTCTime } from "@/utils/date-time-format.util";
import { Badge } from "@/components/ui/badge";
import { AttendanceRecord } from "@/interfaces/types/attendanceRecord";
import { attendanceStatusCallTypes } from "@/enums/attendanceStatus";

export const attendanceRecordColumn: ColumnDef<AttendanceRecord>[] = [
  {
    id: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const { createdAt } = row.original;
      return (
        <div className="w-fit text-nowrap">
          {createdAt?.trim() ? formatDate(createdAt) : "--"}
        </div>
      );
    },
    meta: { className: "w-36" },
    enableHiding: false,
    enableSorting: true,
  },

  {
    accessorKey: "clockInRecord",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time In" />
    ),
    cell: ({ row }) => {
      const { clockInRecord } = row.original;
      const time = clockInRecord?.trim() ? formatUTCTime(clockInRecord) : "--";
      return <div>{time}</div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Attendance Status" />
    ),
    cell: ({ row }) => {
      const { status } = row.original;
      const badgeColor = attendanceStatusCallTypes.get(status);
      return (
        <div className="flex space-x-2">
          <Badge variant="outline" className={cn("capitalize", badgeColor)}>
            {row.getValue("status")}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableHiding: false,
    enableSorting: false,
  },
];
