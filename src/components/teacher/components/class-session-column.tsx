import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import LongText from "@/components/long-text";
// import { DataTableColumnHeader } from "./data-table-column-header";
// import { DataTableRowActions } from "./data-table-row-actions";
import { DataTableColumnHeader } from "@/components/admin/users/components/data-table-column-header";
import { ClassSession } from "@/interfaces/types/classSession";
import { formatDate, formatUTCTime } from "@/utils/date-time-format.util";
import { Badge } from "@/components/ui/badge";
import { classSessionStatusCallTypes } from "@/enums/classSessionStatus";

export const classSessionsColumn: ColumnDef<ClassSession>[] = [
  {
    id: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const { createdAt } = row.original;
      return <LongText className="max-w-36">{formatDate(createdAt)}</LongText>;
    },
    meta: { className: "w-36" },
  },
  {
    id: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => {
      const { location } = row.original;
      return <LongText className="max-w-36">{location}</LongText>;
    },
    meta: { className: "w-36" },
  },
  {
    accessorKey: "startTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Time" />
    ),
    cell: ({ row }) => {
      const { startTime } = row.original;
      const time = startTime ? formatUTCTime(startTime) : "--";
      return <div className="w-fit text-nowrap">{time}</div>;
    },
  },
  {
    accessorKey: "endTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End Time" />
    ),
    cell: ({ row }) => {
      const { endTime } = row.original;
      const time = endTime ? formatUTCTime(endTime) : "--";
      return <div>{time}</div>;
    },
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const { status } = row.original;
      const badgeColor = classSessionStatusCallTypes.get(status);
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
