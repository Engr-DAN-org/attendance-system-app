import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

interface DataTablePaginationProps {
  totalPages: number;
  currentPage: number;
  totalCount: number;
  onPageClick: (pageNumber: number) => void;
  itemLabel?: string;
}

export function CustomPaginator({
  totalPages,
  currentPage,
  totalCount,
  onPageClick,
  itemLabel = "Item/s",
}: DataTablePaginationProps) {
  return (
    <div
      className="flex items-center justify-between overflow-clip px-2"
      style={{ overflowClipMargin: 1 }}
    >
      {/* Selected rows */}
      <div className="hidden flex-1 text-sm text-muted-foreground sm:block">
        {totalCount} {itemLabel} found.
      </div>

      {/* Pagination controls */}
      <div className="flex items-center sm:space-x-6 lg:space-x-8">
        {/* Rows per page */}

        {/* Page info */}
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {currentPage} of {totalPages}
        </div>

        {/* Pagination buttons */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => onPageClick(1)}
            disabled={currentPage == 1}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageClick(currentPage - 1)}
            disabled={currentPage == 1}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageClick(currentPage + 1)}
            disabled={currentPage == totalPages}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => onPageClick(totalPages - 1)}
            disabled={currentPage == totalPages}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
