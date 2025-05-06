import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import LongText from "@/components/long-text";
// import { DataTableColumnHeader } from "./data-table-column-header";
// import { DataTableRowActions } from "./data-table-row-actions";
import { User } from "@/interfaces/types/user";
import { DataTableColumnHeader } from "@/components/admin/users/components/data-table-column-header";
import { attendanceStatusCallTypes } from "@/enums/attendanceStatus";

export const studentsColumn: ColumnDef<User>[] = [
  {
    accessorKey: "idNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID Number" />
    ),
    cell: ({ row }) => (
      <LongText className="max-w-36">{row.getValue("idNumber")}</LongText>
    ),
    meta: {
      className: cn(
        "drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none",
        "bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted",
        "sticky left-0 md:table-cell"
      ),
    },
    enableHiding: true,
    enableSorting: false,
  },
  {
    id: "fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const { fullName } = row.original;
      return <LongText className="max-w-36">{fullName}</LongText>;
    },
    meta: { className: "w-36" },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className="w-fit text-nowrap">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone Number" />
    ),
    cell: ({ row }) => <div>{row.getValue("phoneNumber")}</div>,
    enableSorting: false,
  },
  // {
  //   accessorKey: "status",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Status" />
  //   ),
  //   cell: ({ row }) => {
  //     const { status } = row.original;
  //     const badgeColor = statusCallTypes.get(status);
  //     return (
  //       <div className="flex space-x-2">
  //         <Badge variant="outline" className={cn("capitalize", badgeColor)}>
  //           {row.getValue("status")}
  //         </Badge>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  //   enableHiding: false,
  //   enableSorting: false,
  // },
];

export const attendanceColumn: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    meta: {
      className: cn(
        "sticky md:table-cell left-0 z-10 rounded-tl",
        "bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted"
      ),
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "idNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID Number" />
    ),
    cell: ({ row }) => (
      <LongText className="max-w-36">{row.getValue("idNumber")}</LongText>
    ),
    meta: {
      className: cn(
        "drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none",
        "bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted",
        "sticky left-6 md:table-cell"
      ),
    },
    enableHiding: true,
    enableSorting: false,
  },
  {
    id: "fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const { fullName } = row.original;
      return <LongText className="max-w-36">{fullName}</LongText>;
    },
    meta: { className: "w-36" },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className="w-fit text-nowrap">{row.getValue("email")}</div>
    ),
  },

  {
    accessorKey: "attendance_status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Attendance Status" />
    ),
    cell: ({ row }) => {
      const { status } = row.original;
      const attendance_status: string = row.getValue("attendance_status");
      const badgeColor = attendanceStatusCallTypes.get(status);
      return (
        <div className="flex space-x-2">
          {attendance_status.trim() ? (
            <Badge variant="outline" className={cn("capitalize", badgeColor)}>
              {attendance_status}
            </Badge>
          ) : (
            "--"
          )}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableHiding: false,
    enableSorting: false,
  },

  // {
  //   id: "actions",
  //   cell: DataTableRowActions,
  // },
];
