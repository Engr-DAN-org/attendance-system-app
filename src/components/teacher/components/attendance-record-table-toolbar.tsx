import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AttendanceRecord } from "@/interfaces/types/attendanceRecord";
import { AttendanceRecordTableFacetedFilter } from "./attendance-record-table-filter";
import { AttendanceStatusOptions } from "@/enums/attendanceStatus";
import { DataTableViewOptions } from "@/components/admin/users/components/data-table-view-options";

interface DataTableToolbarProps {
  table: Table<AttendanceRecord>;
}

export function AtendanceRecordsTableToolbar({ table }: DataTableToolbarProps) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <Input
          placeholder="Filter students..."
          value={
            (table.getColumn("studentName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("studentName")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <div className="flex gap-x-2">
          {table.getColumn("status") && (
            <AttendanceRecordTableFacetedFilter
              column={table.getColumn("status")}
              title="Status"
              options={AttendanceStatusOptions}
            />
          )}
          {/* {table.getColumn("role") && (
            <AttendanceRecordTableFacetedFilter
              column={table.getColumn("role")}
              title="Role"
              options={UserRoleOptions}
            />
          )} */}
        </div>
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
