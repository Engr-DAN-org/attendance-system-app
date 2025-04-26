import { getClassSchedulesAsync } from "@/services/teacher.service";
import { useQuery } from "@tanstack/react-query";

export const useUserLogic = (teacherId: string) => {
  //   const [usersQuery, setUsersQuery] = useState<UserQuery>(initialUsersQuery);
  //   const [selectedUser, setSelectedUser] = useState<User | null>(null);
  //   const [dialogOpen, setDialogOpen] = useDialogState<UsersDialogType>(null);

  // User Create or Edit
  //   const { mutateAsync: submitForm, isPending: isFormSubmitPending } =
  //     useMutation({
  //       mutationFn: async (userData: UserForm) =>
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
    data: response,
    refetch: refechSchedules,
    isFetching: isFetchingSchedules,
  } = useQuery({
    queryKey: ["class-schedule", teacherId],
    queryFn: async () => getClassSchedulesAsync(teacherId),
    enabled: !!teacherId,
  });

  return {
    response,
    refechSchedules,
    isFetchingSchedules,
  };
};
