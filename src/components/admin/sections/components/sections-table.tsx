import {
  ColumnDef,
  RowData,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Section } from "@/interfaces/types/section";
import { CustomPaginator } from "@/components/paginator";
import { DataTableToolbar } from "./data-table-toolbar";
import { useRouter } from "@tanstack/react-router";
import { useSectionContext } from "../context/section-context";
import { LoadingComponent } from "@/components/general-loader";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    className: string;
  }
}

interface DataTableProps {
  columns: ColumnDef<Section>[];
}

export function SectionsTable({ columns }: DataTableProps) {
  const { response, query, isQueryPending, handlePageClick } =
    useSectionContext();

  const table = useReactTable({
    data: response?.data as Section[],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { navigate } = useRouter();

  return (
    <div className="space-y-4">
      {isQueryPending ? (
        <LoadingComponent />
      ) : (
        <>
          <DataTableToolbar searchValue={query.courseCode} />
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
                          className={
                            header.column.columnDef.meta?.className ?? ""
                          }
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
                            if (cell.id != "actions" && row.original.id)
                              navigate({
                                to: "/admin/sections/target/$id",
                                params: { id: row.original.id.toString() },
                              });
                          }}
                          key={cell.id}
                          className={
                            cell.column.columnDef.meta?.className ?? ""
                          }
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
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <CustomPaginator
            currentPage={response?.page || 1}
            onPageClick={(page) => handlePageClick(page)}
            totalCount={response?.totalCount || 0}
            totalPages={response?.totalPages || 1}
            itemLabel="Section(s)"
          />
        </>
      )}
    </div>
  );
}
