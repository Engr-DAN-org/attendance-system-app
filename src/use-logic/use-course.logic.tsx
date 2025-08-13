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
  const [dialogState, setDialogState] = useState<"" | "form" | "delete">("");
  const [editCourse, setEditCourse] = useState<Course | null>(null);

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
        setEditCourse(null);
        setDialogState("");
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
        setEditCourse(null);
      },
    });

  // Course Icon Update
  const { mutateAsync: updateCourseIcon, isPending: pendingUpdateCourseIcon } =
    useMutation({
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

  const openDeleteDialog = (course: Course) => {
    setEditCourse(course);
    setDialogState("delete");
  };

  const openEditCourse = (course: Course) => {
    setEditCourse(course);
    courseForm.reset({
      ...course,
      years: course.years.toString(),
    });
    setDialogState("form");
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
    dialogState,
    setDialogState,
    editCourse,
    setEditCourse,
    openEditCourse,
    handlePageClick,
    courseForm,
    updateCourseIcon,
    pendingUpdateCourseIcon,
    isAnyPendingRefetch,
    isFormSubmitPending,
    openDeleteDialog,
  };
};
