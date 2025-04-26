import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
// import { Badge } from "@/components/ui/badge";
// import { Checkbox } from "@/components/ui/checkbox";
import LongText from "@/components/long-text";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Section } from "@/interfaces/types/section";

export const sectionsColumn: ColumnDef<Section>[] = [
  {
    id: "course",
    accessorKey: "courseId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Course" />
    ),
    cell: ({ row }) => {
      const { course } = row.original;
      return <div className="max-w-36">{course?.code}</div>;
    },
    meta: {
      className: cn(
        "drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none",
        "bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted",
        "sticky left-0 md:table-cell"
      ),
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "yearLevel",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Year Level" />
    ),
    cell: ({ row }) => {
      return (
        <LongText className="max-w-36">{row.getValue("yearLevel")}</LongText>
      );
    },
    meta: { className: "w-36" },
  },
  {
    id: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const { name } = row.original;
      return <LongText className="max-w-36">{name}</LongText>;
    },
    meta: { className: "w-36" },
  },
  {
    id: "teacher",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Teacher" />
    ),
    cell: ({ row }) => {
      const { teacher } = row.original;
      <div className="w-fit text-nowrap">
        {teacher ? `${teacher.firstName} ${teacher.lastName}` : ""}
      </div>;
    },
  },
  {
    id: "students",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Student Headcount" />
    ),
    cell: ({ row }) => {
      const { students } = row.original;
      return <div>{students ? students.length : 0}</div>;
    },
    enableSorting: false,
  },
  {
    id: "actions",
    cell: DataTableRowActions,
  },
];
