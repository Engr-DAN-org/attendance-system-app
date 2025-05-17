import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  RowData,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import { ClassSession } from "@/interfaces/types/classSession";
import { classSessionsColumn } from "./class-session-column";
import { useParams, useRouter } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    className: string;
  }
}

interface DataTableProps {
  data?: ClassSession[];
  isLoading?: boolean;
}

const ClassSessionsTable = ({ data, isLoading = false }: DataTableProps) => {
  const { scheduleId } = useParams({
    from: "/_authenticated/teacher/class-schedule/$scheduleId",
  });
  const { navigate } = useRouter();
  const table = useReactTable({
    data: data || [],
    columns: classSessionsColumn,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-4">
      {/* <DataTableToolbar table={table} /> */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="group/row">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={header.column.columnDef.meta?.className ?? ""}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="group/row"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      onClick={() => {
                        console.log(row.original);

                        if (!cell.id.includes("actions")) {
                          const { id } = row.original;

                          // navigate to the user details page
                          navigate({
                            to: "/teacher/class-schedule/$scheduleId/session/$sessionId",
                            params: { scheduleId, sessionId: id },
                          });
                        }
                      }}
                      key={cell.id}
                      className={cn(
                        "cursor-pointer",
                        cell.column.columnDef.meta?.className ?? ""
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={classSessionsColumn.length}
                  className="h-24 text-center"
                >
                  {isLoading ? (
                    <div className="flex justify-center items-center gap-2">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Loading Data</span>
                    </div>
                  ) : (
                    "No results."
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* <DataTablePagination table={table} /> */}
    </div>
  );
};

export default ClassSessionsTable;
