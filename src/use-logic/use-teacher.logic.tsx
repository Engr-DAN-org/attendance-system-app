import { User } from "@/interfaces/types/user";
import { getClassSchedulesAsync } from "@/services/teacher.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useTeacherLogic = () => {
  const [authTeacher, setAuthTeacher] = useState<User | undefined>(undefined);
  //   const [usersQuery, setUsersQuery] = useState<UserQuery>(initialUsersQuery);
  //   const [selectedUser, setSelectedUser] = useState<User | null>(null);
  //   const [dialogOpen, setDialogOpen] = useDialogState<UsersDialogType>(null);

  // User Create or Edit
  //   const { mutateAsync: submitForm, isPending: isFormSubmitPending } =
  //     useMutation({
  //       mutationFn: async (userData: UserCompleteForm) =>
  //         userData.id
  //           ? await updateAsync(userData.id, userData)
  //           : await createAsync(userData),
  //       onSuccess: ({ role }) => {
  //         toast.success(`${role} has been created/updated successfully!`);
  //         refechUsers();
  //       },
  //     });

  //   const { mutateAsync: handleDelete, isPending: isDeletePending } = useMutation(
  //     {
  //       mutationFn: async (id: string) => await deleteAsync(id),
  //       onSuccess: () => {
  //         toast.success("User has been deleted successfully!");
  //         refechUsers();
  //       },
  //     }
  //   );

  const {
    data: teacherSchedules,
    refetch: refechSchedules,
    isFetching: isFetchingSchedules,
  } = useQuery({
    queryKey: ["teacher-class-schedule"],
    queryFn: async () => await getClassSchedulesAsync(),
    enabled: !!authTeacher,
  });

  return {
    teacherSchedules,
    refechSchedules,
    isFetchingSchedules,
    authTeacher,
    setAuthTeacher,
  };
};
