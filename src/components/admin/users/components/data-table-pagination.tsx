import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  withRowSelection?: boolean;
  currentPage?: number;
  totalPages?: number;
  totalCount?: number;
  onPageClick?: (pageNumber: number) => void;
  itemLabel?: string;
}

export function DataTablePagination<TData>({
  table,
  withRowSelection = true,
  currentPage,
  totalPages,
  totalCount,
  onPageClick,
  itemLabel = "row(s)",
}: DataTablePaginationProps<TData>) {
  const isServerPaginated = Boolean(onPageClick);
  const page = currentPage ?? table.getState().pagination.pageIndex + 1;
  const pageCount = totalPages ?? table.getPageCount();
  const canPreviousPage = isServerPaginated
    ? page > 1
    : table.getCanPreviousPage();
  const canNextPage = isServerPaginated
    ? page < pageCount
    : table.getCanNextPage();

  const goToPage = (pageNumber: number) => {
    if (onPageClick) {
      onPageClick(pageNumber);
      return;
    }

    table.setPageIndex(pageNumber - 1);
  };

  return (
    <div
      className="flex items-center justify-between overflow-clip px-2"
      style={{ overflowClipMargin: 1 }}
    >
      <div className="hidden flex-1 text-sm text-muted-foreground sm:block">
        {totalCount != null ? (
          <>
            {totalCount} {itemLabel} found.
          </>
        ) : (
          withRowSelection && (
            <>
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </>
          )
        )}
      </div>
      <div className="flex items-center sm:space-x-6 lg:space-x-8">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {page} of {pageCount}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => goToPage(1)}
            disabled={!canPreviousPage}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => goToPage(page - 1)}
            disabled={!canPreviousPage}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => goToPage(page + 1)}
            disabled={!canNextPage}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => goToPage(pageCount)}
            disabled={!canNextPage}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
