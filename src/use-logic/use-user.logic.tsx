import { SidebarNavItem } from "@/components/sidebar-nav";
import { userQueryOption } from "@/config/useOptions/userQueryOptions";
import { UserRole } from "@/enums/userRole";
import useDialogState from "@/hooks/use-dialog-state";
import { initialUsersQuery } from "@/initialStates/queryStates";
import { UserQuery } from "@/interfaces/queryParams/userQuery";
import { User, UserCompleteForm } from "@/interfaces/types/user";
import { createAsync, deleteAsync, updateAsync } from "@/services/user.service";
import { IconUser } from "@tabler/icons-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export type UsersDialogType =
  | "add-student"
  | "edit-student"
  | "add-teacher"
  | "edit-teacher"
  | "delete";

export const useUserLogic = () => {
  const [usersQuery, setUsersQuery] = useState<UserQuery>(initialUsersQuery);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [dialogOpen, setDialogOpen] = useDialogState<UsersDialogType>(null);
  const [navItems, changeNavItems] = useState<SidebarNavItem[]>([]);

  // User Create or Edit
  const { mutateAsync: submitForm, isPending: isFormSubmitPending } =
    useMutation({
      mutationFn: async (userData: UserCompleteForm) =>
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

  const setNavItems = (user: User) => {
    console.log("user", user);

    const profileNav: SidebarNavItem = {
      href: "/admin/users/$userId",
      title: "User Profile",
      icon: <IconUser size={18} />,
    };
    const guardianNav: SidebarNavItem = {
      href: "/admin/users/$userId/guardian",
      title: "Guardian Info",
      icon: <IconUser size={18} />,
    };
    const classScheduleNav: SidebarNavItem = {
      href: "/admin/users/$userId/class-schedule",
      title: "Class Schedule",
      icon: <IconUser size={18} />,
    };

    changeNavItems([
      profileNav,
      user.role == UserRole.Teacher ? classScheduleNav : guardianNav,
    ]);
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
    navItems,
    setNavItems,
  };
};
