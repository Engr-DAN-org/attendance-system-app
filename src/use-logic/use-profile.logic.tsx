import { SidebarNavItem } from "@/components/sidebar-nav";
import { UserRole } from "@/enums/userRole";
import useDialogState from "@/hooks/use-dialog-state";
import { PasswordResetForm } from "@/interfaces/types/auth";
import { User, UserCredForm } from "@/interfaces/types/user";
import {
  changePasswordAsync,
  updateProfileAsync,
} from "@/services/auth.service";
import { IconUser } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export type UsersDialogType =
  | "add-student"
  | "edit-student"
  | "add-teacher"
  | "edit-teacher"
  | "delete";

export const useProfileLogic = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [dialogOpen, setDialogOpen] = useDialogState<UsersDialogType>(null);
  const [navItems, changeNavItems] = useState<SidebarNavItem[]>([]);

  // User Create or Edit
  const { mutateAsync: updateProfile, isPending: isUpdatePending } =
    useMutation({
      mutationFn: async (userData: UserCredForm) =>
        await updateProfileAsync(userData),
      onSuccess: () => {
        toast.success(`Profile has been updated successfully!`);
      },
    });

  // Reset the password
  const { mutateAsync: resetPassword, isPending: isResetPending } = useMutation(
    {
      mutationFn: async (values: PasswordResetForm) => {
        // Call the reset password service here
        return await changePasswordAsync(values);
      },
      onSuccess: () => {
        toast.success("Password has been reset successfully!");
      },
    }
  );

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
    updateProfile,
    isUpdatePending,
    selectedUser,
    setSelectedUser,
    dialogOpen,
    setDialogOpen,
    navItems,
    setNavItems,
    resetPassword,
    isResetPending,
  };
};
