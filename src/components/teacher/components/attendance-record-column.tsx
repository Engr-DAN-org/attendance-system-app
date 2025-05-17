import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import LongText from "@/components/long-text";
// import { DataTableColumnHeader } from "./data-table-column-header";
// import { DataTableRowActions } from "./data-table-row-actions";
import { DataTableColumnHeader } from "@/components/admin/users/components/data-table-column-header";
import { formatUTCTime } from "@/utils/date-time-format.util";
import { Badge } from "@/components/ui/badge";
import { AttendanceRecord } from "@/interfaces/types/attendanceRecord";
import { attendanceStatusCallTypes } from "@/enums/attendanceStatus";
import AttendanceRecordActions from "./attendance-record-actions";

export const attendanceRecordColumn: ColumnDef<AttendanceRecord>[] = [
  {
    id: "idNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID Number" />
    ),
    cell: ({ row }) => {
      const { student } = row.original;
      return <div className="w-fit text-nowrap">{student.idNumber}</div>;
    },
    meta: { className: "w-36" },
    enableHiding: false,
    enableSorting: true,
  },
  {
    accessorKey: "studentName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Student Name" />
    ),
    cell: ({ row }) => {
      return (
        <LongText className="max-w-36 text-ellipsis">
          {row.getValue("studentName")}
        </LongText>
      );
    },
    enableHiding: false,
  },
  {
    id: "email",
    accessorFn: (row) => row.student.email,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      const { student } = row.original;
      return (
        <LongText className="max-w-36 text-ellipsis">{student.email}</LongText>
      );
    },
    enableHiding: true,
    enableSorting: false,
  },
  {
    id: "phoneNumber",
    accessorFn: (row) => row.student.phoneNumber,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone Number" />
    ),
    cell: ({ row }) => {
      const { student } = row.original;
      return (
        <LongText className="max-w-36 text-ellipsis">
          {student.phoneNumber || "N/A"}
        </LongText>
      );
    },
    enableSorting: false,
    enableHiding: true,
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
  {
    id: "actions",
    cell: AttendanceRecordActions,
  },
];
