import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { DataTableColumnHeader } from "@/components/admin/users/components/data-table-column-header";
import { formatDate, formatUTCTime } from "@/utils/date-time-format.util";
import { Badge } from "@/components/ui/badge";
import { AttendanceRecord } from "@/interfaces/types/attendanceRecord";
import { attendanceStatusCallTypes } from "@/enums/attendanceStatus";
import LongText from "@/components/long-text";

export const attendanceRecordColumn: ColumnDef<AttendanceRecord>[] = [
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const { createdAt } = row.original;
      return (
        <LongText className="w-fit text-nowrap sticky left-0 right-0 bg-background z-10">
          {createdAt?.trim() ? formatDate(createdAt) : "--"}
        </LongText>
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
      return <div className="text-nowrap">{time}</div>;
    },
    enableHiding: true,
    enableSorting: false,
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => {
      const { classSession } = row.original;
      return (
        <LongText>
          {classSession?.isRemote ? "Remote" : row.getValue("location")}
        </LongText>
      );
    },
    enableHiding: true,
    enableSorting: false,
  },
  {
    accessorKey: "distance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Distance" />
    ),
    cell: ({ row }) => {
      const { distance } = row.original;
      if (!distance) return <div>--</div>;
      return <div>{row.getValue("distance")}</div>;
    },
    enableHiding: true,
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
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
