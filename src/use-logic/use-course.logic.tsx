import { CourseQueryOption } from "@/config/useOptions/courseOption";
import { initialCourseFormState } from "@/initialStates/formStates";
import { initialCourseQuery } from "@/initialStates/queryStates";
import { CourseQuery } from "@/interfaces/queryParams/courseQuery";
import { Course, CourseForm, courseSchema } from "@/interfaces/types/course";
import {
  createAsync,
  deleteAsync,
  updateAsync,
  updateIconAsync,
} from "@/services/course.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useCourseLogic = (course?: CourseForm) => {
  const queryClient = useQueryClient();
  const [query, setQuery] = useState<CourseQuery>(initialCourseQuery);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [editCourse, setEditCourse] = useState<Course | undefined>(undefined);

  // Course Query
  const {
    data: queryResponse,
    isLoading: isQueryLoading,
    isPending: isQueryPending,
    isFetching,
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

  // Course Create or Edit
  const { mutateAsync: submitForm, isPending: isFormSubmitPending } =
    useMutation({
      mutationFn: async (courseData: CourseForm) =>
        courseData.id
          ? await updateAsync(courseData.id, courseData)
          : await createAsync(courseData),
      onSuccess: () => {
        toast.success("Course has been created/updated successfully!");
        refetchCourses();
      },
    });

  // Course Icon Update
  const { mutateAsync: updateCourseIcon } = useMutation({
    mutationFn: async ({
      courseId,
      iconId,
    }: {
      courseId: number;
      iconId: number;
    }) => await updateIconAsync(courseId, iconId),
    onSuccess: () => {
      toast.success("Course Icon has been updated!");
      refetchCourses();
    },
  });

  const openEditCourse = (course: Course) => {
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

  // Course Create or Edit form logic
  const courseForm = useForm<CourseForm>({
    resolver: zodResolver(courseSchema),
    defaultValues: course
      ? {
          name: course.name,
          code: course.code,
          description: course.description,
          years: String(course.years),
        }
      : initialCourseFormState, // If course is passed, use it for editing
  });

  const isAnyPendingRefetch = (): boolean => {
    return isQueryPending || isQueryLoading || isFetching;
  };

  return {
    query,
    setQuery,
    queryResponse,
    isQueryLoading,
    isQueryPending,
    handleDelete,
    isDeletePending,
    submitForm,
    dialogOpen,
    setDialogOpen,
    editCourse,
    openEditCourse,
    handlePageClick,
    courseForm,
    updateCourseIcon,
    isAnyPendingRefetch,
    isFormSubmitPending,
  };
};
