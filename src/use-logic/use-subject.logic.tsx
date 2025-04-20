import { subjectQueryOption } from "@/config/useOptions/subjectQueryOptions";
import { userQueryOption } from "@/config/useOptions/userQueryOptions";
import { UserRole } from "@/enums/userRole";
import {
  initialSubjectQuery,
  initialUsersQuery,
} from "@/initialStates/queryStates";
import { SubjectQuery } from "@/interfaces/queryParams/subjectQuery";
import { UserQuery } from "@/interfaces/queryParams/userQuery";
import {
  Subject,
  SubjectSchema,
  SubjectForm,
} from "@/interfaces/types/subject";
import {
  createAsync,
  deleteAsync,
  updateAsync,
} from "@/services/subject.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

export const useSubjectLogic = () => {
  const [subject, setSubject] = useState<Subject | undefined>(undefined);
  const [openSubjectDialog, setOpenSubjectDialog] = useState<boolean>(false);
  const [subjectToDelete, setSubjectToDelete] = useState<Subject | undefined>(
    undefined
  );
  const [openScheduleDialog, setOpenScheduleDialog] = useState<boolean>(false);
  const [subjectQuery, setSubjectQuery] =
    useState<SubjectQuery>(initialSubjectQuery);
  const [teachersQuery, setTeachersQuery] = useState<UserQuery>({
    ...initialUsersQuery,
    role: [UserRole.Teacher],
  });

  const editSubject = (target?: Subject | undefined) => {
    setSubject(target);
    subjectForm.reset({
      id: target?.id,
      code: target?.code,
      description: target?.description,
      name: target?.name,
      subjectTeachers: target?.subjectTeachers.map((teacher) => ({
        teacherId: teacher.teacherId,
        label: teacher.teacherName,
      })),
    });
    setOpenSubjectDialog(true);
  };

  const subjectForm: UseFormReturn<SubjectForm> = useForm<SubjectForm>({
    resolver: zodResolver(SubjectSchema),
    defaultValues: subject
      ? {
          code: subject.code,
          description: subject.description,
          id: subject.id,
          name: subject.name,
          subjectTeachers: subject.subjectTeachers.map((teacher) => ({
            teacherId: teacher.teacherId,
            label: teacher.teacherName,
          })),
        }
      : {
          code: "",
          description: "",
          name: "",
          subjectTeachers: [],
        },
  });

  const { mutateAsync: submitForm, isPending: isFormSubmitPending } =
    useMutation({
      mutationFn: async (subjectForm: SubjectForm) =>
        subjectForm.id
          ? await updateAsync(subjectForm.id, subjectForm)
          : await createAsync(subjectForm),
      onSuccess: () => {
        setOpenSubjectDialog(false);
        toast.success("Subject has been created/updated successfully!");
        subjectForm.reset();
        refetchSubjects();
      },
    });

  const { mutateAsync: submitDelete, isPending: isDeletePending } = useMutation(
    {
      mutationFn: async (id: number) => await deleteAsync(id),
      onSuccess: () => {
        toast.success("Subject has been deleted successfully!");
        refetchSubjects();
        subjectForm.reset();
        setSubjectToDelete(undefined);
      },
    }
  );

  // Subject Query
  const {
    data: subjectQueryResponse,
    isPending: isSubjectQueryPending,
    refetch: refetchSubjects,
  } = useQuery(subjectQueryOption(subjectQuery));

  const onFormSubmit = async (data: SubjectForm) => {
    console.log("Form submitted:", data);
    await submitForm(data);
  };

  const updateSubjectQuery = (name: string) => {
    setSubjectQuery({ ...subjectQuery, name });
    console.log("Subject Query:", subjectQuery);
  };

  const { data: usersQueryData, isPending: isUsersQueryPending } = useQuery(
    userQueryOption(teachersQuery)
  );

  return {
    usersQueryData,
    isUsersQueryPending,
    setTeachersQuery,
    subjectForm,
    subjectQuery,
    setSubjectQuery,
    updateSubjectQuery,
    subjectQueryResponse,
    isSubjectQueryPending,
    openScheduleDialog,
    setOpenScheduleDialog,
    openSubjectDialog,
    setOpenSubjectDialog,
    subjectToDelete,
    setSubjectToDelete,
    subject,
    setSubject,
    onFormSubmit,
    isFormSubmitPending,
    submitDelete,
    isDeletePending,
    editSubject,
  };
};
