import { SectionsQueryOption } from "@/config/useOptions/sectionQueryOptions";
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
import { getByTeacherOrSectionAsync } from "@/services/class-schedule.service";
import { createAsync, updateAsync } from "@/services/section.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useSectionLogic = () => {
  const [section, setSection] = useState<Section | undefined>(undefined);
  const [query, setQuery] = useState<SectionQuery>(initialSectionQuery);
  const [deleteDialogState, setDeleteDialogState] = useState<boolean>(false);
  // used for determining if the form is in edit mode
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const {
    data: response,
    isPending: isQueryPending,
    refetch: refetchSections,
  } = useQuery(SectionsQueryOption(query));

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
    refetchSections,
    deleteDialogState,
    section,
    setTargetDeletion,
    handlePageClick,
    isEdit,
    setIsEdit,
  };
};

export const useSectionCreationLogic = () => {
  const { refetchSections } = useSectionLogic();
  const [openSectionDialog, setOpenSectionDialog] = useState<boolean>(false);
  const [section, setSection] = useState<Section | undefined>(undefined);
  const [openScheduleDialog, setOpenScheduleDialog] = useState<boolean>(false);
  const [sectionId, setSectionId] = useState<number | undefined>(undefined);
  const {
    data: classScheduleList,
    refetch: refetchSectionClassSchedules,
    isPending: isFetchPending,
  } = useQuery({
    queryKey: ["sectionlassSchedule", sectionId],
    queryFn: async () =>
      getByTeacherOrSectionAsync({
        sectionId,
      }),
  });

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

  // Section Create or Edit
  // Get refetchSections from useSectionLogic at the top level of the hook/component

  const { mutateAsync: submitForm, isPending: isFormSubmitPending } =
    useMutation({
      mutationFn: async (formData: Section) =>
        formData.id
          ? await updateAsync(formData.id, formData)
          : await createAsync(formData),
      onSuccess: () => {
        toast.success("Course has been created/updated successfully!");
        refetchSections();
        setOpenSectionDialog(false);
      },
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

  return {
    subjectsQueryData,
    isSubjectQueryPending,
    updateSubjectQuery,
    updateTeachersQuery,
    usersQueryData,

    isUsersQueryPending,
    openScheduleDialog,
    setOpenScheduleDialog,

    // Section Dialog
    openSectionDialog,
    setOpenSectionDialog,
    section,
    setSection,
    sectionForm,
    scheduleForm,
    onFormSubmit,
    isFormSubmitPending,
    classScheduleList,
    refetchSectionClassSchedules,
    isFetchPending,
    setSectionId,
  };
};
