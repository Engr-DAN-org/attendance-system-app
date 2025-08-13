import { CourseDialog } from "./components/course-dialogs";
import { LoadingComponent } from "@/components/general-loader";
import { CourseCard } from "./components/course-card";
import { CustomPaginator } from "@/components/paginator";
import { Separator } from "@/components/ui/separator";
import { Main } from "@/components/layout/main";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  IconAdjustmentsHorizontal,
  IconSortAscendingLetters,
  IconSortDescendingLetters,
} from "@tabler/icons-react";
import { useCourseContext } from "@/components/admin/courses/context/course-context";
import { CoursesDeleteDialog } from "./components/course-delete-dialog";

export default function CourseManager() {
  const {
    query,
    setQuery,
    isAnyPendingRefetch,
    queryResponse,
    handlePageClick,
  } = useCourseContext();

  const isLoading = isAnyPendingRefetch();
  return (
    <>
      <Main fixed>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">List of Courses</h1>
          <p className="text-muted-foreground">
            Here’s a list of all the courses available in the system. You can
            filter the courses by name or sort them in ascending or descending
            order.
          </p>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="my-4 flex items-end gap-2 sm:my-0 sm:items-center">
            <div className="flex flex-col gap-4 sm:my-4 sm:flex-row">
              <Input
                placeholder="Search Courses..."
                className="h-9 w-40 lg:w-[250px]"
                value={query.name ?? ""}
                onChange={(e) => setQuery({ ...query, name: e.target.value })}
              />
            </div>

            <Select
              value={query.sort}
              onValueChange={(value) => {
                setQuery({ ...query, sort: value as "asc" | "desc" });
              }}
            >
              <SelectTrigger className="w-16">
                <SelectValue>
                  <IconAdjustmentsHorizontal size={18} />
                </SelectValue>
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="asc">
                  <div className="flex items-center gap-4">
                    <IconSortAscendingLetters size={16} />
                    <span>Ascending</span>
                  </div>
                </SelectItem>
                <SelectItem value="desc">
                  <div className="flex items-center gap-4">
                    <IconSortDescendingLetters size={16} />
                    <span>Descending</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <CourseDialog />
          <CoursesDeleteDialog />
        </div>
        <Separator className="shadow" />

        {/* Render course cards here */}
        {isLoading ? (
          <LoadingComponent fullScreen={false} />
        ) : (
          <ul className="faded-bottom no-scrollbar grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-3">
            {queryResponse?.data?.map((course) => {
              return <CourseCard key={course.id} course={course} />;
            })}
          </ul>
        )}

        {queryResponse && (
          <CustomPaginator
            currentPage={queryResponse.page}
            totalPages={queryResponse.totalPages}
            totalCount={queryResponse.totalCount}
            onPageClick={handlePageClick}
            itemLabel="Course(s)"
            key={"course-paginator"}
          />
        )}
      </Main>
    </>
  );
}
