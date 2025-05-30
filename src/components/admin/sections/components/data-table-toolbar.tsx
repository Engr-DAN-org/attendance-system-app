import { Input } from "@/components/ui/input";
// import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps {
  placeholder?: string;
  columnId?: string;
  searchValue?: string | number;
  onSearchChange?: (value: string) => void;
}

export function DataTableToolbar({
  placeholder = "Filter...",
  searchValue,
  onSearchChange = () => {},
}: DataTableToolbarProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <Input
          placeholder={placeholder}
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <div className="flex gap-x-2">
          {/* {table.getColumn("status") && (
            <DataTableFacetedFilter
              column={table.getColumn("status")}
              title="Status"
              options={UserStatusOptions}
            />
          )}
          {table.getColumn("role") && (
            <DataTableFacetedFilter
              column={table.getColumn("role")}
              title="Role"
              options={UserRoleOptions}
            />
          )} */}
        </div>
        {/* {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )} */}
      </div>
      {/* <DataTableViewOptions table={table} /> */}
    </div>
  );
}
