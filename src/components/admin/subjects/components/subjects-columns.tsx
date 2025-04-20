import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import LongText from "@/components/long-text";
import { DataTableColumnHeader } from "../../users/components/data-table-column-header";
import { Subject } from "@/interfaces/types/subject";
import { DataTableRowActions } from "./data-table-row-actions";

export const subjectColumns: ColumnDef<Subject>[] = [
  {
    accessorKey: "code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Code" />
    ),
    cell: ({ row }) => <div className="max-w-36">{row.getValue("code")}</div>,
    meta: {
      className: cn(
        "drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none",
        "bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted",
        "sticky md:table-cell"
      ),
    },
    enableSorting: false,
  },
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return <div className="">{row.getValue("name")}</div>;
    },
    enableHiding: false,
    enableSorting: true,
  },
  {
    id: "description",
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return (
        <LongText className="max-w-36 truncate">
          {row.getValue("description")}
        </LongText>
      );
    },
  },
  {
    id: "subjectTeachers",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Teachers" />
    ),
    cell: ({ row }) => {
      const { subjectTeachers } = row.original;
      const count = subjectTeachers.length;
      return <div>{count}</div>;
    },
  },

  {
    id: "actions",
    cell: DataTableRowActions,
  },
];
