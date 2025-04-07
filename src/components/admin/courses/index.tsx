import { useState } from "react";
import { Course, CourseForm } from "@/interfaces/types/course";
import { CourseDialog } from "./components/course-dialogs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CourseQueryOption } from "@/config/useOptions/courseOption";
import { CourseQuery } from "@/interfaces/queryParams/courseQuery";
import { LoadingComponent } from "@/components/general-loader";
import { CourseCard } from "./components/course-card";
import { CustomPaginator } from "@/components/paginator";
import {
  createAsync,
  deleteAsync,
  updateAsync,
} from "@/services/course.service";
import { toast } from "sonner";

const initialQuery: CourseQuery = {
  code: null,
  name: null,
  years: null,
  page: 1,
};

export default function CourseManager() {
  const queryClient = useQueryClient();
  const [query, setQuery] = useState<CourseQuery>(initialQuery);
  const {
    data: response,
    isLoading,
    isPending,
    refetch: refetchCourses,
  } = useQuery(CourseQueryOption(query));

  const { mutateAsync: handleDelete, isPending: isDeletePending } = useMutation(
    {
      mutationFn: async (courseId: number) => await deleteAsync(courseId),
      onSuccess: () => {
        toast.success("Course has been deleted successfully!");
        refetchCourses();
      },
    }
  );

  const { mutateAsync: submitForm } = useMutation({
    mutationFn: async (courseData: CourseForm) =>
      courseData.id
        ? await updateAsync(courseData)
        : await createAsync(courseData),
    onSuccess: () => {
      toast.success("Course has been created successfully!");
      refetchCourses();
    },
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editCourse, setEditCourse] = useState<Course | undefined>(undefined);

  const handleEdit = (course: Course) => {
    setEditCourse(course);
    setDialogOpen(true);
  };

  const handlePageClick = (page: number) => {
    setQuery((prev) => ({
      ...prev,
      page: page,
    }));
    queryClient.invalidateQueries({ queryKey: ["courses", { query }] });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Courses</h2>
        <CourseDialog
          submitForm={submitForm}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          course={editCourse}
          setEditCourse={setEditCourse}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading || isPending || isDeletePending ? (
          <LoadingComponent fullScreen={false} />
        ) : (
          response?.data?.map((course) => {
            return (
              <CourseCard
                course={course}
                handleDelete={handleDelete}
                openEdit={handleEdit}
              />
            );
          })
        )}
      </div>
      {response && (
        <CustomPaginator
          onClickPage={handlePageClick}
          currentPage={response.page}
          pageSize={response.pageSize}
          totalPages={response.totalPages}
          totalCount={response.totalCount}
        />
      )}
    </div>
  );
}
