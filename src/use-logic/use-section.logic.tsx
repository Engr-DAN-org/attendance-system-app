import { SectionQueryOption } from "@/config/useOptions/sectionQueryOptions";
import { subjectTeachersQueryOption } from "@/config/useOptions/subjectQueryOptions";
import { userQueryOption } from "@/config/useOptions/userQueryOptions";
import { courseYearOptions } from "@/constants/courseYear";
import { UserRole } from "@/enums/userRole";
import {
  initialSectionQuery,
  initialSubjectTeacherQuery,
  initialUsersQuery,
} from "@/initialStates/queryStates";
import { SectionQuery } from "@/interfaces/queryParams/sectionQuery";
import { SubjectTeacherQuery } from "@/interfaces/queryParams/subjectQuery";
import { UserQuery } from "@/interfaces/queryParams/userQuery";
import {
  ClassSchedule,
  classScheduleSchema,
} from "@/interfaces/types/classSchedule";
import { Section, sectionSchema } from "@/interfaces/types/section";
import { createAsync, updateAsync } from "@/services/section.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

export const useSectionLogic = () => {
  const [section, setSection] = useState<Section | undefined>(undefined);
  const [query, setQuery] = useState<SectionQuery>(initialSectionQuery);
  const [deleteDialogState, setDeleteDialogState] = useState<boolean>(false);

  const {
    data: response,
    isPending: isQueryPending,
    refetch,
  } = useQuery(SectionQueryOption(query));

  const setTargetDeletion = (data: Section) => {
    setSection(data);
    setDeleteDialogState(true);
  };

  const handlePageClick = (page: number) => {
    setQuery({ ...query, page });
  };

  return {
    query,
    setQuery,
    response,
    isQueryPending,
    refetch,
    deleteDialogState,
    section,
    setTargetDeletion,
    handlePageClick,
  };
};

export const useSectionCreationLogic = () => {
  const [section, setSection] = useState<Section | undefined>(undefined);
  const [openScheduleDialog, setOpenScheduleDialog] = useState<boolean>(false);

  const [teachersQuery, setTeachersQuery] = useState<UserQuery>({
    ...initialUsersQuery,
    role: [UserRole.Teacher],
  });
  const [subjectQuery, setSubjectQuery] = useState<SubjectTeacherQuery>(
    initialSubjectTeacherQuery
  );

  const sectionForm = useForm<Section>({
    resolver: zodResolver(sectionSchema),
    defaultValues: section
      ? { ...section }
      : {
          name: "",
          description: "",
          yearLevel: courseYearOptions[0].value,
          courseId: undefined,
          teacherId: undefined,
          classSchedules: [],
        },
  });

  const scheduleForm = useForm<ClassSchedule>({
    resolver: zodResolver(classScheduleSchema),
    defaultValues: {
      index: undefined,
      subjectTeacherId: undefined,
      subjectName: "",
      day: "1",
      startTime: "",
      endTime: "",
      gracePeriod: 5,
    },
  });

  // Course Create or Edit
  const { mutateAsync: submitForm, isPending: isFormSubmitPending } =
    useMutation({
      mutationFn: async (formData: Section) =>
        formData.id
          ? await updateAsync(formData.id, formData)
          : await createAsync(formData),
      onSuccess: () => {
        toast.success("Course has been created/updated successfully!");
        // refetchCourses();
      },
    });

  const classSchedules = useWatch({
    control: sectionForm.control,
    name: "classSchedules",
  });
  const { fields, append, update, remove } = useFieldArray({
    control: sectionForm.control,
    name: "classSchedules",
  });

  const { data: usersQueryData, isPending: isUsersQueryPending } = useQuery(
    userQueryOption(teachersQuery)
  );

  const { data: subjectsQueryData, isPending: isSubjectQueryPending } =
    useQuery(subjectTeachersQueryOption(subjectQuery));

  const onFormSubmit = async (data: Section) => {
    console.log("Form submitted:", data);
    await submitForm(data);
    sectionForm.reset();
  };

  const updateTeachersQuery = (name: string) => {
    setTeachersQuery({ ...teachersQuery, name });
    console.log("Teachers Query:", teachersQuery);
  };

  const updateSubjectQuery = (name: string) => {
    setSubjectQuery({ ...subjectQuery, name });
    console.log("Subject Query:", subjectQuery);
  };

  const editSchedule = (index: number) => {
    console.log("Editing schedule at index:", index);

    const data = fields[index];
    if (!data) {
      console.error("No data found for the given index:", index);
      return;
    }
    scheduleForm.reset({ ...data, index });
    setOpenScheduleDialog(true);
  };

  return {
    subjectsQueryData,
    isSubjectQueryPending,
    updateSubjectQuery,
    updateTeachersQuery,
    usersQueryData,

    isUsersQueryPending,
    openScheduleDialog,
    setOpenScheduleDialog,
    section,
    setSection,
    sectionForm,
    scheduleForm,
    editSchedule,
    fields,
    append,
    update,
    remove,
    onFormSubmit,
    isFormSubmitPending,
    classSchedules,
  };
};
