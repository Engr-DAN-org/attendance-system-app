import { userQueryOption } from "@/config/useOptions/userQueryOptions";
import useDialogState from "@/hooks/use-dialog-state";
import { UserQuery } from "@/interfaces/queryParams/userQuery";
import { User, UserForm } from "@/interfaces/types/user";
import { createAsync, deleteAsync, updateAsync } from "@/services/user.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

const initialQuery: UserQuery = {
  role: [],
  page: 1,
  sort: "asc",
  name: null,
  status: [],
};

export type UsersDialogType =
  | "add-student"
  | "edit-student"
  | "add-teacher"
  | "edit-teacher"
  | "delete";

export const useUserLogic = () => {
  const [usersQuery, setUsersQuery] = useState<UserQuery>(initialQuery);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [dialogOpen, setDialogOpen] = useDialogState<UsersDialogType>(null);

  // User Create or Edit
  const { mutateAsync: submitForm, isPending: isFormSubmitPending } =
    useMutation({
      mutationFn: async (userData: UserForm) =>
        userData.id
          ? await updateAsync(userData.id, userData)
          : await createAsync(userData),
      onSuccess: ({ role }) => {
        toast.success(`${role} has been created/updated successfully!`);
        refechUsers();
      },
    });

  const { mutateAsync: handleDelete, isPending: isDeletePending } = useMutation(
    {
      mutationFn: async (id: string) => await deleteAsync(id),
      onSuccess: () => {
        toast.success("User has been deleted successfully!");
        refechUsers();
      },
    }
  );

  const {
    data: response,
    refetch: refechUsers,
    isLoading,
    isPending,
    isFetching,
  } = useQuery(userQueryOption(usersQuery));

  const isAnyPendingRefetch = (): boolean => {
    return isLoading || isPending || isFetching;
  };

  return {
    usersQuery,
    setUsersQuery,
    handleDelete,
    isDeletePending,
    response,
    submitForm,
    isFormSubmitPending,
    refechUsers,
    isAnyPendingRefetch,
    selectedUser,
    setSelectedUser,
    dialogOpen,
    setDialogOpen,
  };
};
