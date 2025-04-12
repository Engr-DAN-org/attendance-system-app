import { userQueryOption } from "@/config/useOptions/userQueryOptions";
import useDialogState from "@/hooks/use-dialog-state";
import { UserQuery } from "@/interfaces/queryParams/userQuery";
import { User } from "@/interfaces/types/user";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

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
    response,
    refechUsers,
    isAnyPendingRefetch,
    selectedUser,
    setSelectedUser,
    dialogOpen,
    setDialogOpen,
  };
};
