import { getClassSchedulesAsync } from "@/services/teacher.service";
import { useAuthStore } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";

export const useTeacherLogic = () => {
  const { user: authTeacher } = useAuthStore((state) => state);
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
  };
};
